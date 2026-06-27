import { o as __toESM } from "../_runtime.mjs";
import { n as listRecentWords } from "./localHistory-zaoMvSap.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { a as MotionConfig, i as motion, o as LayoutGroup, s as AnimatePresence } from "../_libs/framer-motion.mjs";
import { o as setLastWord, t as DepthBackground } from "./DepthBackground-Bw-ifiXn.mjs";
import { N as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/harbor-Bqfd9smr.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SORTS = [
	{
		key: "recent",
		label: "最近停靠"
	},
	{
		key: "earliest",
		label: "最早停靠"
	},
	{
		key: "loved",
		label: "最想留下"
	}
];
function savedToEntry(entry) {
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
		date: `${isValidDate ? createdAt.getFullYear() : (/* @__PURE__ */ new Date()).getFullYear()} · 停靠`,
		at,
		loved: entry.saved,
		why: entry.whyItFits,
		culture: entry.cultureNote
	};
}
function Harbor() {
	const [localEntries, setLocalEntries] = (0, import_react.useState)([]);
	const [sort, setSort] = (0, import_react.useState)("recent");
	const [loved, setLoved] = (0, import_react.useState)({});
	const [openId, setOpenId] = (0, import_react.useState)(null);
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		const recent = listRecentWords(50).map(savedToEntry);
		setLocalEntries(recent);
		setLoved(Object.fromEntries(recent.map((entry) => [entry.id ?? entry.w, entry.loved])));
	}, []);
	const onShare = (c, idx) => {
		setLastWord({
			word: c.w,
			language: c.l,
			pronunciation: c.pron,
			meaning: c.g,
			whyForYou: c.why,
			culture: c.culture,
			alternatives: [],
			shareText: c.g,
			userInput: c.note,
			seq: idx + 1
		});
		navigate({ to: "/share" });
	};
	const items = (0, import_react.useMemo)(() => {
		const withLove = localEntries.map((entry) => ({
			...entry,
			loved: !!loved[entry.id ?? entry.w]
		}));
		if (sort === "recent") return [...withLove].sort((a, b) => b.at - a.at);
		if (sort === "earliest") return [...withLove].sort((a, b) => a.at - b.at);
		return [...withLove].sort((a, b) => {
			if (a.loved !== b.loved) return a.loved ? -1 : 1;
			return b.at - a.at;
		});
	}, [
		localEntries,
		sort,
		loved
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-screen",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DepthBackground, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "relative z-10 mx-auto max-w-3xl px-6 pt-12 sm:pt-20",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between font-meta text-[11px] uppercase tracking-[0.28em] text-ink-soft",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "hover:text-foreground",
							children: "← 回到首页"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Harbor" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-6 hairline" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-8 font-serif text-5xl leading-[1.05] tracking-tight text-foreground sm:text-6xl",
						children: "停靠过的词"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-4 max-w-xl font-cn text-base leading-relaxed text-ink-soft sm:text-lg",
						children: [
							"你收下的每一枚词，",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", { className: "sm:hidden" }),
							"都在这里安静地停着。"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-8 hairline" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex flex-wrap items-baseline justify-between gap-3 font-meta text-[11px] uppercase tracking-[0.24em] text-ink-soft",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							"共 ",
							items.length,
							" 枚"
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mr-2 hidden sm:inline",
								children: "排序"
							}), SORTS.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center",
								children: [i > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mx-2 text-ink-soft/50",
									children: "·"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setSort(s.key),
									className: "transition hover:text-foreground " + (sort === s.key ? "text-foreground underline decoration-foreground/60 decoration-1 underline-offset-[6px]" : ""),
									children: s.label
								})]
							}, s.key))]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative z-10 mx-auto mt-10 max-w-3xl px-6 pb-24",
				children: [
					items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-md border border-dashed border-border bg-card/70 px-6 py-10 text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-serif text-2xl text-foreground",
							children: "这里还是空的"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 font-cn text-sm leading-relaxed text-ink-soft",
							children: [
								"这里只显示当前用户保存在本地的词。",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"新用户第一次打开时，应该看到空白状态。"
							]
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MotionConfig, {
						transition: {
							type: "spring",
							stiffness: 260,
							damping: 32,
							mass: .9
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutGroup, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "grid grid-cols-1 gap-4 sm:grid-cols-2",
							children: items.map((c, idx) => {
								const itemKey = c.id ?? c.w;
								const isOpen = openId === itemKey;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.li, {
									layout: true,
									initial: false,
									onClick: () => setOpenId(isOpen ? null : itemKey),
									style: { willChange: "transform" },
									className: "group relative cursor-pointer rounded-md border border-border bg-card p-6 transition-shadow duration-500 " + (isOpen ? "sm:col-span-2 shadow-[0_30px_60px_-30px_rgba(60,40,20,0.4)]" : "shadow-[0_20px_40px_-30px_rgba(60,40,20,0.25)] hover:shadow-[0_24px_48px_-28px_rgba(60,40,20,0.35)]"),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											"aria-label": c.loved ? "取消留下" : "留下这枚词",
											onClick: (e) => {
												e.stopPropagation();
												setLoved((current) => ({
													...current,
													[itemKey]: !current[itemKey]
												}));
											},
											className: "absolute right-5 top-5 font-meta text-xl leading-none text-ink-soft transition hover:text-foreground",
											title: c.loved ? "已留下" : "想留下",
											children: c.loved ? "♥" : "♡"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-meta text-[11px] uppercase tracking-[0.24em] text-ink-soft",
											children: c.date
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-3 font-serif leading-tight text-foreground transition-[font-size] duration-500 ease-out " + (isOpen ? "text-5xl" : "text-3xl"),
											children: c.w
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-1 flex flex-wrap items-baseline gap-x-4 font-meta text-[11px] uppercase tracking-[0.2em] text-ink-soft",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: c.l }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
												initial: false,
												children: isOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
													initial: {
														opacity: 0,
														x: -4
													},
													animate: {
														opacity: 1,
														x: 0
													},
													exit: {
														opacity: 0,
														x: -4
													},
													transition: { duration: .3 },
													className: "font-serif normal-case tracking-normal",
													children: c.pron
												}, "pron")
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-4 font-cn text-base leading-relaxed text-foreground",
											children: c.g
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
											initial: false,
											mode: "popLayout",
											children: isOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
												initial: { opacity: 0 },
												animate: { opacity: 1 },
												exit: { opacity: 0 },
												transition: {
													duration: .35,
													ease: "easeOut",
													delay: .05
												},
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "my-6 hairline" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DefRow, {
														label: "为什么是这一枚",
														children: c.why
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DefRow, {
														label: "文化说明",
														children: c.culture
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-6 hairline" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														className: "mt-4 font-cn text-sm text-ink-soft",
														children: ["— ", c.note]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "mt-6 flex items-center justify-between gap-4",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
															onClick: (e) => {
																e.stopPropagation();
																onShare(c, idx);
															},
															className: "inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2 font-meta text-sm tracking-wide text-primary-foreground transition hover:opacity-90",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "把这枚词做成卡片" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "→" })]
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "font-meta text-[11px] uppercase tracking-[0.24em] text-ink-soft",
															children: "点一下收起 ↑"
														})]
													})
												]
											}, "more")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
											initial: false,
											mode: "popLayout",
											children: !isOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
												initial: { opacity: 0 },
												animate: { opacity: 1 },
												exit: { opacity: 0 },
												transition: { duration: .25 },
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-4 hairline" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "mt-3 font-cn text-sm text-ink-soft",
													children: ["— ", c.note]
												})]
											}, "brief")
										})
									]
								}, itemKey);
							})
						}) })
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
function DefRow({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid grid-cols-1 gap-2 py-3 sm:grid-cols-[140px_1fr] sm:gap-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "font-meta text-[11px] uppercase tracking-[0.24em] text-ink-soft",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-cn text-base leading-[1.85] text-foreground",
			children
		})]
	});
}
//#endregion
export { Harbor as component };
