---
title: "On Open Source"
blurb: "Oh, open source, how thee makes work for me."
tags:
  - mozilla
  - opensource
old_permalink: "articles/7-on_open_source"
---

Two weeks ago, while working on a project yet to be revealed (unless you happen to stalk me on [Bugzilla](https://bugzilla.mozilla.org) - I’ll write about it soon, I promise), I happened to make Minefield seg fault. I was talking to [Shawn Wilsher](http://shawnwilsher.com/) about what I was working on, so he had some familiarity with the code, and told me it *shouldn’t* be crashing. But it was. Shawn told me to file a bug, create a test case, and get a stack trace with [GDB](http://sourceware.org/gdb/). I was a bit annoyed because it took time away from what I was working on. But I did all that, filed [the bug](https://bugzilla.mozilla.org/show_bug.cgi?id=444233), and went along my way.

The other day, I got to work and found a few Bugzilla emails waiting. Apparently somebody had written a patch for the bug, and it had been r+ed and checked in. I figured somebody was looking at it, but a lot happened at once. So I took a look at the [commit log](http://hg.mozilla.org/index.cgi/mozilla-central/rev/3c1f72eddf61) and it turns out that the test case I had written had been included! That makes perfect sense - we want to keep the test around to make sure we don’t regress in the future - but it still surprised me. I never came to Mozilla expecting to touch such a random place in the code base. And while I wasn’t fixing the C++ code, I was still contributing. It felt good.

I think *that* is part of the power of open source.
