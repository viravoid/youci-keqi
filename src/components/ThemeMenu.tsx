import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouterState } from "@tanstack/react-router";
import {
  FONTS,
  PALETTES,
  useTheme,
  type Mode,
} from "@/lib/theme";

export function ThemeMenu() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { mode, palette, font, setMode, setPalette, setFont } = useTheme();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const applyMode = (nextMode: Mode) => {
    setMode(nextMode);
    setOpen(false);
  };

  const applyPalette = (nextPalette: (typeof PALETTES)[number]["key"]) => {
    setPalette(nextPalette);
    setOpen(false);
  };

  const applyFont = (nextFont: (typeof FONTS)[number]["key"]) => {
    setFont(nextFont);
    setOpen(false);
  };

  return (
    <div className="fixed right-4 top-4 z-40 sm:right-6 sm:top-6">
      <motion.button
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setOpen((v) => !v)}
        aria-label="阅览设置"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/90 text-foreground shadow-[0_10px_30px_-15px_rgba(0,0,0,0.35)] backdrop-blur transition hover:border-foreground"
      >
        <span className="font-serif text-lg leading-none">
          {mode === "dark" ? "☾" : "☀"}
        </span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/10 backdrop-blur-[1px]"
            />
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="fixed right-4 top-16 z-50 w-[min(280px,calc(100vw-2rem))] max-h-[calc(100vh-5rem)] overflow-y-auto rounded-2xl border border-border bg-card p-5 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.4)] sm:right-6 sm:top-[4.5rem] sm:rounded-md"
            >
              {/* Mode */}
              <div className="font-meta text-[10px] uppercase tracking-[0.28em] text-ink-soft">
                阅览
              </div>
              <div className="mt-3 flex rounded-full border border-border p-0.5">
                {(["light", "dark"] as Mode[]).map((m) => (
                  <button
                    key={m}
                    onClick={() => applyMode(m)}
                    className={
                      "flex-1 rounded-full py-1.5 font-meta text-xs tracking-wide transition " +
                      (mode === m
                        ? "bg-foreground text-primary-foreground"
                        : "text-ink-soft hover:text-foreground")
                    }
                  >
                    {m === "light" ? "日间" : "夜间"}
                  </button>
                ))}
              </div>

              {/* Palette */}
              <div className="mt-5 font-meta text-[10px] uppercase tracking-[0.28em] text-ink-soft">
                配色
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {PALETTES.map((p) => {
                  const active = palette === p.key;
                  return (
                    <button
                      key={p.key}
                      onClick={() => applyPalette(p.key)}
                      className={
                        "flex items-center gap-2 rounded-md border p-2 text-left transition " +
                        (active
                          ? "border-foreground"
                          : "border-border hover:border-foreground/60")
                      }
                    >
                      <span className="flex h-6 w-6 overflow-hidden rounded-full ring-1 ring-border">
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

              {/* Font */}
              <div className="mt-5 font-meta text-[10px] uppercase tracking-[0.28em] text-ink-soft">
                字体
              </div>
              <div className="mt-3 space-y-1.5">
                {FONTS.map((f) => {
                  const active = font === f.key;
                  return (
                    <button
                      key={f.key}
                      onClick={() => applyFont(f.key)}
                      className={
                        "flex w-full items-center justify-between rounded-md border px-3 py-2 text-left transition " +
                        (active
                          ? "border-foreground"
                          : "border-border hover:border-foreground/60")
                      }
                    >
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-meta text-sm tracking-wide text-foreground">
                          {f.label}
                        </span>
                        <span className="mt-0.5 block truncate font-meta text-[10px] uppercase tracking-[0.18em] text-ink-soft">
                          {f.hint}
                        </span>
                      </span>
                      <span
                        data-font={f.key}
                        className="ml-3 shrink-0 font-serif text-xl leading-none text-foreground"
                      >
                        Aa 字
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
