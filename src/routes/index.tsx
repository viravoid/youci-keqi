import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { addHistoryEntry, findHistoryEntry, setSavedWord, toggleSavedWord } from "@/lib/localHistory";
import { buildSilentPrecisionContext } from "@/lib/expressionPrecision";
import { matchWord, matchWordStream, quickMatch, type MatchProgress } from "@/lib/matchWord";
import { saveFeedback as logFeedback } from "@/lib/feedbackLog";
import { SAMPLE, saveLastWord, toWordResult, type WordResult } from "@/lib/word-store";
import { DepthBackground } from "@/components/DepthBackground";
import type { SavedWordEntry, SceneTag, WordMatchResult } from "@/types/wordMatch";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "有词可栖 · 给说不清的感受，一个可以停靠的词" },
      {
        name: "description",
        content:
          "输入一段难以言说的感受，AI 从多语言词库中为你寻得一枚最贴切的外语词。",
      },
      { property: "og:title", content: "有词可栖" },
      {
        property: "og:description",
        content: "给说不清的感受，一个可以停靠的词。",
      },
    ],
  }),
  component: Index,
});

// (scene tag picker removed — keep the composer quiet and uncluttered.)

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0 },
};

function inferScene(text: string): SceneTag {
  const normalized = text.toLocaleLowerCase();
  const sceneSignals: Array<[SceneTag, string[]]> = [
    ["书影音余韵", ["电影", "书", "歌", "音乐", "演出", "作品", "影院", "散场", "movie", "music", "book"]],
    ["亲密关系", ["喜欢", "恋人", "分手", "暧昧", "亲密", "拥抱", "想念他", "想念她", "相处", "对方", "陌生感", "抵触感", "relationship"]],
    ["友情家庭", ["朋友", "家人", "妈妈", "爸爸", "父母", "家庭", "同学", "friend", "family"]],
    ["工作学业", ["工作", "老板", "同事", "考试", "作业", "论文", "项目", "deadline", "work", "school"]],
    ["日常瞬间", ["阳光", "雨", "地铁", "路上", "窗", "咖啡", "夜晚", "清晨", "daily"]],
  ];

  return sceneSignals.find(([, words]) =>
    words.some((word) => normalized.includes(word)),
  )?.[0] ?? "自我追问";
}

