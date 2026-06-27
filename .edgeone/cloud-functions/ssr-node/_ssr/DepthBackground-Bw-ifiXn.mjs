import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { i as motion, n as useTransform, r as useMotionValue, t as useSpring } from "../_libs/framer-motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/DepthBackground-Bw-ifiXn.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var nativeWordByRomanization = {
	"mono no aware": "物の哀れ",
	yugen: "幽玄",
	natsukashii: "懐かしい",
	kintsugi: "金継ぎ",
	komorebi: "木漏れ日",
	"wabi-sabi": "侘び寂び",
	"wabi sabi": "侘び寂び"
};
function normalizeNativeWord(word, language) {
	if (!language.toLocaleLowerCase().includes("japanese") && !language.includes("日语")) return word;
	return nativeWordByRomanization[word.trim().toLocaleLowerCase()] ?? word;
}
var SAMPLE = {
	word: "Saudade",
	language: "葡萄牙语 · Portuguese",
	pronunciation: "/sɐwˈdadʒi/",
	meaning: "一种温柔的忧伤——对某个不在身边的人、地方或时刻，怀有甜美而隐隐作痛的思念。",
	whyForYou: "这段感受的重点是：重要的人、地方或时刻不在眼前，但影响还在。Saudade 适合它，因为它同时包含想念、缺席和仍然珍惜的部分，不会把这段经验压成单纯的难过。",
	culture: "Saudade 是葡语文化中常被提及的情绪词，常描述怀念、缺席和不可完全追回的亲密感。",
	precision: {
		preciseName: "缺席感引发的温柔怀念",
		concreteExplanation: "一个人、地方或时刻不在眼前之后，仍然留下情绪余波。这里可以分成三层：事实上的缺席、主观上的想念，以及你仍然珍惜的部分。",
		copyableExpression: "我想表达的是：某个重要的人或时刻已经不在这里，但它留下的温柔还在影响我。"
	},
	alternatives: [
		{
			word: "Hiraeth",
			language: "威尔士语",
			hint: "对一个回不去的家的乡愁"
		},
		{
			word: "物の哀れ",
			language: "日语",
			hint: "对事物易逝之美的怅然"
		},
		{
			word: "Sehnsucht",
			language: "德语",
			hint: "对某种说不清之物的深切渴望"
		}
	],
	shareText: "想念一个人时不必皱眉——\n你可以微笑着，让它留在心里某个温暖的房间。",
	safetyNote: "这不是心理诊断，也不是治疗建议；它只是帮助你寻找更贴近此刻感受的表达。"
};
var KEY = "ycqx:last-word";
var SEQ_KEY = "ycqx:seq";
function nextSeq() {
	try {
		const next = (Number(localStorage.getItem(SEQ_KEY) ?? "0") || 0) + 1;
		localStorage.setItem(SEQ_KEY, String(next));
		return next;
	} catch {
		return 1;
	}
}
function saveLastWord(w) {
	try {
		const withSeq = {
			...w,
			seq: w.seq ?? nextSeq()
		};
		sessionStorage.setItem(KEY, JSON.stringify(withSeq));
	} catch {}
}
function toWordResult(result, userInput, seq) {
	return {
		word: normalizeNativeWord(result.word, result.language),
		language: result.language,
		pronunciation: result.pronunciation,
		meaning: result.shortMeaning,
		whyForYou: result.whyItFits,
		culture: result.cultureNote,
		precision: result.precision,
		alternatives: result.alternatives.map((alternative) => ({
			word: normalizeNativeWord(alternative.word, alternative.language),
			language: alternative.language,
			hint: alternative.reason
		})),
		shareText: result.shareCopy,
		safetyNote: result.safetyNote,
		userInput,
		seq
	};
}
/** Set the "last word" without incrementing the user's word counter.
*  Used when re-sharing an already-collected word from /harbor. */
function setLastWord(w) {
	try {
		sessionStorage.setItem(KEY, JSON.stringify(w));
	} catch {}
}
function loadLastWord() {
	try {
		const raw = sessionStorage.getItem(KEY);
		return raw ? JSON.parse(raw) : null;
	} catch {
		return null;
	}
}
function formatSeq(n) {
	if (!n || n < 1) return "样本";
	return "No. " + String(n).padStart(3, "0");
}
var WATERMARKS = [
	{ word: "Saudade" },
	{ word: "Hiraeth" },
	{ word: "物の哀れ" },
	{ word: "Mångata" },
	{ word: "木漏れ日" },
	{ word: "Sehnsucht" },
	{ word: "Querencia" }
];
var VERTICAL_TEXT = "有些感受找不到名字  于是它们漂在心里  像一艘没有港口的小船  等一枚远方的词  替它写下停泊的坐标";
function DepthBackground({ zoom = 0 }) {
	const [liteMode, setLiteMode] = (0, import_react.useState)(false);
	const [pair, setPair] = (0, import_react.useState)([WATERMARKS[0], WATERMARKS[1]]);
	(0, import_react.useEffect)(() => {
		if (typeof window !== "undefined") setLiteMode(window.matchMedia("(prefers-reduced-motion: reduce)").matches || window.innerWidth < 640);
		const a = Math.floor(Math.random() * WATERMARKS.length);
		let b = Math.floor(Math.random() * WATERMARKS.length);
		if (b === a) b = (b + 1) % WATERMARKS.length;
		setPair([WATERMARKS[a], WATERMARKS[b]]);
	}, []);
	const [a, b] = pair;
	const px = useMotionValue(0);
	const py = useMotionValue(0);
	const sx = useSpring(px, {
		stiffness: 40,
		damping: 18,
		mass: .6
	});
	const sy = useSpring(py, {
		stiffness: 40,
		damping: 18,
		mass: .6
	});
	(0, import_react.useEffect)(() => {
		if (typeof window === "undefined") return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		if (window.matchMedia("(pointer: coarse)").matches) return;
		const onMove = (e) => {
			const x = (e.clientX / window.innerWidth - .5) * 2;
			const y = (e.clientY / window.innerHeight - .5) * 2;
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"aria-hidden": true,
		className: "pointer-events-none fixed left-0 top-0 z-0 overflow-hidden",
		style: {
			width: "100vw",
			height: "100vh",
			transform: `translateZ(0) scale(${1 + zoom * (liteMode ? .04 : .12)})`,
			filter: `blur(${zoom * (liteMode ? 1 : 3)}px)`,
			opacity: 1 - zoom * .25,
			willChange: "transform, filter, opacity",
			contain: "paint",
			transition: "transform 1.1s ease, filter 1.1s ease, opacity 1.1s ease"
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				style: {
					x: farX,
					y: farY
				},
				className: "absolute inset-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						className: "absolute -left-32 -top-40 h-[640px] w-[640px] rounded-full",
						style: {
							background: "radial-gradient(closest-side, var(--bloom-a), transparent 70%)",
							filter: liteMode ? "blur(20px)" : "blur(40px)"
						},
						animate: liteMode ? { opacity: .82 } : {
							x: [
								0,
								180,
								-120,
								80,
								0
							],
							y: [
								0,
								120,
								-80,
								60,
								0
							],
							scale: [
								1,
								1.25,
								.85,
								1.1,
								1
							],
							opacity: [
								.85,
								1,
								.7,
								.95,
								.85
							]
						},
						transition: liteMode ? void 0 : {
							duration: 9,
							repeat: Infinity,
							ease: "easeInOut"
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						className: "absolute -right-40 top-1/3 h-[520px] w-[520px] rounded-full",
						style: {
							background: "radial-gradient(closest-side, var(--bloom-b), transparent 70%)",
							filter: liteMode ? "blur(24px)" : "blur(50px)"
						},
						animate: liteMode ? { opacity: .76 } : {
							x: [
								0,
								-160,
								100,
								-60,
								0
							],
							y: [
								0,
								-90,
								140,
								-50,
								0
							],
							scale: [
								1,
								.8,
								1.3,
								.95,
								1
							],
							opacity: [
								.8,
								1,
								.65,
								.9,
								.8
							]
						},
						transition: liteMode ? void 0 : {
							duration: 11,
							repeat: Infinity,
							ease: "easeInOut"
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						className: "absolute bottom-[-200px] left-1/3 h-[560px] w-[560px] rounded-full",
						style: {
							background: "radial-gradient(closest-side, var(--bloom-c), transparent 70%)",
							filter: liteMode ? "blur(28px)" : "blur(60px)"
						},
						animate: liteMode ? { opacity: .7 } : {
							x: [
								0,
								140,
								-180,
								70,
								0
							],
							y: [
								0,
								-130,
								80,
								-40,
								0
							],
							scale: [
								1,
								1.2,
								.85,
								1.1,
								1
							],
							opacity: [
								.75,
								1,
								.6,
								.9,
								.75
							]
						},
						transition: liteMode ? void 0 : {
							duration: 10,
							repeat: Infinity,
							ease: "easeInOut"
						}
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				style: {
					x: farX,
					y: farY
				},
				className: "absolute inset-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0 opacity-[0.05]",
					style: { backgroundImage: "repeating-linear-gradient(0deg, var(--foreground) 0 1px, transparent 1px 38px), repeating-linear-gradient(90deg, var(--foreground) 0 1px, transparent 1px 38px)" }
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				style: {
					x: midX,
					y: midY
				},
				className: "absolute right-2 top-10 hidden sm:block",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-cn text-[13px] leading-[2.2] tracking-[0.4em] text-foreground/[0.09]",
					style: { writingMode: "vertical-rl" },
					children: VERTICAL_TEXT
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				style: {
					x: midX,
					y: midY
				},
				className: "pointer-events-none absolute left-[-20px] top-[24%] hidden md:block",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-meta italic text-foreground/[0.06]",
					style: {
						fontSize: liteMode ? "clamp(4rem, 10vw, 8rem)" : "clamp(5rem, 11vw, 11rem)",
						lineHeight: 1
					},
					children: "Shelter"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				style: {
					x: nearX,
					y: nearY
				},
				className: "absolute inset-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute -left-12 -top-20 select-none font-serif italic leading-none text-foreground/[0.055]",
					style: {
						fontSize: liteMode ? "clamp(5.5rem, 13vw, 10rem)" : "clamp(8rem, 18vw, 18rem)",
						filter: liteMode ? "blur(3px)" : "blur(6px)"
					},
					children: a.word
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute -bottom-32 -right-10 select-none font-serif italic leading-none text-foreground/[0.05]",
					style: {
						fontSize: liteMode ? "clamp(5rem, 11vw, 8.5rem)" : "clamp(7rem, 15vw, 15rem)",
						filter: liteMode ? "blur(4px)" : "blur(8px)"
					},
					children: b.word
				})]
			})
		]
	});
}
//#endregion
export { saveLastWord as a, loadLastWord as i, SAMPLE as n, setLastWord as o, formatSeq as r, toWordResult as s, DepthBackground as t };
