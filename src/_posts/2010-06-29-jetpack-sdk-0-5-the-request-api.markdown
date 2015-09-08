---
title: "Jetpack SDK 0.5 & the Request API"
tags:
  - mozilla
  - jetpack
tumblr_permalink: post/750771670/jetpack-sdk-0-5-the-request-api
---

[Jetpack SDK 0.5](http://mozillalabs.com/jetpack/2010/06/24/announcing-jetpack-sdk-0-5/) hit the streets last week. There's a bunch of new APIs in there. I worked on the `Request` API, which enables a simple way to make XML HTTP Requests (XHR, or AJAX if you must). The API is a wrapper around the Gecko HXR object.

Like jQuery, MooTools, Prototype (or pretty much any JS library), it makes the ugly stuff go away. You simple provide a URL, some data, and a callback, and we'll do the rest (you can set some more things if you'd like). In the callback, you have access to the response headers and content as JSON/XML/text. [Read the documentation](https://jetpack.mozillalabs.com/sdk/0.5/docs/#module/jetpack-core/request) for the specifics.

Keep in mind that this is meant to be a simple API. You can't make complicated requests. For example, you can't send files with it. The plan is to keep this API simple. It is a first version, so if people need more functionality, we can add more. Or we can take those additional needs and create another API. If you have feedback, please post to the [Google Group](https://groups.google.com/group/mozilla-labs-jetpack).

I wrote up a basic example using the Twitter API, which I've included below. It's not too fancy, but gets your feet wet.

<script src="http://gist.github.com/457704.js?file=gistfile1.js"></script>
