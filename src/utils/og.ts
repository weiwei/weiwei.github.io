import type { CollectionEntry } from "astro:content";
import config from "@/config";

// The OG font (Google Sans Code) only covers Latin script. Titles in other
// scripts (e.g. Chinese) would render as empty boxes, so those posts use the
// site-wide OG image instead of a generated one.
const renderable = /^[\p{Script=Latin}\p{N}\p{P}\p{S}\s]*$/u;

/** Whether a post gets a generated `/blog/<slug>/index.png` OG image. */
export function hasDynamicOgImage({ data }: CollectionEntry<"posts">) {
  return (
    config.features.dynamicOgImage &&
    !data.draft &&
    !data.ogImage &&
    renderable.test(data.title)
  );
}
