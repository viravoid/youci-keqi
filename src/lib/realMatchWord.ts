import wordSeedsRaw from "@/data/word-seeds.json";
import type { MatchWordInput, SceneTag, WordMatchResult, WordSeed } from "@/types/wordMatch";
import { z } from "zod";

const wordSeeds = wordSeedsRaw as unknown as WordSeed[];

const reviewAlternativeSchema = z.preprocess(
  (value) =>
    typeof value === "string"
      ? { word: value, language: "unknown", reason: "" }
      : value,
  z.object({
    word: z.string().default("unknown"),
    language: z.string().default("unknown"),
    reason: z.string().default(""),
  }),
);

const wordAlternativeSchema = z.preprocess(
  (value) =>
    typeof value === "string"
      ? { word: value, language: "unknown", reason: "" }
      : value,
  z.object({
    word: z.string().default("unknown"),
    language: z.string().default("unknown"),
    reason: z.string().default(""),
  }),
);

const wordMatchResultSchema = z.object({
  word: z.string().min(1),
  language: z.string().default("unknown"),
  pronunciation: z.string().default("—"),
  shortMeaning: z.string().min(1),
  matchConfidence: z.enum(["high", "medium", "low"]).optional(),
  whyItFits: z.string().default(""),
  cultureNote: z.string().default(""),
  precision: z
    .object({
      preciseName: z.string().default(""),
      concreteExplanation: z.string().default(""),
      copyableExpression: z.string().default(""),
    })
    .optional()
    .default({
      preciseName: "",
      concreteExplanation: "",
      copyableExpression: "",
    }),
  alternatives: z.array(wordAlternativeSchema).max(3).default([]),
  shareCopy: z.string().default(""),
  safetyNote: z.string().default(
    "这不是心理诊断，只是帮助你寻找更贴近感受的表达。",
  ),
}) satisfies z.ZodType<WordMatchResult>;

const semanticFrameSchema = z.object({
  coreEvent: z.string().default(""),
  emotionalTrajectory: z.string().default(""),
  salientMotifs: z.array(z.string().default("")).max(6).default([]),
  mustPreserve: z.array(z.string().default("")).max(6).default([]),
  secondaryResonances: z.array(z.string().default("")).max(6).default([]),
  surfaceOnlySignals: z.array(z.string().default("")).max(6).default([]),
});

const fitScoresSchema = z.object({
  coreFit: z.number().min(0).max(5),
  emotionFit: z.number().min(0).max(5),
  motifFit: z.number().min(0).max(5),
  scopeFit: z.number().min(0).max(5),
  specificityFit: z.number().min(0).max(5),
  culturalConfidence: z.number().min(0).max(5),
});

const candidateReviewSchema = z.object({
  word: z.string().default("unknown"),
  language: z.string().default("unknown"),
  role: z.enum(["primary", "alternative", "reject"]).default("reject"),
  scores: fitScoresSchema.optional().default({
    coreFit: 0,
    emotionFit: 0,
    motifFit: 0,
    scopeFit: 0,
    specificityFit: 0,
    culturalConfidence: 0,
  }),
  reason: z.string().default(""),
  boundary: z.string().default(""),
});

const reviewSchema = z.object({
  verdict: z.enum(["strong", "usable", "weak"]),
  score: z.number().min(0).max(100),
  reason: z.string().default(""),
  shouldSearch: z.boolean().default(false),
  candidateReviews: z.array(candidateReviewSchema).max(5).default([]),
  filteredAlternatives: z.array(reviewAlternativeSchema).max(2).default([]),
});

type SemanticFrame = z.infer<typeof semanticFrameSchema>;

type ProcessLike = {
  env?: Record<string, string | undefined>;
};

type ChatCompletionsPayload = {
  choices?: Array<{
    message?: {
      content?: string | null;
    };
  }>;
};

type DeepSeekRuntimeConfig = {
  apiKey: string;
  baseUrl: string;
  model: string;
};

function getEnv() {
  return (
    (globalThis as typeof globalThis & { process?: ProcessLike }).process?.env ??
    {}
  );
}

function normalizeText(value: string) {
  return value.trim().toLocaleLowerCase();
}

