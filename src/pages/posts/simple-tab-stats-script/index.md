---
title: "Simple Tab Stats Script"
date: 2011-06-17
tags:
  - mozilla
  - firefox
  - stats
  - omgtoomanytabs
  - gist
tumblr_permalink: post/6636815982/simple-tab-stats-script
---

My Firefox usage has always been a bit excessive. I used to open windows to group my different tasks. Then Panorama came along and I started using groups. Then I had too many groups so I started opening new windows. Luckily I set `max_concurrent_tabs` to 0 so I avoid loading all of those pages at startup ([it's that BarTab-like thing](/posts/cascaded-session-restore-a-hidden-bonus)).

![](./simple-tab-stats.png)

My curiosity got the better of me so I wrote [a little script](https://gist.github.com/1020014) to tell me some facts about my usage. There are extensions that do some or all of this, but I didn't actually want to install anything, I just wanted a quick snapshot of what was up. (That said I might turn it into an _about:something_ sort of extension.) You can see what it tells you - it's not much but it told me what I wanted to know. My usage was higher earlier today, and I'm sure there are people who are much more abusive of Firefox, so no judging.

`gist:zpao/1020014`

Judging me on coding style? I would be. I started writing this in the error console, so I left out whitespace and used shitty variable names. Then it grew up and got all awkward.
