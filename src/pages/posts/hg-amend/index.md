---
title: "hg amend"
date: 2012-05-07
tags:
  - mercurial
  - mozilla
  - workflow
---

Mercurial 2.2 introduced a new `--amend` option to `commit`. If you've ever used Git, then you are probably thinking "finally". For those of you who haven't used it, it's a quick way to modify the last commit.

My workflow with Mercurial is quite different than my workflow with Git, so `amend` is not going to be as critically important. With Git I typically just have a series of commits on a branch. With Mercurial I typically use a patch queue (because that's just easier with posting patches to Bugzilla). But there have been plenty of times where I've `qfinish`ed a patch only to realize I didn't update the commit message to include the reviewer. Previously this was a 3 step process to fix: `qimport -r tip; qrefresh -e; qfinish qtip`). Now it's 1: `hg commit --amend`. You can do the same with files you forgot to add.

I haven't played with it much, but the [release notes](http://mercurial.selenic.com/wiki/WhatsNew#Mercurial_2.2_.282012-05-01.29) mention that this is a "safe" operation since it uses Mercurial [phases](http://mercurial.selenic.com/wiki/Phases). Essentially this simply stops you from editing history in patches that you've already pushed to a remote repository.

So there you have it. And a little bonus for people who like to cut down on typing - alias the option to a new command. I've been doing this with Git for ages, but now I can finally add it to my `.hgrc` too:

    [alias]
    amend = commit --amend

