---
title: "Now Using JSON.parse in Session Restore"
tags:
  - mozilla
  - firefox
  - session restore
  - compatibility
layout: post
tumblr_permalink: post/681362149/now-using-json-parse-in-session-restore
---

Back in March, [I partially dropped support for sessions from Firefox 2.0 & 3.0](/posts/partially-dropping-support-for-firefox-2-0-3-0). For Firefox 4.0, we'll be dropping backwards compatibility of sessions for Firefox 2.0 & 3.0. That means that sessions created with nightlies starting tomorrow, will no longer be loadable by versions of Firefox prior to 3.5. With [bug 387859](https://bugzilla.mozilla.org/show_bug.cgi?id=387859), Session Restore will now use `JSON.parse` instead of `evalInSandbox`.

## So why use `JSON.parse`?

Mostly, it's faster. `evalInSandbox` involved going through XPConnect and a whole bunch of object wrapping for security needed to be done. By using `JSON.parse`, we don't have to worry about that overhead. We also don't have to worry about changes made to Chrome Object Wrappers (changes which have broken about:sessionrestore recently).

## What does this mean for me? Not Much.

* If for some reason you're bouncing between nightlies and Firefox 3.0, then you'll want to load your session in Firefox 3.5 or 3.6 before loading it in Firefox 3.0 again. If this describes you, then you should really [just upgrade](http://www.mozilla.com/firefox/firefox.html).
* The contents of `sessionstore.js` will no longer have wrapping parenthesis. Those were added so that sessions could still be loaded by Firefox 3.0-.
* The keys that were only ever used internally are now excluded from exported sessions. This includes `_tabStillLoading`, `_hosts`, and `_formDataSaved`.
