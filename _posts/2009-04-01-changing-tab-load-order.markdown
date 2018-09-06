---
title: "Changing Tab Load Order"
blurb: "because loading a lot of tabs sucks"
date: 2009-04-01
tags:
  - mozilla
  - firefox
old_permalink: "articles/18-changing_tab_load_order"
---

During the Firefox work week last month, somebody had the idea of loading visible tabs first. It’s one of those things that just make sense. Since I had done some work in the SessionStore component before, I volunteered to head up this task.

## What does it do exactly?

When you open Firefox using session restore (and through some other paths), you often load several tabs. I know I’ve personally restored windows with 50+ open tabs. It takes a lot of time to load 50 tabs. One optimization that was done previously was to (roughly speaking) prioritize the selected tab, so that it would in theory load first. This change make it so that the tabs visible in your tab strip are also prioritized.

## How does it work?

When we were doing this for just the selected tab, it was extremely simple - we just reordered the array of tab data so that the selected one was first. Now we prioritize a set of tabs (keeping the selected tab first). *That’s it.*

**To be clear**, this does not *actually* improve performance. All it does is make the browser feel faster. But hey, isn’t that just as almost as important.

Go ahead and try it out. It’s been in Minefield (mozilla-central) for over a week and landed in Shiretoko (mozilla-1.9.1) yesterday.
