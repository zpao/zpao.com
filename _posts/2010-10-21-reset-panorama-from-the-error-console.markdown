---
title: "Reset Panorama from the Error Console."
tags:
  - mozilla
  - firefox
  - firefox 4
  - panorama
tumblr_permalink: post/1368669319/reset-panorama-from-the-error-console
---

[Panorama](http://www.azarask.in/blog/post/designing-tab-candy/) is this cool new feature coming to Firefox 4. Most of the big issues have been fixed, but there's still [the occasional issue](https://bugzilla.mozilla.org/show_bug.cgi?id=598600) with orphan tabs.

Last week I wrote [a script](http://gist.github.com/626761) that would strip the Panorama data out of Session Restore. That worked but would require a restart. [Ian Gilman](http://www.iangilman.com/) (one of the Panorama developers) used that script for the basis of [a script](http://gist.github.com/637583) that worked much better (it actually called into Panorama and told it to reset properly). The only problem is that it left tabs hidden, so it would require jumping into and then out of TabView to bring everything back to normal. I forked that and just added a call that made sure all tabs were shown.

So if you ever get into a confusing state and don't mind wiping out your current Panorama data, this script is for you:
<script src="http://gist.github.com/638855.js"> </script>
