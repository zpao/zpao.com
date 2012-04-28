---
title: "New Firefox Extension: switch-to-tab Blacklist"
tags:
  - mozilla
  - firefox
  - firefox 4
  - switch-to-tab blacklist
  - extension
layout: post
tumblr_permalink: post/3372227196/new-firefox-extension-switch-to-tab-blacklist
---

Switch To Tab is a pretty cool feature that will be a part of Firefox 4. I didn't work much on it, but I contributed a bit to it last year (see [this post](/posts/switch-to-tab-closing-empty-tabs) for one example).

For the most part, I really like this new feature. It's saved me much tab duplication over the past several month. However there are some sites that it doesn't play well with, namely some JavaScript "applications" and pages with frames. I've quietly dealt with it and worked around the issues.

But a couple weeks ago after trying to do multiple Google Maps search, I decided that I'd had enough. I never wanted Google Maps to show up in switch to tab and I was going to write an add-on to make that possible. So I spent a bit of time figuring out how I might do that and looking at this new bootstrapped extension stuff (which is pretty awesome by the way). I didn't get far enough to make it actually work and stalled. Then I got back to work and fixed some more blockers and promptly forgot about this idea.

Yesterday I started working on it again but my current approach wasn't working (turns out `gBrowser._placesAutocomplete` is readonly and it means it). So I asked [Shawn](http://shawnwilsher.com/) about it and he came up with the answer: cheat. Don't try to intercept the additions to the database, just revert them after the fact. Smart guy.

I wrote a quick and dirty version and iterated. I released a "good enough" version 1.0 last night. "Good enough" meant it was restartless but required restarting to re-process the blacklist preference, which was... dumb. Over lunch today I finished v1.1 to fix that and a couple other small issues.

## Let me have it
[switch-to-tab Blacklist on AMO](https://addons.mozilla.org/firefox/addon/switch-to-tab-blacklist/)

## Can I see the code?
[It's on github](https://github.com/zpao/switchToTabBlacklist). I need to clean it up because it's a bit hard to look at, so don't judge me too much.

## This picture is not worth 1000 words
Previously, that autocomplete result would have been said "Switch to tab:".
![](/img/posts/switch-to-tab-blacklist.png)

## Customizing the blacklist
I'm storing a JSON array of regular expressions (stored as strings which get turned into regular expressions with `new RegExp(...)`). This is stored in a preference: `extension.switchToTabBlacklist.blacklist`. You need to edit it by hand for now.

## Where's my GUI
I don't have visual basic on this computer so I couldn't make one.

To be honest, I just didn't care enough to make it. I made this extension for me and I know how to edit a preference. I would gladly take patches though if somebody wants to make one.
