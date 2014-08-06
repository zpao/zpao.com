---
title: "Switch to Tab & Closing Empty Tabs"
tags:
  - firefox
  - mozilla
  - ux
tumblr_permalink: post/702614651/switch-to-tab-closing-empty-tabs
---

Firefox 4 will be introducing a [new feature](https://wiki.mozilla.org/Firefox/Projects/Tab_Matches_in_Awesomebar) called "Switch to Tab" or "Tab Matches in Awesomebar", a feature that attempts to see if the page you're looking for is already open. If it is (and you explicitly select that location bar suggestion), you'll be taken to that open tab instead of opening a new one. This is great step forward & I've already found it quite helpful. I tend to open the same bug several times over the course of a day or week. Now instead of having 3 copies, I can just have one and switch to it quickly.

Even though [Blair](http://theunfocused.net) toiled away on it, there were still a few bugs with the initial implementation. Blair immediately jumped into another small project (redesigning the Add-ons Manager is pretty trivial right?), so many of the followup bugs went unowned. I took two of those bugs; I fixed [one](https://bugzilla.mozilla.org/show_bug.cgi?id=556061) a few weeks ago and finally fixed the [other](https://bugzilla.mozilla.org/show_bug.cgi?id=555767) today.

The second one is the one that will make more of a difference for user experience. My common workflow goes like this (notice the brokenness at the end):

1. Open a new tab
2. Start typing new URL
3. Sweet, a match! Switch to it.
4. Repeat 1-3
5. WTF? I have 15 blank tabs open?

With [my patch](http://hg.mozilla.org/mozilla-central/rev/2333f6d349d7) *we'll now close that empty tab after we switch focus*. No more step 5. That is all.
