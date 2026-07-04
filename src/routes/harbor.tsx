import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion, MotionConfig } from "framer-motion";
import { listSavedWords, toggleSavedWord } from "@/lib/localHistory";
import { setLastWord, type WordResult } from "@/lib/word-store";
import { DepthBackground } from "@/components/DepthBackground";
import type { SavedWordEntry } from "@/types/wordMatch";

export const Route = createFileRoute("/harbor")({
  head: () => ({
    meta: [
      { title: "停靠过的词 · 有词可栖" },
      {
        name: "description",
        content: "你曾收下的每一枚词，都停在这里。",
      },
      { property: "og:title", content: "停靠过的词 · 有词可栖" },
      {
        property: "og:description",
        content: "你曾收下的每一枚词，都停在这里。",
      },
    ],
  }),
  component: Harbor,
});

type Entry = {
  id?: string;
  w: string;
  l: string;
  pron: string;
  g: string;
  note: string;
  date: string;
  at: number;
  loved: boolean;
  why: string;
  culture: string;
  raw: SavedWordEntry;
};

type SortKey = "recent" | "earliest" | "loved";

const SORTS: { key: SortKey; label: string }[] = [
  { key: "recent", label: "最近停靠" },
  { key: "earliest", label: "最早停靠" },
  { key: "loved", label: "最想留下" },
];

function savedToEntry(entry: SavedWordEntry): Entry {
  const createdAt = new Date(entry.createdAt);
  const isValidDate = !Number.isNaN(createdAt.getTime());
  const at = isValidDate ? createdAt.getTime() : Date.now();

  return {
    id: entry.id,
    w: entry.word,
    l: entry.language,
    pron: entry.pronunciation,
    g: entry.shortMeaning,
    note: entry.userText,
    date: `${isValidDate ? createdAt.getFullYear() : new Date().getFullYear()} · 停靠`,
    at,
    loved: entry.saved,
    why: entry.whyItFits,
    culture: entry.cultureNote,
    raw: entry,
  };
}

