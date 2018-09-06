---
title: "Status Update: November 9, 2009"
blurb: "Chugging Along"
date: 2009-11-09
tags:
  - mozilla
  - firefox
  - statusupdate
old_permalink: "articles/25-status_update_nov_09_2009"
---

Not much exciting happened this past week. We had some out-of-towners ([beltzner](http://beltzner.ca/mike), [johnath](http://blog.johnath.com/), and [dietrich](http://autonome.wordpress.com/)) down in the Mountain View office. It’s good to see the boss face-to-face every once in a while. Otherwise it was business as usual.

## What I got done last week:

* **[Bug 522545](https://bugzilla.mozilla.org/show_bug.cgi?id=522545):** Third time’s the charm. I finally found an acceptable approach to solving the problem. The problem of… ZOMBIE TABS. Interestingly, this bug is fallout from a different bug I worked on. Read the bug for full details.
* **[Bug 525635](https://bugzilla.mozilla.org/show_bug.cgi?id=525635) & [Bug 521233](https://bugzilla.mozilla.org/show_bug.cgi?id=521233):** Both of these are needed to get Per Tab Network Prioritization into Firefox 3.6. Bug 525635 was about the test that was randomly timing out on Linux. It’s using the test framework added in bug 521233 (waitforFocus in browser-chrome tests), which obviously is not quite right. [Dão](http://design-noir.de/log) is continuing to try to find the right fix, but until then, I’ve worked around the issue in a better way than I was. This should make it OK to land everything needed on branch.

## What’s happening this week:

* Finish bug 522545. Blockers come first. I already have a large portion of the work done & have a good start on tests, so this shouldn’t be too much work.
* Land Per Tab Network Prioritization on branch. Not too much involved here, but it has to happen.
* Work on [bug 526545](https://bugzilla.mozilla.org/show_bug.cgi?id=526545) (Crash reporter still can send wrong URL when crashing during pageload). This is another blocker. The partial solution should be pretty easy and actually dovetails nicely with the work I’m doing for bug 522545. The full solution might be a bit harder, and might not be worth it.
