import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react, t as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { i as motion, s as AnimatePresence } from "../_libs/framer-motion.mjs";
import { P as useRouter, c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, l as useRouterState, m as createFileRoute, p as lazyRouteComponent, s as Scripts } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as useTheme, n as PALETTES, r as ThemeProvider, t as FONTS } from "./theme-C3romkWH.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { a as objectType, c as ZodError, i as numberType, n as booleanType, o as preprocessType, r as enumType, s as stringType, t as arrayType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-BOV_yCyF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-ClFK1gzm.css";
var huiwen_mincho_default = "/assets/huiwen-mincho-C0Adyr1_.woff2";
var xiaodou_utopia_default = "/assets/xiaodou-utopia-3loycbrp.woff2";
var wuqiuyingyuzhong_default = "/assets/wuqiuyingyuzhong-CSTod2-p.woff2";
var cormorant_garamond_default = "/assets/cormorant-garamond-CUoBjw-S.woff2";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
function ThemeMenu() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const { mode, palette, font, setMode, setPalette, setFont } = useTheme();
	(0, import_react.useEffect)(() => {
		setOpen(false);
	}, [pathname]);
	const applyMode = (nextMode) => {
		setMode(nextMode);
		setOpen(false);
	};
	const applyPalette = (nextPalette) => {
		setPalette(nextPalette);
		setOpen(false);
	};
	const applyFont = (nextFont) => {
		setFont(nextFont);
		setOpen(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed right-4 top-4 z-40 sm:right-6 sm:top-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.button, {
			whileHover: { y: -1 },
			whileTap: { scale: .94 },
			onClick: () => setOpen((v) => !v),
			"aria-label": "阅览设置",
			className: "flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/90 text-foreground shadow-[0_10px_30px_-15px_rgba(0,0,0,0.35)] backdrop-blur transition hover:border-foreground",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-serif text-lg leading-none",
				children: mode === "dark" ? "☾" : "☀"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			initial: { opacity: 0 },
			animate: { opacity: 1 },
			exit: { opacity: 0 },
			onClick: () => setOpen(false),
			className: "fixed inset-0 bg-black/10 backdrop-blur-[1px]"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				opacity: 0,
				y: -8,
				scale: .97
			},
			animate: {
				opacity: 1,
				y: 0,
				scale: 1
			},
			exit: {
				opacity: 0,
				y: -8,
				scale: .97
			},
			transition: {
				duration: .2,
				ease: "easeOut"
			},
			className: "fixed right-4 top-16 z-50 w-[min(280px,calc(100vw-2rem))] max-h-[calc(100vh-5rem)] overflow-y-auto rounded-2xl border border-border bg-card p-5 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.4)] sm:right-6 sm:top-[4.5rem] sm:rounded-md",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-meta text-[10px] uppercase tracking-[0.28em] text-ink-soft",
					children: "阅览"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 flex rounded-full border border-border p-0.5",
					children: ["light", "dark"].map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => applyMode(m),
						className: "flex-1 rounded-full py-1.5 font-meta text-xs tracking-wide transition " + (mode === m ? "bg-foreground text-primary-foreground" : "text-ink-soft hover:text-foreground"),
						children: m === "light" ? "日间" : "夜间"
					}, m))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5 font-meta text-[10px] uppercase tracking-[0.28em] text-ink-soft",
					children: "配色"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 grid grid-cols-2 gap-2",
					children: PALETTES.map((p) => {
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => applyPalette(p.key),
							className: "flex items-center gap-2 rounded-md border p-2 text-left transition " + (palette === p.key ? "border-foreground" : "border-border hover:border-foreground/60"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex h-6 w-6 overflow-hidden rounded-full ring-1 ring-border",
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
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5 font-meta text-[10px] uppercase tracking-[0.28em] text-ink-soft",
					children: "字体"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 space-y-1.5",
					children: FONTS.map((f) => {
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => applyFont(f.key),
							className: "flex w-full items-center justify-between rounded-md border px-3 py-2 text-left transition " + (font === f.key ? "border-foreground" : "border-border hover:border-foreground/60"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block truncate font-meta text-sm tracking-wide text-foreground",
									children: f.label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-0.5 block truncate font-meta text-[10px] uppercase tracking-[0.18em] text-ink-soft",
									children: f.hint
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"data-font": f.key,
								className: "ml-3 shrink-0 font-serif text-xl leading-none text-foreground",
								children: "Aa 字"
							})]
						}, f.key);
					})
				})
			]
		})] }) })]
	});
}
/**
* Page-to-page fade + lift transition. Wraps the router <Outlet />.
* The pathname key drives AnimatePresence so each route gets its own
* enter/exit pass, avoiding the "snap" between pages.
*/
function PageTransition({ children }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
		mode: "sync",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			initial: false,
			animate: {
				opacity: 1,
				y: 0
			},
			exit: {
				opacity: 0,
				y: -6
			},
			transition: {
				duration: .2,
				ease: "easeOut"
			},
			children
		}, pathname)
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "页面不存在"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "你访问的页面不存在，或者已经被移动了。"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "返回首页"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "页面加载失败"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "页面刚刚出了点问题。你可以重试，或者先回到首页。"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "重试"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "返回首页"
					})]
				})
			]
		})
	});
}
var Route$7 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "有词可栖" },
			{
				name: "description",
				content: "给说不清的感受，一个可以停靠的词。"
			},
			{
				name: "author",
				content: "femAI 黑客松"
			},
			{
				property: "og:title",
				content: "有词可栖"
			},
			{
				property: "og:description",
				content: "给说不清的感受，一个可以停靠的词。"
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary"
			},
			{
				name: "twitter:title",
				content: "有词可栖"
			},
			{
				name: "twitter:description",
				content: "给说不清的感受，一个可以停靠的词。"
			}
		],
		links: [{
			rel: "stylesheet",
			href: styles_default
		}]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "zh-CN",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("head", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { dangerouslySetInnerHTML: { __html: `@font-face{font-family:"Cormorant Garamond";src:url(${cormorant_garamond_default}) format("woff2");font-weight:400;font-style:normal;font-display:swap}@font-face{font-family:"WuQiu Hand";src:url(${wuqiuyingyuzhong_default}) format("woff2");font-weight:400;font-style:normal;font-display:swap}@font-face{font-family:"Huiwen Mincho";src:url(${huiwen_mincho_default}) format("woff2");font-weight:400;font-style:normal;font-display:swap}@font-face{font-family:"Xiaodou Utopia";src:url(${xiaodou_utopia_default}) format("woff2");font-weight:400;font-style:normal;font-display:swap}:root{--paper:#fff4e6;--ink:#4a2f4e;--ink-soft:#9b6b9e;--rule:#f1d4c2;--note:#ffe5d2;--seal:#ed6a8a;--card-bg:#fffaf2;--background:var(--paper);--foreground:var(--ink);--card:var(--card-bg);--card-foreground:var(--ink);--border:var(--rule)}html,body{background-color:var(--paper);color:var(--ink);font-family:"PingFang SC","Noto Serif CJK SC","Songti SC","SimSun",ui-serif,serif}` } }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$7.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ThemeProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeMenu, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageTransition, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) })] })
	});
}
var $$splitComponentImporter$3 = () => import("./share-C1U98pdu.mjs");
var Route$6 = createFileRoute("/share")({
	head: () => ({ meta: [
		{ title: "分享卡 · 有词可栖" },
		{
			name: "description",
			content: "把你刚收下的那枚词，做成一张可以送出去的卡片。"
		},
		{
			property: "og:title",
			content: "分享卡 · 有词可栖"
		},
		{
			property: "og:description",
			content: "把你刚收下的那枚词，做成一张可以送出去的卡片。"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./logs-Ek5Sxvr-.mjs");
var Route$5 = createFileRoute("/logs")({
	head: () => ({ meta: [{ title: "数据记录 · 有词可栖" }] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./harbor-Bqfd9smr.mjs");
var Route$4 = createFileRoute("/harbor")({
	head: () => ({ meta: [
		{ title: "停靠过的词 · 有词可栖" },
		{
			name: "description",
			content: "你曾收下的每一枚词，都停在这里。"
		},
		{
			property: "og:title",
			content: "停靠过的词 · 有词可栖"
		},
		{
			property: "og:description",
			content: "你曾收下的每一枚词，都停在这里。"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./routes-BhscTP4V.mjs");
var Route$3 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "有词可栖 · 给说不清的感受，一个可以停靠的词" },
		{
			name: "description",
			content: "输入一段难以言说的感受，AI 从多语言词库中为你寻得一枚最贴切的外语词。"
		},
		{
			property: "og:title",
			content: "有词可栖"
		},
		{
			property: "og:description",
			content: "给说不清的感受，一个可以停靠的词。"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var wordSeeds = /* @__PURE__ */ JSON.parse("[{\"word\":\"Razbliuto\",\"language\":\"俄语 · Russian\",\"pronunciation\":\"raz-BLYOO-toh\",\"shortMeaning\":\"曾经亲近过的人变得陌生后，留下的复杂余波。\",\"emotionTags\":[\"relationship_dissonance\",\"nostalgia\"],\"sceneTags\":[\"亲密关系\"],\"cultureNote\":\"这个词常见于跨语言情绪词整理中，常被用来描述旧有亲密感消退后的余波。具体词源和使用范围存在不确定性，更适合作为近似表达。\",\"sourceConfidence\":\"low\",\"keywords\":[\"陌生\",\"抵触\",\"亲近\",\"相处\",\"关系\",\"曾经\",\"爱\",\"变了\"]},{\"word\":\"Unheimlich\",\"language\":\"德语 · German\",\"pronunciation\":\"OON-hime-likh\",\"shortMeaning\":\"熟悉之物突然显得陌生、不安、难以靠近。\",\"emotionTags\":[\"relationship_dissonance\",\"context_mismatch\"],\"sceneTags\":[\"亲密关系\",\"日常瞬间\"],\"cultureNote\":\"德语中常被译作不安的、诡异的，也常用于讨论熟悉事物突然变得陌生的体验。\",\"sourceConfidence\":\"high\",\"keywords\":[\"熟悉\",\"陌生\",\"不安\",\"诡异\",\"错位\",\"抵触\",\"突然\"]},{\"word\":\"Saudade\",\"language\":\"葡萄牙语 · Portuguese\",\"pronunciation\":\"/sɐwˈdadʒi/\",\"shortMeaning\":\"对缺席之人、事物或时光的深长怀念，带着温柔和疼痛。\",\"emotionTags\":[\"nostalgia\",\"grief_bodyshock\"],\"sceneTags\":[\"亲密关系\",\"友情家庭\",\"日常瞬间\"],\"cultureNote\":\"Saudade 是葡语文化中常被提及的情绪词，常描述怀念、缺席和不可完全追回的亲密感。\",\"sourceConfidence\":\"high\",\"keywords\":[\"怀念\",\"想念\",\"缺席\",\"失去\",\"过去\",\"遗憾\",\"温柔\"]},{\"word\":\"物の哀れ\",\"language\":\"日语 · Japanese\",\"pronunciation\":\"MOH-noh noh ah-WAH-reh\",\"shortMeaning\":\"意识到事物无常时，被短暂之美轻轻触动的怅然。\",\"emotionTags\":[\"afterglow\",\"nostalgia\"],\"sceneTags\":[\"书影音余韵\",\"日常瞬间\"],\"cultureNote\":\"常被用来说明日本文学和审美中的物哀意识，强调对流逝与无常的敏感。\",\"sourceConfidence\":\"high\",\"keywords\":[\"无常\",\"流逝\",\"短暂\",\"美\",\"怅然\",\"电影\",\"书\",\"音乐\"]},{\"word\":\"幽玄\",\"language\":\"日语 · Japanese\",\"pronunciation\":\"YOO-gen\",\"shortMeaning\":\"深远、幽微、无法被直接说尽的美感和余韵。\",\"emotionTags\":[\"afterglow\",\"wordlessness\"],\"sceneTags\":[\"书影音余韵\",\"日常瞬间\"],\"cultureNote\":\"幽玄常见于日本传统美学语境，用来描述含蓄、深远而无法被直接说尽的体验。\",\"sourceConfidence\":\"high\",\"keywords\":[\"余韵\",\"幽微\",\"说不清\",\"深远\",\"美\",\"作品\",\"演唱会\",\"电影\"]},{\"word\":\"Duende\",\"language\":\"西班牙语 · Spanish\",\"pronunciation\":\"DWEN-deh\",\"shortMeaning\":\"艺术或表演中突然击中身体的幽暗力量与生命感。\",\"emotionTags\":[\"afterglow\",\"grief_bodyshock\"],\"sceneTags\":[\"书影音余韵\"],\"cultureNote\":\"Duende 常与弗拉门戈和艺术体验相关，近似描述一种从深处升起、让人被击中的表现力。\",\"sourceConfidence\":\"medium\",\"keywords\":[\"演唱会\",\"舞台\",\"艺术\",\"击中\",\"身体\",\"激动\",\"点亮\",\"light\"]},{\"word\":\"Sehnsucht\",\"language\":\"德语 · German\",\"pronunciation\":\"ZAYN-zookht\",\"shortMeaning\":\"对远方、未知或未抵达之物的强烈渴望。\",\"emotionTags\":[\"existential_exposure\",\"nostalgia\"],\"sceneTags\":[\"自我追问\",\"工作学业\",\"日常瞬间\"],\"cultureNote\":\"德语中常见的表达，包含渴望、追寻和无法完全满足的精神张力。\",\"sourceConfidence\":\"high\",\"keywords\":[\"远方\",\"渴望\",\"追问\",\"未来\",\"想要\",\"不满足\",\"未知\"]},{\"word\":\"Toska\",\"language\":\"俄语 · Russian\",\"pronunciation\":\"TOHS-kah\",\"shortMeaning\":\"没有明确对象的精神苦闷、渴望和空茫。\",\"emotionTags\":[\"existential_exposure\",\"wordlessness\"],\"sceneTags\":[\"自我追问\",\"日常瞬间\"],\"cultureNote\":\"Toska 常被解释为一种难以译出的精神忧郁或无名渴望，不宜当作临床诊断词。\",\"sourceConfidence\":\"medium\",\"keywords\":[\"空\",\"苦闷\",\"虚无\",\"说不清\",\"无名\",\"活着\",\"意义\"]},{\"word\":\"Weltschmerz\",\"language\":\"德语 · German\",\"pronunciation\":\"VELT-shmerts\",\"shortMeaning\":\"理想与现实落差带来的世界性疲惫和疼痛。\",\"emotionTags\":[\"context_mismatch\",\"existential_exposure\"],\"sceneTags\":[\"工作学业\",\"自我追问\"],\"cultureNote\":\"这个词常用来描述对世界现实的不满、幻灭与精神疲惫。\",\"sourceConfidence\":\"high\",\"keywords\":[\"现实\",\"理想\",\"疲惫\",\"世界\",\"失望\",\"幻灭\",\"压力\"]},{\"word\":\"Litost\",\"language\":\"捷克语 · Czech\",\"pronunciation\":\"LEE-tost\",\"shortMeaning\":\"意识到自身处境后涌上的屈辱、悲伤和自怜混合感。\",\"emotionTags\":[\"context_mismatch\",\"relationship_dissonance\"],\"sceneTags\":[\"亲密关系\",\"工作学业\",\"自我追问\"],\"cultureNote\":\"Litost 因米兰·昆德拉的解释而常被跨语言讨论，适合表达复杂的受伤和自我意识。\",\"sourceConfidence\":\"medium\",\"keywords\":[\"委屈\",\"屈辱\",\"自尊\",\"受伤\",\"比较\",\"评价\",\"不甘\"]},{\"word\":\"懐かしい\",\"language\":\"日语 · Japanese\",\"pronunciation\":\"naht-soo-KAH-shee\",\"shortMeaning\":\"某个旧物或旧场景唤起亲切、温柔的怀旧感。\",\"emotionTags\":[\"nostalgia\"],\"sceneTags\":[\"日常瞬间\",\"友情家庭\"],\"cultureNote\":\"日语中常用来表达怀念但不全然悲伤的旧日亲切感。\",\"sourceConfidence\":\"high\",\"keywords\":[\"小时候\",\"旧\",\"回忆\",\"亲切\",\"家\",\"朋友\",\"怀旧\"]},{\"word\":\"Hiraeth\",\"language\":\"威尔士语 · Welsh\",\"pronunciation\":\"HEER-eyeth\",\"shortMeaning\":\"对回不去的家园、时光或归属的深切想念。\",\"emotionTags\":[\"nostalgia\",\"existential_exposure\"],\"sceneTags\":[\"友情家庭\",\"自我追问\"],\"cultureNote\":\"Hiraeth 常被解释为对家园和归属的乡愁，但也带有不可返回的失落。\",\"sourceConfidence\":\"medium\",\"keywords\":[\"家\",\"归属\",\"回不去\",\"故乡\",\"离开\",\"想念\",\"人群\"]},{\"word\":\"Fernweh\",\"language\":\"德语 · German\",\"pronunciation\":\"FAIRN-vay\",\"shortMeaning\":\"对远方的疼痛般向往，像反向的乡愁。\",\"emotionTags\":[\"existential_exposure\"],\"sceneTags\":[\"日常瞬间\",\"自我追问\"],\"cultureNote\":\"德语里常用来描述对旅行、远方和未知生活的强烈向往。\",\"sourceConfidence\":\"high\",\"keywords\":[\"远方\",\"逃离\",\"旅行\",\"离开\",\"向往\",\"别处\"]},{\"word\":\"金継ぎ\",\"language\":\"日语 · Japanese\",\"pronunciation\":\"kin-TSOO-ghee\",\"shortMeaning\":\"破损之处被看见并成为新的纹理。\",\"emotionTags\":[\"grief_bodyshock\",\"self_repair\"],\"sceneTags\":[\"自我追问\",\"友情家庭\"],\"cultureNote\":\"金继原指用漆和金粉修补陶器的工艺，常被借用来表达裂痕与修复的美学。\",\"sourceConfidence\":\"high\",\"keywords\":[\"修复\",\"裂痕\",\"破碎\",\"受伤\",\"重新\",\"伤口\",\"恢复\"]},{\"word\":\"Jeong\",\"language\":\"韩语 · Korean\",\"pronunciation\":\"jung\",\"shortMeaning\":\"长时间相处后生出的牵连、情分和难以切断的温度。\",\"emotionTags\":[\"relationship_dissonance\",\"nostalgia\"],\"sceneTags\":[\"亲密关系\",\"友情家庭\"],\"cultureNote\":\"Jeong 常被用来描述人与人长期相处后形成的深厚情分和依恋。\",\"sourceConfidence\":\"medium\",\"keywords\":[\"相处\",\"情分\",\"朋友\",\"家人\",\"牵连\",\"舍不得\",\"旧关系\"]},{\"word\":\"Resfeber\",\"language\":\"瑞典语 · Swedish\",\"pronunciation\":\"RACE-fay-ber\",\"shortMeaning\":\"出发前混合着期待和紧张的心跳感。\",\"emotionTags\":[\"context_mismatch\",\"afterglow\"],\"sceneTags\":[\"工作学业\",\"日常瞬间\"],\"cultureNote\":\"常被解释为旅行前的不安与兴奋，也可近似表达重大开始前的混合感。\",\"sourceConfidence\":\"medium\",\"keywords\":[\"开始\",\"出发\",\"紧张\",\"期待\",\"心跳\",\"不确定\",\"新\"]},{\"word\":\"Depaysement\",\"language\":\"法语 · French\",\"pronunciation\":\"day-pay-eez-MAHN\",\"shortMeaning\":\"离开熟悉环境后产生的异乡感、错位感和重新看见自己。\",\"emotionTags\":[\"context_mismatch\",\"existential_exposure\"],\"sceneTags\":[\"自我追问\",\"工作学业\",\"日常瞬间\"],\"cultureNote\":\"法语中可描述脱离原有环境后的不适、陌生和新鲜感。\",\"sourceConfidence\":\"high\",\"keywords\":[\"离开\",\"人群\",\"环境\",\"陌生\",\"错位\",\"自己是谁\",\"异乡\"]},{\"word\":\"Mamihlapinatapai\",\"language\":\"雅甘语 · Yaghan\",\"pronunciation\":\"mah-mee-lah-pee-nah-tah-pie\",\"shortMeaning\":\"两个人都明白却都没有先开口的互相等待。\",\"emotionTags\":[\"relationship_dissonance\",\"wordlessness\"],\"sceneTags\":[\"亲密关系\",\"友情家庭\"],\"cultureNote\":\"常被跨语言词汇文章引用，但具体语境和流传解释需谨慎看待。\",\"sourceConfidence\":\"low\",\"keywords\":[\"不开口\",\"沉默\",\"等待\",\"彼此\",\"关系\",\"想说\",\"卡住\"]},{\"word\":\"Querencia\",\"language\":\"西班牙语 · Spanish\",\"pronunciation\":\"keh-REN-see-ah\",\"shortMeaning\":\"一个让自己感到安全、能恢复力量的精神栖身处。\",\"emotionTags\":[\"self_repair\",\"nostalgia\"],\"sceneTags\":[\"日常瞬间\",\"自我追问\",\"友情家庭\"],\"cultureNote\":\"这个词常被解释为人或动物感到安全、愿意返回的地方，也可作隐喻使用。\",\"sourceConfidence\":\"medium\",\"keywords\":[\"安全\",\"停靠\",\"栖身\",\"恢复\",\"地方\",\"靠近\",\"安心\"]},{\"word\":\"Sisu\",\"language\":\"芬兰语 · Finnish\",\"pronunciation\":\"SEE-soo\",\"shortMeaning\":\"在困难中继续向前的坚韧、胆气和内在硬度。\",\"emotionTags\":[\"self_repair\",\"context_mismatch\"],\"sceneTags\":[\"工作学业\",\"自我追问\"],\"cultureNote\":\"芬兰语中常见的文化概念，描述逆境中的坚毅和持续行动。\",\"sourceConfidence\":\"high\",\"keywords\":[\"坚持\",\"困难\",\"压力\",\"继续\",\"硬撑\",\"工作\",\"学习\"]}]");
var reviewAlternativeSchema = preprocessType((value) => typeof value === "string" ? {
	word: value,
	language: "unknown",
	reason: ""
} : value, objectType({
	word: stringType().default("unknown"),
	language: stringType().default("unknown"),
	reason: stringType().default("")
}));
var wordAlternativeSchema = preprocessType((value) => typeof value === "string" ? {
	word: value,
	language: "unknown",
	reason: ""
} : value, objectType({
	word: stringType().default("unknown"),
	language: stringType().default("unknown"),
	reason: stringType().default("")
}));
var wordMatchResultSchema = objectType({
	word: stringType().min(1),
	language: stringType().default("unknown"),
	pronunciation: stringType().default("—"),
	shortMeaning: stringType().min(1),
	matchConfidence: enumType([
		"high",
		"medium",
		"low"
	]).optional(),
	whyItFits: stringType().default(""),
	cultureNote: stringType().default(""),
	precision: objectType({
		preciseName: stringType().default(""),
		concreteExplanation: stringType().default(""),
		copyableExpression: stringType().default("")
	}).optional().default({
		preciseName: "",
		concreteExplanation: "",
		copyableExpression: ""
	}),
	alternatives: arrayType(wordAlternativeSchema).max(3).default([]),
	shareCopy: stringType().default(""),
	safetyNote: stringType().default("这不是心理诊断，只是帮助你寻找更贴近感受的表达。")
});
objectType({
	coreEvent: stringType().default(""),
	emotionalTrajectory: stringType().default(""),
	salientMotifs: arrayType(stringType().default("")).max(6).default([]),
	mustPreserve: arrayType(stringType().default("")).max(6).default([]),
	secondaryResonances: arrayType(stringType().default("")).max(6).default([]),
	surfaceOnlySignals: arrayType(stringType().default("")).max(6).default([])
});
var fitScoresSchema = objectType({
	coreFit: numberType().min(0).max(5),
	emotionFit: numberType().min(0).max(5),
	motifFit: numberType().min(0).max(5),
	scopeFit: numberType().min(0).max(5),
	specificityFit: numberType().min(0).max(5),
	culturalConfidence: numberType().min(0).max(5)
});
var candidateReviewSchema = objectType({
	word: stringType().default("unknown"),
	language: stringType().default("unknown"),
	role: enumType([
		"primary",
		"alternative",
		"reject"
	]).default("reject"),
	scores: fitScoresSchema.optional().default({
		coreFit: 0,
		emotionFit: 0,
		motifFit: 0,
		scopeFit: 0,
		specificityFit: 0,
		culturalConfidence: 0
	}),
	reason: stringType().default(""),
	boundary: stringType().default("")
});
objectType({
	verdict: enumType([
		"strong",
		"usable",
		"weak"
	]),
	score: numberType().min(0).max(100),
	reason: stringType().default(""),
	shouldSearch: booleanType().default(false),
	candidateReviews: arrayType(candidateReviewSchema).max(5).default([]),
	filteredAlternatives: arrayType(reviewAlternativeSchema).max(2).default([])
});
function getEnv() {
	return globalThis.process?.env ?? {};
}
function normalizeText(value) {
	return value.trim().toLocaleLowerCase();
}
function scoreCandidate(seed, input) {
	const text = normalizeText([input.userText, input.precisionContext].filter(Boolean).join("\n"));
	const keywordScore = seed.keywords.reduce((score, keyword) => text.includes(keyword.toLocaleLowerCase()) ? score + 6 : score, 0);
	const sceneScore = seed.sceneTags.includes(input.scene) ? 12 : 0;
	const emotionScore = seed.emotionTags.reduce((score, tag) => text.includes(tag.toLocaleLowerCase()) ? score + 3 : score, 0);
	return keywordScore + sceneScore + emotionScore;
}
function pickCandidates(input) {
	return [...wordSeeds].filter((seed) => seed.word !== input.excludedWord).map((seed, index) => ({
		seed,
		index,
		score: scoreCandidate(seed, input)
	})).sort((a, b) => b.score - a.score || a.index - b.index).slice(0, 8).map(({ seed }) => seed);
}
function extractJsonObject(content) {
	const trimmed = content.trim();
	if (trimmed.startsWith("{") && trimmed.endsWith("}")) return trimmed;
	const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
	if (fenced?.[1]) return fenced[1].trim();
	const first = trimmed.indexOf("{");
	const last = trimmed.lastIndexOf("}");
	if (first >= 0 && last > first) return trimmed.slice(first, last + 1);
	throw new Error("AI response did not contain a JSON object.");
}
function normalizeModelId(model) {
	return model.trim().replace(/[\s_]+/g, "-").toLocaleLowerCase();
}
function buildChatCompletionsUrl(baseUrl) {
	return `${baseUrl.replace(/\/+$/, "")}/chat/completions`;
}
function getChatCompletionText(payload) {
	const content = payload.choices?.[0]?.message?.content;
	if (typeof content === "string" && content.trim()) return content.trim();
	throw new Error("AI chat completion was empty.");
}
function resolveDeepSeekRuntimeConfig(env) {
	const apiKey = env.DEEPSEEK_API_KEY;
	if (!apiKey) throw new Error("DEEPSEEK_API_KEY is not configured.");
	return {
		apiKey,
		baseUrl: env.DEEPSEEK_BASE_URL || "https://api.deepseek.com",
		model: normalizeModelId(env.DEEPSEEK_MODEL || "deepseek-v4-flash")
	};
}
function normalizeAlternatives(alternatives, primaryWord) {
	const normalizedPrimary = normalizeText(primaryWord);
	const seen = /* @__PURE__ */ new Set();
	return alternatives.map((alternative) => ({
		...alternative,
		word: normalizeNativeWord(alternative.word, alternative.language)
	})).filter((alternative) => normalizeText(alternative.word) !== normalizedPrimary).filter((alternative) => {
		const key = `${normalizeText(alternative.word)}::${normalizeText(alternative.language)}`;
		if (seen.has(key)) return false;
		seen.add(key);
		return true;
	}).slice(0, 2);
}
function withAlternativeReasons(alternatives) {
	return alternatives.map((alternative) => ({
		...alternative,
		reason: alternative.reason?.trim() || "它和主词有相邻语义，但贴合度没有主词高。"
	}));
}
function normalizeMatchResult(result) {
	const normalizedWord = normalizeNativeWord(result.word, result.language);
	return {
		...result,
		word: normalizedWord,
		alternatives: normalizeAlternatives(withAlternativeReasons(result.alternatives), normalizedWord)
	};
}
function buildCandidateText(candidates) {
	return candidates.map((seed, index) => {
		const tags = [...seed.emotionTags, ...seed.sceneTags].join(", ");
		return `${index + 1}. ${seed.word} | ${seed.language} | ${seed.shortMeaning} | ${tags}`;
	}).join("\n");
}
function buildFirstPassPrompt(userText, scene, candidates, semanticFrame, precisionContext = "") {
	const candidateText = buildCandidateText(candidates);
	return [
		"You match a Chinese emotional description to a foreign-language word from a curated list.",
		"Return strict JSON only.",
		"",
		`Scene: ${scene}`,
		`User text: ${userText}`,
		`Precision context: ${precisionContext || "None."}`,
		`Core event: ${semanticFrame.coreEvent}`,
		`Emotional trajectory: ${semanticFrame.emotionalTrajectory}`,
		`Salient motifs: ${semanticFrame.salientMotifs.join(", ") || "None."}`,
		`Must preserve: ${semanticFrame.mustPreserve.join(", ") || "None."}`,
		`Secondary resonances: ${semanticFrame.secondaryResonances.join(", ") || "None."}`,
		`Surface-only signals: ${semanticFrame.surfaceOnlySignals.join(", ") || "None."}`,
		"",
		"Candidate words:",
		candidateText,
		"",
		"Output strict JSON:",
		`{
  "word": "",
  "language": "",
  "pronunciation": "",
  "shortMeaning": "",
  "matchConfidence": "high",
  "whyItFits": "",
  "cultureNote": "",
  "precision": {
    "preciseName": "",
    "concreteExplanation": "",
    "copyableExpression": ""
  },
  "alternatives": [
    { "word": "", "language": "", "reason": "" }
  ],
  "shareCopy": "",
  "safetyNote": ""
}`,
		"",
		"Rules:",
		"1. word must be in the original script (Japanese/Chinese/Russian etc.). Romanizations go in pronunciation only.",
		"2. shortMeaning is a concise Chinese explanation of the word's core meaning.",
		"3. matchConfidence: high (strong fit), medium (decent), low (loose).",
		"4. whyItFits must reference at least 2 specific clues from the user text. Address the user as '你' directly, never use third-person terms like '用户'.",
		"5. cultureNote provides detailed cultural context in Chinese — explain the word's origin, typical usage scenarios, and emotional connotations in its native language, at least 3-4 sentences.",
		"6. Alternatives: pick 2-3 from the candidate list that are close but not as good.",
		"7. shareCopy: a short, shareable sentence about this word in Chinese.",
		"8. safetyNote: a brief disclaimer that this is not psychological diagnosis.",
		"9. Do NOT use phrases like '接住你' '你不是敏感' '值得注意的是' '本质上' in the output.",
		"10. Do NOT use binary-contrast structures like '不是……而是……' in whyItFits."
	].join("\n");
}
function normalizeNativeWord(word, language) {
	if (!word) return word;
	const lang = normalizeText(language);
	if (lang.includes("english") || lang.includes("french") || lang.includes("spanish") || lang.includes("german") || lang.includes("portuguese") || lang.includes("italian") || lang.includes("dutch") || lang.includes("swedish") || lang.includes("norwegian") || lang.includes("danish") || lang.includes("finnish") || lang.includes("polish") || lang.includes("czech") || lang.includes("hungarian") || lang.includes("romanian") || lang.includes("turkish") || lang.includes("croatian") || lang.includes("serbian")) {
		const cleaned = word.trim();
		return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
	}
	return word.trim();
}
async function requestJson({ baseUrl, apiKey, model, prompt, schema }) {
	const controller = new AbortController();
	const timer = setTimeout(() => controller.abort(), 25e3);
	try {
		const response = await fetch(buildChatCompletionsUrl(baseUrl), {
			method: "POST",
			headers: {
				Authorization: `Bearer ${apiKey}`,
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				model,
				messages: [{
					role: "system",
					content: "You are a careful structured-output assistant. Return valid json only and never add markdown fences."
				}, {
					role: "user",
					content: prompt
				}],
				temperature: .35,
				max_tokens: 2600,
				response_format: { type: "json_object" }
			}),
			signal: controller.signal
		});
		if (!response.ok) throw new Error(`AI request failed with status ${response.status}.`);
		const jsonText = extractJsonObject(getChatCompletionText(await response.json()));
		try {
			return schema.parse(JSON.parse(jsonText));
		} catch (parseErr) {
			const fixed = jsonText.replace(/,\s*}/g, "}").replace(/,\s*]/g, "]").replace(/([{,]\s*)(\w+)(\s*:)/g, "$1\"$2\"$3");
			return schema.parse(JSON.parse(fixed));
		}
	} finally {
		clearTimeout(timer);
	}
}
async function requestWordMatch(args) {
	return normalizeMatchResult(await requestJson({
		...args,
		schema: wordMatchResultSchema
	}));
}
async function realMatchWord(input) {
	const runtime = resolveDeepSeekRuntimeConfig(getEnv());
	const candidates = pickCandidates(input);
	return requestWordMatch({
		baseUrl: runtime.baseUrl,
		apiKey: runtime.apiKey,
		model: runtime.model,
		prompt: buildFirstPassPrompt(input.userText, input.scene, candidates, {
			coreEvent: "",
			emotionalTrajectory: "",
			salientMotifs: [],
			mustPreserve: [],
			secondaryResonances: [],
			surfaceOnlySignals: []
		}, input.precisionContext)
	});
}
var sceneSchema = enumType([
	"亲密关系",
	"日常瞬间",
	"书影音余韵",
	"友情家庭",
	"工作学业",
	"自我追问"
]);
var matchWordRequestSchema = objectType({
	userText: stringType().trim().min(4, "请再多写一点，让我能辨认具体线索。"),
	scene: sceneSchema,
	excludedWord: stringType().optional(),
	precisionContext: stringType().optional()
});
var Route$2 = createFileRoute("/api/match-word")({ server: { handlers: { POST: async ({ request }) => {
	const ts = (/* @__PURE__ */ new Date()).toISOString();
	let parsed;
	try {
		parsed = matchWordRequestSchema.parse(await request.json());
		console.log(`[match-word ${ts}] input:`, JSON.stringify({
			userText: parsed.userText.slice(0, 80),
			scene: parsed.scene
		}));
	} catch (error) {
		return Response.json({ error: error instanceof ZodError ? error.issues[0]?.message : "请求格式不正确。" }, { status: 400 });
	}
	try {
		const result = await realMatchWord(parsed);
		console.log(`[match-word ${ts}] output:`, JSON.stringify({
			word: result.word,
			language: result.language,
			confidence: result.matchConfidence,
			shortMeaning: result.shortMeaning?.slice(0, 60),
			cultureNote: result.cultureNote?.slice(0, 80)
		}));
		return Response.json(result);
	} catch (error) {
		const errMsg = error instanceof Error ? error.message : String(error);
		console.error("[match-word] real matcher failed:", errMsg);
		return Response.json({ error: `词语匹配服务暂时不可用：${errMsg}` }, { status: 502 });
	}
} } } });
var feedbackSchema = objectType({
	word: stringType().min(1),
	userText: stringType().min(1),
	scene: stringType(),
	inputWord: stringType(),
	inputLanguage: stringType(),
	inputConfidence: stringType(),
	rating: enumType(["准", "不准"]),
	timestamp: stringType()
});
var Route$1 = createFileRoute("/api/feedback")({ server: { handlers: { POST: async ({ request }) => {
	const ts = (/* @__PURE__ */ new Date()).toISOString();
	try {
		const body = feedbackSchema.parse(await request.json());
		console.log(`[feedback ${ts}] rating=${body.rating} word="${body.word}" matched="${body.inputWord}" lang=${body.inputLanguage} conf=${body.inputConfidence} scene=${body.scene} input="${body.userText.slice(0, 120)}"`);
		return Response.json({ ok: true });
	} catch (error) {
		const msg = error instanceof ZodError ? error.issues[0]?.message : "Invalid";
		console.error(`[feedback ${ts}] ERR:`, msg);
		return Response.json({ error: msg }, { status: 400 });
	}
} } } });
function buildAlternativeDetailPrompt(word, language, userText, scene, precisionContext = "") {
	return `你是"有词可栖"的跨语言情绪表达助手。

用户正在考虑一个备选词是否比已匹配的词更适合TA的感受。请为这个备选词生成完整信息。

备选词：${word}（${language}）
场景：${scene}
用户输入：${userText}
表达精度线索：${precisionContext || "用户未额外补充。"}

要求：
1. shortMeaning 用简短中文解释这个词的核心含义。
2. whyItFits 必须说明它为什么适合这段感受，并引用或转述用户文本里的至少两个具体线索。
3. cultureNote 写 3-4 句文化说明（起源、使用语境、近似用法）。
4. shareCopy 要像用户自己的心声，不要用"原来……""或许……""也许……"等通用文艺句式。
5. 不要写成心理诊断、人格判断或治疗建议。
6. 如果文化背景不确定，请使用"常见解释""近似用法""常被用来描述"等措辞。
7. whyItFits 和 shareCopy 不要使用"不是因为……而是……""真正的……不是……而是……""不只是……更是……"等二元对比句；不要使用"接住你""你不是敏感""我懂你""粗暴归类""值得注意的是""本质上""亲爱的""愿你""请记住""在这……的时代"等安抚腔或旁白词。
8. 输出必须是严格 JSON，不要输出 Markdown。

JSON 字段固定为：
{
  "word": "${word}",
  "language": "${language}",
  "shortMeaning": "",
  "whyItFits": "",
  "cultureNote": "",
  "shareCopy": ""
}`;
}
var detailSchema = objectType({
	word: stringType().min(1),
	language: stringType().min(1),
	userText: stringType().min(1),
	scene: stringType().min(1),
	precisionContext: stringType().optional()
});
var resultSchema = objectType({
	word: stringType(),
	language: stringType(),
	shortMeaning: stringType().default(""),
	whyItFits: stringType().default(""),
	cultureNote: stringType().default(""),
	shareCopy: stringType().default("")
});
var Route = createFileRoute("/api/alternative-detail")({ server: { handlers: { POST: async ({ request }) => {
	const ts = (/* @__PURE__ */ new Date()).toISOString();
	let body;
	try {
		body = detailSchema.parse(await request.json());
	} catch (e) {
		return Response.json({ error: e instanceof ZodError ? e.issues[0]?.message : "Invalid" }, { status: 400 });
	}
	const apiKey = process.env.DEEPSEEK_API_KEY || "";
	if (!apiKey) return Response.json({ error: "API key not configured" }, { status: 500 });
	const prompt = buildAlternativeDetailPrompt(body.word, body.language, body.userText, body.scene, body.precisionContext);
	console.log(`[alt-detail ${ts}] word="${body.word}" lang=${body.language}`);
	const controller = new AbortController();
	const timer = setTimeout(() => controller.abort(), 25e3);
	try {
		const resp = await fetch("https://api.deepseek.com/v1/chat/completions", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${apiKey}`,
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				model: "deepseek-chat",
				messages: [{
					role: "system",
					content: "Return valid JSON only, no markdown."
				}, {
					role: "user",
					content: prompt
				}],
				temperature: .35,
				max_tokens: 1200,
				response_format: { type: "json_object" }
			}),
			signal: controller.signal
		});
		if (!resp.ok) throw new Error(`AI request failed: ${resp.status}`);
		let json = ((await resp.json())?.choices?.[0]?.message?.content || "").replace(/,\s*}/g, "}").replace(/,\s*]/g, "]");
		json = json.replace(/([{,]\s*)(\w+)(\s*:)/g, "$1\"$2\"$3");
		const parsed = resultSchema.parse(JSON.parse(json));
		console.log(`[alt-detail ${ts}] done: meaning="${parsed.shortMeaning?.slice(0, 40)}"`);
		return Response.json(parsed);
	} catch (e) {
		console.error(`[alt-detail ${ts}] error:`, e instanceof Error ? e.message : String(e));
		return Response.json({ error: e instanceof Error ? e.message : "Failed" }, { status: 502 });
	} finally {
		clearTimeout(timer);
	}
} } } });
var ShareRoute = Route$6.update({
	id: "/share",
	path: "/share",
	getParentRoute: () => Route$7
});
var LogsRoute = Route$5.update({
	id: "/logs",
	path: "/logs",
	getParentRoute: () => Route$7
});
var HarborRoute = Route$4.update({
	id: "/harbor",
	path: "/harbor",
	getParentRoute: () => Route$7
});
var IndexRoute = Route$3.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$7
});
var ApiMatchWordRoute = Route$2.update({
	id: "/api/match-word",
	path: "/api/match-word",
	getParentRoute: () => Route$7
});
var ApiFeedbackRoute = Route$1.update({
	id: "/api/feedback",
	path: "/api/feedback",
	getParentRoute: () => Route$7
});
var rootRouteChildren = {
	IndexRoute,
	HarborRoute,
	LogsRoute,
	ShareRoute,
	ApiAlternativeDetailRoute: Route.update({
		id: "/api/alternative-detail",
		path: "/api/alternative-detail",
		getParentRoute: () => Route$7
	}),
	ApiFeedbackRoute,
	ApiMatchWordRoute
};
var routeTree = Route$7._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0,
		defaultErrorComponent: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "Something went wrong" })
	});
};
//#endregion
export { getRouter };
