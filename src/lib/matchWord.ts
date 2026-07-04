import type { SceneTag, WordMatchResult } from "@/types/wordMatch";
import { mockMatchWord } from "./mockMatchWord";

export type MatchWordInput = {
  userText: string;
  scene: SceneTag;
  excludedWord?: string;
  precisionContext?: string;
};

export type MatchProgress = {
  stage: "semantic_frame" | "local_match" | "search" | "review" | "done";
  message: string;
};

export type StreamCallbacks = {
  onProgress?: (progress: MatchProgress) => void;
  onResult?: (result: WordMatchResult) => void;
  onError?: (error: string) => void;
};

export async function matchWord(input: MatchWordInput): Promise<WordMatchResult> {
  if (typeof window !== "undefined") {
    try {
      const response = await fetch("/api/match-word", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      if (response.ok) {
        return await response.json();
      }

      const payload = (await response.json().catch(() => null)) as
        | { error?: string }
        | null;
      throw new Error(payload?.error || "词语匹配服务暂时不可用。");
    } catch (err) {
      if (import.meta.env.DEV) {
        return mockMatchWord(
          input.userText,
          input.scene,
          input.excludedWord,
          input.precisionContext,
        );
      }

      if (err instanceof Error && err.message && !err.message.includes("fetch")) {
        throw err;
      }

      throw new Error("词语匹配服务暂时不可用，请稍后重试。");
    }
  }

  return mockMatchWord(
    input.userText,
    input.scene,
    input.excludedWord,
    input.precisionContext,
  );
}

export async function matchWordStream(
  input: MatchWordInput,
  callbacks: StreamCallbacks,
): Promise<WordMatchResult | null> {
  let result: WordMatchResult | null = null;

  try {
    const response = await fetch("/api/match-word", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "text/event-stream",
      },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      const payload = await response.json().catch(() => null);
      throw new Error(
        (payload as { error?: string })?.error || `请求失败 (${response.status})`,
      );
    }

    // Production (EdgeOne SSR) uses non-streaming — parse as plain JSON
    const contentType = response.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      return await response.json() as WordMatchResult;
    }

    const reader = response.body?.getReader();
    if (!reader) throw new Error("浏览器不支持流式响应。");

    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";

      let eventType = "";
      let eventData = "";

      for (const line of lines) {
        if (line.startsWith("event: ")) {
          eventType = line.slice(7).trim();
        } else if (line.startsWith("data: ")) {
          eventData = line.slice(6).trim();
        } else if (line === "" && eventType) {
          // End of event — process it
          try {
            const data = JSON.parse(eventData || "{}");

            switch (eventType) {
              case "progress":
                callbacks.onProgress?.(data as MatchProgress);
                break;
              case "result":
                result = data as WordMatchResult;
                callbacks.onResult?.(result);
                break;
              case "error":
                callbacks.onError?.(data.error || "未知错误");
                break;
            }
          } catch {
            // skip malformed events
          }

          eventType = "";
          eventData = "";
        }
      }
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    callbacks.onError?.(msg);

    if (import.meta.env.DEV) {
      const fallback = await mockMatchWord(
        input.userText,
        input.scene,
        input.excludedWord,
        input.precisionContext,
      );
      result = fallback;
      callbacks.onResult?.(fallback);
    }
  }

  return result;
}

export async function quickMatch(
  input: MatchWordInput,
): Promise<WordMatchResult | null> {
  try {
    const response = await fetch("/api/quick-match", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userText: input.userText,
        scene: input.scene,
        precisionContext: input.precisionContext,
      }),
    });

    if (response.ok) {
      return await response.json();
    }

    return null;
  } catch {
    return null;
  }
}
