import type { APIContext } from "astro";
import { getLocalePosts } from "@/utils/getLocalePosts";
import { getPostUrl } from "@/utils/getPostPaths";
import { htmlToSearchText, SUBSTRING_SEARCH_LOCALES } from "@/utils/search";
import { LOCALE_TAGS, localeParam, type Locale } from "@/i18n/locales";
import config from "@/config";

/** Search data for locales using substring search, e.g. /zh/search-index.json */
export function getStaticPaths() {
  return SUBSTRING_SEARCH_LOCALES.map(locale => ({
    params: { locale: localeParam(locale) },
    props: { locale },
  }));
}

export type SearchIndexEntry = {
  /** title */
  t: string;
  /** URL */
  u: string;
  /** formatted publish date */
  d: string;
  /** plain text body */
  x: string;
};

export async function GET({ props }: APIContext<{ locale: Locale }>) {
  const { locale } = props;
  const dateFormat = new Intl.DateTimeFormat(LOCALE_TAGS[locale], {
    dateStyle: "medium",
    timeZone: config.site.timezone,
  });

  const entries: SearchIndexEntry[] = (await getLocalePosts(locale)).map(
    post => ({
      t: post.data.title,
      u: getPostUrl(post),
      d: dateFormat.format(post.data.pubDatetime),
      x: htmlToSearchText(post.rendered?.html ?? post.body ?? ""),
    })
  );

  return new Response(JSON.stringify(entries), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}
