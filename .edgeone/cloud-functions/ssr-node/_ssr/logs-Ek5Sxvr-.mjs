import { o as __toESM } from "../_runtime.mjs";
import { n as listRecentWords } from "./localHistory-zaoMvSap.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as listFeedback } from "./feedbackLog-PfPkfRra.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/logs-Ek5Sxvr-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Logs() {
	const [feedback, setFeedback] = (0, import_react.useState)([]);
	const [history, setHistory] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		setFeedback(listFeedback());
		setHistory(listRecentWords(200));
	}, []);
	const exportAll = () => {
		const data = {
			feedback,
			history,
			exportedAt: (/* @__PURE__ */ new Date()).toISOString()
		};
		const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `youci-keqi-logs-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.json`;
		a.click();
		URL.revokeObjectURL(url);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-screen bg-paper",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "mx-auto max-w-3xl px-6 pt-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "font-meta text-xs uppercase tracking-[0.24em] text-ink-soft hover:text-foreground",
					children: "← 回到首页"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: exportAll,
					className: "rounded-full bg-foreground px-4 py-1.5 font-meta text-xs tracking-wide text-primary-foreground",
					children: "导出 JSON"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-6 font-serif text-3xl text-foreground",
				children: "数据记录"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-3xl px-6 pb-24",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "mt-12 font-meta text-sm uppercase tracking-[0.2em] text-ink-soft",
					children: [
						"搜索历史 (",
						history.length,
						")"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 space-y-2",
					children: history.map((entry, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded border border-border bg-card p-3 font-mono text-xs text-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-ink-soft",
								children: entry.createdAt?.slice(0, 19)
							}),
							" · ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: entry.word }),
							" (",
							entry.language,
							")",
							" ← ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-ink-soft",
								children: entry.userText?.slice(0, 60)
							})
						]
					}, entry.id ?? i))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "mt-12 font-meta text-sm uppercase tracking-[0.2em] text-ink-soft",
					children: [
						"反馈记录 (",
						feedback.length,
						")"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 space-y-2",
					children: feedback.map((entry, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded border border-border bg-card p-3 font-mono text-xs text-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: entry.rating === "准" ? "text-green-700" : "text-red-700",
								children: entry.rating === "准" ? "✓" : "✗"
							}),
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-ink-soft",
								children: entry.timestamp?.slice(0, 19)
							}),
							" · ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: entry.word }),
							entry.inputLanguage && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								" (",
								entry.inputLanguage,
								")"
							] }),
							" ← ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-ink-soft",
								children: entry.userText?.slice(0, 60)
							}),
							entry.inputConfidence && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [" ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-ink-soft",
								children: [
									"[",
									entry.inputConfidence,
									"]"
								]
							})] })
						]
					}, i))
				}),
				feedback.length === 0 && history.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-8 font-cn text-sm text-ink-soft",
					children: "暂无数据。搜索一些词并点击\"准/不准\"按钮后，数据会出现在这里。"
				})
			]
		})]
	});
}
//#endregion
export { Logs as component };