function Index() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<WordResult | null>(null);
  const [resultEntry, setResultEntry] = useState<SavedWordEntry | null>(null);
  const [revealWord, setRevealWord] = useState<WordResult>(SAMPLE);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loadingMessage, setLoadingMessage] = useState("先把这段感受拆成线索");
  const [revealing, setRevealing] = useState(false);
  // Pre-search states
  const [quickSuggestion, setQuickSuggestion] = useState<WordResult | null>(null);
  const [preSearching, setPreSearching] = useState(false);
  const preSearchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastPreSearchText = useRef("");
  const resultRef = useRef<HTMLDivElement>(null);

  const completeMatch = async (
    userText: string,
    scene: SceneTag,
  ) => {
    setLoading(true);
    setLoadingMessage("先把这段感受拆成线索");
    try {
      const silentCtx = buildSilentPrecisionContext(userText, scene);
      const matched = await matchWordStream(
        { userText, scene, excludedWord: result?.word, precisionContext: silentCtx },
        {
          onProgress: (p: MatchProgress) => {
            setLoadingMessage(p.message);
          },
        },
      );

      if (!matched) throw new Error("未能获取匹配结果。");

      const entry = addHistoryEntry(matched, userText, scene);
      const withInput = toWordResult(entry, userText, entry.seq);
      setRevealWord(withInput);
      setLoading(false);
      setRevealing(true);

      setTimeout(() => {
        setResult(withInput);
        setResultEntry(entry);
        saveLastWord(withInput);
        requestAnimationFrame(() => {
          resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
        setTimeout(() => setRevealing(false), 700);
      }, 1700);
    } catch (err) {
      console.error("matchWord failed:", err);
      const msg = err instanceof Error ? err.message : "匹配失败，请稍后再试";
      setErrorMessage(msg);
      setLoading(false);
      setRevealing(false);
    }
  };

  // Debounced pre-search: fires 500ms after user stops typing
  const doPreSearch = useCallback(
    async (searchText: string, scene: SceneTag) => {
      if (searchText === lastPreSearchText.current) return;
      lastPreSearchText.current = searchText;

      setPreSearching(true);
      try {
        const silentCtx = buildSilentPrecisionContext(searchText, scene);
        const qr = await quickMatch({ userText: searchText, scene, precisionContext: silentCtx });
        if (qr && searchText === lastPreSearchText.current) {
          const entry = addHistoryEntry(qr, searchText, scene);
          setQuickSuggestion(toWordResult(entry, searchText, entry.seq));
        }
      } catch {
        // pre-search failure is silent
      } finally {
        setPreSearching(false);
      }
    },
    [],
  );

  const onTextChange = (value: string) => {
    setText(value);
    setQuickSuggestion(null);

    // Clear any pending pre-search
    if (preSearchTimer.current) {
      clearTimeout(preSearchTimer.current);
    }

    const trimmed = value.trim();
    if (trimmed.length >= 12) {
      preSearchTimer.current = setTimeout(() => {
        const scene = inferScene(trimmed);
        doPreSearch(trimmed, scene);
      }, 500);
    }
  };

  const onSubmit = async () => {
    const userText = text.trim();
    if (!userText) return;

    const scene = inferScene(userText);
    await completeMatch(userText, scene);
  };

  const keepAlternative = (
    alternative: WordResult["alternatives"][number],
    detail?: { shortMeaning: string; whyItFits: string; cultureNote: string; shareCopy: string },
  ) => {
    if (!resultEntry) return;

    const nextMatch: WordMatchResult = {
      word: alternative.word,
      language: alternative.language,
      pronunciation: "",
      shortMeaning: detail?.shortMeaning ?? alternative.hint,
      whyItFits: detail?.whyItFits ?? `你选择了这个备选词作为更贴切的表达：${alternative.hint}`,
      cultureNote: detail?.cultureNote ?? "这是本次匹配里的备选词。",
      shareCopy: detail?.shareCopy ?? `${alternative.word}：${alternative.hint}`,
      alternatives: [
        {
          word: resultEntry.word,
          language: resultEntry.language,
          reason: "原先推荐的主词。",
        },
        ...resultEntry.alternatives.filter(
          (item) =>
            item.word !== alternative.word || item.language !== alternative.language,
        ),
      ].slice(0, 3),
    };

    const existingEntry = findHistoryEntry(
      nextMatch.word,
      nextMatch.language,
      resultEntry.userText,
      resultEntry.scene,
    );
    setSavedWord(
      existingEntry ?? addHistoryEntry(nextMatch, resultEntry.userText, resultEntry.scene),
      true,
    );
  };

  return (
    <div className="relative min-h-screen overflow-x-clip">
      <DepthBackground zoom={revealing ? 1 : 0} />
      {/* Top masthead */}
      <motion.header
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.08 } } }}
        className="relative z-10 mx-auto max-w-3xl px-6 pt-10 sm:pt-14"
      >
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="flex items-center justify-between font-meta text-[11px] uppercase tracking-[0.28em] text-ink-soft"
        >
          <span>No. 001</span>
          <span className="hidden sm:inline">A Lexicon for Feelings</span>
          <span>Vol. I</span>
        </motion.div>

        <motion.div
          variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1 } }}
          transition={{ duration: 0.85, ease: "easeOut" }}
          style={{ transformOrigin: "left" }}
          className="mt-6 hairline"
        />

        <motion.h1
          variants={fadeUp}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mt-8 font-serif text-5xl leading-[1.05] tracking-tight text-foreground sm:text-6xl"
        >
          有词可栖
        </motion.h1>

        <motion.p
          variants={fadeUp}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mt-4 max-w-xl font-cn text-base leading-relaxed text-ink-soft sm:text-lg"
        >
          给说不清的感受，<br className="sm:hidden" />
          一个可以停靠的词。
        </motion.p>

        <motion.div
          variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1 } }}
          transition={{ duration: 0.85, ease: "easeOut", delay: 0.1 }}
          style={{ transformOrigin: "left" }}
          className="mt-8 hairline"
        />
      </motion.header>

      {/* Composer */}
      <motion.section
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut", delay: 0.28 }}
        className="relative z-10 mx-auto mt-8 max-w-3xl px-6"
      >
        <div className="flex items-center justify-between gap-4">
          <label className="block font-meta text-[11px] uppercase tracking-[0.24em] text-ink-soft">
            写下此刻的感受
          </label>
        </div>
        <div className="group mt-3 rounded-md border border-border bg-card shadow-[0_1px_0_rgba(0,0,0,0.02),0_20px_40px_-30px_rgba(60,40,20,0.25)] transition focus-within:border-foreground/40 focus-within:shadow-[0_1px_0_rgba(0,0,0,0.02),0_30px_60px_-30px_rgba(60,40,20,0.4)]">
          <textarea
            value={text}
            onChange={(e) => onTextChange(e.target.value)}
            placeholder="例如：明明很久没见了，却在一首歌响起的瞬间，整个人被拽回那个夏天的下午……"
            rows={6}
            className="block w-full resize-none rounded-md bg-transparent p-5 font-cn text-lg leading-relaxed text-foreground placeholder:text-ink-soft/60 focus:outline-none"
          />
          <div className="flex items-center justify-between border-t border-border px-5 py-2.5 text-xs text-ink-soft">
            <span className="font-cn tracking-wide">
              {text.length} 字 · 中文 / English 皆可
            </span>
            <span className="font-cn">— 你的便签</span>
          </div>
        </div>

        {/* Quick-match pre-search suggestion */}
        <AnimatePresence>
          {quickSuggestion && !loading && !result ? (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="mt-3 rounded-md border border-border/60 bg-card/60 px-4 py-3"
            >
              <div className="flex items-center gap-3">
                {preSearching ? (
                  <span className="font-cn text-xs text-ink-soft">正在预感…</span>
                ) : (
                  <>
                    <span className="font-cn text-[11px] uppercase tracking-[0.2em] text-ink-soft">
                      预感
                    </span>
                    <span className="font-serif text-lg leading-none text-foreground">
                      {quickSuggestion.word}
                    </span>
                    <span className="font-cn text-xs text-ink-soft">
                      {quickSuggestion.language} · {quickSuggestion.meaning?.slice(0, 24)}
                    </span>
                  </>
                )}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        {/* Scene tag picker removed for a quieter composer. */}

        {/* Primary action */}
        <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <motion.button
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.97 }}
            onClick={onSubmit}
            disabled={!text.trim() || loading || revealing}
            className="group inline-flex h-[52px] items-center gap-3 whitespace-nowrap rounded-full bg-foreground px-7 font-meta text-base leading-none tracking-wide text-primary-foreground transition hover:opacity-90 disabled:opacity-40"
          >
            <span>{loading ? "正在为你寻词…" : "找到我的词"}</span>
            <motion.span
              animate={loading ? { x: [0, 4, 0] } : { x: 0 }}
              transition={{
                repeat: loading ? Infinity : 0,
                duration: 1.1,
                ease: "easeInOut",
              }}
            >
              →
            </motion.span>
          </motion.button>
        </div>
        <AnimatePresence>
          {loading ? <LoadingTrace message={loadingMessage} /> : null}
        </AnimatePresence>
        <AnimatePresence>
          {errorMessage ? (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="mt-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 font-cn text-sm text-red-700"
            >
              {errorMessage}
              <button
                onClick={() => setErrorMessage(null)}
                className="ml-3 underline hover:text-red-900"
              >
                关闭
              </button>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.section>

      {/* Result card */}
      <section
        ref={resultRef}
        className="relative z-10 mx-auto mt-16 max-w-3xl px-6 pb-16"
      >
        <AnimatePresence mode="wait">
          {result ? (
            <ResultCard
              key={result.seq ?? result.word}
              data={result}
              entry={resultEntry}
              onAlternativeConfirm={keepAlternative}
            />
          ) : (
            <EmptyShelf key="empty" />
          )}
        </AnimatePresence>
      </section>

      {/* Footer with link to harbor */}
      <section className="relative z-10 mx-auto max-w-3xl px-6 pb-24">
        <div className="hairline" />
        <div className="mt-6 flex items-center justify-between">
          <Link
            to="/harbor"
            className="group inline-flex items-baseline gap-3 font-meta text-base leading-none text-foreground"
          >
            <span className="underline decoration-border decoration-1 underline-offset-[6px] transition group-hover:decoration-foreground">
              翻看你停靠过的词
            </span>
            <span className="font-meta text-[11px] uppercase tracking-[0.24em] text-ink-soft transition group-hover:translate-x-0.5">
              Harbor →
            </span>
          </Link>
        </div>

        <div className="mt-20 text-center font-meta text-xs leading-none text-ink-soft">
          有词可栖 · 一本为情绪做的小词典
        </div>
        <div className="mt-2 text-center font-meta text-[10px] leading-none text-ink-soft/60">
          skill expression-precision 作者 Yang Sichang · skill shuorenhua 作者 MrGeDiao
        </div>
      </section>

      {/* Reveal overlay — its word morphs (via shared layoutId) onto the result card's heading when it exits. */}
      <AnimatePresence>
        {revealing && <RevealOverlay word={revealWord} />}
      </AnimatePresence>

    </div>
  );
}

