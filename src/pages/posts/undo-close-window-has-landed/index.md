---
title: "Undo Close Window Has Landed!"
blurb: "Look for it in the History menu near you."
date: 2009-04-24
tags:
  - mozilla
  - firefox
  - sessionstore
old_permalink: "articles/19-undo_close_window_has_landed"
---

I’m happy to announce the landing of [Undo Close Window](https://bugzilla.mozilla.org/show_bug.cgi?id=394759). This adds a menu & keyboard shortcut for reopening your previously closed windows. By default we store 3 windows (though sometimes more due to special cases involving pop-up windows). I’m not going to go into further implementation details (because really, I know you don’t care), but if you’re interested, you can take a look at the patches on the bug.

## A Little History

Sometime before Firefox 2, there were APIs in place for handling recently closed windows. The only thing missing at that point was the front-end work to tie it together. But that never happened. Instead, since the code wasn’t even being published for extensions to use, all that was happening is that we were eating memory for no good reason. So the [code was taken out](https://bugzilla.mozilla.org/show_bug.cgi?id=344642) late in the 2.0 development cycle.

[Bug 360408](https://bugzilla.mozilla.org/show_bug.cgi?id=360408) was added for Firefox 3, making it possible for extensions to be able to implement their own Undo Close Window if they wanted. The description of that bug was unclear though, since it didn’t actually adding any APIs, it just made sure the data was kept around long enough to be saved by somebody else.

Along comes [Bug 394759 - Add undo close window feature](https://bugzilla.mozilla.org/show_bug.cgi?id=394759), which sat untouched for almost a year. After I finished the [primary project I worked on during my internship](/posts/passwordmgr-storage), I still had a week left, so I looked for bugs that I found interesting and allowed me to explore a new area of the code. I found this bug and wrote a “working” patch over a weekend. At that point I was really surprised that we didn’t have this already. We’ve had Undo Close Tab for a while, and this seemed like the sensible next step. In all honesty, somebody familiar with the code involved here could have written that patch in an hour or two. That’s when I found out that I had essentially reimplemented the code that had been taken out and added the front-end to it.

I worked on it a bit more before I was done interning, then went back to school and time to work on this became increasingly rare. I dropped the ball a bit, and then suddenly we were at string freeze, and this wasn’t done. Fast forward a few months; I graduated & started working for Mozilla full time. I found out we were still going to have another string freeze for beta 4, so I got my patch out of bitrot and continued working on it. It needed more work and testing by then due to Private Browsing and a few other changes that were made. Strings went in right before we froze them & the actual patch went in very last minute, and only because code freeze had slipped for other reasons.

A huge thanks to Simon for all the reviewing he did and help he gave me, [Dietrich](http://autonome.wordpress.com/) for the heroic “today is code freeze” review and help, [Dão](http://en.design-noir.de/) for fixing the problems that popped up as this had a rocky landing (there was no time to bake on trunk), and [Beltzner](http://beltzner.ca/mike/) for approving this without the normal bake time.
