---
title: "Per Tab Network Prioritization"
blurb: "An Introduction to the Idea &amp; Progress Report #1"
date: 2009-09-04
tags:
  - mozilla
  - firefox
  - performance
  - startup
  - extension
old_permalink: "articles/22-per_tab_network_prioritization"
---

**First!** (before you get distracted) [Try server builds!](https://build.mozilla.org/tryserver-builds/poshannessy@mozilla.com-try-11a9e78a8cb5/) and [the extension!](https://addons.mozilla.org/en-US/firefox/addon/14138/) (Firefox 3.5+)

## The Idea In Summary

An idea that’s likely been tossed around before has been brought to the forefront more recently by Firefox’s newest designer [Alexander Limi](http://limi.net/), the idea of [per tab network prioritization](https://wiki.mozilla.org/Firefox/Projects/Per_Tab_Network_Prioritization). The premise of the idea is that what you’re doing right now is more important that what you were doing 5 minutes ago. So to account for the relative importance, we should make what you’re looking at right now load faster. This is really part of a grander scheme to improve perceived performance, but has been reduced to try to make some improvement achievable for Firefox 3.6.

## In More Detail

For this pass, we divided tabs into level of importance (shown in descending order):

* Selected Tab in a Focused Window
* Background Tab in a Focused Window & Selected Tab in a Background Window
* Background Tab in a Background Window
* Any Tab in a Minimized Window

For the most part that makes sense, except for maybe one thing: the 2^(nd) level of importance has 2 items. We decided that (at least in general terms) background tabs in your current window and the focused tab in a background window should get the same level of network priority.

I then used this ranking to assign relative priorities. You can read more in the implementation section, but otherwise you can skip down to the progress report.

## Implementation

My original plan was to do this all in browser/base/content (browser.js, tabbrowser.xml), but I ran into a roadblock of some sort. So I wrote it as an extension. After fixing an observer topic, I could do this with relative ease. I set my JS up much like the SessionStore component, observed a number of topics, and listened for a number of events. I was using an observer topic (xul-window-visible) which I was told I shouldn’t use. When a tab was selected it’s network priority gets bumped up and the previously selected tab gets dropped down. Same concept for windows.

I had to [create some new events](https://bugzilla.mozilla.org/show_bug.cgi?id=511503) so that I could accurately know which window was focused. Then I brought it into our actual tree instead of living externally as an extension. I cleaned it up a bit, made sure I wasn’t doing to too much, and then finally got around to [filing the bug](https://bugzilla.mozilla.org/show_bug.cgi?id=514490). I would go into further detail, but it’s not super interesting. However, if you are interested, [take a look at the code](https://bugzilla.mozilla.org/attachment.cgi?id=398441&action=diff#a/browser/components/networkprioritizer/src/nsNetworkPrioritizer.js_sec1).

While there are some implementation details to improve upon (or just straight up change), it’s doing what it was supposed to be doing. At this point I could move this back into browser/base/content but since it’s working, there’s no value in it (until we decide the project is a final go).

## Progress Report

Initial results showed some improvement when loading large groups of tabs. It was most noticeable when loading many tabs from the same site (e.g. the default BBC livemarks). It was somewhat noticeable during a typical (for me) session restore. There was no difference during normal browsing.

But I’m just one person. I know this is all the way at the bottom of this article, but **PLEASE PLEASE PLEASE use [a try server build](https://build.mozilla.org/tryserver-builds/poshannessy@mozilla.com-try-11a9e78a8cb5/)** (or **[the extension](https://addons.mozilla.org/en-US/firefox/addon/14138/)**) for a little bit and see if there’s any noticeable difference. Even if it’s just to load up that 500 tab session you’ve been building up over the years.

**Next Steps:** Get Feedback! If people use it and the results are positive, this will get more attention (tests, better implementation, checked in). If it turns out that we didn’t quite achieve what we were hoping, then this will get shelved or used as part of another project.

So again: **[try server builds](https://build.mozilla.org/tryserver-builds/poshannessy@mozilla.com-try-11a9e78a8cb5/)** and **[the extension](https://addons.mozilla.org/en-US/firefox/addon/14138/)**!

*Updated September 4^(th) with links to the extension*
