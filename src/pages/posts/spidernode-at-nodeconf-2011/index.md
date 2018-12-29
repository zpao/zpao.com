---
title: "SpiderNode at NodeConf 2011"
date: 2011-05-19
tags:
  - spidernode
  - v8monkey
  - nodeconf
  - node.js
  - mozilla
tumblr_permalink: post/5641702863/spidernode-at-nodeconf-2011
---

Two weeks ago, I traveled with Shawn and Rob to Portland for the inaugural NodeConf. To summarize: it was a great experience and a well run conference. Other people have done overviews, so I’m not going to go there, but read a few [here](http://www.sauria.com/blog/2011/05/09/nodeconf-2011/), [here](http://www.claassen.net/geek/blog/2011/05/reflections-on-jsconf-and-nodeconf-by-a-language-geek.html), and [here](http://www.adamchristian.com/archives/10435). I’m going to talk about SpiderNode at NodeConf instead.

## A Quick Aside on the State of Things

We got SpiderNode running on the train ride shortly before getting on a plane to Portland. Under 24 hours before NodeConf. It didn’t pass all tests (still doesn’t) and we had to hack around Node’s Buffers pretty majorly. Ryan's classic [node_chat](https://github.com/ry/node_chat) ran and that was a great state to be in going into NodeConf. As for other demos, those were written right before the presentation so they were a bit unpolished.

## Back to NodeConf

As we'd suspected for a while, Brendan Eich was the “Mozilla Person Secret Talk” listed on the schedule. He talked a little bit about ES.next and SpiderNode, with a couple demos. In typical Brendan fashion, it was a lot of information to get in a short period of time. If you want to see the slides, [Brendan has them on his blog](http://brendaneich.com/2011/05/mozillas-nodeconf-presentation/).

Overall, I think the reception we got was really positive. People seemed excited. Some viewed it as a way to run Node on architectures that V8 doesn’t support (before we left NodeConf I had an email from somebody telling me he had patches to get SpiderNode building on Solaris/Sparc). Others were just excited that this could open up the doors to making Node faster (more benchmarks to compete on). Other people were excited because they just really want block scoping (`let`).

Other people weren’t so excited. And that’s fair. But there seemed to be some misconceptions about the project and why we were at NodeConf contributing to what felt a bit like disdain.

## Selling You

There were some people who seemed convinced that we were there to sell people on using SpiderNode. I think Brendan made this pretty clear during his talk, but here it is again: we’re not trying to sell you. We don’t think you should use it right now. We’re getting closer, but it might be a little while before we suggest people use it for anything besides experimenting. We don’t pass all of the Node tests and we’re almost certainly not faster at this point.

I think [Brendan put it best](http://brendaneich.com/2011/05/mozillas-nodeconf-presentation/):

> We are not out to make a maintained, competing fork of Node, just a friendly downstream that should go away as soon as possible. We aren’t selling anything to Node users.

## Splitting the Community

The Node community is pretty awesome and we really don’t want to split it in anyway. I’m sorry that some of you felt that’s what we were doing. If that was you, I’d love to find out what you meant.

The only angle I can see on this one is that the JavaScript one would write using SpiderMonkey’s JS extensions wouldn’t run on normal (V8) Node. This goes back to the experiment thing. If you’re writing Node modules or code you want to share widely using the JS extensions STOP.

## Contributing Back

I didn’t see any comments about this topic, but I wanted to make it clear that we’re most certainly going to be contributing back to Node. We created [a repository](https://github.com/sdwilsh/spidernode-upstreaming) to start that process now. We’re waiting for somebody to handle [this pull request](https://github.com/joyent/node/pull/1021), which should make some uses of Buffer faster.

There will surely be other things that can be upstreamed outside of our use of V8Monkey (and the build system changes required to support that).

***

I hope this clears some things up for people. Let me know if it doesn’t or you have other concerns about SpiderNode’s existence.
