/**
 * Site locales. Keep in sync with `i18n.locales` in `astro.config.ts`.
 * The default locale is served without a URL prefix (`/blog/...`),
 * the others under their code (`/zh/blog/...`).
 */
export const LOCALES = ["en", "zh"] as const;
export const DEFAULT_LOCALE = "en";

export type Locale = (typeof LOCALES)[number];

/** Short codes shown in the header language switcher. */
export const LOCALE_SHORT_LABELS: Record<Locale, string> = {
  en: "EN",
  zh: "ZH",
};

/** Native language names, for tooltips and "Also available in" links. */
export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  zh: "中文",
};

/** BCP 47 tags for `<html lang>`, `hreflang` and date formatting. */
export const LOCALE_TAGS: Record<Locale, string> = {
  en: "en",
  zh: "zh-CN",
};

export function isLocale(value: string | undefined): value is Locale {
  return LOCALES.includes(value as Locale);
}

export function toLocale(value: string | undefined): Locale {
  return isLocale(value) ? value : DEFAULT_LOCALE;
}

/** Route param for `[...locale]`: `undefined` for the unprefixed default locale. */
export function localeParam(locale: Locale): string | undefined {
  return locale === DEFAULT_LOCALE ? undefined : locale;
}

/** `getStaticPaths` entries for pages that exist once per locale. */
export function localePaths() {
  return LOCALES.map(locale => ({
    params: { locale: localeParam(locale) },
    props: { locale },
  }));
}
