import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { addHistoryEntry, toggleSavedWord } from "@/lib/localHistory";
import {
  auditExpressionInput,
  buildPrecisionContext,
  type ExpressionAudit,
} from "@/lib/expressionPrecision";
import { matchWord } from "@/lib/matchWord";
import { SAMPLE, saveLastWord, toWordResult, type WordResult } from "@/lib/word-store";
import { Intro } from "@/components/Intro";
import { DepthBackground } from "@/components/DepthBackground";
import { demoCases } from "@/lib/demoCases";
import type { SavedWordEntry, SceneTag } from "@/types/wordMatch";

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
  const [expressionAudit, setExpressionAudit] = useState<ExpressionAudit | null>(null);
  const [pendingSubmission, setPendingSubmission] = useState<{
    userText: string;
    scene: SceneTag;
  } | null>(null);
  const [selectedPrecisionIds, setSelectedPrecisionIds] = useState<string[]>([]);
  const [precisionSupplement, setPrecisionSupplement] = useState("");
  const [loading, setLoading] = useState(false);
  const [revealing, setRevealing] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const resetPrecisionPrompt = () => {
    setExpressionAudit(null);
    setPendingSubmission(null);
    setSelectedPrecisionIds([]);
    setPrecisionSupplement("");
  };

  const completeMatch = async (
    userText: string,
    scene: SceneTag,
    precisionContext = "",
  ) => {
    setLoading(true);
    try {
      const matched = await matchWord({
        userText,
        scene,
        excludedWord: result?.word,
        precisionContext,
      });
      const entry = addHistoryEntry(matched, userText, scene);
      const withInput = toWordResult(entry, userText, entry.seq);
      setRevealWord(withInput);
      setLoading(false);
      setRevealing(true);

      // After the word has bloomed in the overlay, mount the result card,
      // smoothly scroll it into view, then let the overlay fade so the
      // hero word morphs (via shared layoutId) onto the card's heading.
      setTimeout(() => {
        setResult(withInput);
        setResultEntry(entry);
        saveLastWord(withInput);
        requestAnimationFrame(() => {
          resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
        setTimeout(() => setRevealing(false), 700);
      }, 1700);
    } catch {
      setLoading(false);
      setRevealing(false);
    }
  };

  const onSubmit = async () => {
    const userText = text.trim();
    if (!userText) return;

    const scene = inferScene(userText);
    const audit = auditExpressionInput(userText, scene);
    const shouldOpenPrecisionPrompt =
      audit.shouldClarify ||
      (audit.fuzzyPoints.length > 0 && userText.length > 0 && userText.length <= 12);

    if (shouldOpenPrecisionPrompt) {
      setExpressionAudit(audit);
      setPendingSubmission({ userText, scene });
      setSelectedPrecisionIds([]);
      setPrecisionSupplement("");
      return;
    }

    await completeMatch(userText, scene);
  };

  const togglePrecisionOption = (optionId: string) => {
    setSelectedPrecisionIds((current) => {
      if (optionId === "none-of-above") {
        return current.includes(optionId) ? [] : [optionId];
      }

      const withoutNone = current.filter((id) => id !== "none-of-above");
      return withoutNone.includes(optionId)
        ? withoutNone.filter((id) => id !== optionId)
        : [...withoutNone, optionId];
    });
  };

  const confirmPrecisionPrompt = async () => {
    if (!pendingSubmission || !expressionAudit) return;

    const selectedOptions = expressionAudit.options.filter((option) =>
      selectedPrecisionIds.includes(option.id),
    );
    const skippedPrecision =
      selectedOptions.length === 0 ||
      selectedOptions.some((option) => option.id === "none-of-above");
    const precisionContext = skippedPrecision
      ? ""
      : buildPrecisionContext(selectedOptions, precisionSupplement);

    resetPrecisionPrompt();
    await completeMatch(pendingSubmission.userText, pendingSubmission.scene, precisionContext);
  };

  const skipPrecisionPrompt = async () => {
    if (!pendingSubmission) {
      resetPrecisionPrompt();
      return;
    }

    const submission = pendingSubmission;
    resetPrecisionPrompt();
    await completeMatch(submission.userText, submission.scene);
  };

  const { scrollY } = useScroll();
  const headerY = useTransform(scrollY, [0, 600], [0, -40]);
  const headerOpacity = useTransform(scrollY, [0, 400], [1, 0.55]);

  return (
    <div className="relative min-h-screen">
      <Intro />
      <DepthBackground zoom={revealing ? 1 : 0} />
      {/* Top masthead */}
      <motion.header
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.08 } } }}
        style={{ y: headerY, opacity: headerOpacity }}
        className="relative z-10 mx-auto max-w-3xl px-6 pt-12 sm:pt-20"
      >
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex items-center justify-between font-meta text-[11px] uppercase tracking-[0.28em] text-ink-soft"
        >
          <span>No. 001</span>
          <span className="hidden sm:inline">A Lexicon for Feelings</span>
          <span>Vol. I</span>
        </motion.div>

        <motion.div
          variants={{
            hidden: { scaleX: 0 },
            show: { scaleX: 1 },
          }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          style={{ transformOrigin: "left" }}
          className="mt-6 hairline"
        />

        <motion.h1
          variants={fadeUp}
          transition={{ duration: 0.8, ease: "easeOut" }}
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
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
          style={{ transformOrigin: "left" }}
          className="mt-8 hairline"
        />
      </motion.header>

      {/* Composer */}
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.45 }}
        className="relative z-10 mx-auto mt-10 max-w-3xl px-6"
      >
        <div className="flex items-center justify-between gap-4">
          <label className="block font-meta text-[11px] uppercase tracking-[0.24em] text-ink-soft">
            写下此刻的感受
          </label>
          <button
            type="button"
            onClick={() => {
              const index = Math.floor(Math.random() * demoCases.length);
              setText(demoCases[index] ?? "");
            }}
            className="inline-flex shrink-0 items-center gap-1 font-meta text-[11px] uppercase tracking-[0.22em] text-ink-soft underline decoration-border decoration-1 underline-offset-4 transition hover:text-foreground"
          >
            试试示例
          </button>
        </div>
        <div className="group mt-3 rounded-md border border-border bg-card shadow-[0_1px_0_rgba(0,0,0,0.02),0_20px_40px_-30px_rgba(60,40,20,0.25)] transition focus-within:border-foreground/40 focus-within:shadow-[0_1px_0_rgba(0,0,0,0.02),0_30px_60px_-30px_rgba(60,40,20,0.4)]">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
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
          <p className="font-serif text-sm text-ink-soft">
            「每一种感受，都值得一个名字。」
          </p>
        </div>
      </motion.section>

      {/* Result card */}
      <section
        ref={resultRef}
        className="relative z-10 mx-auto mt-16 max-w-3xl px-6 pb-16"
      >
        <AnimatePresence mode="wait">
          {result ? (
            <ResultCard key={result.seq ?? result.word} data={result} entry={resultEntry} />
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
      </section>

      {/* Reveal overlay — its word morphs (via shared layoutId) onto the result card's heading when it exits. */}
      <AnimatePresence>
        {revealing && <RevealOverlay word={revealWord} />}
      </AnimatePresence>

      <AnimatePresence>
        {expressionAudit ? (
          <PrecisionPrompt
            audit={expressionAudit}
            selectedIds={selectedPrecisionIds}
            supplement={precisionSupplement}
            onToggleOption={togglePrecisionOption}
            onSupplementChange={setPrecisionSupplement}
            onSkip={skipPrecisionPrompt}
            onConfirm={confirmPrecisionPrompt}
          />
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function PrecisionPrompt({
  audit,
  selectedIds,
  supplement,
  onToggleOption,
  onSupplementChange,
  onSkip,
  onConfirm,
}: {
  audit: ExpressionAudit;
  selectedIds: string[];
  supplement: string;
  onToggleOption: (optionId: string) => void;
  onSupplementChange: (value: string) => void;
  onSkip: () => Promise<void>;
  onConfirm: () => Promise<void>;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-foreground/20 px-4 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.98 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="w-full max-w-2xl rounded-md border border-border bg-card p-6 shadow-[0_30px_80px_-40px_rgba(60,40,20,0.45)] sm:p-8"
      >
        <div className="font-meta text-[11px] uppercase tracking-[0.24em] text-ink-soft">
          再补两笔，会更准
        </div>
        <h2 className="mt-3 font-serif text-3xl leading-tight text-foreground sm:text-4xl">
          这段感受还有点宽，我们先缩小一点范围。
        </h2>

        {(audit.fuzzyPoints.length > 0 || audit.missingSignals.length > 0) && (
          <div className="mt-5 space-y-2 rounded-md bg-note/60 p-4 font-cn text-sm leading-7 text-foreground">
            {audit.fuzzyPoints.map((point) => (
              <p key={point}>{point}</p>
            ))}
            {audit.missingSignals.map((signal) => (
              <p key={signal}>{signal}</p>
            ))}
          </div>
        )}

        <p className="mt-5 font-cn text-sm leading-7 text-ink-soft">
          先勾几个更接近的方向，也可以直接补一句更具体的事实。
        </p>

        <div className="mt-5 grid gap-3">
          {audit.options.map((option) => {
            const selected = selectedIds.includes(option.id);
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => onToggleOption(option.id)}
                className={
                  "rounded-md border p-4 text-left transition " +
                  (selected
                    ? "border-foreground bg-note/70"
                    : "border-border bg-paper/50 hover:border-foreground/50")
                }
              >
                <div className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className={
                      "mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full border text-xs " +
                      (selected
                        ? "border-foreground bg-foreground text-primary-foreground"
                        : "border-border text-transparent")
                    }
                  >
                    ✓
                  </span>
                  <div>
                    <div className="font-cn text-base leading-7 text-foreground">
                      {option.label}
                    </div>
                    <p className="mt-1 font-cn text-sm leading-6 text-ink-soft">
                      {option.detail}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-5">
          <label className="font-meta text-[11px] uppercase tracking-[0.24em] text-ink-soft">
            再补一句具体的
          </label>
          <p className="mt-2 font-cn text-sm leading-6 text-ink-soft">
            {audit.memoryPrompt}
          </p>
          <textarea
            value={supplement}
            onChange={(e) => onSupplementChange(e.target.value)}
            placeholder="比如：他当时说了什么，或者你身体上先出现了什么反应。"
            rows={4}
            className="mt-3 block w-full resize-none rounded-md border border-border bg-paper/70 p-4 font-cn text-base leading-relaxed text-foreground placeholder:text-ink-soft/60 focus:outline-none"
          />
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onSkip}
            className="inline-flex h-11 items-center justify-center rounded-full border border-border px-5 font-meta text-sm tracking-wide text-ink-soft transition hover:border-foreground hover:text-foreground"
          >
            跳过，直接匹配
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="inline-flex h-11 items-center justify-center rounded-full bg-foreground px-6 font-meta text-sm tracking-wide text-primary-foreground transition hover:opacity-90"
          >
            用这些线索继续
          </button>
        </div>
      </motion.div>
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
      <p className="font-cn text-sm text-ink-soft">
        在上方写下一段感受，让一枚远方的词来认领它。
      </p>
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
          className="mt-8 font-serif text-6xl leading-none tracking-tight text-foreground sm:text-8xl"
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
}: {
  data: WordResult;
  entry: SavedWordEntry | null;
}) {
  const navigate = useNavigate();
  const [kept, setKept] = useState(false);
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };
  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.7, filter: "blur(18px)", y: 30 }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)", y: 0 }}
      exit={{ opacity: 0, scale: 0.96, filter: "blur(6px)", y: 12 }}
      transition={{ duration: 1.1, ease: [0.16, 0.84, 0.24, 1] }}
      className="relative overflow-hidden rounded-md border border-border bg-card p-8 shadow-[0_30px_60px_-40px_rgba(60,40,20,0.35)] sm:p-12"
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
          className="mt-4 font-serif text-6xl leading-none tracking-tight text-foreground sm:text-7xl"
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
          <ul className="mt-4 divide-y divide-border border-y border-border">
            {data.alternatives.map((a) => (
              <li
                key={a.word}
                className="flex flex-col gap-1 py-3 transition hover:bg-note/40 sm:flex-row sm:items-baseline sm:gap-6"
              >
                <span className="min-w-[140px] font-serif text-xl text-foreground">
                  {a.word}
                </span>
                <span className="min-w-[88px] font-meta text-[11px] uppercase tracking-[0.2em] text-ink-soft">
                  {a.language}
                </span>
                <span className="font-cn text-sm text-ink-soft">{a.hint}</span>
              </li>
            ))}
          </ul>
          <FeedbackButtons data={data} entry={entry} />
        </motion.div>

        {/* Share CTA */}
        <motion.div variants={fadeUp} className="mt-10 rounded-md bg-note p-6">
          <div className="font-meta text-[11px] uppercase tracking-[0.24em] text-ink-soft">
            分享卡片文案
          </div>
          <p className="mt-3 whitespace-pre-line font-serif text-lg leading-relaxed text-foreground">
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
      <p className="font-cn text-base leading-[1.85] text-foreground">
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
