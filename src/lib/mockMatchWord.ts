import type { SceneTag, WordMatchResult, WordSeed } from "@/types/wordMatch";
import { buildPrecisionResult } from "./expressionPrecision";
import { wordSeeds } from "./wordData";

const fallbackSafetyNote =
  "这不是心理诊断，也不是治疗建议；它只是帮助你寻找更贴近此刻感受的表达。";

type FallbackWord = {
  word: string;
  language: string;
  pronunciation: string;
  shortMeaning: string;
  cultureNote: string;
  whyItFits: (userText: string, scene: SceneTag) => string;
  shareCopy: string;
};

const fallbackWordsByScene: Record<SceneTag, FallbackWord> = {
  亲密关系: {
    word: "saudade",
    language: "葡萄牙语",
    pronunciation: "sow-DAH-de",
    shortMeaning: "对缺席之人或失落关系的深长惦念",
    cultureNote: "常见解释是，它描述一种带着爱意和空缺感的想念。",
    whyItFits: (userText) =>
      `本地词库里的候选词都不够贴近，所以第二轮改为直接找更成熟的外语表达。你提到“${pickInputClues(userText)[0]}”和“${pickInputClues(userText)[1]}”，线索都指向一种关系仍留在心里、但人已经不在眼前的牵挂，saudade 更适合承接这种感受。`,
    shareCopy: "原来这种明知碰不到、却还一直留在心里的想念，可以用 saudade 来说。",
  },
  日常瞬间: {
    word: "mono no aware",
    language: "日语",
    pronunciation: "もののあわれ",
    shortMeaning: "对事物易逝之美生出的轻微感伤",
    cultureNote: "常被用来描述日常细节里稍纵即逝的美与惆怅。",
    whyItFits: (userText) =>
      `第一轮候选词匹配偏弱，所以第二轮不再硬贴词库。你写到“${pickInputClues(userText)[0]}”和“${pickInputClues(userText)[1]}”，更像是某个普通片刻突然变得很轻、又有点舍不得散去，mono no aware 更接近这种余味。`,
    shareCopy: "原来这种日常一闪而过、却让人心里轻轻一沉的感觉，可以用 mono no aware 来说。",
  },
  书影音余韵: {
    word: "sehnsucht",
    language: "德语",
    pronunciation: "ZAYN-zookt",
    shortMeaning: "对某种遥远而难以抵达之物的深切向往",
    cultureNote: "常见解释是，它指向一种被作品唤起的、说不清却很强的远望感。",
    whyItFits: (userText) =>
      `第一轮没有拿到足够强的库内匹配，所以第二轮直接换成知识型推荐。你提到“${pickInputClues(userText)[0]}”和“${pickInputClues(userText)[1]}”，更像作品结束后留下的遥望感和未被说尽的渴念，sehnsucht 比硬凑本地词更准确。`,
    shareCopy: "原来作品结束后那种还在心里发酵的遥望感，可以用 sehnsucht 来说。",
  },
  友情家庭: {
    word: "toska",
    language: "俄语",
    pronunciation: "тоска",
    shortMeaning: "带着牵连感与空落感的沉郁心绪",
    cultureNote: "常被用来描述人与人之间难以完全说开的失落和牵挂。",
    whyItFits: (userText) =>
      `第一轮给出的库内词关联度不够，所以这里不继续硬凑。你写到“${pickInputClues(userText)[0]}”和“${pickInputClues(userText)[1]}”，能看出这份感受跟关系牵连有关，也带一点说不透的空落，toska 更能装下这种复杂度。`,
    shareCopy: "原来这种和亲近的人牵连着、又有点空落落的感觉，可以用 toska 来说。",
  },
  工作学业: {
    word: "huzun",
    language: "土耳其语",
    pronunciation: "hü-ZÜN",
    shortMeaning: "被现实压力笼住的低沉与无力",
    cultureNote: "近似用法里，它常被拿来描述环境、期待与自我感受叠在一起的压抑。",
    whyItFits: (userText) =>
      `本地词库第一轮匹配偏弱，继续从里面挑只会更勉强。你提到“${pickInputClues(userText)[0]}”和“${pickInputClues(userText)[1]}”，不是单点情绪，更像压力、责任和疲惫叠在一起的状态，huzun 更接近这种整体氛围。`,
    shareCopy: "原来这种被任务和期待一起压住的低沉感，可以用 huzun 来说。",
  },
  自我追问: {
    word: "duende",
    language: "西班牙语",
    pronunciation: "doo-EN-de",
    shortMeaning: "一种逼近内心深处、难以回避的生命张力",
    cultureNote: "常见解释里，它不是单纯情绪，而是一种把人往内里逼近的强烈感受。",
    whyItFits: (userText) =>
      `第一轮词库匹配不够准，所以第二轮改为直接推荐更成熟的外语词。你写到“${pickInputClues(userText)[0]}”和“${pickInputClues(userText)[1]}”，更像是在追问自己此刻到底被什么牵住了，duende 比泛泛的情绪词更贴近这种内向张力。`,
    shareCopy: "原来这种逼着自己往内心深处看的张力感，可以用 duende 来说。",
  },
};

