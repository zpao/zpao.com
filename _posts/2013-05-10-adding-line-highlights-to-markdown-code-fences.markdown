---
title: "Adding Line Highlights to Markdown Code Fences"
date: 2013-05-10
tags:
  - markdown
  - ruby
layout: post
---

One thing I needed recently was an unobtrusive way to highlight lines of code, while keeping it readable (and of course, inside Markdown). The main use case I wanted it for is to highlight changed lines of code inside a tutorial. I think this is a fairly common case, and if your code blocks contain more than 3 lines of code, it's really helpful for the reader.

I didn't find any flavor of Markdown that let me do this, so I figured I would build on what I think is the best variant - [GitHub Flavored Markdown](https://help.github.com/articles/github-flavored-markdown). Code fences are already a non-standard (but super common) feature that GitHub uses, and they've also added in syntax highlighting using [Pygments](http://pygments.org/). Pygments already has the ability to highlight lines, so all we need is a way to pass that through.

I came up with this syntax: `{1,3,8-12}`. It's simple and let's you express individual lines and ranges with ease. It shouldn't conflict with any lexer name you might need to pass to Pygments (or highlighter of choice). Here's what it looks like in more context:

```
```javascript{1,3,8-12}
```

And a full working example:

```javascript{3-5}
// This is nonsense sample code
var sample = document.getElementById('sample');
sample.addEventListener('click', function(event) {
  console.log('This is a silly place.');
});
```

I would love to see this (or a similar) syntax make it's way into GFM, and maybe get support in some of the Markdown parsers as another extension. I might start hacking on that soon, but in the mean time, if you want to add support for this to your Jekyll + Redcarpet + Pygments site (and are generating your own `HTML` because GitHub won't run your code), here's a file you can drop into `_plugins` and go (only tested with Jekyll 1.0+):

<script src="https://gist.github.com/zpao/5557101.js"></script>
