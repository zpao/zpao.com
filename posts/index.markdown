---
title: Archive
layout: general
---

<table id="post-list">
{% for post in site.posts %}
  <tr>
    <td class="date">
      <time datetime="{{ post.date | date: "%F" }}">
        {{ post.date | date: "%F" }}
      </time>
    </td>
    <td>
      <a href="{{ post.url }}">{{ post.title }}</a>
    </td>
  </tr>
{% endfor %}
</table>
