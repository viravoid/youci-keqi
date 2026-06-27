//#region node_modules/.nitro/vite/services/ssr/assets/localHistory-zaoMvSap.js
var HISTORY_KEY = "ycqx:history";
var SAVED_KEY = "ycqx:saved";
var SEQ_KEY = "ycqx:seq";
function readJson(key, fallback) {
	if (typeof window === "undefined") return fallback;
	try {
		const raw = window.localStorage.getItem(key);
		return raw ? JSON.parse(raw) : fallback;
	} catch {
		return fallback;
	}
}
function writeJson(key, value) {
	if (typeof window === "undefined") return;
	window.localStorage.setItem(key, JSON.stringify(value));
}
function nextSeq() {
	const next = (Number(readJson(SEQ_KEY, 0)) || 0) + 1;
	writeJson(SEQ_KEY, String(next));
	return next;
}
function makeEntry(result, userText, scene) {
	return {
		...result,
		id: `${Date.now()}-${result.word}`,
		userText,
		scene,
		saved: false,
		createdAt: (/* @__PURE__ */ new Date()).toISOString(),
		seq: nextSeq()
	};
}
function listRecentWords(limit = 8) {
	return readJson(HISTORY_KEY, []).slice(0, limit);
}
function listSavedWords() {
	return readJson(SAVED_KEY, []);
}
function addHistoryEntry(result, userText, scene) {
	const entry = makeEntry(result, userText, scene);
	writeJson(HISTORY_KEY, [entry, ...readJson(HISTORY_KEY, [])].slice(0, 12));
	return entry;
}
function toggleSavedWord(entry) {
	const savedWords = listSavedWords();
	const exists = savedWords.some((saved) => saved.id === entry.id);
	const updatedEntry = {
		...entry,
		saved: !exists
	};
	if (exists) writeJson(SAVED_KEY, savedWords.filter((saved) => saved.id !== entry.id));
	else writeJson(SAVED_KEY, [updatedEntry, ...savedWords]);
	writeJson(HISTORY_KEY, readJson(HISTORY_KEY, []).map((item) => item.id === entry.id ? updatedEntry : item));
	return updatedEntry;
}
function replaceHistoryEntry(entry, result) {
	const updatedEntry = {
		...entry,
		...result
	};
	writeJson(HISTORY_KEY, readJson(HISTORY_KEY, []).map((item) => item.id === entry.id ? updatedEntry : item));
	writeJson(SAVED_KEY, readJson(SAVED_KEY, []).map((item) => item.id === entry.id ? updatedEntry : item));
	return updatedEntry;
}
//#endregion
export { toggleSavedWord as i, listRecentWords as n, replaceHistoryEntry as r, addHistoryEntry as t };
