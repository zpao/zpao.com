---
title: "Introducing LOLcanvas"
blurb: "OMG! LOL!"
date: 2008-06-26
tags:
  - mozilla
  - firefox
  - canvas
  - lolcanvas
  - javascript
old_permalink: "articles/5-introducing_lolcanvas"
---

Work has been going forward in (what will likely be) Firefox 3.1. While there are definitely changes happening in the front-end, there are also a number of changes happening in the backend (AKA Gecko 1.9.1) as well.

Gecko 1.9.1 is going to have even more improved CSS3 support, as [David Baron writes about](http://dbaron.org/log/20080603-new-selectors). He’s landed support for some additional CSS selectors. Rob Arnold has recently done work on `border-image`, and I know at least one other intern is working on some CSS3 stuff.

More relevantly though, [Eric Butler](http://www.ericbutler.net/blog/2008/06/html-canvas-in-firefox-31/) has done work on `canvas` support. One thing that he’s worked on is getting the `canvas` element text drawing up to speed, and more up to spec. I had some free time so I worked on a little demo to show off the new stuff.

It’s called [LOLcanvas](http://playground.zpao.com/lolcanvas) and uses `canvas` to draw text on a flickr image, client side. This is similar to another project I worked on before - [flolcatr](http://flolcatr.com) - however now it’s all done right in the browser. Anyway, a picture is worth a thousand words, so here:

[![omg surprize it's Lion cat](http://zpao.com/images/lioncat.png "omg surprize it's Lion cat")](http://www.flickr.com/photos/evapro/385650640/)

The details are on the [LOLcanvas homepage](http://playground.zpao.com/lolcanvas), so give it a try and have fun. If you have some additional phrases to add, let me know. I’ll be throwing the readable source up somewhere soon so that you can see exactly what’s happening.

Original image is [CC licensed](http://creativecommons.org/licenses/by/2.0/deed.en) and [available here](http://www.flickr.com/photos/evapro/385650640/).
