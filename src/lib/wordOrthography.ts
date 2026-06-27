const nativeWordByRomanization: Record<string, string> = {
  "mono no aware": "物の哀れ",
  yugen: "幽玄",
  natsukashii: "懐かしい",
  kintsugi: "金継ぎ",
  komorebi: "木漏れ日",
  "wabi-sabi": "侘び寂び",
  "wabi sabi": "侘び寂び",
};

export function normalizeNativeWord(word: string, language: string) {
  if (!language.toLocaleLowerCase().includes("japanese") && !language.includes("日语")) {
    return word;
  }

  return nativeWordByRomanization[word.trim().toLocaleLowerCase()] ?? word;
}
