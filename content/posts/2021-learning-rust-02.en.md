---
date: "2021-06-01"
title: "Learning Rust 02"
subtitle: "Implementing is_vowel, continued"
tags: [
    "rust"
]
series: ["Learning Rust"]
authors: ["Weiwei"]
draft: true
---

Today I found an implementation of `is_vowel` by [BartMassey](https://github.com/BartMassey/is-vowel). It's a much advanced implementation. I'll try to analyze the code. Bear in mind that there is still much that I don't know or understand.

## External dependencies

The `Cargo.toml` indicates that two external dependencies are used:

* [`once_cell`](https://github.com/matklad/once_cell) that provides cell-like types.
* [`unicode-normalization`](https://github.com/unicode-rs/unicode-normalization) that does what the name says.

TODO: What is a cell-like type?
TODO: Read https://docs.rs/once_cell/1.7.2/once_cell/
TODO: Read https://docs.rs/lazy_static/1.4.0/lazy_static/

## static or const

TODO: research

## Traits

TODO: How does it work anyway?

### Sealed