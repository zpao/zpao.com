---
title: "Yahoo! HackU 2008"
blurb: "zomg revenge of flolcatr!!1"
date: 2008-10-12
tags:
  - yahoo
  - hacking
  - php
  - blueprint
old_permalink: "articles/12-yahoo_hacku_2008"
---

This past week Yahoo! was on campus for their annual [HackU](http://developer.yahoo.com/hacku/) event. This is the third year they have been doing it and each year it has gotten progressively larger.

## The Past

The first year (2006), I think there was a single entry. I made it in time for the presentation and was pretty sad I hadn’t had a chance to make anything.

Last year, I made a determined effort and hacked together my own entry - [yWeather](http://playground.zpao.com/yweather) - and contributed to [flolcatr](http://flolcatr.com). These were among the six or so entries from Carnegie Mellon. I didn’t win anything, though I’m still pretty proud of yWeather. There was a 24-hour hack session on the last night, but I’m pretty sure there was nobody there after midnight.

## This year

This year there were 28 hacks! I was simply astounded at the number and variation of the entries this year. There were technically impressive hacks, humorous hacks, hacks that could change the web, and even some creepy hacks. We had some big hacker names from Yahoo! show up - [Rasmus Lerdof](http://lerdorf.com/) (creator of PHP), [Kent Brewster](http://kentbrewster.com/) (hacker extraordinaire), and my new pal [Paul Tarjan](http://paulisageek.com/) (creator of Search Monkey). I think there were people who actually pulled off the 24-hour hackathon, staying up the whole night. I know Paul was there when I left around 6am.

Last year I took advantage of the time and spent the week working on my hack. This year I didn’t start until after midnight. I contributed a little bit to a hack (“lolmonkey”) with [Mattt Thompson](http://matttthompson.com/) which uses [Search Monkey](http://developer.yahoo.com/searchmonkey/) and creates an infobar in Yahoo! search results lolifying an image on the linked page. While not the craziest hack, we had fun with it. I think at this point we are both officially done creating tools/hacks that have anything to do with lolcats.

## Busses & the Blueprint Framework

The other hack that I worked on uses the [Yahoo! Blueprint framework](http://mobile.yahoo.com/developers/roadmap) for creating mobile applications. While not the most technically advanced hack, I think it was one with the most immediate value. It was called “CMU Busses”, and simply tells you the next 5 busses leaving Carnegie Mellon in either direction. You can see a screenshot on the [project page](http://playground.zpao.com/bp_busses). This is something I’ve been wanting to make for a long time, and something I would actually use (no offense to the other hacks). This was a true “hack” - I’m scraping the PAT website with Ruby. My Ruby code is outputting PHP code (the departure times are hardcoded instead of doing a DB lookup). Then the rest of the script is using the PHP Blueprint framework that Yahoo! provides (after spending a while working it out).

I had originally planned to make this an iPhone application, but having never done Objective-C, I figured now wasn’t the time to start. I had also wanted this application to be able to detect the user’s GPS coordinates and find the closes 5 bus stops before showing departure times, but that had some barriers as well. In a future iteration hopefully we’ll see that. The Blueprint framework is supposedly also able to convert a Blueprint application to an iPhone application, but that has not been released to the public yet. When it is released, I think I may publish what I have now as a first iteration.

## Some Other Highlights

I got to hang out with some great people throughout the week. I also got treated to a dinner for all of the former Yahoo! interns at Fuel & Fuddle. It was a good time, getting to talk some technology and design with smart people.

As a result of working on the lolmonkey hack, Mattt and I were invited to dinner by Alicia at [Bug Labs](http://buglabs.net). They have a really cool product called BUG, which as they say on their website, “is a collection of easy-to-use electronic modules that snap together to build any gadget you can imagine”. I got to play with one and it’s really neat. I wish I had some spare cash to get one. They also have some of the coolest package design I’ve seen in a while. So if you’re interested in hacking hardware, take a look at them - they’re cool people with a cool product, hacking on open source hardware and software.
