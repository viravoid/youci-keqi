import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toPng } from "html-to-image";
import { formatSeq, loadLastWord, SAMPLE, type WordResult } from "@/lib/word-store";
import { DepthBackground } from "@/components/DepthBackground";
import {
  FONTS,
  PALETTES,
  type FontKey,
  type Palette,
} from "@/lib/theme";

export const Route = createFileRoute("/share")({
  head: () => ({
    meta: [
      { title: "分享卡 · 有词可栖" },
      {
        name: "description",
        content: "把你刚收下的那枚词，做成一张可以送出去的卡片。",
      },
      { property: "og:title", content: "分享卡 · 有词可栖" },
      {
        property: "og:description",
        content: "把你刚收下的那枚词，做成一张可以送出去的卡片。",
      },
    ],
  }),
  component: SharePage,
});

type Style = "note" | "stamp" | "frontispiece";

const STYLES: { id: Style; label: string; hint: string }[] = [
  { id: "note", label: "便签", hint: "像顺手写在便利贴上" },
  { id: "stamp", label: "邮票", hint: "像一封寄给远方的信" },
  { id: "frontispiece", label: "扉页", hint: "像旧书翻开的第一页" },
];

function SharePage() {
  const [data, setData] = useState<WordResult | null>(null);
  const [style, setStyle] = useState<Style>("note");
  const [cardPalette, setCardPalette] = useState<Palette>("mist");
  const [cardFont, setCardFont] = useState<FontKey>("serif");
  const [showInput, setShowInput] = useState(true);
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [downloadFailed, setDownloadFailed] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setData(loadLastWord() ?? SAMPLE);
  }, []);

  const onCopy = async () => {
    if (!data) return;
    try {
      await navigator.clipboard.writeText(data.shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* noop */
    }
  };

  const onDownload = async () => {
    if (!cardRef.current || !data || downloading) return;

    setDownloading(true);
    setDownloadFailed(false);
    try {
      await document.fonts?.ready;
      const url = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: "transparent",
      });
      const link = document.createElement("a");
      link.download = `有词可栖-${data.word}.png`;
      link.href = url;
      link.click();
    } catch {
      setDownloadFailed(true);
      setTimeout(() => setDownloadFailed(false), 1800);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="relative min-h-screen">
      <DepthBackground />
      <header className="relative z-10 mx-auto max-w-3xl px-6 pt-12 sm:pt-20">
        <div className="flex items-center justify-between text-[11px] uppercase leading-none tracking-[0.28em] text-ink-soft">
          <Link to="/" className="font-meta transition hover:text-foreground">
            ← 回到首页
          </Link>
          <span className="font-meta">Share Card</span>
        </div>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ transformOrigin: "left" }}
          className="mt-6 hairline"
        />
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-8 font-serif text-4xl leading-[1.05] tracking-tight text-foreground sm:text-5xl"
        >
          做一张分享卡
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-4 max-w-xl font-cn text-base leading-relaxed text-ink-soft"
        >
          挑一种样式、一套配色、一种字体——<br className="sm:hidden" />
          做一张只属于这枚词的卡片。
        </motion.p>
        <div className="mt-8 hairline" />
      </header>

      <section className="relative z-10 mx-auto mt-10 max-w-3xl px-6 pb-24">
        {/* Style switcher */}
        <ControlBlock label="样式">
          <div className="flex flex-wrap gap-2">
            {STYLES.map((t) => {
              const active = t.id === style;
              return (
                <motion.button
                  key={t.id}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setStyle(t.id)}
                  className={
                    "rounded-full border px-4 py-1.5 font-meta text-sm tracking-wide transition " +
                    (active
                      ? "border-foreground bg-foreground text-primary-foreground"
                      : "border-border bg-transparent text-ink-soft hover:border-foreground hover:text-foreground")
                  }
                >
                  {t.label}
                </motion.button>
              );
            })}
          </div>
          <p className="mt-3 font-meta text-sm tracking-wide text-ink-soft">
            {STYLES.find((t) => t.id === style)?.hint}
          </p>
        </ControlBlock>

        {/* Card palette */}
        <ControlBlock label="卡片配色">
          <div className="flex flex-wrap gap-2">
            {PALETTES.map((p) => {
              const active = p.key === cardPalette;
              return (
                <button
                  key={p.key}
                  onClick={() => setCardPalette(p.key)}
                  className={
                    "flex items-center gap-2 rounded-full border px-3 py-1.5 transition " +
                    (active
                      ? "border-foreground"
                      : "border-border hover:border-foreground/60")
                  }
                >
                  <span className="flex h-5 w-5 overflow-hidden rounded-full ring-1 ring-border">
                    {p.swatch.map((c, i) => (
                      <span
                        key={i}
                        style={{ background: c }}
                        className="block flex-1"
                      />
                    ))}
                  </span>
                  <span className="font-meta text-xs tracking-wide text-foreground">
                    {p.label}
                  </span>
                </button>
              );
            })}
          </div>
        </ControlBlock>

        {/* Card font */}
        <ControlBlock label="卡片字体">
          <div className="flex flex-wrap gap-2">
            {FONTS.map((f) => {
              const active = f.key === cardFont;
              return (
                <button
                  key={f.key}
                  onClick={() => setCardFont(f.key)}
                  className={
                    "inline-flex h-9 items-center gap-2 whitespace-nowrap rounded-full border px-4 leading-none transition " +
                    (active
                      ? "border-foreground"
                      : "border-border hover:border-foreground/60")
                  }
                >
                  <span
                    data-font={f.key}
                    className="font-serif text-base leading-none text-foreground"
                  >
                    Aa
                  </span>
                  <span className="font-meta text-xs leading-none tracking-wide text-ink-soft">
                    {f.label}
                  </span>
                </button>
              );
            })}
          </div>
        </ControlBlock>

        {/* Show user's own input on the card? */}
        <ControlBlock label="把你的那段感受也印上去">
          <div className="flex flex-wrap gap-2">
            {[
              { v: true, label: "印上去" },
              { v: false, label: "不要" },
            ].map((opt) => {
              const active = showInput === opt.v;
              return (
                <button
                  key={String(opt.v)}
                  onClick={() => setShowInput(opt.v)}
                  className={
                    "rounded-full border px-4 py-1.5 font-meta text-sm tracking-wide transition " +
                    (active
                      ? "border-foreground bg-foreground text-primary-foreground"
                      : "border-border bg-transparent text-ink-soft hover:border-foreground hover:text-foreground")
                  }
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
          {showInput && !data?.userInput && (
            <p className="mt-3 font-meta text-xs tracking-wide text-ink-soft">
              （还没有写过感受——下次在首页留下一段文字，它就会出现在卡片上。）
            </p>
          )}
        </ControlBlock>

        {/* Card preview — scoped theme via data-palette / data-font */}
        <div
          className="mt-10 flex justify-center"
        >
          <div ref={cardRef} data-palette={cardPalette} data-font={cardFont}>
            <AnimatePresence mode="wait">
              {data && (
                <Card
                  key={`${style}-${cardPalette}-${cardFont}-${showInput}`}
                  data={data}
                  style={style}
                  showInput={showInput}
                />
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <motion.button
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.97 }}
            onClick={onCopy}
            className="rounded-full bg-foreground px-6 py-2.5 font-meta text-sm tracking-wide text-primary-foreground transition hover:opacity-90"
          >
            {copied ? "已复制 ✓" : "复制文案"}
          </motion.button>
          <button
            onClick={onDownload}
            disabled={!data || downloading}
            className="rounded-full border border-border px-5 py-2 font-meta text-sm tracking-wide text-ink-soft transition hover:border-foreground hover:text-foreground disabled:opacity-45"
          >
            {downloadFailed ? "下载失败" : downloading ? "正在生成…" : "下载为图片"}
          </button>
          <Link
            to="/"
            className="rounded-full border border-border px-5 py-2 font-meta text-sm tracking-wide text-ink-soft transition hover:border-foreground hover:text-foreground"
          >
            再寻一枚
          </Link>
        </div>

        <div className="mt-20 text-center font-meta text-xs leading-none text-ink-soft">
          有词可栖 · 一本为情绪做的小词典
        </div>
        <div className="mt-3 text-center font-meta text-[10px] leading-none text-ink-soft/60">
          词库来源 · skill 作者 · AI 模型
        </div>
      </section>
    </div>
  );
}

function ControlBlock({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-7">
      <div className="font-meta text-[11px] uppercase tracking-[0.24em] text-ink-soft">
        {label}
      </div>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function Card({
  data,
  style,
  showInput,
}: {
  data: WordResult;
  style: Style;
  showInput: boolean;
}) {
  const input = showInput ? data.userInput?.trim() : "";
  if (style === "stamp") return <StampCard data={data} input={input} />;
  if (style === "frontispiece")
    return <FrontispieceCard data={data} input={input} />;
  return <NoteCard data={data} input={input} />;
}

const cardMotion = {
  initial: { opacity: 0, y: 20, rotateX: -6 },
  animate: { opacity: 1, y: 0, rotateX: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.55, ease: "easeOut" as const },
} as const;

function UserInputBlock({ input }: { input?: string }) {
  if (!input) return null;
  return (
    <>
      <div className="my-6 h-px w-full bg-rule" />
      <p className="whitespace-pre-line font-cn text-sm leading-[1.9] text-ink-soft">
        <span className="mr-2 align-top font-serif text-base text-foreground">“</span>
        {input}
        <span className="ml-1 align-top font-serif text-base text-foreground">”</span>
      </p>
    </>
  );
}

function NoteCard({ data, input }: { data: WordResult; input?: string }) {
  // Folded-corner sticky note: clip-path cuts the top-right corner,
  // then a small triangle overlay fakes the fold's shadow + back-of-paper.
  const FOLD = 28; // px
  return (
    <motion.div
      {...cardMotion}
      className="relative w-full max-w-[380px] -rotate-[1.6deg]"
    >
      {/* tape strip */}
      <div
        aria-hidden
        className="absolute left-1/2 top-[-14px] z-10 h-6 w-24 -translate-x-1/2 rotate-[-2deg] bg-foreground/10 mix-blend-multiply shadow-[0_2px_6px_-2px_rgba(0,0,0,0.25)]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, transparent 0 6px, rgba(255,255,255,0.18) 6px 7px)",
        }}
      />

      <div
        className="themed-surface relative rounded-sm p-8 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.5)]"
        style={{
          clipPath: `polygon(0 0, calc(100% - ${FOLD}px) 0, 100% ${FOLD}px, 100% 100%, 0 100%)`,
        }}
      >
        <div className="font-meta text-[10px] uppercase leading-none tracking-[0.32em] text-ink-soft">
          有词可栖 · {formatSeq(data.seq)}
        </div>
        <div className="mt-6 font-serif text-5xl leading-none tracking-tight text-foreground">
          {data.word}
        </div>
        <div className="mt-3 font-meta text-[11px] uppercase leading-none tracking-[0.24em] text-ink-soft">
          {data.language}
        </div>
        <div className="mt-1 font-serif text-sm text-ink-soft">
          {data.pronunciation}
        </div>

        <div className="my-6 h-px w-full bg-rule" />

        <p className="font-cn text-base leading-[1.85] text-foreground">
          {data.meaning}
        </p>

        <UserInputBlock input={input} />

        <div className="mt-8 flex items-center justify-between font-meta text-[10px] uppercase leading-none tracking-[0.28em] text-ink-soft">
          <span>停靠于 · 此刻</span>
          <span>有词可栖</span>
        </div>
      </div>

      {/* triangular fold — back of the paper, slightly darker */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0"
        style={{
          width: `${FOLD}px`,
          height: `${FOLD}px`,
          background:
            "linear-gradient(225deg, color-mix(in oklab, var(--card) 60%, #000 18%) 0%, color-mix(in oklab, var(--card) 90%, #000 6%) 65%, transparent 100%)",
          clipPath: "polygon(0 0, 100% 100%, 0 100%)",
          filter: "drop-shadow(-1px 1px 1px rgba(0,0,0,0.18))",
        }}
      />
    </motion.div>
  );
}

function StampCard({ data, input }: { data: WordResult; input?: string }) {
  return (
    <motion.div {...cardMotion} className="w-full max-w-[380px]">
      {/* outer paper — perforated edges */}
      <div
        className="themed-surface relative p-3 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.5)]"
        style={{
          maskImage:
            "radial-gradient(circle at 6px 6px, transparent 4px, black 4.5px) 0 0/12px 12px",
          WebkitMaskImage:
            "radial-gradient(circle at 6px 6px, transparent 4px, black 4.5px) 0 0/12px 12px",
        }}
      >
        {/* engraved inner border (double rule) */}
        <div className="relative border border-foreground/70 p-[2px]">
          <div className="relative border border-foreground/40 px-6 pt-6 pb-7">
            {/* country / value bar */}
            <div className="flex items-center justify-between font-meta text-[10px] uppercase leading-none tracking-[0.34em] text-foreground">
              <span>有 词 可 栖</span>
              <span className="border border-foreground/60 px-2 py-1 tracking-[0.18em]">
                ¥ 0.01
              </span>
            </div>

            {/* engraved hatched band as a "portrait frame" */}
            <div
              aria-hidden
              className="mt-6 h-2 w-full opacity-50"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(90deg, currentColor 0 1px, transparent 1px 4px)",
                color: "var(--foreground)",
              }}
            />

            <div className="mt-7 text-center">
              <div className="font-serif text-5xl leading-none tracking-tight text-foreground">
                {data.word}
              </div>
              <div className="mt-3 font-meta text-[11px] uppercase leading-none tracking-[0.28em] text-ink-soft">
                {data.language}
              </div>
              <div className="mt-1 font-serif text-sm text-ink-soft">
                {data.pronunciation}
              </div>
            </div>

            <div
              aria-hidden
              className="mt-6 h-2 w-full opacity-50"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(90deg, currentColor 0 1px, transparent 1px 4px)",
                color: "var(--foreground)",
              }}
            />

            <p className="mt-6 text-center font-cn text-sm leading-[1.9] text-foreground">
              {data.meaning}
            </p>

            {input && (
              <p className="mt-5 whitespace-pre-line text-center font-cn text-xs leading-[1.85] text-ink-soft">
                “{input}”
              </p>
            )}

            <div className="mt-7 flex items-center justify-between font-meta text-[10px] uppercase leading-none tracking-[0.32em] text-ink-soft">
              <span>From · 远方</span>
              <span>No. {formatSeq(data.seq).replace("No. ", "")}</span>
              <span>To · 你</span>
            </div>

            {/* circular postmark, slightly rotated */}
            <div
              aria-hidden
              className="pointer-events-none absolute right-3 top-3 flex h-20 w-20 rotate-[-14deg] items-center justify-center rounded-full border-2 border-foreground/55 text-foreground/55 mix-blend-multiply"
            >
              <div className="absolute inset-1 rounded-full border border-foreground/45" />
              <div className="flex flex-col items-center font-meta text-[8px] uppercase leading-tight tracking-[0.22em]">
                <span>YCQX</span>
                <span className="my-0.5 h-px w-8 bg-foreground/55" />
                <span>此 刻</span>
                <span className="mt-0.5">POSTED</span>
              </div>
            </div>

            {/* cancellation wavy lines */}
            <svg
              aria-hidden
              viewBox="0 0 200 40"
              preserveAspectRatio="none"
              className="pointer-events-none absolute right-0 top-24 h-10 w-44 text-foreground/35 mix-blend-multiply"
            >
              <path
                d="M0 8 Q 20 0 40 8 T 80 8 T 120 8 T 160 8 T 200 8"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
              />
              <path
                d="M0 18 Q 20 10 40 18 T 80 18 T 120 18 T 160 18 T 200 18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
              />
              <path
                d="M0 28 Q 20 20 40 28 T 80 28 T 120 28 T 160 28 T 200 28"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
              />
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function FrontispieceCard({ data, input }: { data: WordResult; input?: string }) {
  return (
    <motion.div {...cardMotion} className="w-full max-w-[380px]">
      <div className="themed-surface relative rounded-sm px-10 py-14 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.45)]">
        {/* engraved inner frame */}
        <div className="pointer-events-none absolute inset-3 border border-foreground/15" />

        <div className="relative text-center font-meta text-[10px] uppercase leading-none tracking-[0.42em] text-ink-soft">
          A Lexicon for Feelings
        </div>
        <div className="relative mx-auto mt-3 flex items-center justify-center gap-2">
          <span className="h-px w-10 bg-rule" />
          <span className="font-serif text-[10px] tracking-[0.2em] text-ink-soft">
            ❦
          </span>
          <span className="h-px w-10 bg-rule" />
        </div>

        <div className="relative mt-12 text-center">
          <div className="font-serif text-[44px] leading-none tracking-tight text-foreground sm:text-5xl">
            {data.word}
          </div>
          <div className="mt-4 font-meta text-[11px] uppercase leading-none tracking-[0.32em] text-ink-soft">
            {data.language}
          </div>
          <div className="mt-1 font-serif text-sm text-ink-soft">
            {data.pronunciation}
          </div>
        </div>

        <div className="relative my-10 flex items-center justify-center gap-3">
          <span className="h-px w-12 bg-rule" />
          <span className="font-serif text-xs text-ink-soft">§</span>
          <span className="h-px w-12 bg-rule" />
        </div>

        <p className="relative text-center font-cn text-base leading-[1.95] text-foreground">
          {data.meaning}
        </p>

        {input && (
          <p className="relative mt-6 whitespace-pre-line text-center font-cn text-sm leading-[1.9] text-ink-soft">
            “{input}”
          </p>
        )}

        <div className="relative mt-10 text-center font-serif text-sm leading-relaxed text-ink-soft">
          —— 有词可栖
        </div>

        {/* page number, like the foot of a book page */}
        <div className="relative mt-6 text-center font-meta text-[10px] uppercase tracking-[0.32em] text-ink-soft">
          · {formatSeq(data.seq).replace("No. ", "")} ·
        </div>
      </div>
    </motion.div>
  );
}
