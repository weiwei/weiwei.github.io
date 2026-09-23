import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getLocalePosts } from "@/utils/getLocalePosts";
import { getPostUrl } from "@/utils/getPostPaths";
import { LOCALE_TAGS, localePaths, type Locale } from "@/i18n/locales";
import { useTranslations } from "@/i18n";
import config from "@/config";

export const getStaticPaths = localePaths;

/** One feed per language: /rss.xml, /zh/rss.xml */
export async function GET({ props }: APIContext<{ locale: Locale }>) {
  const { locale } = props;
  const sortedPosts = await getLocalePosts(locale);

  return rss({
    title: config.site.title,
    description: useTranslations(locale).site.description,
    site: config.site.url,
    customData: `<language>${LOCALE_TAGS[locale]}</language>`,
    items: sortedPosts.map(({ data, id }) => ({
      link: getPostUrl({ id }),
      title: data.title,
      description: data.description,
      pubDate: new Date(data.modDatetime ?? data.pubDatetime),
    })),
  });
}
