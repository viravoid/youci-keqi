import json
import re
import sys
from pathlib import Path


SOURCE = Path(r"C:\Users\Administrator\.hermes\desktop-attachments\Lost_in_Translation_完整词汇整理.md")
OUTPUT = Path("src/data/words.json")

FIELDS = [
    "word",
    "language",
    "pronunciation",
    "literal_meaning",
    "chinese_explanation",
    "english_approximation",
    "emotion_tags",
    "usage_scenario",
    "user_search_description",
    "cultural_note",
]


def clean(value: str) -> str:
    value = re.sub(r"</?br\s*/?>", " ", value or "", flags=re.IGNORECASE)
    value = re.sub(r"\*\*(.*?)\*\*", r"\1", value)
    return re.sub(r"\s+", " ", value).strip().strip('"')


def split_md_row(line: str) -> list[str]:
    body = line.strip().strip("|")
    return [clean(cell) for cell in body.split("|")]


def parse_bullets(body: str) -> dict[str, str]:
    fields: dict[str, str] = {}
    current_key: str | None = None
    current_value: list[str] = []

    def flush() -> None:
        nonlocal current_key, current_value
        if current_key:
            fields[current_key] = clean(" ".join(current_value))
        current_key = None
        current_value = []

    for raw_line in body.splitlines():
        line = raw_line.strip()
        match = re.match(r"^\*\s+\*\*(.+?)：\*\*\s*(.*)$", line)
        if match:
            flush()
            current_key = clean(match.group(1))
            current_value = [match.group(2)]
        elif current_key and line and not line.startswith("---") and not line.startswith("###"):
            current_value.append(line)
    flush()
    return fields


def parse_entries(text: str) -> dict[str, dict[str, str]]:
    entries: dict[str, dict[str, str]] = {}
    pattern = re.compile(r"(?ms)^###\s+(.+?)\s*$\n(.*?)(?=^###\s+|^##\s+|\Z)")
    skip = {"语言与文化来源", "词汇的主要表达领域", "为何难以被英语翻译"}
    for match in pattern.finditer(text):
        word = clean(match.group(1))
        if word in skip:
            continue
        fields = parse_bullets(match.group(2))
        if fields:
            language = fields.get("语言 / 来源文化") or fields.get("语言") or ""
            tags = fields.get("情绪 / 体验标签") or ""
            search = fields.get("可用于项目的搜索描述") or ""

            special_words = [
                key for key in fields
                if key not in {
                    "语言 / 来源文化",
                    "语言",
                    "大致发音",
                    "字面含义",
                    "核心含义",
                    "英文近似翻译",
                    "适用场景",
                    "情绪 / 体验标签",
                    "可用于项目的搜索描述",
                    "备注",
                }
            ]
            if special_words and not fields.get("核心含义"):
                for special_word in special_words:
                    entries[special_word.lower()] = {
                        "word": special_word,
                        "language": language,
                        "pronunciation": "",
                        "literal_meaning": "",
                        "chinese_explanation": fields[special_word],
                        "english_approximation": "",
                        "emotion_tags": tags,
                        "usage_scenario": "",
                        "user_search_description": search,
                        "cultural_note": f"原条目标题：{word}",
                    }
                continue

            if not language or not (fields.get("核心含义") or search):
                continue

            entries[word.lower()] = {
                "word": word,
                "language": language,
                "pronunciation": fields.get("大致发音") or "",
                "literal_meaning": fields.get("字面含义") or "",
                "chinese_explanation": fields.get("核心含义") or "",
                "english_approximation": fields.get("英文近似翻译") or "",
                "emotion_tags": tags,
                "usage_scenario": fields.get("适用场景") or "",
                "user_search_description": search,
                "cultural_note": fields.get("备注") or "",
            }
    return entries


def parse_simple_tables(text: str) -> dict[str, dict[str, str]]:
    rows: dict[str, dict[str, str]] = {}
    for line in text.splitlines():
        stripped = line.strip()
        if not stripped.startswith("|") or "---" in stripped:
            continue
        cells = split_md_row(stripped)
        if cells in (["词", "语言", "含义"], ["词汇原文", "语言", "一句话中文解释"]):
            continue
        if len(cells) != 3:
            continue
        word, language, explanation = cells
        if not word or not language or not explanation:
            continue
        rows[word.lower()] = {
            "word": word,
            "language": language,
            "pronunciation": "",
            "literal_meaning": "",
            "chinese_explanation": explanation,
            "english_approximation": "",
            "emotion_tags": "",
            "usage_scenario": "",
            "user_search_description": explanation,
            "cultural_note": "",
        }
    return rows


def parse_section_4(text: str) -> list[dict[str, str]]:
    start = text.find("## 4. 项目可用字段表")
    if start < 0:
        raise RuntimeError("Section 4 table was not found.")

    next_section = text.find("\n## ", start + 1)
    section = text[start: next_section if next_section > start else len(text)]
    rows: list[dict[str, str]] = []

    for line in section.splitlines():
        stripped = line.strip()
        if not stripped.startswith("|") or "---" in stripped:
            continue
        cells = split_md_row(stripped)
        if cells == FIELDS:
            continue
        if len(cells) != len(FIELDS):
            continue
        row = dict(zip(FIELDS, cells))
        if row["word"]:
            rows.append(row)

    return rows


def merge_rows(section_rows: list[dict[str, str]], entry_rows: dict[str, dict[str, str]]) -> list[dict[str, object]]:
    merged: list[dict[str, object]] = []
    seen: set[str] = set()

    for row in section_rows:
        key = row["word"].lower()
        extra = entry_rows.get(key, {})
        combined = {field: clean(row.get(field) or extra.get(field, "")) for field in FIELDS}
        for field in FIELDS:
            if not combined[field] and extra.get(field):
                combined[field] = clean(extra[field])

        tags = [
            clean(tag)
            for tag in re.split(r"[,，、]", combined["emotion_tags"])
            if clean(tag)
        ]

        item = {
            **combined,
            "emotion_tags": tags,
        }
        merged.append(item)
        seen.add(key)

    for key, extra in entry_rows.items():
        if key in seen:
            continue
        combined = {field: clean(extra.get(field, "")) for field in FIELDS}
        tags = [
            clean(tag)
            for tag in re.split(r"[,，、]", combined["emotion_tags"])
            if clean(tag)
        ]
        merged.append({**combined, "emotion_tags": tags})

    return merged


def main() -> None:
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")
    text = SOURCE.read_text(encoding="utf-8")
    section_rows = parse_section_4(text)
    entry_rows = parse_entries(text)
    table_rows = parse_simple_tables(text)
    backfill_rows = {**table_rows, **entry_rows}
    words = merge_rows(section_rows, backfill_rows)

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(
        json.dumps(words, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )

    missing_required = [
        word["word"]
        for word in words
        if not word["word"] or not word["language"] or not word["chinese_explanation"]
    ]
    print(f"Section 4 rows: {len(section_rows)}")
    print(f"Vocabulary entries parsed for backfill: {len(entry_rows)}")
    print(f"Simple table rows parsed for backfill: {len(table_rows)}")
    print(f"Words written: {len(words)}")
    print(f"Output: {OUTPUT.as_posix()}")
    print(f"Missing required fields: {len(missing_required)}")
    if missing_required:
        print("First missing:", ", ".join(missing_required[:10]))


if __name__ == "__main__":
    main()
