import type { SavedWordEntry, SceneTag, WordMatchResult } from "@/types/wordMatch";

const HISTORY_KEY = "ycqx:history";
const SAVED_KEY = "ycqx:saved";
const SEQ_KEY = "ycqx:seq";

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
}

function nextSeq(): number {
  const cur = Number(readJson<string | number>(SEQ_KEY, 0)) || 0;
  const next = cur + 1;
  writeJson(SEQ_KEY, String(next));
  return next;
}

function makeEntry(
  result: WordMatchResult,
  userText: string,
  scene: SceneTag,
): SavedWordEntry {
  return {
    ...result,
    id: `${Date.now()}-${result.word}`,
    userText,
    scene,
    saved: false,
    createdAt: new Date().toISOString(),
    seq: nextSeq(),
  };
}

export function listRecentWords(limit = 8): SavedWordEntry[] {
  return readJson<SavedWordEntry[]>(HISTORY_KEY, []).slice(0, limit);
}

export function listSavedWords(): SavedWordEntry[] {
  return readJson<SavedWordEntry[]>(SAVED_KEY, []);
}

export function addHistoryEntry(
  result: WordMatchResult,
  userText: string,
  scene: SceneTag,
): SavedWordEntry {
  const entry = makeEntry(result, userText, scene);
  const history = readJson<SavedWordEntry[]>(HISTORY_KEY, []);
  writeJson(HISTORY_KEY, [entry, ...history].slice(0, 12));
  return entry;
}

export function isWordSaved(id?: string) {
  if (!id) {
    return false;
  }

  return listSavedWords().some((saved) => saved.id === id);
}

export function setSavedWord(entry: SavedWordEntry, saved: boolean): SavedWordEntry {
  const savedWords = listSavedWords();
  const exists = savedWords.some((saved) => saved.id === entry.id);
  const updatedEntry = { ...entry, saved };

  if (saved) {
    writeJson(
      SAVED_KEY,
      exists
        ? savedWords.map((item) => (item.id === entry.id ? updatedEntry : item))
        : [updatedEntry, ...savedWords],
    );
  } else if (exists) {
    writeJson(
      SAVED_KEY,
      savedWords.filter((saved) => saved.id !== entry.id),
    );
  }

  const history = readJson<SavedWordEntry[]>(HISTORY_KEY, []).map((item) =>
    item.id === entry.id ? updatedEntry : item,
  );
  writeJson(HISTORY_KEY, history);

  return updatedEntry;
}

export function toggleSavedWord(entry: SavedWordEntry): SavedWordEntry {
  return setSavedWord(entry, !isWordSaved(entry.id));
}

export function findHistoryEntry(
  word: string,
  language: string,
  userText: string,
  scene: SceneTag,
): SavedWordEntry | null {
  const history = readJson<SavedWordEntry[]>(HISTORY_KEY, []);
  return (
    history.find(
      (item) =>
        item.word === word &&
        item.language === language &&
        item.userText === userText &&
        item.scene === scene,
    ) ?? null
  );
}

export function replaceHistoryEntry(
  entry: SavedWordEntry,
  result: WordMatchResult,
): SavedWordEntry {
  const updatedEntry: SavedWordEntry = {
    ...entry,
    ...result,
  };

  const history = readJson<SavedWordEntry[]>(HISTORY_KEY, []).map((item) =>
    item.id === entry.id ? updatedEntry : item,
  );
  writeJson(HISTORY_KEY, history);

  const savedWords = readJson<SavedWordEntry[]>(SAVED_KEY, []).map((item) =>
    item.id === entry.id ? updatedEntry : item,
  );
  writeJson(SAVED_KEY, savedWords);

  return updatedEntry;
}
