# Keyboard And Me

Weiwei's personal website, built with [Astro](https://astro.build) on top of the
[AstroPaper](https://github.com/satnaing/astro-paper) theme, in English and Chinese.

## Prepare

* Install [fnm](https://github.com/Schniz/fnm) and pnpm. The Node version is
  pinned in `.node-version`; fnm switches to it when you `cd` into the repo.

  ```bash
  brew install fnm
  fnm install
  npm i -g pnpm
  ```

* Clone the repo and install dependencies.

  ```bash
  git clone git@github.com:weiwei/weiwei.github.io.git
  cd weiwei.github.io
  pnpm install
  ```

## Write

* Run `pnpm dev` and open http://localhost:4321.
* Posts live in `src/content/blog/`. Folders are only for organizing; they
  don't show up in URLs.
* The file name decides the language and the URL:

  | File                                  | URL                    |
  | ------------------------------------- | ---------------------- |
  | `2026/my-post.md`                     | `/blog/my-post/`       |
  | `2026/my-post.zh.md`                  | `/zh/blog/my-post/`    |
  | `2026/my-post/index.zh.md` (+ images) | `/zh/blog/my-post/`    |

  Posts with the same name in different languages are linked as translations.
  Set `slug:` in the front matter to override the name.

* Front matter:

  ```yaml
  ---
  title: My post
  pubDatetime: 2026-09-22
  description: Optional one-line summary shown in lists
  tags: [programming]
  series: [Every Layout]   # optional
  draft: true              # optional, hides the post
  ---
  ```

* Pages (About) live in `src/content/pages/`, same naming rules.
* Run `pnpm build` before committing; it type-checks, builds and indexes search.

## Customize

* Site settings: `astro-paper.config.ts`
* Interface text per language: `src/i18n/lang/{en,zh}.ts`
* Languages: `src/i18n/locales.ts`
* Styles and colors: `src/styles/`

See the [AstroPaper docs](https://github.com/satnaing/astro-paper#readme) for more.

## Deploy

Vercel builds every push with `pnpm build` (see `vercel.json`).