function LoadingTrace({ message }: { message: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className="mt-5 overflow-hidden rounded-md border border-border bg-card px-4 py-4 shadow-[0_18px_45px_-32px_rgba(60,40,20,0.5)]"
    >
      <div className="flex items-center gap-3">
        <div className="relative h-9 w-9 shrink-0">
          <motion.span
            className="absolute inset-0 rounded-full border border-foreground/20"
            animate={{ scale: [1, 1.2, 1], opacity: [0.9, 0.35, 0.9] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.span
            className="absolute left-1/2 top-1/2 h-2 w-2 rounded-full bg-foreground"
            style={{ marginLeft: -4, marginTop: -4 }}
            animate={{ y: [0, -9, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <div className="min-w-0 flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={message}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.32, ease: "easeOut" }}
              className="font-cn text-sm font-medium leading-6 text-foreground"
            >
              {message}
            </motion.div>
          </AnimatePresence>
          <div className="mt-2 h-px w-full rounded-full bg-foreground/10">
            <motion.div
              className="h-px rounded-full bg-foreground/40"
              animate={{ width: ["0%", "100%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function EmptyShelf() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="rounded-md border border-dashed border-border bg-card/40 px-6 py-8 text-center"
    >
    </motion.div>
  );
}

function RevealOverlay({ word }: { word: WordResult }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-paper/95 backdrop-blur-sm"
      style={{
        backgroundImage:
          "radial-gradient(oklch(0.85 0.02 80 / 0.18) 1px, transparent 1px), radial-gradient(oklch(0.78 0.02 60 / 0.10) 1px, transparent 1px)",
        backgroundSize: "3px 3px, 7px 7px",
      }}
    >
      <div className="px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="font-meta text-[11px] uppercase tracking-[0.4em] text-ink-soft"
        >
          为你寻得一枚词
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
          style={{ transformOrigin: "center" }}
          className="mx-auto mt-6 h-px w-24 bg-rule"
        />

        {/* The word itself — shared layoutId lets it morph onto the result card. */}
        <motion.h2
          layoutId="hero-word"
          initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.5, duration: 0.9, ease: [0.16, 0.84, 0.24, 1] }}
          className="mt-8 break-words font-serif text-6xl leading-none tracking-tight text-foreground sm:text-8xl"
        >
          {word.word}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 1.0, duration: 0.5 }}
          className="mt-6 font-meta text-xs uppercase tracking-[0.32em] text-ink-soft"
        >
          {word.language} · {word.pronunciation}
        </motion.div>
      </div>
    </motion.div>
  );
}

function ResultCard({
  data,
  entry,
  onAlternativeConfirm,
}: {
  data: WordResult;
  entry: SavedWordEntry | null;
  onAlternativeConfirm: (
    alternative: WordResult["alternatives"][number],
    detail?: { shortMeaning: string; whyItFits: string; cultureNote: string; shareCopy: string },
  ) => void;
}) {
  const navigate = useNavigate();
  const [kept, setKept] = useState(false);
  const [pendingAlternative, setPendingAlternative] = useState<
    WordResult["alternatives"][number] | null
  >(null);
  const [altDetail, setAltDetail] = useState<
    { shortMeaning: string; whyItFits: string; cultureNote: string; shareCopy: string } | null
  >(null);
  const [altLoading, setAltLoading] = useState(false);
  const [savedAlternativeKey, setSavedAlternativeKey] = useState<string | null>(null);
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };

  useEffect(() => {
    setKept(entry?.saved ?? false);
    setPendingAlternative(null);
    setAltDetail(null);
    setAltLoading(false);
    setSavedAlternativeKey(null);
  }, [entry?.id, entry?.saved]);

  const handleAltClick = (a: WordResult["alternatives"][number]) => {
    if (pendingAlternative?.word === a.word && pendingAlternative.language === a.language) {
      setPendingAlternative(null);
      setAltDetail(null);
      setAltLoading(false);
      return;
    }

    setPendingAlternative(a);
    setAltDetail(null);
    setAltLoading(true);
    const userText = entry ? ((entry as { userText?: string }).userText ?? "") : "";
    const scene = entry?.scene ?? "";
    fetch("/api/alternative-detail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        word: a.word,
        language: a.language,
        userText,
        scene,
      }),
    })
      .then((r) => r.json())
      .then((d) => {
        if (d.error) throw new Error(d.error);
        setAltDetail(d);
      })
      .catch(() => setAltDetail(null))
      .finally(() => setAltLoading(false));
  };

  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.7, filter: "blur(18px)", y: 30 }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)", y: 0 }}
      exit={{ opacity: 0, scale: 0.96, filter: "blur(6px)", y: 12 }}
      transition={{ duration: 1.1, ease: [0.16, 0.84, 0.24, 1] }}
      className="relative min-w-0 overflow-hidden rounded-md border border-border bg-card p-8 shadow-[0_30px_60px_-40px_rgba(60,40,20,0.35)] sm:p-12"
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div
          variants={fadeUp}
          className="flex items-start justify-between gap-4"
        >
          <span className="font-meta text-[11px] uppercase tracking-[0.28em] text-ink-soft">
            为你寻得 · A Word For You
          </span>
          <button
            onClick={() => {
              setKept((v) => !v);
              if (entry) {
                toggleSavedWord(entry);
              }
            }}
            aria-label={kept ? "已留下" : "想留下这枚词"}
            className={
              "inline-flex items-center gap-2 rounded-full border px-3 py-1 font-cn text-xs transition " +
              (kept
                ? "border-foreground text-foreground"
                : "border-border text-ink-soft hover:border-foreground hover:text-foreground")
            }
          >
            <span className="font-serif text-base leading-none">
              {kept ? "❥" : "♡"}
            </span>
            <span>{kept ? "已留下" : "想留下"}</span>
          </button>
        </motion.div>

        <motion.h2
          layoutId="hero-word"
          transition={{ duration: 0.9, ease: [0.16, 0.84, 0.24, 1] }}
          className="mt-4 break-words font-serif text-6xl leading-none tracking-tight text-foreground sm:text-7xl"
        >
          {data.word}
        </motion.h2>

        <motion.div
          variants={fadeUp}
          className="mt-4 flex flex-wrap items-baseline gap-x-6 gap-y-1 font-sans text-sm text-ink-soft"
        >
          <span>{data.language}</span>
          <span className="font-serif">{data.pronunciation}</span>
        </motion.div>

        <motion.div variants={fadeUp} className="my-8 hairline" />

        <motion.div variants={fadeUp}>
          <DefRow label="中文含义">{data.meaning}</DefRow>
        </motion.div>
        <motion.div variants={fadeUp}>
          <DefRow label="为什么适合你">{data.whyForYou}</DefRow>
        </motion.div>
        <motion.div variants={fadeUp}>
          <DefRow label="文化说明">{data.culture}</DefRow>
        </motion.div>

        {/* Alternatives */}
        <motion.div variants={fadeUp} className="mt-10">
          <div className="font-meta text-[11px] uppercase tracking-[0.24em] text-ink-soft">
            备选词 · Adjacent Words
          </div>
          {data.alternatives.length > 0 ? (
            <ul className="mt-4 divide-y divide-border border-y border-border">
              {data.alternatives.map((a) => (
                <li
                  key={`${a.language}-${a.word}`}
                  className="py-3"
                >
                  <button
                    type="button"
                    onClick={() => handleAltClick(a)}
                    className="flex w-full min-w-0 flex-col gap-1 text-left transition hover:bg-note/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 sm:flex-row sm:items-baseline sm:gap-6"
                  >
                    <span className="min-w-0 break-words font-serif text-xl text-foreground sm:min-w-[140px]">
                      {a.word}
                    </span>
                    <span className="min-w-0 break-words font-meta text-[11px] uppercase tracking-[0.2em] text-ink-soft sm:min-w-[88px]">
                      {a.language}
                    </span>
                    <span className="break-words font-cn text-sm text-ink-soft">{a.hint}</span>
                  </button>
                  {pendingAlternative?.word === a.word &&
                  pendingAlternative.language === a.language ? (
                    <div
                      className="mt-3 rounded-md border border-border bg-note/70 p-4"
                      onClick={(event) => event.stopPropagation()}
                      onPointerDown={(event) => event.stopPropagation()}
                    >
                      {altLoading ? (
                        <p className="font-cn text-sm text-ink-soft">正在查找「{a.word}」的详情…</p>
                      ) : altDetail ? (
                        <>
                          <div className="space-y-3">
                            <div>
                              <span className="font-meta text-[10px] uppercase tracking-[0.2em] text-ink-soft">中文含义</span>
                              <p className="mt-1 font-cn text-sm text-foreground">{altDetail.shortMeaning}</p>
                            </div>
                            <div>
                              <span className="font-meta text-[10px] uppercase tracking-[0.2em] text-ink-soft">为什么适合你</span>
                              <p className="mt-1 font-cn text-sm text-foreground">{altDetail.whyItFits}</p>
                            </div>
                            <div>
                              <span className="font-meta text-[10px] uppercase tracking-[0.2em] text-ink-soft">文化说明</span>
                              <p className="mt-1 font-cn text-sm text-foreground">{altDetail.cultureNote}</p>
                            </div>
                          </div>
                          <div className="mt-4 hairline" />
                          <p className="mt-3 font-cn text-sm text-foreground">
                            如果你觉得它也说中了，可以把「{a.word}」额外留下，不会替换当前这枚词。
                          </p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            <button
                              type="button"
                              onClick={(event) => {
                                event.preventDefault();
                                event.stopPropagation();
                                onAlternativeConfirm(a, altDetail);
                                setSavedAlternativeKey(`${a.language}-${a.word}`);
                              }}
                              onPointerDown={(event) => event.stopPropagation()}
                              className="inline-flex h-8 items-center rounded-full bg-foreground px-4 font-cn text-xs text-primary-foreground transition hover:opacity-90"
                            >
                              {savedAlternativeKey === `${a.language}-${a.word}` ? "已留下这个词" : "也留下这个词"}
                            </button>
                            <button
                              type="button"
                              onClick={(event) => {
                                event.preventDefault();
                                event.stopPropagation();
                                setPendingAlternative(null);
                                setAltDetail(null);
                                setAltLoading(false);
                              }}
                              onPointerDown={(event) => {
                                event.preventDefault();
                                event.stopPropagation();
                              }}
                              className="inline-flex h-8 items-center rounded-full border border-border px-4 font-cn text-xs text-ink-soft transition hover:border-foreground hover:text-foreground"
                            >
                              先不留
                            </button>
                          </div>
                        </>
                      ) : (
                        <div>
                          <p className="font-cn text-sm text-red-700">获取详情失败</p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            <button
                              type="button"
                              onClick={() => setPendingAlternative(null)}
                              className="inline-flex h-8 items-center rounded-full border border-border px-4 font-cn text-xs text-ink-soft transition hover:border-foreground hover:text-foreground"
                            >
                              关闭
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : null}
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-4 border-y border-border py-4 font-cn text-sm text-ink-soft">
              没有其他合适的选择
            </div>
          )}
          <FeedbackButtons data={data} entry={entry} />
        </motion.div>

        {/* Share CTA */}
        <motion.div variants={fadeUp} className="mt-10 rounded-md bg-note p-6">
          <div className="font-meta text-[11px] uppercase tracking-[0.24em] text-ink-soft">
            分享卡片文案
          </div>
          <p className="mt-3 break-words whitespace-pre-line font-serif text-lg leading-relaxed text-foreground">
            {data.shareText}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <motion.button
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate({ to: "/share" })}
              className="inline-flex h-9 items-center gap-2 whitespace-nowrap rounded-full bg-foreground px-5 font-meta text-sm leading-none tracking-wide text-primary-foreground transition hover:opacity-90"
            >
              <span>去做一张分享卡</span>
              <span>→</span>
            </motion.button>
            <button
              onClick={() => navigator.clipboard?.writeText(data.shareText)}
              className="inline-flex h-9 items-center whitespace-nowrap rounded-full border border-border px-4 font-meta text-sm leading-none tracking-wide text-ink-soft transition hover:border-foreground hover:text-foreground"
            >
              复制文案
            </button>
          </div>
        </motion.div>
      </motion.div>
    </motion.article>
  );
}

function DefRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 gap-2 py-4 sm:grid-cols-[160px_1fr] sm:gap-8">
      <div className="font-meta text-[11px] uppercase tracking-[0.24em] text-ink-soft">
        {label}
      </div>
      <p className="break-words font-cn text-base leading-[1.85] text-foreground">
        {children}
      </p>
    </div>
  );
}

function FeedbackButtons({
  data,
  entry,
}: {
  data: WordResult;
  entry: SavedWordEntry | null;
}) {
  const [rating, setRating] = useState<"准" | "不准" | null>(null);
  const userText = entry ? ((entry as { userText?: string }).userText ?? "") : "";

  useEffect(() => {
    if (typeof window === "undefined" || !userText) {
      setRating(null);
      return;
    }

    try {
      const raw = window.localStorage.getItem("ycqx:feedback");
      if (!raw) {
        setRating(null);
        return;
      }

      const parsed = JSON.parse(raw) as {
        word?: string;
        userText?: string;
        rating?: "准" | "不准";
      };

      if (parsed.word === data.word && parsed.userText === userText) {
        setRating(parsed.rating ?? null);
      } else {
        setRating(null);
      }
    } catch {
      setRating(null);
    }
  }, [data.word, userText]);

  const saveFeedback = (nextRating: "准" | "不准") => {
    if (typeof window === "undefined") return;

    if (entry) {
      logFeedback(data, userText, entry.scene, nextRating);
    }

    const payload = {
      word: data.word,
      userText,
      rating: nextRating,
      timestamp: new Date().toISOString(),
    };

    window.localStorage.setItem("ycqx:feedback", JSON.stringify(payload));
    setRating(nextRating);
  };

  return (
    <div className="mt-4 flex items-center gap-2">
      <span className="font-meta text-[11px] uppercase tracking-[0.24em] text-ink-soft">
        反馈
      </span>
      <button
        type="button"
        aria-pressed={rating === "准"}
        onClick={() => saveFeedback("准")}
        className={
          "inline-flex h-7 items-center gap-1.5 rounded-full border px-3 font-cn text-xs transition " +
          (rating === "准"
            ? "border-foreground text-foreground"
            : "border-border text-ink-soft hover:border-foreground hover:text-foreground")
        }
      >
        <span aria-hidden="true" className="text-sm leading-none">
          {rating === "准" ? "●" : "○"}
        </span>
        <span>准</span>
      </button>
      <button
        type="button"
        aria-pressed={rating === "不准"}
        onClick={() => saveFeedback("不准")}
        className={
          "inline-flex h-7 items-center gap-1.5 rounded-full border px-3 font-cn text-xs transition " +
          (rating === "不准"
            ? "border-foreground text-foreground"
            : "border-border text-ink-soft hover:border-foreground hover:text-foreground")
        }
      >
        <span aria-hidden="true" className="text-sm leading-none">
          {rating === "不准" ? "●" : "○"}
        </span>
        <span>不准</span>
      </button>
    </div>
  );
}