function normalizeText(value: string) {
  return value.trim().toLocaleLowerCase();
}

type MockSemanticFrame = {
  coreTerms: string[];
  emotionTerms: string[];
  motifTerms: string[];
};

const semanticLexicon = {
  separation: ["分别", "分离", "离别", "离开", "告别", "想念", "思念", "缺席", "不在"],
  fleeting: ["短暂", "短促", "一瞬", "瞬间", "相遇", "遇见", "不可重复", "来不及"],
  overflow: ["满溢", "倾盆", "强烈", "汹涌", "交织", "快乐", "悲伤", "悲喜"],
  lightNature: ["阳光", "树叶", "光影", "斑驳", "自然", "树影"],
};

function extractMockSemanticFrame(text: string): MockSemanticFrame {
  const normalized = normalizeText(text);
  const includesAny = (signals: string[]) =>
    signals.filter((signal) => normalized.includes(signal.toLocaleLowerCase()));

  return {
    coreTerms: [
      ...includesAny(semanticLexicon.separation),
      ...includesAny(semanticLexicon.fleeting),
    ],
    emotionTerms: [
      ...includesAny(semanticLexicon.overflow),
      ...includesAny(semanticLexicon.separation),
    ],
    motifTerms: includesAny(semanticLexicon.lightNature),
  };
}

function scoreSeed(seed: WordSeed, userText: string, scene: SceneTag) {
  const normalized = normalizeText(userText);
  const keywordScore = seed.keywords.reduce((score, keyword) => {
    return normalized.includes(keyword.toLocaleLowerCase()) ? score + 6 : score;
  }, 0);
  const sceneScore = seed.sceneTags.includes(scene) ? 12 : 0;
  const lengthSignal = Math.min(Math.floor(normalized.length / 24), 5);

  return keywordScore + sceneScore + lengthSignal;
}

function semanticSeedScore(seed: WordSeed, frame: MockSemanticFrame) {
  const haystack = normalizeText(
    [
      seed.shortMeaning,
      seed.cultureNote,
      ...seed.keywords,
      ...seed.emotionTags,
      ...seed.sceneTags,
    ].join(" "),
  );
  const scoreTerms = (terms: string[], weight: number) =>
    terms.reduce(
      (score, term) => (haystack.includes(term.toLocaleLowerCase()) ? score + weight : score),
      0,
    );

  const coreFit = scoreTerms(frame.coreTerms, 5);
  const emotionFit = scoreTerms(frame.emotionTerms, 3);
  const motifFit = scoreTerms(frame.motifTerms, 1);

  return { coreFit, emotionFit, motifFit, total: coreFit + emotionFit + motifFit };
}

function inferMatchConfidence(score: number): "high" | "medium" | "low" {
  if (score >= 24) return "high";
  if (score >= 14) return "medium";
  return "low";
}

function pickInputClues(userText: string) {
  const trimmed = userText.trim().replace(/\s+/g, " ");
  const pieces = trimmed
    .split(/[，。！？；,.!?;]/)
    .map((piece) => piece.trim())
    .filter(Boolean);

  if (pieces.length >= 2) {
    return pieces.slice(0, 2);
  }

  if (trimmed.length <= 28) {
    return [trimmed, "你希望给这段感受找到一个更准确的停靠点"];
  }

  return [trimmed.slice(0, 28), trimmed.slice(Math.max(28, trimmed.length - 32))];
}

function shortenMeaning(value: string) {
  return value.replace(/[。.!！]+$/, "");
}

function sourceAwareCultureNote(seed: WordSeed) {
  if (seed.sourceConfidence === "high") {
    return seed.cultureNote;
  }

  return `${seed.cultureNote} 这里保留为近似表达，而不是权威词源判断。`;
}

