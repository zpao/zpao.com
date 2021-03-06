---
title: "Interning at Mozilla: Week 1"
blurb: That's right, I'm rocking out on Firefox.
date: 2008-05-31
tags:
  - mozilla
  - interns
  - firefox
old_permalink: "articles/2-mozilla_week_1"
---

I've just finished my first week at Mozilla. So far it's been a blast. They've put us up in a really nice temporary living apartment complex ([pictures](http://www.oakwood.com/furnished-apartments/furnished/US/CA/Mountain-View/prop17/showPictures.html) and yes that *is* a 40 person hot tub), the other interns are all really nice, and well, it's California.

This week we had a poker game / movie night. I was in on poker and turned $10 into $30, which should keep from an ATM a little bit longer. They've also been feeding us lunch this week; there's a stock of good snacks & cereal, so I don't have to eat breakfast before work (although I have been).

**Anyway, on to Firefox.**

So I am on the Firefox team for the summer. My initial goals include working on profiling startup and improving shutdown. Neither of these are one day tasks, not even 1 week. In fact, both seem pretty lofty and fun to work on.

The improving shutdown part is where I've been focusing first - it's something that has bothered me personally. The behavior is both inconsistent and can be pretty annoying. For example, if you close the last window vs. doing File|Exit (and have “Clear Privacy on Exit”) checked, you will have different outcomes when you try to restore your session. Not only that, but there are several different dialogs that can pop up. Then take into account leaving the Downloads window up when you close the last window — your session restore is screwed (at least last I remember). That is not the expected behavior.

So all this week I've been digging through the Firefox source code with [MXR](http://mxr.mozilla.org/mozilla-central/source/). I haven't written a single line, just reading & taking notes. It's not simple. Shutdown (or “Exit” or “Quit”) goes through a number of steps and then broadcasts a `quit-application-requested` message. Other objects observe specific messages, so all the ones that observe `quit-application-requested` are then triggered. Some of these in turn trigger dialogs, set preferences, close windows, and so on. Assuming all goes well there, `quit-application-granted` and subsequently `quit-application` are broadcast. These events can be triggered in either JavaScript or C++, not to mention that sometimes the JavaScript is being called from XUL, or XUL is “run” from Javascript. It's even more complicated than it may sound here, so maybe in a future post I'll break it down even more. I still haven't finished working it out completely. I've looked at some of the “Close Window” code as well to track down where differences lie and how that can be made more consistent… All in all, it's hurts my brain a little bit.

That said, it's been a fun (albeit exasperating at times) week and I'm looking forward to the rest of the summer.
