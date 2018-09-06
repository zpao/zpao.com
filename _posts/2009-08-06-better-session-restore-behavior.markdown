---
title: "Better Session Restore Behavior"
blurb: "The 'Downloads' window won't destroy your session anymore."
date: 2009-08-06
tags:
  - mozilla
  - opensource
  - sessionstore
old_permalink: "articles/20-better_session_restore_behavior"
---

Last week [bug 354894](https://bugzilla.mozilla.org/show_bug.cgi?id=354894) [landed](http://hg.mozilla.org/mozilla-central/rev/cd25ab8c2f30) to, surprisingly, little fanfare. It’s a big deal though (more so on Windows & Linux).

Ever since Firefox introduced Session Restore, there has been one particularly annoying problem: if you close your last browser window but accidentally left a non-browser window open (eg. Downloads), then your session was fucked. End of story.

Well, no longer. Nils Maier (co-author of [DownThemAll](http://www.downthemall.net/)) finally got fed up with this problem & decided to do something about it. This is the first “major” piece of code he’s contributed, so a round of applause.

A super quick summary of the changes (assuming you have enabled session restore):

* If you leave a non-browser window open, just close it. Your session will be saved (assuming you aren’t on OS X anyway).
* If you’ve gotten down to that last non-browser window & realized your mistake, opening Firefox again (e.g. from the start menu) reopens your last closed window.

As a tangential comment, it’s things like this that really make me proud to be a part of the Mozilla community. So much of our browser & platform comes from people like Nils who give their time freely to help make the web a better place.

**Update:** Minor changes based on email with Nils.
