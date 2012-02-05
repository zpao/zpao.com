---
title: blah. blah. blah.
layout: general
---

I'm in the process of moving some things around. I had a few blog posts here and there's a bunch more on [Tumblr](http://blog.zpao.com), which I'm going to consolidate to make things easier. I may lose some data in the process... meh?

Until I'm done, things may not look super hot here. If you want to see something super hot, [click here](http://facebook.com/profile.php).

## Pages on this Site:

* [About](/about/)

## Things I've written:

<ul>
{% for post in site.posts %}
  <li><a href="{{ post.url }}">{{ post.title }}</a> ({{ post.date | date: "%B %e, %Y" }})</li>
{% endfor %}
</ul>
