import { defineAstroPaperConfig } from "./src/types/config";

export default defineAstroPaperConfig({
  site: {
    url: "https://keyboardand.me/",
    title: "Keyboard And Me",
    description: "Weiwei's personal website: programming, translation and languages.",
    author: "Weiwei",
    profile: "https://github.com/weiwei",
    ogImage: "default-og.jpg",
    lang: "en",
    timezone: "Asia/Shanghai",
    dir: "ltr",
  },
  posts: {
    perPage: 10,
    perIndex: 5,
    scheduledPostMargin: 15 * 60 * 1000,
  },
  features: {
    lightAndDarkMode: true,
    dynamicOgImage: true,
    showArchives: true,
    showBackButton: true,
    // To show "Edit page" links on posts:
    // { enabled: true, url: "https://github.com/weiwei/weiwei.github.io/edit/main/" }
    editPost: { enabled: false },
    search: "pagefind",
  },
  socials: [
    { name: "github",   url: "https://github.com/weiwei" },
    { name: "linkedin", url: "https://www.linkedin.com/in/oldjanx/" },
  ],
  shareLinks: [
    { name: "x",        url: "https://x.com/intent/post?url=" },
    { name: "telegram", url: "https://t.me/share/url?url=" },
    { name: "mail",     url: "mailto:?subject=See%20this%20post&body=" },
  ],
});
