---
title: "Building Firefox on OS X Mountain Lion"
date: 2012-05-14
tags:
  - mountain lion
  - mozilla
  - earlyadopter
  - build
  - firefox
---

In a similar vein to [my article about building on 10.7](/posts/building-firefox-on-os-x-lion), here are some issues that have come up while building Firefox on 10.8. I've had Mountain Lion installed for a few weeks now and while there were a few hiccups, things have been pretty smooth. Currently I have DP3 update 2 and Xcode 4.4 preview 5 installed.

## Xcode & Command Line Tools

If you've installed Mountain Lion (MoLo) then you've probably realized that you need to reinstall Xcode. This is available on the pre-release software page. Make sure you download & install the Command Line Tools as well. I had issues installing the CL tools from within Xcode, so the separate download was necessary.

## `egrep`

You will likely see an error about `egrep`. We have a "fixed `egrep`" command we've been using since Lion to work around an issue. It seems we no longer need to work around that issue. I have a patch in [bug 750574](https://bugzilla.mozilla.org/show_bug.cgi?id=750574) that makes sure our workaround is only used on Lion.

## `clang` & `ccache`

I've been using `clang` to build Firefox for a few months now and have been using `ccache` for years. While I didn't have any issue before, on MoLo the 2 didn't play together nicely. I got build errors while building Growl. Specifically, [there were issues with an (un?)expanded NSParameterAssert macro](https://bugzilla.mozilla.org/show_bug.cgi?id=754988). The fix is to ensure that you set the `CCACHE_CPP2` environment variable to `yes` (`export CCACHE_CPP2=yes`). Peter Eisentraut explains why this `ccache` setting works on [his blog](http://petereisentraut.blogspot.com/2011/09/ccache-and-clang-part-2.html). We now have a [bug on file to make this automatic](https://bugzilla.mozilla.org/show_bug.cgi?id=755145) so you don't have to set environment variables to get a working build.

## homebrew

This isn't directly related, but I had some issues with packages installed via `brew`. In my case `imagemagick` didn't cooperate. That's not required to build Firefox, but just a heads up that you may have issues. [These steps](https://gist.github.com/1860902) got everything working for me.

## That's it

There's a good chance that this isn't even relevant by the time you install 10.8. If so, then I've done my job!

If you're interested in working on features for Mountain Lion, let me know or follow [the tracking bug](https://bugzilla.mozilla.org/show_bug.cgi?id=728102).
