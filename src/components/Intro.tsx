import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const KEY = "ycqx:seen-intro";

/** CJK custom fonts we want to preload before showing content */
const CJK_FONTS = ["Huiwen Mincho", "Xiaodou Utopia", "WuQiu Hand"];

export function Intro() {
  const [open, setOpen] = useState(false);
  const [entering, setEntering] = useState(false);
  const [fontsReady, setFontsReady] = useState(false);

  // Preload CJK fonts — always runs, even for returning visitors
  useEffect(() => {
    async function loadFonts() {
      try {
        // Force-load each CJK font family
        const loads = CJK_FONTS.map((family) =>
          document.fonts.load(`1em "${family}"`).catch(() => {}),
        );
        await Promise.allSettled(loads);
        // Also wait for the global fonts.ready (more reliable on some browsers)
        if (document.fonts?.ready) {
          await document.fonts.ready;
        }
      } catch {}
      // Ensure the loading screen shows for at least 2s so it feels intentional
      setTimeout(() => setFontsReady(true), 2000);
    }
    loadFonts();
  }, []);

  // Once fonts are ready, decide whether to show the paper-doors intro
  useEffect(() => {
    if (!fontsReady) return;
    try {
      if (!sessionStorage.getItem(KEY)) setOpen(true);
    } catch {
      setOpen(true);
    }
  }, [fontsReady]);

  const enter = () => {
    if (entering) return;
    setEntering(true);
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {}
    // give the door-opening animation time before unmounting
    setTimeout(() => setOpen(false), 1200);
  };

  // Auto-dismiss after ~6.5s if the visitor hasn't tapped
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(enter, 6500);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <AnimatePresence>
      {/* ─── Font-loading screen (always shows until fonts are ready) ─── */}
      {!fontsReady && (
        <motion.div
          key="loading"
          className="fixed inset-0 z-[70] flex items-center justify-center overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: "var(--paper)",
              backgroundImage:
                "radial-gradient(var(--grain-a) 1px, transparent 1px), radial-gradient(var(--grain-b) 1px, transparent 1px)",
              backgroundSize: "3px 3px, 7px 7px",
            }}
          />
          <motion.div
            className="relative z-10 flex flex-col items-center gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="font-serif text-6xl leading-none text-foreground sm:text-7xl"
              initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            >
              有词可栖
            </motion.div>
            <motion.p
              className="font-cn text-sm text-ink-soft"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.7 }}
            >
              字体正在加载⋯
            </motion.p>
            <motion.div
              className="h-[1px] w-12"
              style={{ background: "var(--rule)", transformOrigin: "left" }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: [0, 1, 0] }}
              transition={{
                duration: 2.0,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </motion.div>
      )}

      {/* ─── Paper-doors intro (first visit only) ─── */}
      {open && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[60] flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          onClick={enter}
          role="button"
          aria-label="进入有词可栖"
        >
          {/* paper backdrop */}
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: "var(--paper)",
              backgroundImage:
                "radial-gradient(var(--grain-a) 1px, transparent 1px), radial-gradient(var(--grain-b) 1px, transparent 1px)",
              backgroundSize: "3px 3px, 7px 7px",
            }}
          />

          {/* Two paper doors — they part to reveal the home */}
          <motion.div
            className="absolute inset-y-0 left-0 w-1/2 origin-left"
            style={{
              backgroundColor: "var(--paper)",
              boxShadow: "inset -1px 0 0 var(--rule)",
            }}
            initial={false}
            animate={entering ? { x: "-100%" } : { x: 0 }}
            transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div
            className="absolute inset-y-0 right-0 w-1/2 origin-right"
            style={{
              backgroundColor: "var(--paper)",
              boxShadow: "inset 1px 0 0 var(--rule)",
            }}
            initial={false}
            animate={entering ? { x: "100%" } : { x: 0 }}
            transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
          />

          {/* center content sitting on top of the doors */}
          <motion.div
            className="relative z-10 mx-auto flex max-w-md flex-col items-center px-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: entering ? 0 : 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, letterSpacing: "0.4em" }}
              animate={{ opacity: 1, letterSpacing: "0.28em" }}
              transition={{ duration: 1.4, ease: "easeOut" }}
              className="font-meta text-[10px] uppercase leading-none text-ink-soft"
              style={{ letterSpacing: "0.28em" }}
            >
              A Lexicon for Feelings
            </motion.div>

            {/* hairline that draws itself in */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.1, delay: 0.4, ease: "easeOut" }}
              style={{
                transformOrigin: "center",
                height: 1,
                width: 72,
                marginTop: 20,
                background: "var(--rule)",
              }}
            />

            {/* Title — one character at a time, like ink soaking in */}
            <h1 className="mt-8 flex items-baseline gap-1 font-serif text-6xl leading-none tracking-tight text-foreground sm:text-7xl">
              {"有词可栖".split("").map((ch, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    duration: 0.9,
                    delay: 0.6 + i * 0.28,
                    ease: "easeOut",
                  }}
                >
                  {ch}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 2.0 }}
              className="mt-8 font-cn text-sm leading-relaxed text-ink-soft"
            >
              给说不清的感受，
              <br />
              一个可以停靠的词。
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 3.0 }}
              className="mt-14 flex flex-col items-center gap-2"
            >
              <span className="font-meta text-[10px] uppercase tracking-[0.32em] text-ink-soft">
                Tap anywhere to enter
              </span>
              <motion.span
                animate={{ y: [0, 4, 0] }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="font-meta text-base leading-none text-ink-soft"
              >
                ↓
              </motion.span>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
