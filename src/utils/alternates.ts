import { LOCALES, type Locale } from "@/i18n/locales";
import { localeUrl } from "@/i18n/urls";
import { stripBase, stripLocale } from "./withBase";

export type Alternates = Partial<Record<Locale, string>>;

/**
 * URL of the current page in every locale, for the language switcher.
 * Pages that exist in all locales (home, about, blog index…) map one-to-one.
 * Paginated pages (/2/, /blog/2/) and tag pages don't have reliable
 * counterparts, so they fall back to that locale's home, blog or tags index.
 * Post pages pass their real translations instead of using this.
 *
 * `exact` is false when fallbacks were used: those must not be announced
 * as translations in `hreflang` tags.
 */
export function getDefaultAlternates(
  url: URL,
  locale: Locale
): { alternates: Alternates; exact: boolean } {
  const path = stripLocale(
    stripBase(url.pathname).replace(/\/+$/, ""),
    locale
  ).replace(/^\/+/, "");

  const segments = path.split("/").filter(Boolean);
  const target = /^\d+$/.test(segments[0] ?? "")
    ? ""
    : segments[0] === "blog" &&
        segments.length > 1 &&
        !["tags", "archives"].includes(segments[1])
      ? "blog"
      : segments[0] === "blog" && segments[1] === "tags" && segments.length > 2
        ? "blog/tags"
        : path;

  const alternates = Object.fromEntries(
    LOCALES.map(l => [l, localeUrl(l, target)])
  ) as Alternates;
  return { alternates, exact: target === path };
}
