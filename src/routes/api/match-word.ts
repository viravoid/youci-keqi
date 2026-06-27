import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { mockMatchWord } from "@/lib/mockMatchWord";
import { realMatchWord } from "@/lib/realMatchWord";
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

export const Route = createFileRoute("/api/match-word")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const ts = new Date().toISOString();
        let parsed: z.infer<typeof matchWordRequestSchema>;

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

        try {
          const result = await realMatchWord(parsed);
          console.log(`[match-word ${ts}] output:`, JSON.stringify({ word: result.word, language: result.language, confidence: result.matchConfidence, shortMeaning: result.shortMeaning?.slice(0, 60), cultureNote: result.cultureNote?.slice(0, 80) }));
          return Response.json(result);
        } catch (error) {
          const isDev = import.meta.env.DEV;
          const errMsg = error instanceof Error ? error.message : String(error);
          console.error("[match-word] real matcher failed:", errMsg);

          if (isDev) {
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
