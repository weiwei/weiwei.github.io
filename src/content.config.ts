import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";
import config from "@/config";
import { DEFAULT_LOCALE, isLocale } from "@/i18n/locales";

export const BLOG_PATH = "src/content/blog";

/**
 * Entry ids are `<locale>/<slug>`, derived from the file path:
 *
 * - locale comes from the file suffix: `foo.zh.md` → `zh`, `foo.md` → default
 * - slug is the file name, or the folder name for page bundles
 *   (`2015-foo/index.zh.md` → `2015-foo`), unless front matter sets `slug`
 *
 * Folders are only for organizing: they never appear in URLs. Translations
 * of a post share the same slug, which is how they get linked together.
 */
function localizedId({
  entry,
  data,
}: {
  entry: string;
  data: Record<string, unknown>;
}) {
  const segments = entry.replace(/\.mdx?$/, "").split("/");
  let name = segments.pop() ?? "";

  const suffix = name.match(/\.([a-z]{2})$/)?.[1];
  const locale = isLocale(suffix) ? suffix : DEFAULT_LOCALE;
  if (isLocale(suffix)) name = name.slice(0, -suffix.length - 1);
  if (name === "index" && segments.length > 0) name = segments.pop() ?? name;

  const slug = typeof data.slug === "string" && data.slug ? data.slug : name;
  return `${locale}/${slug}`;
}

const posts = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.{md,mdx}",
    base: `./${BLOG_PATH}`,
    generateId: localizedId,
  }),
  schema: ({ image }) =>
    z.object({
      author: z.string().default(config.site.author),
      pubDatetime: z.coerce.date(),
      modDatetime: z.coerce.date().optional().nullable(),
      title: z.string(),
      featured: z.boolean().optional(),
      draft: z.boolean().optional(),
      tags: z.array(z.string()).default([]),
      series: z.array(z.string()).default([]),
      slug: z.string().optional(),
      ogImage: image().or(z.string()).optional(),
      description: z.string().default(""),
      canonicalURL: z.string().optional(),
      hideEditPost: z.boolean().optional(),
      timezone: z.string().optional(),
    }),
});

const pages = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.{md,mdx}",
    base: "./src/content/pages",
    generateId: localizedId,
  }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    ogImage: z.string().optional(),
    canonicalURL: z.string().optional(),
  }),
});

export const collections = { posts, pages };
