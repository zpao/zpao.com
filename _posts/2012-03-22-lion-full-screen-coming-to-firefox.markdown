---
title: "Lion Full Screen Coming to Firefox"
tags:
  - mozilla
  - os x
  - 10.7
  - cocoa
  - lion
layout: post
---

For the past little while, I've been working on adding support for [OS X Lion's native Full Screen mode](https://www.apple.com/macosx/whats-new/full-screen.html) to Firefox. This was something that others had started before Lion was even released but nobody ever finished it. Since then, every other major browser has shipped support for the feature.

I decided to start working on it in December since nobody else was. Having never really touched Objective C(++) or Cocoa, the task took a bit longer for me than it would have others, but now it's done and I have more experience with our `widget/` code. At the end of the day, the changes need to hook everything up were suprisingly minimal. If you want to check out the process, the work was done in [bug 639705](https://bugzilla.mozilla.org/show_bug.cgi?id=639705).

The patches were landed the other day and are currently in [Firefox Nightly](http://nightly.mozilla.org). Assuming there are no major issues, this should ship in Firefox 14. Since this landed early in the release cycle, there should be plenty of time to catch any fallout. There are a few known bugs to follow up with (see below) but if you notice any other issues on the Firefox side, please [file a new bug](https://bugzilla.mozilla.org/enter_bug.cgi?blocked=639705&cc=paul%40oshannessy.com&component=General&op_sys=Mac%20OS%20X&product=Firefox&rep_platform=x86) (already setup for a new bug in Firefox:General with me CCed).

## Adding Support to Your Gecko Application

Since the feature is enabled down in the core, it's now easy to support Lion Full Screen in your Gecko application. All that you need to do is add `fullscreenbutton="true"` to your `<window>`. Thunderbird [is in the process of doing this](https://bugzilla.mozilla.org/show_bug.cgi?id=711750). If you'd like your application to make UI changes (beyond just titlebar hiding), the `fullscreen` event is fired on the window after the transition is complete.

## But wait, there's more

What I've done so far is really just the baseline support. There are a few followup bugs:

* [support resizing content area](https://bugzilla.mozilla.org/show_bug.cgi?id=703724)
* [figure out 'background themes' support](https://bugzilla.mozilla.org/show_bug.cgi?id=716450)
* [update menu with new string/shortcut](https://bugzilla.mozilla.org/show_bug.cgi?id=714172)
* [add top padding?](https://bugzilla.mozilla.org/show_bug.cgi?id=714186)
* and surely some other theme related tweaks


