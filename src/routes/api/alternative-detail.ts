import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { buildAlternativeDetailPrompt } from "@/lib/aiPrompt";
import type { SceneTag } from "@/types/wordMatch";

const detailSchema = z.object({
  word: z.string().min(1),
  language: z.string().min(1),
  userText: z.string().min(1),
  scene: z.string().min(1),
  precisionContext: z.string().optional(),
});

const resultSchema = z.object({
  word: z.string(),
  language: z.string(),
  shortMeaning: z.string().default(""),
  whyItFits: z.string().default(""),
  cultureNote: z.string().default(""),
  shareCopy: z.string().default(""),
});

export const Route = createFileRoute("/api/alternative-detail")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const ts = new Date().toISOString();
        let body: z.infer<typeof detailSchema>;

        try {
          body = detailSchema.parse(await request.json());
        } catch (e) {
          return Response.json(
            { error: e instanceof z.ZodError ? e.issues[0]?.message : "Invalid" },
            { status: 400 },
          );
        }

        const apiKey = import.meta.env.VITE_DEEPSEEK_API_KEY || process.env.DEEPSEEK_API_KEY || "";
        if (!apiKey) {
          return Response.json({ error: "API key not configured" }, { status: 500 });
        }

        const prompt = buildAlternativeDetailPrompt(
          body.word,
          body.language,
          body.userText,
          body.scene as SceneTag,
          body.precisionContext,
        );

        console.log(`[alt-detail ${ts}] word="${body.word}" lang=${body.language}`);

        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 25_000);

        try {
          const resp = await fetch("https://api.deepseek.com/v1/chat/completions", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${apiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: "deepseek-chat",
              messages: [
                { role: "system", content: "Return valid JSON only, no markdown." },
                { role: "user", content: prompt },
              ],
              temperature: 0.35,
              max_tokens: 1200,
              response_format: { type: "json_object" },
            }),
            signal: controller.signal,
          });

          if (!resp.ok) {
            throw new Error(`AI request failed: ${resp.status}`);
          }

          const payload = await resp.json() as any;
          const text = payload?.choices?.[0]?.message?.content || "";
          let json = text.replace(/,\s*}/g, "}").replace(/,\s*]/g, "]");
          json = json.replace(/([{,]\s*)(\w+)(\s*:)/g, '$1"$2"$3');
          const parsed = resultSchema.parse(JSON.parse(json));

          console.log(`[alt-detail ${ts}] done: meaning="${parsed.shortMeaning?.slice(0, 40)}"`);
          return Response.json(parsed);
        } catch (e) {
          console.error(`[alt-detail ${ts}] error:`, e instanceof Error ? e.message : String(e));
          return Response.json(
            { error: e instanceof Error ? e.message : "Failed" },
            { status: 502 },
          );
        } finally {
          clearTimeout(timer);
        }
      },
    },
  },
});
