---
title: "Oops, I Broke That"
blurb: "Turns out that 'Set as Desktop Background' has been broken for 3 weeks."
date: 2009-08-28
tags:
  - mozilla
  - firefox
  - windows
old_permalink: "articles/21-oops_i_broke_that"
---

While making the “Set as Desktop Background” feature work on Windows CE, [I accidentally broke it on other Windows systems](https://bugzilla.mozilla.org/show_bug.cgi?id=512524). OOOOOPS.

This went unnoticed for ~3 weeks on the nightlies! It was even in Firefox 3.6 alpha 1. The fix was easy and was checked into trunk today. It’ll be checked into the Firefox 3.6 branch soon.

I don’t think mistakes like that are too uncommon, especially in areas where testing isn’t automated. We probably have [Litmus tests](https://litmus.mozilla.org/) for this so it would have been caught before a final release anyway, but still…

This just goes to show how important testing is! (And yes, I [filed a bug](https://bugzilla.mozilla.org/show_bug.cgi?id=513349) to add tests here)

This also goes to show just how little people use that feature :)
