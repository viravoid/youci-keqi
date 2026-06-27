import type { SceneTag, WordMatchResult } from "@/types/wordMatch";

const FEEDBACK_KEY = "ycqx:feedback-log";

export type FeedbackEntry = {
  word: string;
  userText: string;
  scene: string;
  inputWord: string;
  inputLanguage: string;
  inputConfidence: string;
  rating: "准" | "不准";
  timestamp: string;
};

export function saveFeedback(
  result: WordMatchResult,
  userText: string,
  scene: SceneTag,
  rating: "准" | "不准",
) {
  if (typeof window === "undefined") return;

  const entry: FeedbackEntry = {
    word: result.word,
    userText,
    scene,
    inputWord: result.word,
    inputLanguage: result.language ?? "",
    inputConfidence: result.matchConfidence ?? "",
    rating,
    timestamp: new Date().toISOString(),
  };

  // 1. Local backup
  try {
    const raw = window.localStorage.getItem(FEEDBACK_KEY);
    const existing: FeedbackEntry[] = raw ? JSON.parse(raw) : [];
    window.localStorage.setItem(
      FEEDBACK_KEY,
      JSON.stringify([entry, ...existing].slice(0, 200)),
    );
  } catch {
    /* ignore */
  }

  // 2. Send to server log (fire-and-forget)
  fetch("/api/feedback", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(entry),
  }).catch(() => {
    /* silent — server log is best-effort */
  });
}

export function listFeedback(): FeedbackEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(FEEDBACK_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
