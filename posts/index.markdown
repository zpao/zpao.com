---
title: Posts
layout: general
---

<table id="post-list">
{% for post in site.posts %}
  <tr>
    <td>
      <a href="{{ post.url }}">{{ post.title }}</a>
    </td>
    <td class="date">
      {{ post.date | date: "%B %e, %Y" }}
    </td>
  </tr>
{% endfor %}
</table>