function scoreCandidate(seed: WordSeed, input: MatchWordInput) {
  const text = normalizeText(
    [input.userText, input.precisionContext].filter(Boolean).join("\n"),
  );
  const keywordScore = seed.keywords.reduce(
    (score, keyword) =>
      text.includes(keyword.toLocaleLowerCase()) ? score + 6 : score,
    0,
  );
  const sceneScore = seed.sceneTags.includes(input.scene) ? 12 : 0;
  const emotionScore = seed.emotionTags.reduce(
    (score, tag) => (text.includes(tag.toLocaleLowerCase()) ? score + 3 : score),
    0,
  );

  return keywordScore + sceneScore + emotionScore;
}

function pickCandidates(input: MatchWordInput) {
  return [...wordSeeds]
    .filter((seed) => seed.word !== input.excludedWord)
    .map((seed, index) => ({
      seed,
      index,
      score: scoreCandidate(seed, input),
    }))
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .slice(0, 8)
    .map(({ seed }) => seed);
}

function extractJsonObject(content: string) {
  const trimmed = content.trim();
  if (trimmed.startsWith("{") && trimmed.endsWith("}")) return trimmed;

  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenced?.[1]) return fenced[1].trim();

  const first = trimmed.indexOf("{");
  const last = trimmed.lastIndexOf("}");
  if (first >= 0 && last > first) return trimmed.slice(first, last + 1);

  throw new Error("AI response did not contain a JSON object.");
}

function normalizeModelId(model: string) {
  return model.trim().replace(/[\s_]+/g, "-").toLocaleLowerCase();
}

function buildChatCompletionsUrl(baseUrl: string) {
  return `${baseUrl.replace(/\/+$/, "")}/chat/completions`;
}

function getChatCompletionText(payload: ChatCompletionsPayload) {
  const content = payload.choices?.[0]?.message?.content;

  if (typeof content === "string" && content.trim()) {
    return content.trim();
  }

  throw new Error("AI chat completion was empty.");
}

function resolveDeepSeekRuntimeConfig(
  env: Record<string, string | undefined>,
): DeepSeekRuntimeConfig {
  const apiKey = env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    throw new Error("DEEPSEEK_API_KEY is not configured.");
  }

  return {
    apiKey,
    baseUrl: env.DEEPSEEK_BASE_URL || "https://api.deepseek.com",
    model: normalizeModelId(
      env.DEEPSEEK_MODEL || "deepseek-v4-flash",
    ),
  };
}

