---
title: blah. blah. blah.
layout: general
---

I'm in the process of moving some things around. I've migrated the blog posts I had written here previously, but I haven't moved anything from my [Tumblr](http://blog.zpao.com) yet.

Excuse the mess as I consolidate & redesign. Things may not look super hot before I'm done. If you want to see something super hot, [click here](http://facebook.com/profile.php).

## Pages on this Site:

* [About](/about/)

## Things I've written:

<ul>
{% for post in site.posts %}
  <li><a href="{{ post.url }}">{{ post.title }}</a> ({{ post.date | date: "%B %e, %Y" }})</li>
{% endfor %}
</ul>
