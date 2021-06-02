---
date: "2021-06-01"
title: "Learning Rust 01"
subtitle: "Implementing is_vowel"
tags: [
    "rust"
]
series: ["Learning Rust"]
authors: ["Weiwei"]
---

Recently I'm trying to learn rust by rewriting one of my typescript libraries into rust. The purpose of the articles is that I record myself sorting things out and trying to understand stuff. They are mostly memos or notes that I serve myself. Though i'd be glad if you find it interesting, and even happier if you could point out errors and directions. Cheers.

The project I'm rewriting is [silabacion](https://www.npmjs.com/package/silabacion). It divides Spanish words into syllables, and tries to provide as many phonetic features as possible. There isn't much about it, just lots of string manipulation and pattern matching. It should be a good exercise to rewrite it with rust, and the result could be useful for those 5 people who process Spanish words with rust, so why not?

Starting small. First I want to convert some easy utility functions. For example this one:

```typescript
const ACCENTED_VOWELS = ['á', 'é', 'í', 'ó', 'ú'];
const NON_ACCENTED_VOWELS = ['a', 'e', 'i', 'o', 'u', 'ü'];
const ALL_VOWELS = [...ACCENTED_VOWELS, ...NON_ACCENTED_VOWELS];

// ...

export function isVowel(char: string) {
  return ALL_VOWELS.includes(char.toLowerCase());
}
```

Let's (or let me, because this is just me trying to sort things out) dive in. Note that until now I just have read the first few chapters of [the book](https://doc.rust-lang.org/book/title-page.html) and a few articles online. I don't know a lot of things.

## Creating global constants

The lesson: You can't create new constants based on existing constants.

In the typescript code, I created `ALL_VOWELS` with two existing arrays. However, with rust, if I want to define a `const` with a similar way, I'm out of luck. According to the [documentation](https://doc.rust-lang.org/reference/const_eval.html), only constant expressions are allowed for `const` definition. Rust's equivalent of spreading isn't a constant expression. So no luck, we have to do it the hard way:

```rust
pub const ALL_VOWELS: [char; 11] = ['á', 'é', 'í', 'ó', 'ú', 'a', 'e', 'i', 'o', 'u', 'ü'];
```

## Getting lowercase

The lesson: `ch.to_lowercase` returns an iterator of `char`s, not a simple `char`.

It is necessary because in some languages, one upper case letter may have a lower case counterpart that consists of multiple letters, or vice versa. In German for example, the lower case letter `ß` is usually turned to `SS` in upper case.

In typescript, you get the lower case character by simply calling a function. Because typescript doesn't distinguish between char and string, it doesn't hurt if it doesn't return an iterator. But in rust, that wouldn't do.

```rust
pub fn is_vowel0(ch: &char) -> bool {
    match &ch.to_lowercase().to_string().chars().next() {
        Some(x) => ALL_VOWELS.contains(x),
        None => false,
    }
}
```

Note how much work we have to do with this. We have to turn the `to_lowercase()` result (an iterator) to a string, then to an iterator of `char`s, then get its first item, then check if it matches the predefined list.

## Dumber, but Better Implementations

The above approach is enough to make the rust implementation slower than its node.js counterpart (I could be wrong, I haven't tested). So I did the dumb method by letting `ALL_VOWELS` contain both upper and lower case letters.

```rust
pub const ALL_VOWELS: [char; 22] = ['á', 'é', 'í', 'ó', 'ú', 'a', 'e', 'i', 'o', 'u', 'ü', 'Á', 'É', 'Í', 'Ó', 'Ú', 'A', 'E', 'I', 'O', 'U', 'Ü'];

pub fn is_vowel1(ch: &char) -> bool {
    ALL_VOWELS.contains(ch)
}
```

This version is about 4 times faster than the previous implementation in my naive performance test. I believe it would be even faster in optimized release build.

Another implementation I've seen is like [this](https://gist.github.com/Kushagra-0801/1ffbded3f8a03d9841f42fbb9e8c4bc9), and I've created a similar one to test:

```rust
pub fn is_vowel2(c: &char) -> bool {
    match c {
        'á' | 'é' | 'í' | 'ó' | 'ú' | 'a' | 'e' | 'i' | 'o' | 'u' | 'ü' | 'Á' | 'É' | 'Í' | 'Ó'
        | 'Ú' | 'A' | 'E' | 'I' | 'O' | 'U' | 'Ü' => true,
        _ => false,
    }
}
```

The result code appears to be 10 to 20 times faster than the previous implementation. I don't know why.

Another implementation could be using equals test:

```rust
pub fn is_vowel3(c: &char) -> bool {
    let c = c.clone();
    c == 'á'
        || c == 'é'
        || c == 'í'
        || c == 'ó'
        || c == 'ú'
        || c == 'a'
        || c == 'e'
        || c == 'i'
        || c == 'o'
        || c == 'u'
        || c == 'ü'
        || c == 'Á'
        || c == 'É'
        || c == 'Í'
        || c == 'Ó'
        || c == 'Ú'
        || c == 'A'
        || c == 'E'
        || c == 'I'
        || c == 'O'
        || c == 'U'
        || c == 'Ü'
}
```

This is slower than the previous one, probably because I had to `clone` the character. Or something else. Anyway, it's too ugly, I think I'll forget about it.

For now I'll stick with `is_vowel1` or `is_vowel2` because they appear to be fast enough and not too ugly.

## TODOs

* I still don't know which is more idiomatic.
* I still don't fully understand the performance result.
  