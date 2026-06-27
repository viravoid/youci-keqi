import type { SceneTag } from "@/types/wordMatch";

export type PrecisionOption = {
  id: string;
  label: string;
  detail: string;
};

export type ExpressionAudit = {
  fuzzyPoints: string[];
  missingSignals: string[];
  shouldClarify: boolean;
  options: PrecisionOption[];
  memoryPrompt: string;
};

const vagueFeelingWords = [
  "焦虑",
  "内耗",
  "累",
  "难受",
  "不舒服",
  "没安全感",
  "压力",
  "迷茫",
  "空",
  "stressed",
  "anxious",
  "stuck",
  "tired",
  "overwhelmed",
];

const concreteSignalWords = [
  "因为",
  "当",
  "之后",
  "那一刻",
  "一句话",
  "行为",
  "身体",
  "心跳",
  "想靠近",
  "想远离",
  "想写",
  "突然",
  "反复",
  "结束后",
  "when",
  "because",
  "after",
  "said",
  "body",
  "suddenly",
];

const sceneOptions: Record<SceneTag, PrecisionOption[]> = {
  亲密关系: [
    {
      id: "relationship-trigger",
      label: "某句话或行为让熟悉感断开",
      detail: "关系中的触发点比较具体，像一句话、一个动作或态度变化。",
    },
    {
      id: "relationship-boundary",
      label: "亲近和想远离同时存在",
      detail: "这里同时有靠近、抵触和边界感。",
    },
    {
      id: "relationship-history",
      label: "过去的亲密仍在影响现在",
      detail: "这份感受和长时间相处、旧情分或回忆有关。",
    },
  ],
  日常瞬间: [
    {
      id: "daily-object",
      label: "一个具体物件或场景触发了感受",
      detail: "光线、气味、地点或小事把这份感受带了出来。",
    },
    {
      id: "daily-body",
      label: "身体先反应，语言后来才跟上",
      detail: "你先感觉到心口、呼吸、发紧或放松，再想描述它。",
    },
    {
      id: "daily-contrast",
      label: "普通时刻突然变得有重量",
      detail: "日常本身没变，但你对它的感知突然改变。",
    },
  ],
  书影音余韵: [
    {
      id: "art-afterglow",
      label: "作品结束后情绪还停留在身体里",
      detail: "电影、书、音乐或演出结束了，但余韵没有结束。",
    },
    {
      id: "art-lit-up",
      label: "被某种生命力或成长感点亮",
      detail: "你感到被鼓励、被照亮，想把这份能量写下来。",
    },
    {
      id: "art-wordless",
      label: "想分享却找不到精准表达",
      detail: "重点在于你被作品触动后的表达需求。",
    },
  ],
  友情家庭: [
    {
      id: "family-tie",
      label: "牵连很深，但很难直接说出口",
      detail: "这份感受和情分、责任、照顾或未说出口的话有关。",
    },
    {
      id: "family-expectation",
      label: "期待和现实之间有落差",
      detail: "你期待被理解、被回应或被公平对待，但实际并不完全如此。",
    },
    {
      id: "family-memory",
      label: "旧记忆突然回到现在",
      detail: "某个旧场景或旧称呼让现在的关系变得复杂。",
    },
  ],
  工作学业: [
    {
      id: "work-standard",
      label: "不知道什么程度才算够好",
      detail: "压力来自标准不清，而不是任务本身。",
    },
    {
      id: "work-resource",
      label: "责任在你，但资源不够",
      detail: "你需要承担结果，却缺少时间、信息、权限或支持。",
    },
    {
      id: "work-tradeoff",
      label: "两个目标之间还没做取舍",
      detail: "比如速度和质量、期待和现实、稳定和变化无法同时满足。",
    },
  ],
  自我追问: [
    {
      id: "self-exposure",
      label: "离开熟悉身份后感到赤裸",
      detail: "你不再依附原来的群体、标签或关系，于是必须重新面对自己。",
    },
    {
      id: "self-meaning",
      label: "想确认自己为何这样生活",
      detail: "意义、方向或身份暂时没有落点。",
    },
    {
      id: "self-not-nihilism",
      label: "不是虚无，也不是想回到人群",
      detail: "你在区分几种相近但不一样的状态。",
    },
  ],
};

