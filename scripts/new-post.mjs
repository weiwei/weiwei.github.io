#!/usr/bin/env node
// Create a new blog post from a template.
//
//   pnpm new-post <slug> [--zh] [--bundle] [--mdx] [--title "Post title"]
//
//   pnpm new-post my-post             → src/content/blog/<year>/my-post.md
//   pnpm new-post my-post --zh        → src/content/blog/<year>/my-post.zh.md
//   pnpm new-post my-post --bundle    → src/content/blog/<year>/my-post/index.md
//   pnpm new-post my-post --mdx       → src/content/blog/<year>/my-post.mdx
//                                       (MDX can use components, e.g. <YouTube id="…" />)
//
// The post starts as a draft (hidden from the site); delete `draft: true`
// to publish it.
import fs from "node:fs";
import path from "node:path";
import { parseArgs } from "node:util";

const BLOG_DIR = "src/content/blog";
const LOCALES = ["en", "zh"]; // keep in sync with src/i18n/locales.ts
const DEFAULT_LOCALE = "en";

function fail(message) {
  console.error(`new-post: ${message}`);
  console.error('usage: pnpm new-post <slug> [--zh] [--bundle] [--mdx] [--title "..."]');
  process.exit(1);
}

const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    zh: { type: "boolean", default: false },
    bundle: { type: "boolean", default: false },
    mdx: { type: "boolean", default: false },
    title: { type: "string" },
  },
});

const slug = positionals[0];
if (!slug) fail("missing <slug>");
if (positionals.length > 1) fail(`unexpected arguments: ${positionals.slice(1).join(" ")}`);
if (/[\\/\s]/.test(slug) || slug.startsWith(".") || slug.startsWith("_")) {
  fail(`invalid slug "${slug}": no slashes or spaces, and no leading "." or "_"`);
}

const locale = values.zh ? "zh" : DEFAULT_LOCALE;

// Same rules as `localizedId` in src/content.config.ts: the locale comes from
// the file suffix, the slug from the file (or bundle folder) name unless the
// front matter sets `slug`. Two posts with the same locale and slug would
// share a URL.
function entryId(file) {
  const segments = path.relative(BLOG_DIR, file).replace(/\.mdx?$/, "").split(path.sep);
  let name = segments.pop();
  const suffix = name.match(/\.([a-z]{2})$/)?.[1];
  const entryLocale = LOCALES.includes(suffix) ? suffix : DEFAULT_LOCALE;
  if (LOCALES.includes(suffix)) name = name.slice(0, -suffix.length - 1);
  if (name === "index" && segments.length > 0) name = segments.pop();
  const frontSlug = fs.readFileSync(file, "utf8").match(/^slug:\s*["']?(.+?)["']?\s*$/m)?.[1];
  return `${entryLocale}/${frontSlug || name}`;
}

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(p);
    return /\.mdx?$/.test(entry.name) && !entry.name.startsWith("_") ? [p] : [];
  });
}

const clash = walk(BLOG_DIR).find(file => entryId(file) === `${locale}/${slug}`);
if (clash) fail(`a post with slug "${slug}" (${locale}) already exists: ${clash}`);

// Local date as YYYY-MM-DD
const today = new Date().toLocaleDateString("en-CA");
const year = today.slice(0, 4);
const ext = values.mdx ? "mdx" : "md";
const langSuffix = locale === DEFAULT_LOCALE ? "" : `.${locale}`;
const target = values.bundle
  ? path.join(BLOG_DIR, year, slug, `index${langSuffix}.${ext}`)
  : path.join(BLOG_DIR, year, `${slug}${langSuffix}.${ext}`);

if (fs.existsSync(target)) fail(`${target} already exists`);

// Default title from the slug: "my-post-title" → "My post title"
const title =
  values.title ??
  slug.replace(/-+/g, " ").replace(/^\p{Ll}/u, c => c.toUpperCase());

const content = `---
title: ${JSON.stringify(title)}
pubDatetime: ${today}
description: ""
tags: []
draft: true
---

`;

fs.mkdirSync(path.dirname(target), { recursive: true });
fs.writeFileSync(target, content, { flag: "wx" });
console.log(`Created ${target}`);
console.log("It's a draft: remove `draft: true` from the front matter to publish it.");
