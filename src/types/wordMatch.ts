export type SceneTag =
  | "亲密关系"
  | "日常瞬间"
  | "书影音余韵"
  | "友情家庭"
  | "工作学业"
  | "自我追问";

export type SourceConfidence = "high" | "medium" | "low";

export type WordSeed = {
  word: string;
  language: string;
  pronunciation: string;
  shortMeaning: string;
  emotionTags: string[];
  sceneTags: SceneTag[];
  cultureNote: string;
  sourceConfidence: SourceConfidence;
  keywords: string[];
};

export type WordAlternative = {
  word: string;
  language: string;
  reason: string;
};

export type WordMatchResult = {
  word: string;
  language: string;
  pronunciation: string;
  shortMeaning: string;
  matchConfidence?: "high" | "medium" | "low";
  whyItFits: string;
  cultureNote: string;
  precision?: {
    preciseName: string;
    concreteExplanation: string;
    copyableExpression: string;
  };
  alternatives: WordAlternative[];
  shareCopy: string;
  safetyNote: string;
};

export type SavedWordEntry = WordMatchResult & {
  id: string;
  userText: string;
  scene: SceneTag;
  saved: boolean;
  createdAt: string;
  seq: number;
};
