---
title: "Safari 6 and a Bug with getBoundingClientRect"
date: 2012-11-29 23:47
tags:
  - Safari
  - webdev
  - HTML
  - CSS
  - Bugs
  - Front-End
---

Safari 6 shipped in July with OS X Mountain Lion and with it, a nice little WebKit bug that has some fun side effects. The bug has since been fixed in WebKit, but due to Safari's slow release schedule, we'll probably be living with this one for a while. Chrome on the other hand is unaffected (at least on the current stable release). No other browser seem to suffer from the same bug.

## So What Happens?

Basically, if you translate a `position:fixed` element, Safari doesn't know where it is. It *does* -- Safari renders everything in the right place -- it just can't tell you where it is. Once the element is translated, calls to `getBoundingClientRect` lie. Safari basically forgets that the element was fixed and returns values that change as you scroll (sort of the opposite of what you want with `position:fixed`). I'm pretty sure the Web Inspector uses `getBoundingClientRect` in the inspector too… go ahead and hover the element inside the dev tools and watch where Safari draws the bounding rectangle in content.

[I made a quick demo](/examples/safari-6-and-a-bug-with-getboundingclientrect/) to show what's happening.

## It Gets Better... Sike!

The effect of this is cascading. Any element that is a descendent of a translated element will have its position reported incorrectly. On top of a misreported position, since Safari thinks the element is off screen, focusing it causes the page to scroll, *even if you can already see it*.

## What Can We Do?

As far as I know, there's only 1 option if you need generic code: walk up the DOM when you want to know the position of an element and see if any ancestors are translated, and then when you find one use [`WebKitCSSMatrix`](https://developer.apple.com/library/safari/documentation/AudioVideo/Reference/WebKitCSSMatrixClassReference/WebKitCSSMatrix/WebKitCSSMatrix.html).
