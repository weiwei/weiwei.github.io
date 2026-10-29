import { YouTube } from "@astro-community/astro-embed-youtube";

/**
 * Components available in every .mdx post and page without an import:
 *
 *   <YouTube id="dQw4w9WgXcQ" />
 *
 * Pass to rendered content as `<Content components={mdxComponents} />`.
 */
export const mdxComponents = { YouTube };
