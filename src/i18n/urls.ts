import { getRelativeLocaleUrl } from "astro:i18n";
import type { Locale } from "./locales";

/** Locale-aware URL for a site path, e.g. `("zh", "blog")` → `/zh/blog/`. */
export function localeUrl(locale: Locale, path = ""): string {
  return getRelativeLocaleUrl(locale, path);
}

/**
 * Locale-aware URL for a file, e.g. `("zh", "rss.xml")` → `/zh/rss.xml`.
 * Unlike `localeUrl`, no trailing slash is added.
 */
export function localeFileUrl(locale: Locale, file: string): string {
  return `${localeUrl(locale).replace(/\/?$/, "/")}${file}`;
}
