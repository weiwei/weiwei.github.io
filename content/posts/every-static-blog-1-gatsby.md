+++
date = "2020-11-24"
title = "Every Static Blog Engine 1 - Gatsby"
description = "Gatsby setup is a nightmare"
series = ["Every Static Blog Engine"]
+++

## Preparation

I installed NodeJS 14 LTS with package managers.On Windows I installed scoop. On Mac I installed brew.

## Install `gatsby-cli`

Installing `gatsby-cli` appears to be smooth on both platforms. I saw no error on both Windows and Mac.

```
npm install -g gatsby-cli
```

`npm install` is quite slow in China. There are Chinese NPM mirrors. If you don't want to use the mirrors, you can use VPN to speed things up.

## Initiate the blog

This is where the issues begin.

`gatsby new weiwei-gatsby.github.io https://github.com/gatsbyjs/gatsby-starter-blog`

### Windows

I got error like this:

```
> mozjpeg@7.0.0 postinstall D:\code\weiwei-gatsby.github.io\node_modules\mozjpeg
> node lib/install.js

  ‼ getaddrinfo ENOENT raw.githubusercontent.com
  ‼ mozjpeg pre-build test failed
  i compiling from source
  × Error: Command failed: C:\Windows\system32\cmd.exe /s /c "autoreconf -fiv"
'autoreconf' �����ڲ����ⲿ���Ҳ���ǿ����еĳ���
���������ļ���
```

Cool. I don't even know where to look at. But I guess it's because I don't have `autoconf`. I have absolutely no idea how to install it. Someone asked the same issue on [stackoverflow](https://stackoverflow.com/questions/63537071/cant-install-gatsby-plugin-sharp-libpng-dev-may-not-installed) and nobody gave an answer.

I give up.

### Mac

Install failed for the same package, but the error message is different.

```
npm ERR! code 1
npm ERR! path /Users/wei/code/weiwei.gb/node_modules/mozjpeg
npm ERR! command failed
npm ERR! command sh -c node lib/install.js
npm ERR! ⚠ connect ECONNREFUSED 0.0.0.0:443
npm ERR!   ⚠ mozjpeg pre-build test failed
npm ERR!   ℹ compiling from source
npm ERR!   ✖ Error: Command failed: /bin/sh -c ./configure --enable-static --disable-shared --disable-dependency-tracking --with-jpeg8 libpng_LIBS='/usr/local/lib/libpng16.a -lz' --enable-static --prefix="/Users/wei/code/weiwei.gb/node_modules/mozjpeg/vendor" --bindir="/Users/wei/code/weiwei.gb/node_modules/mozjpeg/vendor" --libdir="/Users/wei/code/weiwei.gb/node_modules/mozjpeg/vendor"
npm ERR! configure: error: no nasm (Netwide Assembler) found
```

At least the message is readable. I ran `brew install nasm` and it finally passed for me.

## Conclusion

The install experience isn't quite enjoyable. Nothing worked in the first place. I want something that works both on Windows and Mac. I can't get it work on Windows.
