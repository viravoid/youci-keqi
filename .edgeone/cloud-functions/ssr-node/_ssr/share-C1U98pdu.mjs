import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { i as motion, s as AnimatePresence } from "../_libs/framer-motion.mjs";
import { i as loadLastWord, n as SAMPLE, r as formatSeq, t as DepthBackground } from "./DepthBackground-Bw-ifiXn.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as PALETTES, t as FONTS } from "./theme-C3romkWH.mjs";
import { t as toPng } from "../_libs/html-to-image.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/share-C1U98pdu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STYLES = [
	{
		id: "note",
		label: "便签",
		hint: "像顺手写在便利贴上"
	},
	{
		id: "stamp",
		label: "邮票",
		hint: "像一封寄给远方的信"
	},
	{
		id: "frontispiece",
		label: "扉页",
		hint: "像旧书翻开的第一页"
	}
];
function SharePage() {
	const [data, setData] = (0, import_react.useState)(null);
	const [style, setStyle] = (0, import_react.useState)("note");
	const [cardPalette, setCardPalette] = (0, import_react.useState)("mist");
	const [cardFont, setCardFont] = (0, import_react.useState)("serif");
	const [showInput, setShowInput] = (0, import_react.useState)(true);
	const [copied, setCopied] = (0, import_react.useState)(false);
	const [downloading, setDownloading] = (0, import_react.useState)(false);
	const [downloadFailed, setDownloadFailed] = (0, import_react.useState)(false);
	const cardRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		setData(loadLastWord() ?? SAMPLE);
	}, []);
	const onCopy = async () => {
		if (!data) return;
		try {
			await navigator.clipboard.writeText(data.shareText);
			setCopied(true);
			setTimeout(() => setCopied(false), 1600);
		} catch {}
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
				backgroundColor: "transparent"
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-screen",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DepthBackground, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "relative z-10 mx-auto max-w-3xl px-6 pt-12 sm:pt-20",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between text-[11px] uppercase leading-none tracking-[0.28em] text-ink-soft",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "font-meta transition hover:text-foreground",
							children: "← 回到首页"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-meta",
							children: "Share Card"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						initial: { scaleX: 0 },
						animate: { scaleX: 1 },
						transition: {
							duration: .8,
							ease: "easeOut"
						},
						style: { transformOrigin: "left" },
						className: "mt-6 hairline"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.h1, {
						initial: {
							opacity: 0,
							y: 12
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							duration: .7,
							delay: .1
						},
						className: "mt-8 font-serif text-4xl leading-[1.05] tracking-tight text-foreground sm:text-5xl",
						children: "做一张分享卡"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.p, {
						initial: {
							opacity: 0,
							y: 12
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							duration: .7,
							delay: .2
						},
						className: "mt-4 max-w-xl font-cn text-base leading-relaxed text-ink-soft",
						children: [
							"挑一种样式、一套配色、一种字体——",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", { className: "sm:hidden" }),
							"做一张只属于这枚词的卡片。"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-8 hairline" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative z-10 mx-auto mt-10 max-w-3xl px-6 pb-24",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ControlBlock, {
						label: "样式",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-2",
							children: STYLES.map((t) => {
								const active = t.id === style;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.button, {
									whileHover: { y: -2 },
									whileTap: { scale: .96 },
									onClick: () => setStyle(t.id),
									className: "rounded-full border px-4 py-1.5 font-meta text-sm tracking-wide transition " + (active ? "border-foreground bg-foreground text-primary-foreground" : "border-border bg-transparent text-ink-soft hover:border-foreground hover:text-foreground"),
									children: t.label
								}, t.id);
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 font-meta text-sm tracking-wide text-ink-soft",
							children: STYLES.find((t) => t.id === style)?.hint
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ControlBlock, {
						label: "卡片配色",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-2",
							children: PALETTES.map((p) => {
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setCardPalette(p.key),
									className: "flex items-center gap-2 rounded-full border px-3 py-1.5 transition " + (p.key === cardPalette ? "border-foreground" : "border-border hover:border-foreground/60"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex h-5 w-5 overflow-hidden rounded-full ring-1 ring-border",
										children: p.swatch.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											style: { background: c },
											className: "block flex-1"
										}, i))
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-meta text-xs tracking-wide text-foreground",
										children: p.label
									})]
								}, p.key);
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ControlBlock, {
						label: "卡片字体",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-2",
							children: FONTS.map((f) => {
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setCardFont(f.key),
									className: "inline-flex h-9 items-center gap-2 whitespace-nowrap rounded-full border px-4 leading-none transition " + (f.key === cardFont ? "border-foreground" : "border-border hover:border-foreground/60"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"data-font": f.key,
										className: "font-serif text-base leading-none text-foreground",
										children: "Aa"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-meta text-xs leading-none tracking-wide text-ink-soft",
										children: f.label
									})]
								}, f.key);
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ControlBlock, {
						label: "把你的那段感受也印上去",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-2",
							children: [{
								v: true,
								label: "印上去"
							}, {
								v: false,
								label: "不要"
							}].map((opt) => {
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setShowInput(opt.v),
									className: "rounded-full border px-4 py-1.5 font-meta text-sm tracking-wide transition " + (showInput === opt.v ? "border-foreground bg-foreground text-primary-foreground" : "border-border bg-transparent text-ink-soft hover:border-foreground hover:text-foreground"),
									children: opt.label
								}, String(opt.v));
							})
						}), showInput && !data?.userInput && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 font-meta text-xs tracking-wide text-ink-soft",
							children: "（还没有写过感受——下次在首页留下一段文字，它就会出现在卡片上。）"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-10 flex justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							ref: cardRef,
							"data-palette": cardPalette,
							"data-font": cardFont,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
								mode: "wait",
								children: data && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
									data,
									style,
									showInput
								}, `${style}-${cardPalette}-${cardFont}-${showInput}`)
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-10 flex flex-wrap items-center justify-center gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.button, {
								whileHover: { y: -1 },
								whileTap: { scale: .97 },
								onClick: onCopy,
								className: "rounded-full bg-foreground px-6 py-2.5 font-meta text-sm tracking-wide text-primary-foreground transition hover:opacity-90",
								children: copied ? "已复制 ✓" : "复制文案"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: onDownload,
								disabled: !data || downloading,
								className: "rounded-full border border-border px-5 py-2 font-meta text-sm tracking-wide text-ink-soft transition hover:border-foreground hover:text-foreground disabled:opacity-45",
								children: downloadFailed ? "下载失败" : downloading ? "正在生成…" : "下载为图片"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								className: "rounded-full border border-border px-5 py-2 font-meta text-sm tracking-wide text-ink-soft transition hover:border-foreground hover:text-foreground",
								children: "再寻一枚"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-20 text-center font-meta text-xs leading-none text-ink-soft",
						children: "有词可栖 · 一本为情绪做的小词典"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 text-center font-meta text-[10px] leading-none text-ink-soft/60",
						children: "词库来源 · skill 作者 · AI 模型"
					})
				]
			})
		]
	});
}
function ControlBlock({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-7",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "font-meta text-[11px] uppercase tracking-[0.24em] text-ink-soft",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-3",
			children
		})]
	});
}
function Card({ data, style, showInput }) {
	const input = showInput ? data.userInput?.trim() : "";
	if (style === "stamp") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StampCard, {
		data,
		input
	});
	if (style === "frontispiece") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FrontispieceCard, {
		data,
		input
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NoteCard, {
		data,
		input
	});
}
var cardMotion = {
	initial: {
		opacity: 0,
		y: 20,
		rotateX: -6
	},
	animate: {
		opacity: 1,
		y: 0,
		rotateX: 0
	},
	exit: {
		opacity: 0,
		y: -10
	},
	transition: {
		duration: .55,
		ease: "easeOut"
	}
};
function UserInputBlock({ input }) {
	if (!input) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "my-6 h-px w-full bg-rule" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "whitespace-pre-line font-cn text-sm leading-[1.9] text-ink-soft",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mr-2 align-top font-serif text-base text-foreground",
				children: "“"
			}),
			input,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "ml-1 align-top font-serif text-base text-foreground",
				children: "”"
			})
		]
	})] });
}
function NoteCard({ data, input }) {
	const FOLD = 28;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		...cardMotion,
		className: "relative w-full max-w-[380px] -rotate-[1.6deg]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": true,
				className: "absolute left-1/2 top-[-14px] z-10 h-6 w-24 -translate-x-1/2 rotate-[-2deg] bg-foreground/10 mix-blend-multiply shadow-[0_2px_6px_-2px_rgba(0,0,0,0.25)]",
				style: { backgroundImage: "repeating-linear-gradient(90deg, transparent 0 6px, rgba(255,255,255,0.18) 6px 7px)" }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "themed-surface relative rounded-sm p-8 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.5)]",
				style: { clipPath: `polygon(0 0, calc(100% - ${FOLD}px) 0, 100% ${FOLD}px, 100% 100%, 0 100%)` },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "font-meta text-[10px] uppercase leading-none tracking-[0.32em] text-ink-soft",
						children: ["有词可栖 · ", formatSeq(data.seq)]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 font-serif text-5xl leading-none tracking-tight text-foreground",
						children: data.word
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 font-meta text-[11px] uppercase leading-none tracking-[0.24em] text-ink-soft",
						children: data.language
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 font-serif text-sm text-ink-soft",
						children: data.pronunciation
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "my-6 h-px w-full bg-rule" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-cn text-base leading-[1.85] text-foreground",
						children: data.meaning
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserInputBlock, { input }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex items-center justify-between font-meta text-[10px] uppercase leading-none tracking-[0.28em] text-ink-soft",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "停靠于 · 此刻" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "有词可栖" })]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": true,
				className: "pointer-events-none absolute right-0 top-0",
				style: {
					width: `${FOLD}px`,
					height: `${FOLD}px`,
					background: "linear-gradient(225deg, color-mix(in oklab, var(--card) 60%, #000 18%) 0%, color-mix(in oklab, var(--card) 90%, #000 6%) 65%, transparent 100%)",
					clipPath: "polygon(0 0, 100% 100%, 0 100%)",
					filter: "drop-shadow(-1px 1px 1px rgba(0,0,0,0.18))"
				}
			})
		]
	});
}
function StampCard({ data, input }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		...cardMotion,
		className: "w-full max-w-[380px]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "themed-surface relative p-3 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.5)]",
			style: {
				maskImage: "radial-gradient(circle at 6px 6px, transparent 4px, black 4.5px) 0 0/12px 12px",
				WebkitMaskImage: "radial-gradient(circle at 6px 6px, transparent 4px, black 4.5px) 0 0/12px 12px"
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative border border-foreground/70 p-[2px]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative border border-foreground/40 px-6 pt-6 pb-7",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between font-meta text-[10px] uppercase leading-none tracking-[0.34em] text-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "有 词 可 栖" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "border border-foreground/60 px-2 py-1 tracking-[0.18em]",
								children: "¥ 0.01"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"aria-hidden": true,
							className: "mt-6 h-2 w-full opacity-50",
							style: {
								backgroundImage: "repeating-linear-gradient(90deg, currentColor 0 1px, transparent 1px 4px)",
								color: "var(--foreground)"
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-7 text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-serif text-5xl leading-none tracking-tight text-foreground",
									children: data.word
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-3 font-meta text-[11px] uppercase leading-none tracking-[0.28em] text-ink-soft",
									children: data.language
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-1 font-serif text-sm text-ink-soft",
									children: data.pronunciation
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"aria-hidden": true,
							className: "mt-6 h-2 w-full opacity-50",
							style: {
								backgroundImage: "repeating-linear-gradient(90deg, currentColor 0 1px, transparent 1px 4px)",
								color: "var(--foreground)"
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 text-center font-cn text-sm leading-[1.9] text-foreground",
							children: data.meaning
						}),
						input && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-5 whitespace-pre-line text-center font-cn text-xs leading-[1.85] text-ink-soft",
							children: [
								"“",
								input,
								"”"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-7 flex items-center justify-between font-meta text-[10px] uppercase leading-none tracking-[0.32em] text-ink-soft",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "From · 远方" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["No. ", formatSeq(data.seq).replace("No. ", "")] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "To · 你" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"aria-hidden": true,
							className: "pointer-events-none absolute right-3 top-3 flex h-20 w-20 rotate-[-14deg] items-center justify-center rounded-full border-2 border-foreground/55 text-foreground/55 mix-blend-multiply",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-1 rounded-full border border-foreground/45" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col items-center font-meta text-[8px] uppercase leading-tight tracking-[0.22em]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "YCQX" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "my-0.5 h-px w-8 bg-foreground/55" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "此 刻" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mt-0.5",
										children: "POSTED"
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
							"aria-hidden": true,
							viewBox: "0 0 200 40",
							preserveAspectRatio: "none",
							className: "pointer-events-none absolute right-0 top-24 h-10 w-44 text-foreground/35 mix-blend-multiply",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									d: "M0 8 Q 20 0 40 8 T 80 8 T 120 8 T 160 8 T 200 8",
									fill: "none",
									stroke: "currentColor",
									strokeWidth: "1.2"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									d: "M0 18 Q 20 10 40 18 T 80 18 T 120 18 T 160 18 T 200 18",
									fill: "none",
									stroke: "currentColor",
									strokeWidth: "1.2"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									d: "M0 28 Q 20 20 40 28 T 80 28 T 120 28 T 160 28 T 200 28",
									fill: "none",
									stroke: "currentColor",
									strokeWidth: "1.2"
								})
							]
						})
					]
				})
			})
		})
	});
}
function FrontispieceCard({ data, input }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		...cardMotion,
		className: "w-full max-w-[380px]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "themed-surface relative rounded-sm px-10 py-14 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.45)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-3 border border-foreground/15" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative text-center font-meta text-[10px] uppercase leading-none tracking-[0.42em] text-ink-soft",
					children: "A Lexicon for Feelings"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mx-auto mt-3 flex items-center justify-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-10 bg-rule" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-serif text-[10px] tracking-[0.2em] text-ink-soft",
							children: "❦"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-10 bg-rule" })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mt-12 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-serif text-[44px] leading-none tracking-tight text-foreground sm:text-5xl",
							children: data.word
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 font-meta text-[11px] uppercase leading-none tracking-[0.32em] text-ink-soft",
							children: data.language
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1 font-serif text-sm text-ink-soft",
							children: data.pronunciation
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative my-10 flex items-center justify-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-12 bg-rule" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-serif text-xs text-ink-soft",
							children: "§"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-12 bg-rule" })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "relative text-center font-cn text-base leading-[1.95] text-foreground",
					children: data.meaning
				}),
				input && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "relative mt-6 whitespace-pre-line text-center font-cn text-sm leading-[1.9] text-ink-soft",
					children: [
						"“",
						input,
						"”"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative mt-10 text-center font-serif text-sm leading-relaxed text-ink-soft",
					children: "—— 有词可栖"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mt-6 text-center font-meta text-[10px] uppercase tracking-[0.32em] text-ink-soft",
					children: [
						"· ",
						formatSeq(data.seq).replace("No. ", ""),
						" ·"
					]
				})
			]
		})
	});
}
//#endregion
export { SharePage as component };
