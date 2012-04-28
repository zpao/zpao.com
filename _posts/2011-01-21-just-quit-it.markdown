---
title: "Just Quit It"
tags:
  - firefox
  - firefox4
  - mozilla
  - session restore
  - omgchange
layout: post
tumblr_permalink: post/2854700249/just-quit-it
---

For a long time now, if you didn't have Firefox set to restore your session then Firefox would prompt you before quitting. A dialog with 3 buttons and a checkbox. It looked like this:

![](/img/posts/just-quit-it.png)

That mostly just gets in your way though. You've already decided you want to quit. You don't also need to decide if you want to reopen your tabs next time. So starting with the next nightly (January 21st) and Firefox 4 beta 10, you will no longer see that prompt. Of course if you already checked the box to "not ask next time" you weren't seeing this anyway.

Essentially, all we did was flip a preference that has been there since Firefox 3 (that was almost 3 years ago for those of you keeping track at home). `browser.warnOnQuit` was added as hidden preference to override other conditions that might cause a dialog shown at quit. We set that to `false`. <strike>If you want Firefox 3.* behavior, then just flip the pref back to `true`.</strike>

If you're interested, this was done in [bug 592822](https://bugzilla.mozilla.org/show_bug.cgi?id=592822) (it was originally planned as part of [bug 588482](https://bugzilla.mozilla.org/show_bug.cgi?id=588482)).

## Dude, Where's My Session?

I know it's been a while since [I wrote about it](/posts/restore-previous-session), but it's now possible to restore your session on demand after startup. There is work underway to make that feature more visible, namely [bug 593421](https://bugzilla.mozilla.org/show_bug.cgi?id=593421) (to add a button on the start page) and [bug 589665](https://bugzilla.mozilla.org/show_bug.cgi?id=589665) (to add a button in Panorama).

- - -

**Update (Feb. 7, 2011):** We had to make some further changes. We kept the dialog turned off by default but had to do some work with preferences. Setting `browser.warnOnQuit` is no longer good enough to show the quit dialog. [Read more](/posts/about-that-quit-dialog)
