---
title: "Just Released: Always Ask"
blurb: "Because ⌘Q is WAY too close to ⌘W"
date: 2009-12-21
tags:
  - mozilla
  - firefox
  - extension
old_permalink: "articles/26-just_released_always_ask"
---

No, I didn't mean to press ⌘Q, I just wanted to close that tab. Sure, all I have to do is start Firefox again. You're right, I didn't really need those minutes of my life. Yea, go ahead and install those updates I intentionally was putting off. I probably didn't lose any important information. Oh wait, Session Restore doesn't save form data on https sites (read: Bugzilla) by default? **FFFFFFFFFFFFUUUUUUUUUUUUUUUUUU!!!!!!**

[Always Ask](https://addons.mozilla.org/en-US/firefox/addon/55824/) is an add-on that adds an additional prompt to Firefox when you are quitting. The prompt only shows up if Firefox has determined that you don't need a prompt. This includes when you have [Session Restore](http://support.mozilla.com/en-US/kb/Session+Restore) enabled, if you've changed either of the `browser.warnOn*` prefs, or if you don't have Session Restore enabled & are closing multiple tabs. There's probably some other combination of conditions that change the outcome here.

Since I work on Session Restore, I've had it turned on for a long time. In the past I've intentionally changed my preferences so that it wouldn't automatically quit, but that has led to me accidentally setting prefs and disabling the prompt. Then I have the same problem.

So this extension is pretty simple. It's currently available in English (en-US) but if you'd like to see it in your language, feel free to [help out on Babelzilla](http://www.babelzilla.org/index.php?option=com_wts&extension=5271). Code is available [on Github](http://github.com/zpao/alwaysAsk) (thanks to hg-git).

![Always Ask in action](https://farm3.static.flickr.com/2682/4203971167_45d442d2eb.jpg)
