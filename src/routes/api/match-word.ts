import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { mockMatchWord } from "@/lib/mockMatchWord";
import { quickMatchWord, realMatchWordStream } from "@/lib/realMatchWord";
import type { SceneTag } from "@/types/wordMatch";

const sceneSchema = z.enum([
  "亲密关系",
  "日常瞬间",
  "书影音余韵",
  "友情家庭",
  "工作学业",
  "自我追问",
]);

const matchWordRequestSchema = z.object({
  userText: z.string().trim().min(4, "请再多写一点，让我能辨认具体线索。"),
  scene: sceneSchema,
  excludedWord: z.string().optional(),
  precisionContext: z.string().optional(),
});

function createSSEStream(generator: (controller: ReadableStreamDefaultController) => Promise<void>) {
  const encoder = new TextEncoder();
  return new ReadableStream({
    async start(controller) {
      try {
        await generator(controller);
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        controller.enqueue(encoder.encode(`event: error\ndata: ${JSON.stringify({ error: msg })}\n\n`));
      } finally {
        controller.close();
      }
    },
  });
}

export const Route = createFileRoute("/api/match-word")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const ts = new Date().toISOString();
        let parsed: z.infer<typeof matchWordRequestSchema>;
        const wantsStream = request.headers.get("accept")?.includes("text/event-stream");

        try {
          parsed = matchWordRequestSchema.parse(await request.json());
          console.log(`[match-word ${ts}] input:`, JSON.stringify({ userText: parsed.userText.slice(0, 80), scene: parsed.scene }));
        } catch (error) {
          return Response.json(
            {
              error:
                error instanceof z.ZodError
                  ? error.issues[0]?.message
                  : "请求格式不正确。",
            },
            { status: 400 },
          );
        }

        // Production streaming — single-call quick match wrapped as SSE
        // (single API call is reliable on EdgeOne SSR; SSE wrapper keeps
        // old clients compatible)
        const isDev = import.meta.env.DEV;
        if (wantsStream) {
          const encoder = new TextEncoder();
          const stream = new ReadableStream({
            async start(controller) {
              try {
                controller.enqueue(encoder.encode(`event: progress\ndata: ${JSON.stringify({stage: "local_match", message: "正在词库中寻找匹配…"})}\n\n`));
                const result = await quickMatchWord(parsed);
                controller.enqueue(encoder.encode(`event: result\ndata: ${JSON.stringify(result)}\n\n`));
                controller.enqueue(encoder.encode("event: done\ndata: {}\n\n"));
              } catch (error) {
                const msg = error instanceof Error ? error.message : String(error);
                controller.enqueue(encoder.encode(`event: error\ndata: ${JSON.stringify({error: msg})}\n\n`));
              } finally {
                controller.close();
              }
            },
          });

          return new Response(stream, {
            headers: {
              "Content-Type": "text/event-stream",
              "Cache-Control": "no-cache",
              Connection: "keep-alive",
            },
          });
        }

        // Non-streaming path — single-call quick match (reliable on EdgeOne SSR)
        try {
          const result = await quickMatchWord(parsed);
          console.log(`[match-word ${ts}] output:`, JSON.stringify({ word: result.word, language: result.language, confidence: result.matchConfidence, shortMeaning: result.shortMeaning?.slice(0, 60), cultureNote: result.cultureNote?.slice(0, 80) }));
          return Response.json(result);
        } catch (error) {
          const errMsg = error instanceof Error ? error.message : String(error);
          console.error("[match-word] matcher failed:", errMsg);

          if (import.meta.env.DEV) {
            return Response.json(
              await mockMatchWord(
                parsed.userText,
                parsed.scene as SceneTag,
                parsed.excludedWord,
                parsed.precisionContext,
              ),
            );
          }

          return Response.json(
            {
              error: `词语匹配服务暂时不可用：${errMsg}`,
            },
            { status: 502 },
          );
        }
      },
    },
  },
});
