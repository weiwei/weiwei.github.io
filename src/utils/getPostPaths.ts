import { toLocale, type Locale } from "@/i18n/locales";
import { localeUrl } from "@/i18n/urls";

type Entry = { id: string };

/** Locale of a post or page entry, from its `<locale>/<slug>` id. */
export function getEntryLocale({ id }: Entry): Locale {
  return toLocale(id.split("/")[0]);
}

/** Slug of a post or page entry, shared by all its translations. */
export function getEntrySlug({ id }: Entry): string {
  return id.split("/").slice(1).join("/");
}

/**
 * Returns a fully navigable URL for use in `<a href>` and RSS links.
 * Posts always link in their own language: `/blog/foo/`, `/zh/blog/foo/`.
 */
export function getPostUrl(post: Entry): string {
  return localeUrl(getEntryLocale(post), `blog/${getEntrySlug(post)}`);
}
