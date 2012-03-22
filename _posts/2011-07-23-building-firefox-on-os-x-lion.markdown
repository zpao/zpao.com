---
title: "Building Firefox on OS X Lion"
tags:
  - lion
  - mozilla
  - earlyadopter
  - build
  - firefox
layout: post
tumblr_permalink: post/7991556360/building-firefox-on-os-x-lion
---

I know there are people here at Mozilla who have been building Firefox on Lion releases for a while now, but I couldn't find anything that described all the problems. So here I am.

_**TL;DR:** Reinstall XCode & apply a [couple](https://bugzilla.mozilla.org/attachment.cgi?id=547774) [patches](https://bugzilla.mozilla.org/attachment.cgi?id=547889)._

## Mercurial

I had originally installed Mercurial via `easy_install`, so your results may be different. Regardless it was broken. Apparently you can edit the executable and it works, but I didn't try. Attempting to install Mercurial again failed with `Python headers are required to build Mercurial`.

Reinstall XCode then reinstall Mercurial and you're set.

## `make` Not Found

Reinstalling XCode fixes that too.

## Build Fails with `expected initializer before ‘NS_NORETURN’`

Your build will probably fail. The patch in [bug 655339](https://bugzilla.mozilla.org/show_bug.cgi?id=655339) works to get past this.

## Build Fails with `$MACOSX_DEPLOYMENT_TARGET mismatch` error

`distutils.errors.DistutilsPlatformError: $MACOSX_DEPLOYMENT_TARGET mismatch: now "10.6" but "10.7" during configure`

I first thought this was a problem with specifying the wrong target SDK, but I was wrong. This is apparently a python bug. [Bug 659881](https://bugzilla.mozilla.org/show_bug.cgi?id=659881) has more details (and a workaround patch). The bug talks about python via MacPorts, but I'm not using MacPorts nor any non-default python installs.
