//#region node_modules/.nitro/vite/services/ssr/assets/feedbackLog-PfPkfRra.js
var FEEDBACK_KEY = "ycqx:feedback-log";
function saveFeedback(result, userText, scene, rating) {
	if (typeof window === "undefined") return;
	const entry = {
		word: result.word,
		userText,
		scene,
		inputWord: result.word,
		inputLanguage: result.language ?? "",
		inputConfidence: result.matchConfidence ?? "",
		rating,
		timestamp: (/* @__PURE__ */ new Date()).toISOString()
	};
	try {
		const raw = window.localStorage.getItem(FEEDBACK_KEY);
		const existing = raw ? JSON.parse(raw) : [];
		window.localStorage.setItem(FEEDBACK_KEY, JSON.stringify([entry, ...existing].slice(0, 200)));
	} catch {}
	fetch("/api/feedback", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(entry)
	}).catch(() => {});
}
function listFeedback() {
	if (typeof window === "undefined") return [];
	try {
		const raw = window.localStorage.getItem(FEEDBACK_KEY);
		return raw ? JSON.parse(raw) : [];
	} catch {
		return [];
	}
}
//#endregion
export { saveFeedback as n, listFeedback as t };
