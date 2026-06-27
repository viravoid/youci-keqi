import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { listFeedback, type FeedbackEntry } from "@/lib/feedbackLog";
import { listRecentWords } from "@/lib/localHistory";
import type { SavedWordEntry } from "@/types/wordMatch";

export const Route = createFileRoute("/logs")({
  head: () => ({
    meta: [
      { title: "数据记录 · 有词可栖" },
    ],
  }),
  component: Logs,
});

function Logs() {
  const [feedback, setFeedback] = useState<FeedbackEntry[]>([]);
  const [history, setHistory] = useState<SavedWordEntry[]>([]);

  useEffect(() => {
    setFeedback(listFeedback());
    setHistory(listRecentWords(200));
  }, []);

  const exportAll = () => {
    const data = { feedback, history, exportedAt: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `youci-keqi-logs-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="relative min-h-screen bg-paper">
      <header className="mx-auto max-w-3xl px-6 pt-12">
        <div className="flex items-center justify-between">
          <Link to="/" className="font-meta text-xs uppercase tracking-[0.24em] text-ink-soft hover:text-foreground">
            ← 回到首页
          </Link>
          <button
            onClick={exportAll}
            className="rounded-full bg-foreground px-4 py-1.5 font-meta text-xs tracking-wide text-primary-foreground"
          >
            导出 JSON
          </button>
        </div>
        <h1 className="mt-6 font-serif text-3xl text-foreground">数据记录</h1>
      </header>

      <section className="mx-auto max-w-3xl px-6 pb-24">
        <h2 className="mt-12 font-meta text-sm uppercase tracking-[0.2em] text-ink-soft">
          搜索历史 ({history.length})
        </h2>
        <div className="mt-4 space-y-2">
          {history.map((entry, i) => (
            <div key={entry.id ?? i} className="rounded border border-border bg-card p-3 font-mono text-xs text-foreground">
              <span className="text-ink-soft">{entry.createdAt?.slice(0, 19)}</span>
              {" · "}
              <strong>{entry.word}</strong> ({entry.language})
              {" ← "}
              <span className="text-ink-soft">{entry.userText?.slice(0, 60)}</span>
            </div>
          ))}
        </div>

        <h2 className="mt-12 font-meta text-sm uppercase tracking-[0.2em] text-ink-soft">
          反馈记录 ({feedback.length})
        </h2>
        <div className="mt-4 space-y-2">
          {feedback.map((entry, i) => (
            <div key={i} className="rounded border border-border bg-card p-3 font-mono text-xs text-foreground">
              <span className={entry.rating === "准" ? "text-green-700" : "text-red-700"}>
                {entry.rating === "准" ? "✓" : "✗"}
              </span>
              {" "}
              <span className="text-ink-soft">{entry.timestamp?.slice(0, 19)}</span>
              {" · "}
              <strong>{entry.word}</strong>
              {entry.inputLanguage && <> ({entry.inputLanguage})</>}
              {" ← "}
              <span className="text-ink-soft">{entry.userText?.slice(0, 60)}</span>
              {entry.inputConfidence && (
                <> <span className="text-ink-soft">[{entry.inputConfidence}]</span></>
              )}
            </div>
          ))}
        </div>

        {feedback.length === 0 && history.length === 0 && (
          <p className="mt-8 font-cn text-sm text-ink-soft">暂无数据。搜索一些词并点击"准/不准"按钮后，数据会出现在这里。</p>
        )}
      </section>
    </div>
  );
}