function Harbor() {
  const [localEntries, setLocalEntries] = useState<Entry[]>([]);
  const [sort, setSort] = useState<SortKey>("recent");
  const [openId, setOpenId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = listSavedWords().map(savedToEntry);
    setLocalEntries(saved);
  }, []);

  const handleToggleSaved = (entry: Entry) => {
    const itemKey = entry.id ?? entry.w;

    if (entry.loved) {
      const shouldRemove = window.confirm(`确定不再留下「${entry.w}」吗？它会从 Harbor 里移走。`);
      if (!shouldRemove) return;
    }

    toggleSavedWord(entry.raw);

    setLocalEntries((current) =>
      current
        .map((item) => (item.id === entry.id ? { ...item, loved: !item.loved } : item))
        .filter((item) => item.loved),
    );

    if (openId === itemKey && entry.loved) {
      setOpenId(null);
    }
  };

  const onShare = (c: Entry, idx: number) => {
    const payload: WordResult = {
      word: c.w,
      language: c.l,
      pronunciation: c.pron,
      meaning: c.g,
      whyForYou: c.why,
      culture: c.culture,
      alternatives: [],
      shareText: c.g,
      userInput: c.note,
      seq: idx + 1,
    };
    setLastWord(payload);
    navigate({ to: "/share" });
  };

  const items = useMemo(() => {
    if (sort === "recent") return [...localEntries].sort((a, b) => b.at - a.at);
    if (sort === "earliest") return [...localEntries].sort((a, b) => a.at - b.at);
    return [...localEntries].sort((a, b) => {
      if (a.loved !== b.loved) return a.loved ? -1 : 1;
      return b.at - a.at;
    });
  }, [localEntries, sort]);

  return (
    <div className="relative min-h-screen">
      <DepthBackground />
      <header className="relative z-10 mx-auto max-w-3xl px-6 pt-12 sm:pt-20">
        <div className="flex items-center justify-between font-meta text-[11px] uppercase tracking-[0.28em] text-ink-soft">
          <Link to="/" className="hover:text-foreground">
            ← 回到首页
          </Link>
          <span>Harbor</span>
        </div>
        <div className="mt-6 hairline" />
        <h1 className="mt-8 font-serif text-5xl leading-[1.05] tracking-tight text-foreground sm:text-6xl">
          停靠过的词
        </h1>
        <p className="mt-4 max-w-xl font-cn text-base leading-relaxed text-ink-soft sm:text-lg">
          你收下的每一枚词，
          <br className="sm:hidden" />
          都在这里安静地停着。
        </p>
        <div className="mt-8 hairline" />

        <div className="mt-6 flex flex-wrap items-baseline justify-between gap-3 font-meta text-[11px] uppercase tracking-[0.24em] text-ink-soft">
          <span>共 {items.length} 枚</span>
          <div className="flex items-center gap-1">
            <span className="mr-2 hidden sm:inline">排序</span>
            {SORTS.map((s, i) => (
              <span key={s.key} className="flex items-center">
                {i > 0 && <span className="mx-2 text-ink-soft/50">·</span>}
                <button
                  onClick={() => setSort(s.key)}
                  className={
                    "transition hover:text-foreground " +
                    (sort === s.key
                      ? "text-foreground underline decoration-foreground/60 decoration-1 underline-offset-[6px]"
                      : "")
                  }
                >
                  {s.label}
                </button>
              </span>
            ))}
          </div>
        </div>
      </header>

      <section className="relative z-10 mx-auto mt-10 max-w-3xl px-6 pb-24">
        {items.length === 0 ? (
          <div className="rounded-md border border-dashed border-border bg-card/70 px-6 py-10 text-center">
            <p className="font-serif text-2xl text-foreground">这里还是空的</p>
            <p className="mt-3 font-cn text-sm leading-relaxed text-ink-soft">
              这里只显示当前用户保存在本地的词。
              <br />
              新用户第一次打开时，应该看到空白状态。
            </p>
          </div>
        ) : (
          <MotionConfig transition={{ type: "spring", stiffness: 260, damping: 32, mass: 0.9 }}>
            <LayoutGroup>
              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {items.map((c, idx) => {
                  const itemKey = c.id ?? c.w;
                  const isOpen = openId === itemKey;
                  return (
                    <motion.li
                      key={itemKey}
                      layout
                      initial={false}
                      onClick={() => setOpenId(isOpen ? null : itemKey)}
                      style={{ willChange: "transform" }}
                      className={
                        "group relative cursor-pointer rounded-md border border-border bg-card p-6 transition-shadow duration-500 " +
                        (isOpen
                          ? "sm:col-span-2 shadow-[0_30px_60px_-30px_rgba(60,40,20,0.4)]"
                          : "shadow-[0_20px_40px_-30px_rgba(60,40,20,0.25)] hover:shadow-[0_24px_48px_-28px_rgba(60,40,20,0.35)]")
                      }
                    >
                      <button
                        aria-label={c.loved ? "取消留下" : "留下这枚词"}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleSaved(c);
                        }}
                        className="absolute right-5 top-5 font-meta text-xl leading-none text-ink-soft transition hover:text-foreground"
                        title={c.loved ? "已留下" : "想留下"}
                      >
                        {c.loved ? "♥" : "♡"}
                      </button>
                      <div className="font-meta text-[11px] uppercase tracking-[0.24em] text-ink-soft">
                        {c.date}
                      </div>
                      <div
                        className={
                          "mt-3 font-serif leading-tight text-foreground transition-[font-size] duration-500 ease-out " +
                          (isOpen ? "text-5xl" : "text-3xl")
                        }
                      >
                        {c.w}
                      </div>
                      <div className="mt-1 flex flex-wrap items-baseline gap-x-4 font-meta text-[11px] uppercase tracking-[0.2em] text-ink-soft">
                        <span>{c.l}</span>
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.span
                              key="pron"
                              initial={{ opacity: 0, x: -4 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -4 }}
                              transition={{ duration: 0.3 }}
                              className="font-serif normal-case tracking-normal"
                            >
                              {c.pron}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </div>
                      <p className="mt-4 font-cn text-base leading-relaxed text-foreground">
                        {c.g}
                      </p>

                      <AnimatePresence initial={false} mode="popLayout">
                        {isOpen && (
                          <motion.div
                            key="more"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.35, ease: "easeOut", delay: 0.05 }}
                          >
                            <div className="my-6 hairline" />
                            <DefRow label="为什么是这一枚">{c.why}</DefRow>
                            <DefRow label="文化说明">{c.culture}</DefRow>
                            <div className="mt-6 hairline" />
                            <p className="mt-4 font-cn text-sm text-ink-soft">— {c.note}</p>
                            <div className="mt-6 flex items-center justify-between gap-4">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onShare(c, idx);
                                }}
                                className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2 font-meta text-sm tracking-wide text-primary-foreground transition hover:opacity-90"
                              >
                                <span>把这枚词做成卡片</span>
                                <span>→</span>
                              </button>
                              <span className="font-meta text-[11px] uppercase tracking-[0.24em] text-ink-soft">
                                点一下收起 ↑
                              </span>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <AnimatePresence initial={false} mode="popLayout">
                        {!isOpen && (
                          <motion.div
                            key="brief"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                          >
                            <div className="mt-4 hairline" />
                            <p className="mt-3 font-cn text-sm text-ink-soft">— {c.note}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.li>
                  );
                })}
              </ul>
            </LayoutGroup>
          </MotionConfig>
        )}

        <div className="mt-20 text-center font-meta text-xs leading-none text-ink-soft">
          有词可栖 · 一本为情绪做的小词典
        </div>
        <div className="mt-2 text-center font-meta text-[10px] leading-none text-ink-soft/60">
          skill expression-precision 作者 Yang Sichang · skill shuorenhua 作者 MrGeDiao
        </div>
      </section>
    </div>
  );
}

function DefRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-2 py-3 sm:grid-cols-[140px_1fr] sm:gap-8">
      <div className="font-meta text-[11px] uppercase tracking-[0.24em] text-ink-soft">
        {label}
      </div>
      <p className="font-cn text-base leading-[1.85] text-foreground">{children}</p>
    </div>
  );
}
