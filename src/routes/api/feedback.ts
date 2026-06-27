import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const feedbackSchema = z.object({
  word: z.string().min(1),
  userText: z.string().min(1),
  scene: z.string(),
  inputWord: z.string(), // what AI matched
  inputLanguage: z.string(),
  inputConfidence: z.string(),
  rating: z.enum(["准", "不准"]),
  timestamp: z.string(),
});

export const Route = createFileRoute("/api/feedback")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const ts = new Date().toISOString();
        try {
          const body = feedbackSchema.parse(await request.json());
          console.log(
            `[feedback ${ts}] rating=${body.rating} word="${body.word}" matched="${body.inputWord}" lang=${body.inputLanguage} conf=${body.inputConfidence} scene=${body.scene} input="${body.userText.slice(0, 120)}"`,
          );
          return Response.json({ ok: true });
        } catch (error) {
          const msg = error instanceof z.ZodError ? error.issues[0]?.message : "Invalid";
          console.error(`[feedback ${ts}] ERR:`, msg);
          return Response.json({ error: msg }, { status: 400 });
        }
      },
    },
  },
});
