---
title: "Status Update: September 25, 2009"
blurb: "Per Tab Network Prioritization &amp; Other Stuff"
date: 2009-09-27
tags:
  - mozilla
  - firefox
  - statusupdate
old_permalink: "articles/23-status_update_sept_25_2009"
---

I haven’t updated on the blog recently, so here’s the past 3 weeks all at once.

The week of September 7, I was working on a [couple](https://bugzilla.mozilla.org/show_bug.cgi?id=514751) [blockers](https://bugzilla.mozilla.org/show_bug.cgi?id=497730).

The week of September 14, I was in Pittsburgh recruiting at the Carnegie Mellon <abbr title="Technical Opportunities Conference">TOC</abbr> (job fair). I also did some work on Per Tab Network Prioritization ([bug 514490](https://bugzilla.mozilla.org/show_bug.cgi?id=514490)) and a password manager performance bug ([bug 492197](https://bugzilla.mozilla.org/show_bug.cgi?id=492197)).

This past week I worked on a few different things. I finished the password manager bug (which I hadn’t finished because of a non-syntax-error-syntax-error). While helping [Henrik](http://www.hskupin.info/) as he was using the storage API, [Shawn](http://shawnwilsher.com/) mentioned that one of the methods I used was deprecated (though never explicitly). So I filed [the bugs](https://bugzilla.mozilla.org/show_bug.cgi?id=518434) and [fixed the places](http://hg.mozilla.org/mozilla-central/pushloghtml?changeset=5e6a413226d2) that used the deprecated code (hint: use `executeStep()` instead of `step()` and don’t use `mozIStorageStatementWrapper`). Filing the bugs took longer than fixing them.

But all of that was unrelated to …

## Per Tab Network Prioritization Status

### Progress

* Made it a JS module. This was advice from [Dietrich](http://autonome.wordpress.com/) to cut down on overhead. Since it was only being used from JS code, there was no need to use XPCOM.
* Made it pref enabled. Right now it’s `browser.networkprioritizer.enabled` but that’s easy to change.
* Got a first pass look from Shawn, fixed a few things up.

### Next Steps

* Reviews. It seems like Boris is the guy for the job. Still need a browser person. Gavin said sometime after Fennec stuff, Connor said 2 weeks. Dolske said “soon”, so he’ll probably be the lucky guy, even if he isn’t a peer.
