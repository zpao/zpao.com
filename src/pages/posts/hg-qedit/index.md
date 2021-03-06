---
title: "hg qedit"
date: 2011-08-09
tags:
  - mercurial
  - mozilla
  - workflow
tumblr_permalink: post/8695952974/hg-qedit
---

Mercurial queues are still far from my ideal workflow, but they mostly _just work_ so I still use them. I haven't gotten into qqueues because that seems like even more management I don't need. If I had a 17 part patch then I would probably give those a go, but I don't.

Instead I end up reordering the patches in my queue more often that I want. I run `vim .hg/patches/series`, press a `j`, `k`, `d`, & `p` a few times, then quit. But sometimes I forget that I'm not at `hg root` so that doesn't work (usually tab completion is a good indicator but then I need to `cd` a bit). [Enter `hg qedit`](https://github.com/zpao/dotfiles/commit/51cdfb838c672f80db5b005eca1fe9972c23dab6).


    [alias]
    qedit = !vim $(hg root)/.hg/patches/series


Just add the above to your .hgrc and you now have a new command which will pop open vim so you can reorder your patches. And of course if you want this to use your editor of choice, you can change "vim" to "$EDITOR" to make that happen.

- - -

A couple people have mentioned that there are easier ways to move things around in your queue without editing your series file...

[Gavin](http://www.gavinsharp.com/blog/) told me about [qup](http://mercurial.selenic.com/wiki/QupExtension), and [Dave](http://www.oxymoronical.com/) said that `hg qpush --move <name>` achieves the same thing.
