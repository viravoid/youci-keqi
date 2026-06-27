import type { SceneTag } from "@/types/wordMatch";
import { mockMatchWord } from "./mockMatchWord";

export type MatchWordInput = {
  userText: string;
  scene: SceneTag;
  excludedWord?: string;
  precisionContext?: string;
};

export async function matchWord(input: MatchWordInput) {
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
