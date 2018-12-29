---
title: "waitForClipboard now available to Mochitests"
date: 2010-06-02
tags:
  - mozilla
  - firefox
  - testing
tumblr_permalink: post/657751943/waitforclipboard-now-available-to-mochitests
---

Testing is a part of life. Sadly, that means we have to write tests for things that involve the clipboard. The clipboard is complicated enough with all of this flavor and transferable stuff we have going on. Throw in the fact that the clipboard can be asynchronous (thanks Linux), and it gets worse. We've had a number of tests that fail due to expectations that the clipboard be synchronous. Most of those tests have been changed to use a "polling" strategy - essentially waiting for the clipboard to have the expected value. If it doesn't have the right value after a few seconds, then the test fails. I know of at least 3 tests that use this strategy now, and they all ended up having similar code, perhaps even copy-pasted directly from another test.

[Gavin](http://www.gavinsharp.com/) made me use polling for the test in [a bug](https://bugzilla.mozilla.org/show_bug.cgi?id=556061) I fixed recently. Then the following week there was a password manager bug that I saw doing clipboard stuff (without polling) so I passed along the "polling is good" requirement.

Instead of making everybody rewrite the wheel, I decided to write [`SimpleTest.waitForClipboard`](https://bugzilla.mozilla.org/show_bug.cgi?id=567870) to take care of this polling stuff for us. It only works with the global clipboard, and only with `text/unicode` strings (`text/plain` should work too since it's available on the clipboard in the unicode flavor). It works by setting the clipboard to a known value (different than your expected value), then polling for that value. After the known value is found, your setup function is called, and we poll again. When we find the value, we add a **PASS** & then your success function is called. If at any point we timeout waiting for the expected value, we add a **FAIL** & then your failure function is called.

Following are the arguments and then a simple example test. Hopefully it's clear how to make use of `waitForClipboard` in tests you write in the future. I've already converted a few tests to use this method. If there are any existing [orange]s that you think could benefit from this, please convert them!

<script src="https://gist.github.com/423041.js"></script>
