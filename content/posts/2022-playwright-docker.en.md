---
date: "2022-02-23"
title: "Remember to update playwright scripts"
subtitle: "Implementing is_vowel"
tags: [
    "playwright", "testing"
]
series: []
authors: ["Weiwei"]
---

We've had a repo that uses playwright for testing. The test runs daily with
Jenkins and Docker. It's been quite stable and haven't been updated for a good
year. Yesterday I tried to update playwright to the most recent version, but
after updating, CI stopped working:

```shell
    ╔════════════════════════════════════════════════════════════╗
    ║ Host system is missing a few dependencies to run browsers. ║
    ║ Please install them with the following command:            ║
    ║                                                            ║
    ║     sudo npx playwright install-deps                       ║
    ║                                                            ║
    ║ <3 Playwright Team                                         ║
    ╚════════════════════════════════════════════════════════════╝
```

I did feel the love from Playwright team. However, running the command in the
Dockerfile solved nothing. It reported that every dependency was ready and
up-to-date, and the test still kept failing as before.

After some fiddling, it turned out that all I need to do is update the Docker
base image. I was using `mcr.microsoft.com/playwright:bionic` but the newest is
`mcr.microsoft.com/playwright:focal`. After the change everything worked
perfectly again.

SO there you go. We may have several places to put playwright in. The project's
`package.json`, the global playwright install (perhaps via `npx`), and the
docker environment in which a specific version of playwright and the browsers
are installed. A safe practice may be like this:

* Pin a specific version of playwright in `Dockerfile` as well as in 
  `package.json`. In `Dockerfile` it may be something like 
  `FROM mcr.microsoft.com/playwright:v1.19.0-focal`. While updating playwright
  version, remember to update both places.
* Avoid using a global install of playwright. Load playwright from the project
  with `npm run playwright` or another packaging tool such as `yarn`. 

The error message recommends `npx`. It may work most of the times, but when
versions don't match and things go awry, it might be difficult to find the 
cause, and the friendly error message might not help.