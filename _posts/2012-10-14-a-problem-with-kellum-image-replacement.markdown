---
title: "A Problem with Kellum Image Replacement"
date: 2012-10-14T16:52
tags:
  - CSS
  - HTML
  - Front-End
  - webdev
---

If you've ever made a website that needed to use an image instead of some text, chances are you've used some image replacement technique. We all have our favorite way of doing this, but probably the most popular was the Phark technique, AKA "-9999px hack", which keeps text accessible to screen readers while hiding text off screen (unless you have a ludicrously long piece of text).

Recently, a new technique has become popular, [touted by the venerable Zeldman](http://www.zeldman.com/2012/03/01/replacing-the-9999px-hack-new-image-replacement/). It's a strikingly elegant solution and I quite like it.

## However...

It does have one issue. When using the browser's "find in page" functionality, the text you've hidden will become visible if it matches the text you're looking for. Even worse, once the text is shown it doesn't get hidden again when the search is complete. Try it out yourself on [the example page](/examples/a-problem-with-kellum-image-replacement/).

Like most things, there are quirks here:

* This bug(?) only occurs when using a positive `text-indent` value.
* Different browsers behave differently. In this case, the text doesn't become visible in Gecko browsers (Firefox). Webkit (Chrome, Safari) and Presto (Opera) both make the text visible. I haven't tested IE.


## Solutions?

I haven't figured out a way to work around this, so for the time being I'll likely be using the -9999px hack (or some smaller number). Or I may try another technique that sets `font: 0/0 a`, which of course has it's own set of [compatibility problems](http://nicolasgallagher.com/another-css-image-replacement-technique/).

In case you're using Firefox and can't see the bug, here's what it looks like:

![](/img/posts/a-problem-with-kellum-image-replacement.png)
