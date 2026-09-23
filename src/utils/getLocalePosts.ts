import { getCollection, type CollectionEntry } from "astro:content";
import { LOCALES, type Locale } from "@/i18n/locales";
import { getSortedPosts } from "./getSortedPosts";
import { getEntryLocale, getEntrySlug, getPostUrl } from "./getPostPaths";

/** Visible posts in one language, newest first. */
export async function getLocalePosts(locale: Locale) {
  const posts = await getCollection(
    "posts",
    post => getEntryLocale(post) === locale
  );
  return getSortedPosts(posts);
}

/**
 * Other-language versions of a post (same slug), as locale → URL.
 * Only includes languages the post actually exists in.
 */
export async function getPostTranslations(post: CollectionEntry<"posts">) {
  const slug = getEntrySlug(post);
  const posts = getSortedPosts(await getCollection("posts"));
  const translations: Partial<Record<Locale, string>> = {};
  for (const locale of LOCALES) {
    const match = posts.find(
      p => getEntryLocale(p) === locale && getEntrySlug(p) === slug
    );
    if (match) translations[locale] = getPostUrl(match);
  }
  return translations;
}
