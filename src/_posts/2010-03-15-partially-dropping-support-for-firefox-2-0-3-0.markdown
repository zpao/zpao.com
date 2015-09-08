---
title: "(Partially) Dropping Support for Firefox 2.0/3.0 Sessions"
tags:
  - mozilla
  - firefox
  - session restore
tumblr_permalink: post/450728650/partially-dropping-support-for-firefox-2-0-3-0
---

**_Note: This does not affect Firefox 3.5 or 3.6 users!_**

Today [I landed a patch](http://hg.mozilla.org/mozilla-central/rev/55b6bc4c0b92) for [bug 551285](https://bugzilla.mozilla.org/show_bug.cgi?id=551285), which removes support for certain parts of sessions created in Firefox 2.0 and 3.0. _This means that if you upgrade directly from 2.0 or 3.0 to Firefox.next (currently 3.7), you will lose some session data._

The data you would lose is limited to the following:

* Form data (2.0 and 3.0)
* Session Cookies (2.0 only)
* Tab XUL Attributes (2.0 and 3.0)
* Session History Post Data (2.0 only)
* Session History Owner (2.0 only)

If losing any of this data particularly bothers you, then it's as simple as upgrading to [Firefox 3.6](http://www.mozilla.com/en-US/firefox/firefox.html) or [Firefox 3.5](http://www.mozilla.com/firefox/all-older.html) first. Alternatively, some session management add-ons could update your session file for you (for example, the author of [Session Manager](https://addons.mozilla.org/en-US/firefox/addon/2324) is updating his add-on to do that).
