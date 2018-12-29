---
title: "Updated Firefox Extension: Always Ask 2.0pre"
date: 2011-02-22
tags:
  - mozilla
  - firefox
  - firefox 4
  - always ask
  - extension
tumblr_permalink: post/3453055056/updated-firefox-extension-always-ask-2-0pre
---

![](/img/posts/always-ask-2.0pre.png "The dialog that Always Ask shows when it has determined Firefox will quit without prompting")

Around the endgame for Firefox 3.6, [I wrote an extension called Always Ask](/posts/just-released-always-ask) to make sure I always got a prompt when quitting. I used it for a while and then forgot about it when it was no longer compatible as Firefox 3.7 (now 4) moved forward.

Now that we're at the endgame for Firefox 4, and especially with all the changes surrounding the quit dialog, I figured it should be updated. So I'm releasing v2.0pre today which updates the extension to work with component registration changes and [quit dialog](/posts/just-quit-it) [changes](/posts/about-that-quit-dialog) in Firefox 4. This also includes the translations that were submitted via Babelzilla (most of them over a year ago). Thanks to all of you who took the time to translate those strings.

**[Get it now](https://addons.mozilla.org/en-US/firefox/addon/always-ask/)**. Or [look at the code](https://github.com/zpao/alwaysAsk).

## Why 2.0 "pre"?
Mostly just in case there are any further changes needed to be compatible with Firefox 4 (there better not be though).

## Why not restartless?
This would probably work really well as a restartless extension. But I was really lazy and didn't feel like figuring out the l10n part of that (though it looks like [Erik Vold has that figured out already](http://erikvold.com/blog/index.cfm/2011/2/18/restartless-firefox-addons-part-4-localization-l10n)).
