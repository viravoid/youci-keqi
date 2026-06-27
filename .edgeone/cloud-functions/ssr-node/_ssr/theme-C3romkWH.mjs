import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/theme-C3romkWH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ThemeCtx = (0, import_react.createContext)(null);
var PALETTES = [
	{
		key: "mist",
		label: "黄昏胶片",
		hint: "朝霞橙粉 · 茶藥紫",
		swatch: [
			"#fff4e6",
			"#ffd6b8",
			"#f8a5a5",
			"#9b6b9e"
		]
	},
	{
		key: "paper",
		label: "樱花胶片",
		hint: "奶油粉樱 · 少女日记",
		swatch: [
			"#fef0f5",
			"#f8c8d8",
			"#e88aab",
			"#6b4a5e"
		]
	},
	{
		key: "moss",
		label: "雾面梦海",
		hint: "冰蓝薄紫 · 超现实",
		swatch: [
			"#f0f4ff",
			"#c7d2fe",
			"#a78bfa",
			"#312e81"
		]
	},
	{
		key: "dusk",
		label: "湖心夜诗",
		hint: "深蓝湖水 · 老纸黄",
		swatch: [
			"#eaf2f0",
			"#5cbdb9",
			"#1e3a5f",
			"#f0e6c4"
		]
	}
];
var FONTS = [
	{
		key: "serif",
		label: "词典体",
		hint: "Cormorant · 思源宋"
	},
	{
		key: "modern",
		label: "打字机体",
		hint: "汇文明朝体"
	},
	{
		key: "hand",
		label: "信笺体",
		hint: "小豆岛桃源乡"
	}
];
var STORAGE = {
	mode: "ycqx:mode",
	palette: "ycqx:palette",
	font: "ycqx:font"
};
/** Hardcode palette fallbacks so inline style always wins over CSS cascade issues. */
var LIGHT_PALETTE = {
	mist: {
		"--paper": "#fff4e6",
		"--ink": "#4a2f4e",
		"--ink-soft": "#9b6b9e",
		"--rule": "#f1d4c2",
		"--note": "#ffe5d2",
		"--seal": "#ed6a8a",
		"--card-bg": "#fffaf2",
		"--grain-a": "rgba(248,165,165,0.16)",
		"--grain-b": "rgba(255,214,184,0.18)",
		"--bloom-a": "rgba(248,165,165,0.55)",
		"--bloom-b": "rgba(155,107,158,0.35)",
		"--bloom-c": "rgba(255,214,184,0.65)",
		"--accent-soft": "#ffd6b8"
	},
	paper: {
		"--paper": "#fef0f5",
		"--ink": "#5a3a4e",
		"--ink-soft": "#a47a8e",
		"--rule": "#f0c8d4",
		"--note": "#fde2ec",
		"--seal": "#e8568a",
		"--card-bg": "#fffafc",
		"--grain-a": "rgba(232,138,171,0.14)",
		"--grain-b": "rgba(248,200,216,0.18)",
		"--bloom-a": "rgba(248,200,216,0.6)",
		"--bloom-b": "rgba(232,138,171,0.4)",
		"--bloom-c": "rgba(254,240,245,0.9)",
		"--accent-soft": "#f8c8d8"
	},
	moss: {
		"--paper": "#f0f4ff",
		"--ink": "#312e81",
		"--ink-soft": "#6b6db8",
		"--rule": "#d4dcfb",
		"--note": "#e4ecff",
		"--seal": "#8b5cf6",
		"--card-bg": "#fafbff",
		"--grain-a": "rgba(167,139,250,0.14)",
		"--grain-b": "rgba(199,210,254,0.18)",
		"--bloom-a": "rgba(167,139,250,0.45)",
		"--bloom-b": "rgba(125,211,252,0.4)",
		"--bloom-c": "rgba(199,210,254,0.7)",
		"--accent-soft": "#c7d2fe"
	},
	dusk: {
		"--paper": "#eaf2f0",
		"--ink": "#0a1a2f",
		"--ink-soft": "#466b7a",
		"--rule": "#c5d8d6",
		"--note": "#d8e6e2",
		"--seal": "#2d8a9e",
		"--card-bg": "#f5faf8",
		"--grain-a": "rgba(92,189,185,0.15)",
		"--grain-b": "rgba(30,58,95,0.08)",
		"--bloom-a": "rgba(92,189,185,0.5)",
		"--bloom-b": "rgba(240,230,196,0.55)",
		"--bloom-c": "rgba(30,58,95,0.25)",
		"--accent-soft": "#b8d4e0"
	}
};
var DARK_PALETTE = {
	mist: {
		"--paper": "#2a1b2e",
		"--ink": "#ffe5d2",
		"--ink-soft": "#d4a8b8",
		"--rule": "#4a3340",
		"--note": "#3a2438",
		"--seal": "#ff9eb2",
		"--card-bg": "#321f36",
		"--grain-a": "rgba(248,165,165,0.12)",
		"--grain-b": "rgba(155,107,158,0.14)",
		"--bloom-a": "rgba(248,165,165,0.35)",
		"--bloom-b": "rgba(155,107,158,0.4)",
		"--bloom-c": "rgba(255,214,184,0.25)",
		"--accent-soft": "#6b3f50"
	},
	paper: {
		"--paper": "#1f1320",
		"--ink": "#fde2ec",
		"--ink-soft": "#d9a8b8",
		"--rule": "#3e2638",
		"--note": "#2a1828",
		"--seal": "#ff8ab0",
		"--card-bg": "#271828",
		"--grain-a": "rgba(232,138,171,0.14)",
		"--grain-b": "rgba(248,200,216,0.10)",
		"--bloom-a": "rgba(232,138,171,0.4)",
		"--bloom-b": "rgba(248,200,216,0.3)",
		"--bloom-c": "rgba(254,240,245,0.15)",
		"--accent-soft": "#5a2f44"
	},
	moss: {
		"--paper": "#0f0a2e",
		"--ink": "#e4ecff",
		"--ink-soft": "#a78bfa",
		"--rule": "#2a2a55",
		"--note": "#1a1640",
		"--seal": "#c4b5fd",
		"--card-bg": "#1a1442",
		"--grain-a": "rgba(167,139,250,0.18)",
		"--grain-b": "rgba(199,210,254,0.10)",
		"--bloom-a": "rgba(167,139,250,0.45)",
		"--bloom-b": "rgba(125,211,252,0.35)",
		"--bloom-c": "rgba(196,181,253,0.3)",
		"--accent-soft": "#3d2e6d"
	},
	dusk: {
		"--paper": "#0a1a2f",
		"--ink": "#f0e6c4",
		"--ink-soft": "#88b8b5",
		"--rule": "#1e3a5f",
		"--note": "#122642",
		"--seal": "#5cbdb9",
		"--card-bg": "#112742",
		"--grain-a": "rgba(92,189,185,0.16)",
		"--grain-b": "rgba(240,230,196,0.08)",
		"--bloom-a": "rgba(92,189,185,0.45)",
		"--bloom-b": "rgba(240,230,196,0.3)",
		"--bloom-c": "rgba(30,58,95,0.5)",
		"--accent-soft": "#1e3a5f"
	}
};
function applyPaletteInline(el, palette, mode) {
	const colors = mode === "dark" ? DARK_PALETTE[palette] : LIGHT_PALETTE[palette];
	for (const [key, value] of Object.entries(colors)) el.style.setProperty(key, value);
}
function ThemeProvider({ children }) {
	const [mode, setModeState] = (0, import_react.useState)("light");
	const [palette, setPaletteState] = (0, import_react.useState)("mist");
	const [font, setFontState] = (0, import_react.useState)("serif");
	(0, import_react.useEffect)(() => {
		try {
			const m = localStorage.getItem(STORAGE.mode);
			const p = localStorage.getItem(STORAGE.palette);
			const f = localStorage.getItem(STORAGE.font);
			if (m === "light" || m === "dark") setModeState(m);
			else if (typeof window !== "undefined" && window.matchMedia?.("(prefers-color-scheme: dark)").matches) setModeState("dark");
			if (p) setPaletteState(p);
			if (f) setFontState(f);
		} catch {}
	}, []);
	(0, import_react.useEffect)(() => {
		const el = document.documentElement;
		el.dataset.palette = palette;
		el.dataset.font = font;
		if (mode === "dark") el.classList.add("dark");
		else el.classList.remove("dark");
		applyPaletteInline(el, palette, mode);
	}, [
		mode,
		palette,
		font
	]);
	const setMode = (m) => {
		setModeState(m);
		try {
			localStorage.setItem(STORAGE.mode, m);
		} catch {}
	};
	const setPalette = (p) => {
		setPaletteState(p);
		try {
			localStorage.setItem(STORAGE.palette, p);
		} catch {}
	};
	const setFont = (f) => {
		setFontState(f);
		try {
			localStorage.setItem(STORAGE.font, f);
		} catch {}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeCtx.Provider, {
		value: {
			mode,
			palette,
			font,
			setMode,
			setPalette,
			setFont
		},
		children
	});
}
function useTheme() {
	const v = (0, import_react.useContext)(ThemeCtx);
	if (!v) throw new Error("useTheme must be used inside <ThemeProvider>");
	return v;
}
//#endregion
export { useTheme as i, PALETTES as n, ThemeProvider as r, FONTS as t };
