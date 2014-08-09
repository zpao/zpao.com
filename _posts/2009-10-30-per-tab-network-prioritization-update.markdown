---
title: "Per Tab Network Prioritization Update"
blurb: "Good News..."
tags:
  - mozilla
  - firefox
  - statusupdate
old_permalink: "articles/24-per_tab_network_prioritization_update"
---

Progress on this was not as fast as I’d hoped it would be. It got stalled behind some other work, going to the CMU job fair, [I was poisoned](http://twitter.com/zpao/status/5076044119), and I had to figure out how the focus tests work. But that’s enough with the negativity, this is supposed to be good news.

I finally got all my ducks in row and [landed the feature today](http://hg.mozilla.org/mozilla-central/rev/bbeaa4e518ee)! If you don’t remember what the feature does (or never knew), read through [my original article on it](/posts/per-tab-network-prioritization/). While the underlying implementation changed a fair amount, the basic concept is still the same. The only change made is that we adjust the priority instead of just changing it to pre-determined values. By doing it this way, we won’t interfere with an add-on that, for example, gave Gmail a super high network priority.

We’ve talked about getting this into Firefox 3.6. It’ll need to “bake” a little while on trunk, but it landed cleanly and doesn’t have any compatibility issues, so it should be ok. Then again, <abbr title="I Am Not A Driver">IANAD</abbr>.

Going along with this, I’ve updated the [mozNetworkPrioritizer extension](https://addons.mozilla.org/en-US/firefox/addon/14138) to reflect the change in compatibility. It should no longer be used with Firefox 3.7a1pre (and beyond). It will interact poorly with the built-in functionality and could lead to some weird priorities. It won’t actually break anything, but there’s no need to use it. I’ll release another update if/when this goes into Firefox 3.6.

And that’s it. I’ll post again about future landings. Otherwise, I’m going to be working on some session restore blockers and starting another project soon.
