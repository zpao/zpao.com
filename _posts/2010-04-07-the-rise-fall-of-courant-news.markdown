---
title: "The Rise & Fall of Courant News"
tags:
  - college newspapers
  - django
  - courant news
tumblr_permalink: post/505069286/the-rise-fall-of-courant-news
---

I'm only a couple months late with this... Hot on the heels of the [announcement that CoPress was shutting down](http://www.copress.org/2010/02/16/copress-is-closing-down-operations/), Max Cutler announced the [end of the Courant News project](http://www.maxcutler.com/2010/02/21/courant-no-longer). His post is a good read, and his blog in general has some great insight into the technology behind Courant. If you're at all interested in the future of online journalism, I highly suggest it. Since I have yet to blog about [Courant News](http://www.courantnews.com/), I feel like I must, so here's the story.

Courant News was an online newspaper project started in the fall of 2008. It was started by [Max Cutler](http://www.maxcutler.com/), [Robert Baskin](http://rsbaskin.com/), and myself out of our frustration with existing college newspaper technologies. Combined, we had ~8 years of working on college newspaper websites. Max and Rob both worked at the [Yale Daily News](http://www.yaledailynews.com/) and I worked for The Carnegie Pulse (now dead and without a domain). We both worked on custom built PHP back-ends. Robert had helped write the YDN one, while I inherited TCPulse's (and had been wanting to rewrite it for years). Both worked, but were a bit rigid for the needs of an online newspaper.

We started this project and settled on [Django](http://www.djangoproject.com/) as a technology choice. I was a Rails guy, while Max was the Django advocate. We chose Django because of it's journalism roots, my admission that I was going to have less time, and the fact that this really was Max's project. After I got to play with Django, I think it was the right choice for the project. The ability to have separate "apps" was pretty awesome. And the built in admin app (which I thought was dumb at first) turned out to be pretty essential. All-in-all I have a lot of respect for [DJ Ango](http://www.youtube.com/watch?v=PLUS00QrYWw), and as the RailsEnvy guys said, "If it wasn’t for Rails I’d probably be programming Django right now."

We talked a lot via Skype about various things and within a few weeks were hacking away. We had a basic version running pretty quickly - it doesn't take much to make something that serves content. We had various architecture discussions (hosted SASS? one large app with domain handling vs a separate instance per hosted site, etc), all of which were awesome to have. It felt great to be making something and talking with smart and passionate people.

Probably the best part (technologically) was the idea of the "get" tag. I won't explain it too much here, but in short it was a way to make Django's template system even easier to use for designers. We were building this so that not-so-technically-inclined newspaper editors could make quick layout edits in relatively sane way. If you're interested, [read more in the docs](http://docs.courantnews.com/ref/core/gettag.html).

Eventually we got to really thinking about the viability of the project from a business stand point. It was now early 2009. I was getting ready to start full-time at Mozilla, Rob was going to be starting at Microsoft in a few months, and so we really had to evaluate where it was going. There was a legitimate concern about non-competes (more so for Rob), not to mention time constraints. There was also the issue about how we would make money. We crunched the numbers and it wasn't convincing enough to risk losing our well-paying jobs.

So we decided to open source the project. We talked with the CoPress people and with college newspaper editors and developers around the country. There was certainly interest in using such a project. Especially with the whole Knight Foundation sponsored [Populous Project](http://www.populousproject.com/) (which was supposed to be open source and awesome) going nowhere. The problem though is that there aren't many people actually interested in working on the project.

So we put the code out there exactly 1 year ago. I really didn't have a whole lot of time to keep going, so Max and Rob continued to work on it, getting it ready to power The Yale Daily News. Originally targeted for late spring 2009, that slipped to the beginning of the fall semester. Max deserves a huge amount of credit here. While it was still using the stock Django admin, it was powering a major college newspaper. Not just powering, but [standing up to a huge spike during a breaking nation news story](http://www.maxcutler.com/2009/09/23/keeping-courant-with-annie-le-coverage) and allowing editors to do things they hadn't been able to do before.

Still though, nobody else was working on it. Max and Rob had continued doing some additional work, but with Max's term ending at YDN and Rob working full-time, it was getting unreasonable. So Max and Rob made the decision to stop working on it and just let it run free.

A lot of hard work went into Courant News. If this were several years ago, I'd still be working on it, but I think in the end, we all did what we needed here. It was fun while it lasted.
