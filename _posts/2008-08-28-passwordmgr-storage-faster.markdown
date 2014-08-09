---
title: "Making the New Password Manager Storage Faster"
blurb: "It's a simple fix, but it makes a difference."
tags:
  - mozilla
  - passwordmgr
  - sqlite
  - mozstorage
  - firefox
  - javascript
old_permalink: "articles/11-passwordmgr_storage_faster"
---

When I first wrote the new storage module for the Password Manager, I took a few “shortcuts,” trying to keep my code DRY. Partially this was because of the first patch by Mrinal Kant, but mostly it was because I like to reuse code. This bit us just a bit.

I mentioned in my [first post about this change](/posts/passwordmgr-storage) that we were initially considerably slower in the critical `countLogins` method. While it got improved before being checked in, it was still marginally slower (milliseconds on an abnormally large dataset).

As I said before, this was most likely since we were doing a `SELECT *` on the `moz_logins` table, and looping over the results and counting. This allowed me to reuse more code. Loops are a kind of slow, and since this was so important, I decided to speed it up.

[I filed a bug](https://bugzilla.mozilla.org/show_bug.cgi?id=451479) just over a week ago entitled “storage-mozStorage should use COUNT in countLogins” - which pretty much explains what the solution to the above problem. I created a patch which essentially just switched the mosStorage module to use `SELECT COUNT(1)`. I reran the performance tests I created and we’re doing much better now. There’s still a miniscule loss in speed from the legacy storage module, but at this point, we’ve done all that we can, and where the difference was milliseconds, its closer to millisecond.

This was [checked in](http://hg.mozilla.org/mozilla-central/rev/ce557eb9ef4a) today (thanks Justin!).

And that’s it. I have another patch in the pipeline and hopefully I’ll have time to get it finished, approved, and reviewed for the freeze (whenever that is now).