function containsAny(text: string, words: string[]) {
  const normalized = text.toLocaleLowerCase();
  return words.some((word) => normalized.includes(word.toLocaleLowerCase()));
}

function hasConcreteSignal(text: string) {
  return containsAny(text, concreteSignalWords) || text.length >= 42;
}

function pickFuzzyPoints(text: string) {
  const hits = vagueFeelingWords.filter((word) =>
    text.toLocaleLowerCase().includes(word.toLocaleLowerCase()),
  );

  if (hits.length > 0) {
    return hits.slice(0, 2).map((word) => `“${word}”还没有说明具体触发点`);
  }

  if (text.trim().length < 30) {
    return ["这段描述还比较短，可能缺少触发场景"];
  }

  return [];
}

export function auditExpressionInput(userText: string, scene: SceneTag): ExpressionAudit {
  const trimmed = userText.trim();
  const fuzzyPoints = pickFuzzyPoints(trimmed);
  const missingSignals: string[] = [];

  if (!hasConcreteSignal(trimmed)) {
    missingSignals.push("缺少一次具体场景、原话、动作或身体反应");
  }

  if (!containsAny(trimmed, ["想", "希望", "需要", "表达", "写", "share", "say"])) {
    missingSignals.push("还不清楚你是想自我理解，还是想把它写给别人看");
  }

  return {
    fuzzyPoints,
    missingSignals,
    shouldClarify: trimmed.length >= 12 && (fuzzyPoints.length > 0 || missingSignals.length > 0),
    options: [
      ...sceneOptions[scene],
      {
        id: "none-of-above",
        label: "都不是",
        detail: "上面的判断没有覆盖你的意思，我会优先参考你补充的具体事实。",
      },
    ],
    memoryPrompt:
      "回想一个最能代表这段感受的瞬间：当时发生了什么、谁说了什么、你的身体或行动有什么变化？",
  };
}

export function buildPrecisionContext(
  selectedOptions: PrecisionOption[],
  supplement: string,
) {
  const optionText = selectedOptions
    .filter((option) => option.id !== "none-of-above")
    .map((option) => `${option.label}：${option.detail}`);
  const trimmedSupplement = supplement.trim();

  return [...optionText, trimmedSupplement ? `补充事实：${trimmedSupplement}` : ""]
    .filter(Boolean)
    .join("\n");
}

export function buildSilentPrecisionContext(
  userText: string,
  scene: SceneTag,
): string {
  const audit = auditExpressionInput(userText, scene);
  if (!audit.shouldClarify) return "";

  return [
    ...audit.fuzzyPoints,
    ...audit.missingSignals,
    audit.memoryPrompt,
  ]
    .filter(Boolean)
    .join("\n");
}

export function buildPrecisionResult(
  userText: string,
  scene: SceneTag,
  word: string,
  precisionContext = "",
) {
  const clues = [userText.trim(), precisionContext.trim()].filter(Boolean).join("；");
  const firstClause = clues.split(/[，。！？；,.!?;]/).find(Boolean)?.trim() || userText.trim();
  const sceneName = scene === "书影音余韵" ? "体验余韵" : scene;

  return {
    preciseName: `${sceneName}里的具体感受命名`,
    concreteExplanation: `这段输入会先还原为具体线索，避免直接贴上“难受”或“复杂”这样的抽象标签。可见线索是“${firstClause}”，它说明这份感受有场景、触发点和表达需求；${word} 只是给这些线索一个外语停靠点，不替你做心理判断。`,
    copyableExpression: `我想表达的是这个具体瞬间：${firstClause}。${word} 能概括其中的触发点、余波和暂时说不出口的部分。`,
  };
}