function buildWhyItFits(seed: WordSeed, userText: string, scene: SceneTag) {
  const [firstClue, secondClue] = pickInputClues(userText);
  const scenePhrase = scene === "书影音余韵" ? "体验余韵" : scene;
  const meaning = shortenMeaning(seed.shortMeaning);

  return `这次我会更偏向 ${seed.word}。你写到“${firstClue}”，又提到“${secondClue}”，两处线索放在一起，说明你想表达的是一个和具体处境连在一起的感受。放在“${scenePhrase}”里，它和“${meaning}”更接近。`;
}

function buildShareCopy(seed: WordSeed, scene: SceneTag) {
  const sceneLead: Record<SceneTag, string> = {
    亲密关系: "这段关系里那种说不太直的感觉",
    日常瞬间: "这个看起来普通、其实有点重的瞬间",
    书影音余韵: "作品结束后还留在心里的那点余波",
    友情家庭: "这份既亲近又复杂的牵连",
    工作学业: "这种被压力、期待和责任缠住的状态",
    自我追问: "此刻这份还没想明白的自我追问",
  };

  return `原来 ${sceneLead[scene]}，可以用 ${seed.word} 来说。`;
}

function alternativeReason(seed: WordSeed) {
  return `它也靠近这类感受，但更偏向“${seed.shortMeaning}”`;
}

function buildFallbackResult(
  userText: string,
  scene: SceneTag,
  precisionContext = "",
): WordMatchResult {
  const fallback = fallbackWordsByScene[scene];

  return {
    word: fallback.word,
    language: fallback.language,
    pronunciation: fallback.pronunciation,
    shortMeaning: fallback.shortMeaning,
    matchConfidence: "medium",
    whyItFits: fallback.whyItFits([userText, precisionContext].filter(Boolean).join("\n"), scene),
    cultureNote: fallback.cultureNote,
    precision: buildPrecisionResult(userText, scene, fallback.word, precisionContext),
    alternatives: [],
    shareCopy: fallback.shareCopy,
    safetyNote: fallbackSafetyNote,
  };
}

export async function mockMatchWord(
  userText: string,
  scene: SceneTag,
  excludedWord?: string,
  precisionContext = "",
): Promise<WordMatchResult> {
  await new Promise((resolve) => globalThis.setTimeout(resolve, 650));
  const matchText = [userText, precisionContext].filter(Boolean).join("\n");
  const semanticFrame = extractMockSemanticFrame(matchText);

  const rankedSeeds = [...wordSeeds]
    .filter((seed) => seed.word !== excludedWord)
    .map((seed, index) => {
      const semanticScore = semanticSeedScore(seed, semanticFrame);

      return {
        seed,
        score: scoreSeed(seed, matchText, scene) + semanticScore.total,
        semanticScore,
        index,
      };
    })
    .sort((a, b) => b.score - a.score || a.index - b.index);

  const winner = rankedSeeds[0]?.seed ?? wordSeeds[0];
  const winnerScore = rankedSeeds[0]?.score ?? 0;
  const firstRoundConfidence = inferMatchConfidence(winnerScore);

  if (firstRoundConfidence === "low") {
    return buildFallbackResult(userText, scene, precisionContext);
  }

  const alternativeFloor = Math.max(18, winnerScore - 6);
  const alternatives = rankedSeeds
    .slice(1)
    .filter(
      ({ seed, score, semanticScore }) =>
        seed.word !== winner.word &&
        score >= alternativeFloor &&
        score >= winnerScore * 0.72 &&
        semanticScore.coreFit + semanticScore.emotionFit >= 3 &&
        semanticScore.motifFit < semanticScore.coreFit + semanticScore.emotionFit,
    )
    .slice(0, 2)
    .map(({ seed }) => ({
      word: seed.word,
      language: seed.language,
      reason: alternativeReason(seed),
    }));

  return {
    word: winner.word,
    language: winner.language,
    pronunciation: winner.pronunciation,
    shortMeaning: winner.shortMeaning,
    matchConfidence: firstRoundConfidence,
    whyItFits: buildWhyItFits(winner, matchText, scene),
    cultureNote: sourceAwareCultureNote(winner),
    precision: buildPrecisionResult(userText, scene, winner.word, precisionContext),
    alternatives,
    shareCopy: buildShareCopy(winner, scene),
    safetyNote: fallbackSafetyNote,
  };
}
