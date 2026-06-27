import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

const WATERMARKS = [
  { word: "Saudade" },
  { word: "Hiraeth" },
  { word: "物の哀れ" },
  { word: "Mångata" },
  { word: "木漏れ日" },
  { word: "Sehnsucht" },
  { word: "Querencia" },
];

const VERTICAL_TEXT =
  "有些感受找不到名字  于是它们漂在心里  像一艘没有港口的小船  等一枚远方的词  替它写下停泊的坐标";

export function DepthBackground({
  zoom = 0,
}: {
  /** 0 = idle, 1 = pushed back (during reveal) */
  zoom?: number;
}) {
  const [liteMode, setLiteMode] = useState(false);

  // Deterministic initial pair for SSR; randomize after mount to avoid hydration mismatch.
  const [pair, setPair] = useState<readonly [typeof WATERMARKS[number], typeof WATERMARKS[number]]>(
    [WATERMARKS[0], WATERMARKS[1]],
  );
  useEffect(() => {
    if (typeof window !== "undefined") {
      setLiteMode(
        window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
          window.innerWidth < 640,
      );
    }

    const a = Math.floor(Math.random() * WATERMARKS.length);
    let b = Math.floor(Math.random() * WATERMARKS.length);
    if (b === a) b = (b + 1) % WATERMARKS.length;
    setPair([WATERMARKS[a], WATERMARKS[b]]);
  }, []);
  const [a, b] = pair;

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 40, damping: 18, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 40, damping: 18, mass: 0.6 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const onMove = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      px.set(x);
      py.set(y);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [px, py]);

  const farX = useTransform(sx, (v) => v * 3);
  const farY = useTransform(sy, (v) => v * 3);
  const midX = useTransform(sx, (v) => v * 7);
  const midY = useTransform(sy, (v) => v * 7);
  const nearX = useTransform(sx, (v) => v * 12);
  const nearY = useTransform(sy, (v) => v * 12);

  const wrapStyle = {
    width: "100vw",
    height: "100vh",
    transform: `translateZ(0) scale(${1 + zoom * (liteMode ? 0.04 : 0.12)})`,
    filter: `blur(${zoom * (liteMode ? 1 : 3)}px)`,
    opacity: 1 - zoom * 0.25,
    willChange: "transform, filter, opacity",
    contain: "paint" as const,
    transition: "transform 1.1s ease, filter 1.1s ease, opacity 1.1s ease",
  } as const;


  return (
    <div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-0 overflow-hidden"
      style={wrapStyle}
    >
      {/* Layer 0: dreamy gradient orbs (palette-aware blooms) */}
      <motion.div
        style={{ x: farX, y: farY }}
        className="absolute inset-0"
      >
        <motion.div
          className="absolute -left-32 -top-40 h-[640px] w-[640px] rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, var(--bloom-a), transparent 70%)",
            filter: liteMode ? "blur(20px)" : "blur(40px)",
          }}
          animate={
            liteMode
              ? { opacity: 0.82 }
              : {
                  x: [0, 180, -120, 80, 0],
                  y: [0, 120, -80, 60, 0],
                  scale: [1, 1.25, 0.85, 1.1, 1],
                  opacity: [0.85, 1, 0.7, 0.95, 0.85],
                }
          }
          transition={
            liteMode ? undefined : { duration: 9, repeat: Infinity, ease: "easeInOut" }
          }
        />
        <motion.div
          className="absolute -right-40 top-1/3 h-[520px] w-[520px] rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, var(--bloom-b), transparent 70%)",
            filter: liteMode ? "blur(24px)" : "blur(50px)",
          }}
          animate={
            liteMode
              ? { opacity: 0.76 }
              : {
                  x: [0, -160, 100, -60, 0],
                  y: [0, -90, 140, -50, 0],
                  scale: [1, 0.8, 1.3, 0.95, 1],
                  opacity: [0.8, 1, 0.65, 0.9, 0.8],
                }
          }
          transition={
            liteMode ? undefined : { duration: 11, repeat: Infinity, ease: "easeInOut" }
          }
        />
        <motion.div
          className="absolute bottom-[-200px] left-1/3 h-[560px] w-[560px] rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, var(--bloom-c), transparent 70%)",
            filter: liteMode ? "blur(28px)" : "blur(60px)",
          }}
          animate={
            liteMode
              ? { opacity: 0.7 }
              : {
                  x: [0, 140, -180, 70, 0],
                  y: [0, -130, 80, -40, 0],
                  scale: [1, 1.2, 0.85, 1.1, 1],
                  opacity: [0.75, 1, 0.6, 0.9, 0.75],
                }
          }
          transition={
            liteMode ? undefined : { duration: 10, repeat: Infinity, ease: "easeInOut" }
          }
        />


      </motion.div>

      {/* Layer 1: faint ruled grid */}
      <motion.div
        style={{ x: farX, y: farY }}
        className="absolute inset-0"
      >
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, var(--foreground) 0 1px, transparent 1px 38px), repeating-linear-gradient(90deg, var(--foreground) 0 1px, transparent 1px 38px)",
          }}
        />
      </motion.div>

      {/* Layer 2: vertical Chinese ghost text on the right */}
      <motion.div
        style={{ x: midX, y: midY }}
        className="absolute right-2 top-10 hidden sm:block"
      >
        <div
          className="font-cn text-[13px] leading-[2.2] tracking-[0.4em] text-foreground/[0.09]"
          style={{ writingMode: "vertical-rl" }}
        >
          {VERTICAL_TEXT}
        </div>
      </motion.div>

      {/* Layer 3: big italic Cormorant decorative word */}
      <motion.div
        style={{ x: midX, y: midY }}
        className="pointer-events-none absolute left-[-20px] top-[24%] hidden md:block"
      >
        <div
          className="font-meta italic text-foreground/[0.06]"
          style={{
            fontSize: liteMode ? "clamp(4rem, 10vw, 8rem)" : "clamp(5rem, 11vw, 11rem)",
            lineHeight: 1,
          }}
        >
          Shelter
        </div>
      </motion.div>

      {/* Layer 4: two giant blurred foreign words */}
      <motion.div
        style={{ x: nearX, y: nearY }}
        className="absolute inset-0"
      >
        <div
          className="absolute -left-12 -top-20 select-none font-serif italic leading-none text-foreground/[0.055]"
          style={{
            fontSize: liteMode ? "clamp(5.5rem, 13vw, 10rem)" : "clamp(8rem, 18vw, 18rem)",
            filter: liteMode ? "blur(3px)" : "blur(6px)",
          }}
        >
          {a.word}
        </div>
        <div
          className="absolute -bottom-32 -right-10 select-none font-serif italic leading-none text-foreground/[0.05]"
          style={{
            fontSize: liteMode ? "clamp(5rem, 11vw, 8.5rem)" : "clamp(7rem, 15vw, 15rem)",
            filter: liteMode ? "blur(4px)" : "blur(8px)",
          }}
        >
          {b.word}
        </div>
      </motion.div>
    </div>
  );
}
