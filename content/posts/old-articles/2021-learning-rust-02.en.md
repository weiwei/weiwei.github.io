---
date: "2021-06-01"
title: "Learning Rust 02"
subtitle: "Implementing is_vowel, continued"
tags: [
    "rust"
]
series: ["Learning Rust"]
authors: ["Weiwei"]
---

Today I found an implementation of `is_vowel` by [BartMassey](https://github.com/BartMassey/is-vowel). It's a much advanced implementation. I'll try to analyze the code. Bear in mind that there is still much that I don't know or understand.

## External dependencies

The `Cargo.toml` indicates that two external dependencies are used:

* [`once_cell`](https://github.com/matklad/once_cell) that provides cell-like types.
* [`unicode-normalization`](https://github.com/unicode-rs/unicode-normalization) that does what the name says.

What is a cell-like type? See [`std::cell`](https://doc.rust-lang.org/std/cell/). It's "shareable mutable container", and the rest is a blur. I think I'll revisit it later.

`unicode-normalization` provides traits to `char`s so they can be normalized. I've begin to feel that traits are indeed a smart idea. Though still lots to learn!

TODO: Read docs about `std::cell` and `once_shell`.

## static or const

Here is how the library initiate the vowels to be checked against:

```rust
static BASE_VOWELS: Lazy<HashSet<char>> = Lazy::new(|| "aeiouAEIOU".chars().collect());
```

`Lazy` is provided by `once_cell` that does roughly what `lazy_static!` macro does. 

TODO: Read https://docs.rs/lazy_static/1.4.0/lazy_static/

I think I'm almost sure that a simple `const` would suffice. Though the author may have his reasons.
## Traits

The library implemented a trait for `char` that checks if it is a vowel, then added [`Sealed`](https://rust-lang.github.io/api-guidelines/future-proofing.html#c-sealed) to char to prevent downstream reimplementation. 

Or we could just use a simple function, like I did previously. So is traits the way?

Rust's official blog published an article about [traits](https://blog.rust-lang.org/2015/05/11/traits.html). It says that traits are good for extension methods:

> Traits can be used to extend an existing type (defined elsewhere) with new methods, for convenience, similarly to C#'s extension methods. This falls directly out of the scoping rules for traits: you just define the new methods in a trait, provide an implementation for the type in question, and voila, the method is available.

So I guess it means that traits is the way to go?