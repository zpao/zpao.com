---
title: "max_concurrent_tabs is Dead; Long Live restore_on_demand"
tags:
  - mozilla
  - firefox
  - firefox 8
  - session restore
layout: post
tumblr_permalink: post/9052215461/max-concurrent-tabs-is-dead-long-live
---

Since [last September](/posts/cascaded-session-restore-a-hidden-bonus), you could set `browser.sessionstore.max_concurrent_tabs` to 0, and you would essentially have a built-in BarTab. I slipped that in later in the Firefox 4 release cycle as a part of cascaded session restore, but it required going into `about:config` and changing a preference value (or installing something like [BarTab Lite](https://addons.mozilla.org/en-US/firefox/addon/bartab-lite/)).

Starting with the latest nightly (and soon to be Aurora 8), `browser.sessionstore.max_concurrent_tabs` is no more. We're no longer allowing you to specify a specific number of tabs to restore concurrently. Instead we now allow you to either restore on demand, or use the hard-coded 3 tabs at a time value. The new preference is called `browser.sessionstore.restore_on_demand`. If you had customized `max_concurrent_tabs` and set it to 0, then `restore_on_demand` will be migrated to true. Unlike the old preference, `restore_on_demand` is exposed in the Preferences/Options dialog to make it accessible to a larger audience.

![](/img/posts/restore_on_demand.png)

For the details, check out [bug 648683](https://bugzilla.mozilla.org/show_bug.cgi?id=648683).

