---
title: My First Patch
blurb: "I'm famous... kind of... OK fine, I'm not."
date: 2008-06-12
tags:
  - mozilla
  - firefox
  - patch
old_permalink: "articles/3-my_first_patch"
---

Today I put created my first patch for Firefox. It’s nothing major, but it still counts. It still hasn’t been r+ed yet (c’mon [dolske](http://blog.mozilla.com/dolske/)!). Basically, it creates a public function that exposes a private function in the Password Manager. This makes it so that a user can have Firefox remember passwords, disable the feature to autofill login forms on page load, yet still expose the functionality to fill in the form. This opens it up for an extension to do that work.

I think Justin probably [said it better](https://bugzilla.mozilla.org/show_bug.cgi?id=359675#c26):

> …it seems like a legitimate use case for those who want this as an option. At the very least by adding some flags to the existing code, so an extension could drive the UI side. [Eg, currently the password manager form-fill code can only be triggered by page loads, but it should be easy to expose this as an interface for extensions.]

Better?

So if you’d like to read some more about it, there’s [the discussion on Bugzilla](https://bugzilla.mozilla.org/show_bug.cgi?id=359675) and ~~[the diff for the patch](https://bugzilla.mozilla.org/attachment.cgi?id=324865&action=diff)~~. It’s not checked into source yet, but soon. So yea, this isn’t terribly exciting… unless you’re me.

**Update:** The original patch got canceled since we decided it would be better to expose just the functionality to fill a form as opposed to the whole document, at least as a first step. There’s a ~~[new patch](https://bugzilla.mozilla.org/attachment.cgi?id=325053&action=diff)~~ in that’s now waiting for a review.

**Update 2:** I was very preemptive here. I should have just waited until it actually got committed. I ended up getting r-ed a couple times, but it made it in. So without further ado, [the changeset.](http://hg.mozilla.org/mozilla-central/index.cgi/rev/055a716092aa)
