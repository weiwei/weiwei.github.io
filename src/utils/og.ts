import type { CollectionEntry } from "astro:content";
import config from "@/config";

// The OG font (Google Sans Code) only covers Latin script. Chinese/Japanese
// characters are drawn with a Noto Sans SC subset fetched per image (see
// `loadCjkFont`). Titles in other scripts would render as empty boxes, so
// those posts use the site-wide OG image instead of a generated one.
const renderable =
  /^[\p{Script=Latin}\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{N}\p{P}\p{S}\s]*$/u;

const hasCjk = /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}　-〿＀-￯]/u;

/** Whether a post gets a generated `/blog/<slug>/index.png` OG image. */
export function hasDynamicOgImage({ data }: CollectionEntry<"posts">) {
  return (
    config.features.dynamicOgImage &&
    !data.draft &&
    !data.ogImage &&
    renderable.test(data.title)
  );
}

/**
 * Bold Noto Sans SC containing only the CJK characters in `text`, as TTF for
 * satori. Google Fonts subsets the font to the requested characters, so each
 * file is a few KB. Returns null when `text` has no CJK characters, or (with
 * a warning) when the download fails, e.g. building offline.
 */
export async function loadCjkFont(text: string): Promise<ArrayBuffer | null> {
  const chars = [...new Set(text)].filter(c => hasCjk.test(c)).join("");
  if (!chars) return null;

  try {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@700&text=${encodeURIComponent(chars)}`
    ).then(res => res.text());
    const fontUrl = css.match(
      /src: url\((.+?)\) format\('(?:opentype|truetype)'\)/
    )?.[1];
    if (!fontUrl) throw new Error("no TTF/OTF source in Google Fonts CSS");
    return await fetch(fontUrl).then(res => res.arrayBuffer());
  } catch (error) {
    console.warn(`OG image: couldn't load CJK font for "${text}":`, error);
    return null;
  }
}
