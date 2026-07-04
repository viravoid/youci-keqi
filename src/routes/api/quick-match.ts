import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { quickMatchWord } from "@/lib/realMatchWord";

const sceneSchema = z.enum([
  "亲密关系",
  "日常瞬间",
  "书影音余韵",
  "友情家庭",
  "工作学业",
  "自我追问",
]);

const quickMatchRequestSchema = z.object({
  userText: z.string().trim().min(8, "请再多写一点。"),
  scene: sceneSchema,
  precisionContext: z.string().optional(),
});

export const Route = createFileRoute("/api/quick-match")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const ts = new Date().toISOString();
        let parsed: z.infer<typeof quickMatchRequestSchema>;

        try {
          parsed = quickMatchRequestSchema.parse(await request.json());
          console.log(`[quick-match ${ts}] input:`, JSON.stringify({ userText: parsed.userText.slice(0, 80), scene: parsed.scene }));
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
          const input = {
            userText: parsed.userText,
            scene: parsed.scene,
            precisionContext: parsed.precisionContext,
          };
          const result = await quickMatchWord(input);
          console.log(`[quick-match ${ts}] output:`, JSON.stringify({ word: result.word, language: result.language, confidence: result.matchConfidence }));
          return Response.json(result);
        } catch (error) {
          const errMsg = error instanceof Error ? error.message : String(error);
          console.error("[quick-match] failed:", errMsg);
          return Response.json({ error: errMsg }, { status: 502 });
        }
      },
    },
  },
});
