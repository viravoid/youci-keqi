import type { SavedWordEntry, WordMatchResult } from "@/types/wordMatch";
import { normalizeNativeWord } from "@/lib/wordOrthography";

export type WordResult = {
  word: string;
  language: string;
  pronunciation: string;
  meaning: string;
  whyForYou: string;
  culture: string;
  precision?: {
    preciseName: string;
    concreteExplanation: string;
    copyableExpression: string;
  };
  alternatives: { word: string; language: string; hint: string }[];
  shareText: string;
  safetyNote?: string;
  /** 用户当时输入的那段感受，用于分享卡可选展示。 */
  userInput?: string;
  /** 第几枚停靠过的词。saveLastWord 时自动赋值。 */
  seq?: number;
};

export const SAMPLE: WordResult = {
  word: "Saudade",
  language: "葡萄牙语 · Portuguese",
  pronunciation: "/sɐwˈdadʒi/",
  meaning:
    "一种温柔的忧伤——对某个不在身边的人、地方或时刻，怀有甜美而隐隐作痛的思念。",
  whyForYou:
    "这段感受的重点是：重要的人、地方或时刻不在眼前，但影响还在。Saudade 适合它，因为它同时包含想念、缺席和仍然珍惜的部分，不会把这段经验压成单纯的难过。",
  culture:
    "Saudade 是葡语文化中常被提及的情绪词，常描述怀念、缺席和不可完全追回的亲密感。",
  precision: {
    preciseName: "缺席感引发的温柔怀念",
    concreteExplanation:
      "一个人、地方或时刻不在眼前之后，仍然留下情绪余波。这里可以分成三层：事实上的缺席、主观上的想念，以及你仍然珍惜的部分。",
    copyableExpression:
      "我想表达的是：某个重要的人或时刻已经不在这里，但它留下的温柔还在影响我。",
  },
  alternatives: [
    { word: "Hiraeth", language: "威尔士语", hint: "对一个回不去的家的乡愁" },
    { word: "物の哀れ", language: "日语", hint: "对事物易逝之美的怅然" },
    { word: "Sehnsucht", language: "德语", hint: "对某种说不清之物的深切渴望" },
  ],
  shareText:
    "想念一个人时不必皱眉——\n你可以微笑着，让它留在心里某个温暖的房间。",
  safetyNote:
    "这不是心理诊断，也不是治疗建议；它只是帮助你寻找更贴近此刻感受的表达。",
};

const KEY = "ycqx:last-word";
const SEQ_KEY = "ycqx:seq";

function nextSeq(): number {
  try {
    const cur = Number(localStorage.getItem(SEQ_KEY) ?? "0") || 0;
    const next = cur + 1;
    localStorage.setItem(SEQ_KEY, String(next));
    return next;
  } catch {
    return 1;
  }
}

export function saveLastWord(w: WordResult) {
  try {
    const withSeq: WordResult = { ...w, seq: w.seq ?? nextSeq() };
    sessionStorage.setItem(KEY, JSON.stringify(withSeq));
  } catch {
    /* noop */
  }
}

export function toWordResult(
  result: WordMatchResult,
  userInput?: string,
  seq?: number,
): WordResult {
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
      hint: alternative.reason,
    })),
    shareText: result.shareCopy,
    safetyNote: result.safetyNote,
    userInput,
    seq,
  };
}

export function entryToWordResult(entry: SavedWordEntry): WordResult {
  return toWordResult(entry, entry.userText, entry.seq);
}

/** Set the "last word" without incrementing the user's word counter.
 *  Used when re-sharing an already-collected word from /harbor. */
export function setLastWord(w: WordResult) {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(w));
  } catch {
    /* noop */
  }
}

export function loadLastWord(): WordResult | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as WordResult) : null;
  } catch {
    return null;
  }
}

export function formatSeq(n: number | undefined): string {
  if (!n || n < 1) return "样本";
  return "No. " + String(n).padStart(3, "0");
}
