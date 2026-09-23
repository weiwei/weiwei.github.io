import type { Locale } from "@/i18n/locales";

/**
 * Locales searched with our own substring search instead of Pagefind.
 * Pagefind splits Chinese into words and only matches from a word's start,
 * so text in the middle of a "word" can't be found. Plain substring
 * matching (like Ctrl+F) works for any text and is fast enough for a
 * personal blog.
 */
export const SUBSTRING_SEARCH_LOCALES: readonly Locale[] = ["zh"];

export function usesSubstringSearch(locale: Locale) {
  return SUBSTRING_SEARCH_LOCALES.includes(locale);
}

const CJK = "\\u2e80-\\u9fff\\uf900-\\ufaff\\uff00-\\uffef";

const ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
};

function decodeEntities(text: string) {
  return text.replace(/&(#x[\da-f]+|#\d+|\w+);/gi, (entity, code: string) => {
    if (code[0] !== "#") return ENTITIES[code.toLowerCase()] ?? entity;
    const n =
      code[1] === "x" || code[1] === "X"
        ? parseInt(code.slice(2), 16)
        : parseInt(code.slice(1), 10);
    return Number.isNaN(n) ? entity : String.fromCodePoint(n);
  });
}

/**
 * Rendered post HTML → searchable plain text.
 *
 * - Code blocks are dropped (not useful to search, and large)
 * - Block elements become spaces; inline elements vanish, so a match can
 *   span e.g. `看<strong>真的</strong>很`
 * - Whitespace between two CJK characters (from wrapped source lines) is
 *   removed, so `水\n银` still matches 水银
 */
export function htmlToSearchText(html: string) {
  const text = decodeEntities(
    html
      .replace(/<(pre|script|style)\b[\s\S]*?<\/\1>/gi, " ")
      .replace(
        /<\/?(p|div|h[1-6]|li|ul|ol|br|hr|tr|td|th|table|blockquote|figure|figcaption)\b[^>]*>/gi,
        " "
      )
      .replace(/<[^>]*>/g, "")
  );
  return text
    .replace(/\s+/g, " ")
    .replace(new RegExp(`([${CJK}]) (?=[${CJK}])`, "g"), "$1")
    .trim();
}
