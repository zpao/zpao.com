---
title: "Cascaded Session Restore + a Hidden Bonus"
date: 2010-09-17
tags:
  - firefox
  - firefox4
  - session restore
  - mozilla
  - bartab
tumblr_permalink: post/1140456188/cascaded-session-restore-a-hidden-bonus
---

_In the tradition of announcing major things on Friday nights..._

I did this thing where we don't load all of your pages at once when we restore your session. That should keep your Firefox (and computer in general) a bit more usable when you start up Firefox with a large session. See [bug 586068](https://bugzilla.mozilla.org/show_bug.cgi?id=586068) if you're interested in the juicy details.

## Other Details

* Switching tabs should cause the selected tab to start loading immediately, even if it wasn't loading before
* This works with Panorama (so changing groups re-prioritizes your load order).

## Preference Controlled

We load a certain number of tabs based on the `browser.sessionstore.max_concurrent_tabs` preference. We've set the default to 3 for now.

## Hidden Bonus

Set the pref to 0. It's basically a built-in [BarTab](https://addons.mozilla.org/en-US/firefox/addon/67651).

## Quirks

We show the page title and favicon at start up, before we try to load the page. So you might see some slightly odd behavior. Panorama's thumbnail caching isn't perfect, so there will probably be missing thumbnails at start up if you switch into the Panorama view.

Please email me (link below!) or file a bug blocking 586068 if you see anything weird.