function normalizeAlternatives(
  alternatives: WordAlternative[],
  primaryWord: string,
) {
  const normalizedPrimary = normalizeText(primaryWord);
  const seen = new Set<string>();

  return alternatives
    .map((alternative) => ({
      ...alternative,
      word: normalizeNativeWord(alternative.word, alternative.language),
    }))
    .filter((alternative) => normalizeText(alternative.word) !== normalizedPrimary)
    .filter((alternative) => {
      const key = `${normalizeText(alternative.word)}::${normalizeText(alternative.language)}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, 2);
}

function withAlternativeReasons(
  alternatives: Array<{ word: string; language: string; reason?: string }>,
) {
  return alternatives.map((alternative) => ({
    ...alternative,
    reason: alternative.reason?.trim() || "它和主词有相邻语义，但贴合度没有主词高。",
  }));
}

function normalizeMatchResult(result: WordMatchResult): WordMatchResult {
  const normalizedWord = normalizeNativeWord(result.word, result.language);

  return {
    ...result,
    word: normalizedWord,
    alternatives: normalizeAlternatives(
      withAlternativeReasons(result.alternatives),
      normalizedWord,
    ),
  };
}

function buildCandidateText(candidates: WordSeed[]) {
  return candidates
    .map((seed, index) => {
      const tags = [...seed.emotionTags, ...seed.sceneTags].join(", ");
      return `${index + 1}. ${seed.word} | ${seed.language} | ${seed.shortMeaning} | ${tags}`;
    })
    .join("\n");
}

function buildSemanticFramePrompt(input: MatchWordInput) {
  return [
    "You extract a reusable semantic frame from a Chinese emotional description.",
    "Do not solve the word match yet. Do not mention candidate words.",
    "Separate the user's core situation from surface images or metaphors.",
    "Use Simplified Chinese. Return strict JSON only.",
    "",
    `Scene: ${input.scene}`,
    `User text: ${input.userText}`,
    `Precision context: ${input.precisionContext || "None."}`,
    "",
    "Output strict JSON:",
    `{
  "coreEvent": "",
  "emotionalTrajectory": "",
  "salientMotifs": [],
  "mustPreserve": [],
  "secondaryResonances": [],
  "surfaceOnlySignals": []
}`,
    "",
    "Field rules:",
    "1. coreEvent = what is actually happening, not the metaphor used to describe it.",
    "2. emotionalTrajectory = how the feeling moves, mixes, or changes.",
    "3. salientMotifs = recurring images, words, or themes in the user's text.",
    "4. mustPreserve = aspects that must be preserved when searching for a matching word.",
    "5. secondaryResonances = less dominant but still present emotional threads.",
    "6. surfaceOnlySignals = words/images that are vivid but not core to the feeling.",
  ].join("\n");
}

function buildFirstPassPrompt(
  userText: string,
  scene: SceneTag,
  candidates: WordSeed[],
  semanticFrame: SemanticFrame,
  precisionContext = "",
) {
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
    "10. Do NOT use binary-contrast structures like '不是……而是……' in whyItFits.",
  ].join("\n");
}

function buildSearchPrompt(
  userText: string,
  scene: SceneTag,
  semanticFrame: SemanticFrame,
  precisionContext = "",
) {
  return [
    "Search your knowledge for a real foreign-language word that best matches this emotional description.",
    "You may suggest words NOT in any list. Return strict JSON only.",
    "",
    `Scene: ${scene}`,
    `User text: ${userText}`,
    `Precision context: ${precisionContext || "None."}`,
    `Core event: ${semanticFrame.coreEvent}`,
    `Emotional trajectory: ${semanticFrame.emotionalTrajectory}`,
    `Must preserve: ${semanticFrame.mustPreserve.join(", ") || "None."}`,
    "",
    "Output strict JSON matching the same schema as the local match. In whyItFits, address the user as '你' directly. In cultureNote, provide at least 3-4 sentences of cultural context.",
  ].join("\n");
}

function buildReviewPrompt(
  input: MatchWordInput,
  result: WordMatchResult,
  semanticFrame: SemanticFrame,
) {
  return [
    "Review how well this word matches the original emotional description.",
    "Return strict JSON only.",
    "",
    `Original: ${input.userText}`,
    `Scene: ${input.scene}`,
    `Core event: ${semanticFrame.coreEvent}`,
    `Must preserve: ${semanticFrame.mustPreserve.join(", ") || "None."}`,
    `Surface signals: ${semanticFrame.surfaceOnlySignals.join(", ") || "None."}`,
    "",
    `Matched word: ${result.word} (${result.language})`,
    `Meaning: ${result.shortMeaning}`,
    `Why it fits: ${result.whyItFits}`,
    `Alternatives: ${result.alternatives.map((a) => `${a.word} (${a.language})`).join(", ") || "None."}`,
    "",
    "Output strict JSON:",
    `{
  "verdict": "strong",
  "score": 85,
  "reason": "",
  "shouldSearch": false,
  "candidateReviews": [],
  "filteredAlternatives": []
}`,
    "",
    "Rules:",
    "1. verdict: strong (excellent match), usable (acceptable), weak (poor).",
    "2. score: 0-100 reflecting overall match quality.",
    "3. reason: concise explanation of the verdict in Chinese.",
    "4. shouldSearch: true only if the match is weak and a better word likely exists outside the list.",
    "5. candidateReviews: brief assessments of each alternative.",
    "6. filteredAlternatives: the 0-2 best alternatives to keep.",
  ].join("\n");
}

function normalizeNativeWord(word: string, language: string) {
  if (!word) return word;

  const lang = normalizeText(language);

  if (lang.includes("english") || lang.includes("french") || lang.includes("spanish") ||
      lang.includes("german") || lang.includes("portuguese") || lang.includes("italian") ||
      lang.includes("dutch") || lang.includes("swedish") || lang.includes("norwegian") ||
      lang.includes("danish") || lang.includes("finnish") || lang.includes("polish") ||
      lang.includes("czech") || lang.includes("hungarian") || lang.includes("romanian") ||
      lang.includes("turkish") || lang.includes("croatian") || lang.includes("serbian")) {
    const cleaned = word.trim();
    const first = cleaned.charAt(0);
    return first.toUpperCase() + cleaned.slice(1);
  }

  return word.trim();
}

type WordAlternative = z.infer<typeof wordAlternativeSchema>;

function reviewRank(review: z.infer<typeof reviewSchema>) {
  const base = review.score;
  if (review.verdict === "strong") return base + 15;
  if (review.verdict === "weak") return base - 30;
  return base;
}

function mergeReviewedResult(
  result: WordMatchResult,
  review: z.infer<typeof reviewSchema>,
): WordMatchResult {
  const filtered = review.filteredAlternatives.map((a) => ({
    word: a.word,
    language: a.language,
    reason: a.reason || "",
  }));

  return {
    ...result,
    whyItFits: review.reason || result.whyItFits,
    alternatives: filtered.length > 0
      ? filtered
      : result.alternatives.slice(0, 3),
  };
}

function pickReviewedWinner(
  local: { result: WordMatchResult; review: z.infer<typeof reviewSchema> },
  searched?: { result: WordMatchResult; review: z.infer<typeof reviewSchema> },
) {
  if (!searched) return local;

  return reviewRank(searched.review) > reviewRank(local.review) ? searched : local;
}

async function requestJson<T>({
  baseUrl,
  apiKey,
  model,
  prompt,
  schema,
}: {
  baseUrl: string;
  apiKey: string;
  model: string;
  prompt: string;
  schema: z.ZodType<T>;
}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 25_000);

  try {
    const response = await fetch(buildChatCompletionsUrl(baseUrl), {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: "system",
            content:
              "You are a careful structured-output assistant. Return valid json only and never add markdown fences.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.35,
        max_tokens: 2600,
        response_format: { type: "json_object" },
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`AI request failed with status ${response.status}.`);
    }

    const payload = (await response.json()) as ChatCompletionsPayload;
    const content = getChatCompletionText(payload);
    const jsonText = extractJsonObject(content);
    try {
      return schema.parse(JSON.parse(jsonText));
    } catch (parseErr) {
      // DeepSeek sometimes produces trailing commas or other fixable JSON issues
      const fixed = jsonText
        .replace(/,\s*}/g, "}")
        .replace(/,\s*]/g, "]")
        .replace(/([{,]\s*)(\w+)(\s*:)/g, '$1"$2"$3');
      return schema.parse(JSON.parse(fixed));
    }
  } finally {
    clearTimeout(timer);
  }
}

async function requestWordMatch(args: {
  baseUrl: string;
  apiKey: string;
  model: string;
  prompt: string;
}) {
  const parsed = await requestJson({
    ...args,
    schema: wordMatchResultSchema,
  });

  return normalizeMatchResult(parsed);
}

async function requestSearchWordMatch(args: {
  baseUrl: string;
  apiKey: string;
  model: string;
  input: MatchWordInput;
  semanticFrame: SemanticFrame;
}) {
  const prompt = buildSearchPrompt(
    args.input.userText,
    args.input.scene,
    args.semanticFrame,
    args.input.precisionContext,
  );

  return requestWordMatch({
    baseUrl: args.baseUrl,
    apiKey: args.apiKey,
    model: args.model,
    prompt,
  });
}

export async function realMatchWord(input: MatchWordInput): Promise<WordMatchResult> {
  const env = getEnv();
  const runtime = resolveDeepSeekRuntimeConfig(env);
  const candidates = pickCandidates(input);
  const silentFrame = { coreEvent: "", emotionalTrajectory: "", salientMotifs: [], mustPreserve: [], secondaryResonances: [], surfaceOnlySignals: [] };
  return requestWordMatch({
    baseUrl: runtime.baseUrl,
    apiKey: runtime.apiKey,
    model: runtime.model,
    prompt: buildFirstPassPrompt(
      input.userText,
      input.scene,
      candidates,
      { coreEvent: "", emotionalTrajectory: "", salientMotifs: [], mustPreserve: [], secondaryResonances: [], surfaceOnlySignals: [] },
      input.precisionContext,
    ),
  });
}
