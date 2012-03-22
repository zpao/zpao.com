---
title: "About That Hybrid “V8Monkey” Engine"
tags:
  - mozilla
  - node.js
  - javascript
  - c++
  - v8
  - bad metaphors
  - spidermonkey
layout: post
tumblr_permalink: post/4620873765/about-that-hybrid-v8monkey-engine
---

I've sort of been working on this thing...

Several weeks ago I was curious about why there was no implementation of [Node.js](http://nodejs.org/) using the [SpiderMonkey](https://developer.mozilla.org/En/SpiderMonkey) JavaScript engine (the one we use in Firefox). So [I tweeted](https://twitter.com/#!/zpao/status/42780850177327105) about it and several people said they wanted such a thing and would help work on it.

After some poking around the source, we realized that Node was tied pretty closely to [V8](http://code.google.com/apis/v8/), and there really wouldn't be any way to use SpiderMonkey without ripping Node apart and rebuilding it. Not only would that suck now, but it would likely suck long into the future as Node gets updated. This port would fall behind and nobody wants that.

## V8Monkey

So we decided that we would implement the V8 API on top of SpiderMonkey. That way we can just plug our work into Node, and it would "just work". We've been chugging along on this project and have made some great progress. Thanks to John Ford we even have an automated build system running all of our tests on every checkin.

The JS team at Mozilla is also really interested in just having this API around. It has potential for other projects like this, but also raises awareness of API differences and might help push forward changes to the SpiderMonkey API. We've already pushed for additions to the SpiderMonkey API (for example, there was previously no exposed API to check `==`, only `===`). There have also been discussions about turning the SpiderMonkey API into a C++ API (not just C).

It also turns out that we're not the first people to go down this track. There's a team at Yahoo! who is very interested in Node and even did a very similar project. They even put the [code out there to prove it](https://github.com/bfrancojr/v8monkey/commit/95464c1ccc07e2ab10ba637de3938b5dcd924403) and it's been a helpful reference for us. They stopped short to get Node mostly running, while our goal is a bit more ambitious and implement the whole V8 API.

## SpiderNode

SpiderNode is what we're calling our fork of Node. Once we have our V8 binding working, we'll shift our work over here and focus on integrating SpiderMonkey into the Node build system. Ideally we'd love to get this upstreamed and give Node developers a choice.

We think V8 is great and the fact that Node has become so widely used is a testament to that. But we also think there's room for competition here. Browser based competition is old-hat. Let's move this battle to the servers :)

With some hackery from John, we now have a way to build SpiderNode. As of Tuesday `node.cc` compiles (OMG AWESOME) but that's it.

## Can You Help?

Absolutely. The code for both [v8monkey](https://github.com/zpao/v8monkey) and [SpiderNode](https://github.com/zpao/spidernode) are on GitHub for now. We have a ["hacking" wiki page](https://github.com/zpao/v8monkey/wiki/Hacking) there, as well as a general [TODO page](https://github.com/zpao/v8monkey/wiki/TODO).

We also chat a lot on IRC: [#spidernode on irc.mozilla.org](irc://irc.mozilla.org/spidernode).

## It's Not Just Me

That's for damn sure. [Rob Arnold](https://twitter.com/robarnold) and [Shawn Wilsher](https://twitter.com/sdwilsh) have been doing most of the heavy lifting. Rob has done some work on SpiderMonkey in a past life and is really good at this sort of language stuff. Shawn is also really smart and definitely no stranger to using SpiderMonkey. This project would be nowhere without these guys. [John Ford](https://twitter.com/john_h_ford) set up a buildbot for us, which has been incredibly helpful for catching all the tests I break. Having a build engineer helping out has been really great.

[Brendan Eich](https://twitter.com/BrendanEich) (you may have heard of him) said he's going to start contributing. My intern [Mehdi Mulani](http://twitter.com/mehdiisdumb) submitted a couple patches early on and others have stepped up and are working on patches right now.

## My Experience So Far

Honestly, this is the first large scale C/C++ project I've worked on. I took 1/2 a semester of C my freshman year in college (over 6 years ago) and I've written some random pieces of C++ at Mozilla. Mostly though, I write JavaScript and before that Ruby & PHP - a lot of scripting languages. It's a drastic change from what I'm used to and it's taken me a while to get comfortable. Luckily I'm working with friends who have helped teach me as I go. Learning C++ while making one JavaScript engine work on top of another has been a real sink or swim experience.

It's been fun though. I really needed something entirely different from Firefox for a little while and this has fit the bill perfectly.

Expect to see more from me and others in the coming days & weeks. And hey, perhaps you'll see one of us at NodeConf.
