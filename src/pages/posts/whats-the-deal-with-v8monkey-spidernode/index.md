---
title: "What's the Deal With V8Monkey & SpiderNode?"
date: 2012-01-23
tags:
  - mozilla
  - spidernode
  - v8monkey
  - node.js
tumblr_permalink: post/16368488549/whats-the-deal-with-v8monkey-spidernode
---

**tl;dr** Neither are being actively worked on and could use some love.

- - -

After NodeConf, development of [V8Monkey](https://github.com/zpao/v8monkey) & [SpiderNode](https://github.com/zpao/spidernode) slowed. We all got a bit burnt out in the weeks preceding NodeConf and took a little break. Shortly after, Shawn left Mozilla to work at Facebook with Rob on *[redacted]* and the little break became longer. I was in the middle of planning a wedding & helping the (now-)wife with [her company](http://onetruelovevintage.com). Shawn & Rob were busy with work and some other [side](https://github.com/sdwilsh/tree-bot) [projects](https://github.com/mozilla/rust). Mozilla opened an office in SF in August, so I stopped riding the train down the peninsula with Shawn & Rob as often. Long story short, we lost interest.

In October I pulled current mozilla-central into the V8Monkey tree & tried to update from there. But some core things changed. APIs changed around Typed Arrays in SpiderMonkey. `JSScript` stopped being a `JSObject` which broke some of our assumptions with our implementation. I have [a patch locally](https://gist.github.com/1665805) to try to fix those, but they're incomplete (it immediately segfaults). It's been 3 months and the JS engine doesn't idle, so it's entirely possible the world changed again.

SpiderNode is untouched. But Node has definitely changed - it's gone from 0.4.x to 0.6.x and works on Windows! It's now using a newer version of V8, and further, using more V8 APIs that V8Monkey hasn't ported. It also looks like Buffers got a pretty big overhaul (I started to merge that, but it got messy). There's surely some other work that needs to be done.

## The Future

There has been [some mention](https://twitter.com/#!/BrendanEich/status/158326339039010817) of the JS team here at Mozilla implementing the V8 API. Not me or somebody doing it in their free time, but a full-time employee. I haven't seen that happen, but that's the best possible outcome. Assuming we have 100% compatibility (which is the only target that makes sense), then the path to reviving SpiderNode from there is easy. Basically we'd just need to fix the build system again to compile SpiderMonkey & use that. Brendan has also [threatened to unbitrot V8Monkey](https://twitter.com/#!/BrendanEich/status/158328492709257217), but he's a busy guy, so we'll see.

If that doesn't happen, then the future is grim. I don't have the time or drive to do this myself. If you're interested in helping out though, keep reading...

## Want to help?

Awesome! Get in touch & I can help get you started. I'm more than happy to get that going because I'd like to see these projects live on. Keep in mind that the real work mostly happens in V8Monkey -- it's 100% C++ and you're implementing one JS engine's API with another.
