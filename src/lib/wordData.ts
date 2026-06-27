import rawWords from "@/data/words.json";
import type { SceneTag, WordSeed } from "@/types/wordMatch";

type ImportedWord = {
  word: string;
  language: string;
  pronunciation: string;
  literal_meaning: string;
  chinese_explanation: string;
  english_approximation: string;
  emotion_tags: string[];
  usage_scenario: string;
  user_search_description: string;
  cultural_note: string;
};

const sceneSignals: Array<[SceneTag, string[]]> = [
  ["亲密关系", ["恋爱", "爱", "失恋", "情侣", "夫妻", "亲密", "浪漫", "心动", "依恋", "深爱", "暧昧"]],
  ["友情家庭", ["朋友", "好友", "家", "家庭", "母亲", "子女", "社群", "归属", "陪伴", "友谊"]],
  ["书影音余韵", ["故事", "小说", "电影", "音乐", "艺术", "表演", "阅读", "书", "沉浸", "想象"]],
  ["工作学业", ["工作", "学习", "同事", "创业", "资源", "解决", "创造", "效率", "压力"]],
  ["自我追问", ["存在", "生命", "命运", "宇宙", "自我", "羞愧", "痛苦", "渴望", "理想", "梦想"]],
  ["日常瞬间", ["日常", "生活", "自然", "身体", "幽默", "时间", "旅行", "咖啡", "食物", "森林", "月光"]],
];

function inferSceneTags(word: ImportedWord): SceneTag[] {
  const text = [
    word.chinese_explanation,
    word.emotion_tags.join(","),
    word.usage_scenario,
    word.user_search_description,
    word.cultural_note,
  ].join("\n");

  const scenes = sceneSignals
    .filter(([, signals]) => signals.some((signal) => text.includes(signal)))
    .map(([scene]) => scene);

  return scenes.length > 0 ? scenes.slice(0, 3) : ["日常瞬间"];
}

function buildKeywords(word: ImportedWord) {
  const chunks = [
    word.literal_meaning,
    word.chinese_explanation,
    word.english_approximation,
    word.usage_scenario,
    word.user_search_description,
    ...word.emotion_tags,
  ];

  const keywords = chunks
    .flatMap((chunk) => chunk.split(/[,\s，、。；;：“”"（）()——-]+/))
    .map((keyword) => keyword.trim())
    .filter((keyword) => keyword.length >= 2 && keyword.length <= 18);

  return Array.from(new Set(keywords)).slice(0, 24);
}

function buildCultureNote(word: ImportedWord) {
  return [
    word.literal_meaning ? `字面含义：${word.literal_meaning}` : "",
    word.english_approximation ? `英文近似：${word.english_approximation}` : "",
    word.cultural_note,
  ]
    .filter(Boolean)
    .join("。");
}

export const wordSeeds: WordSeed[] = (rawWords as ImportedWord[]).map((word) => ({
  word: word.word,
  language: word.language,
  pronunciation: word.pronunciation || "暂未提供",
  shortMeaning: word.chinese_explanation || word.literal_meaning || word.user_search_description,
  emotionTags: word.emotion_tags,
  sceneTags: inferSceneTags(word),
  cultureNote: buildCultureNote(word),
  sourceConfidence: "medium",
  keywords: buildKeywords(word),
}));
