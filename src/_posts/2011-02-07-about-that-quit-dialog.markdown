---
title: "About That Quit Dialog..."
tags:
  - firefox
  - firefox4
  - mozilla
  - omgchange
tumblr_permalink: post/3174360617/about-that-quit-dialog
---

Remember when we [turned it off a couple weeks ago](/posts/just-quit-it)? We did that by just flipping the `browser.warnOnQuit` preference to `false`. I mentioned that you could get old behavior back by flipping that preference back to `true`. That's not going to work anymore.

I just landed [bug 629485](https://bugzilla.mozilla.org/show_bug.cgi?id=629485) to change things again, so pay attention. When we turned off the quit dialog, we took away any way of stopping the last window from closing without any warning, even if you explicitly set the visible pref `browser.tabs.warnOnClose` which would show the window closing warning (when you have multiple tabs). That wasn't so cool. So we played around with the logic and made that possible. But in order to do so, we had to change the default value of `browser.warnOnQuit` to `true` and create a new preference which controls the quit dialog (`browser.showQuitDialog`). I know this sounds a bit inane, but there really wasn't a better way to do it and maintain `browser.warnOnQuit == false` as an override.

It's all a bit confusing, so I've [documented the conditions](http://hg.mozilla.org/mozilla-central/file/84921e24be9c/browser/components/nsBrowserGlue.js#l443) under which we won't show a dialog, as well as the rules for choosing which dialog to show. Some of that comment is perfectly clear; the rest requires a little bit of understanding of the code (but it shouldn't be too hard to figure out if you want).

Don't expect me to write another post like this. I don't expect any further changes to how this stuff works.

## TL;DR

* We enabled the window closing dialog when closing the last window would otherwise just quit (mostly important to Windows and Linux users).
* If you want the quit dialog back, set `browser.showQuitWarning` to `true` and make sure `browser.warnOnQuit` is also `true`.

- - -

**Update: Feb. 8, 2011:** Yup. I fucked that up a little bit. We aren't showing the quit dialog if you close the last window, even with the prefs mentioned above. That should be fixed in the next nightly.
