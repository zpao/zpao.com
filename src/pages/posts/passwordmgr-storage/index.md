---
title: "Password Manager now uses mozStorage"
blurb: "SQLite FTW!"
date: 2008-08-18
tags:
  - mozilla
  - passwordmgr
  - sqlite
  - mozstorage
  - firefox
  - javascript
old_permalink: "articles/10-passwordmgr_storage"
---


The other day [my patch landed](http://hg.mozilla.org//mozilla-central/index.cgi/rev/c2f416981fa3) switching the Password Manager to use [mozStorage](http://developer.mozilla.org/en/docs/Storage) (our wrapper around SQLite). [The bug](https://bugzilla.mozilla.org/show_bug.cgi?id=288040) had been up on Bugzilla for a long time, over 3 years, when I came across it at the end of June. I had been doing some Password Manager related work already by that point, so I decided I would do it. This is the story of that bug: the process, the hardships, the code (at least a bit). Keep in mind I was also doing work on my [DTrace Treemaps](/posts/dtrace-treemaps-part-1) at the time, went to Summit, and encountered more edge cases than I wanted, so this took longer than expected.

## Quick Features & Change Summary

Some of this is discussed further down, so bear with me. One of the primary differences in the switch to using mozStorage is that we now store data in a database. Previously we were storing data in a text file, using lines and periods to separate data fields. Open `signons3.txt` in your [profile directory](http://support.mozilla.com/en-US/kb/Profiles) and take a look at it (assuming you’ve saved a password before). All information was kept in memory, and when a new password was saved, the whole file would need to be rewritten. The same thing happened if you ever removed a saved password. Using a database means that we don’t have to keep any (potentially) sensitive information in memory. It also means faster reading and writing since we don’t have to read the whole file every time. These speed boosts are apparent especially in the speed tests, attached to the bug and summarized below.

Since this is really just a drop in change that must implement an API, to the outside world nothing has changed. Although the inner workings are different, it’s the same to anybody who happens to use it (extensions or other parts of Firefox).

## v0.1 - The beginning

I began work by really taking a look at the [legacy storage module](http://mxr.mozilla.org/mozilla-central/source/toolkit/components/passwordmgr/src/storage-Legacy.js) to make sure I knew what was supposed to be happening. Then I looked at the initial attempts by other developers. The first attempts were made before Password Manager got rewritten, so those weren’t relevant. Mrinal Kant came in (over 2 years after the first patches) and wrote what I used as the basis for my code. I don’t think I ran it as it was, but it looked functional, at least at the core.

I actually started by just copying the legacy storage file, removing all of the code from methods that would need to be changed, and started fresh. I copied in some code from Mrinal’s work and used some of the conventions, but the bulk of it was rewritten. I opted to use the wrapper we have for Storage, which makes it easy to do parameter replacement. This also automatically binds the parameters to a type - so when you give it a string, it will ensure it’s treated as a string. It’s very handy.

This first version “worked” (at least as far as I remember), though it definitely had problems. I brought it up at our [weekly status meeting](http://wiki.mozilla.org/Firefox3.1/StatusMeetings/) and it became one of the “nice to have” features for 3.1. That gave it some attention it needed and I got some quick feedback from [Shawn](http://shawnwilsher.com) and [Justin](http://blog.mozilla.com/dolske/).

## v0.2 - Database details

One of the primary changes here was some of the database stuff. Shawn had pointed out that I needed a way to version the database. All I had was a method to create the tables. In order to future-proof this, I needed to make sure the schema was stored somewhere and there was a procedure for migrating the database.

I took a look at [nsContentPrefService](http://mxr.mozilla.org/mozilla-central/source/toolkit/components/contentprefs/src/nsContentPrefService.js) (which stores your preferences for specific sites, like remembering zoom settings) since that was another component using storage and written in JavaScript. I “hijacked” the code related to the database stuff, and modified it a bit to fit my needs.

The other major change here was to replace `var` with `let` - “`let is the new var`” as my shirt says. A number of other changes were also made - cleaning up queries, hard-coding the table names, and making sure I was using statements correctly.

## v0.3, v0.4 - Cleanup & Optimization

These versions were pretty light - mostly involving cleanup. `modifyLogin and the process involved got improved. I also reduced the number of queries we were making by hand and so all `SELECTs were done from just 2 places (one for each table).

## v0.5 - Importing

v0.5 focused on importing from the legacy module. The basics were in the original code Mrinal wrote, but all of the edge cases were difficult to handle. The one case that caused a lot of problems were the “user has a master password, but presses cancel when we import”. We needed to handle that gracefully, and Justin and I decided the best way was to introduce a `_deferredInit` method, which did the bulk of the initialization work. At the beginning of each public method, we then check the initialization state and try to import again. It can get annoying, but everything about the master password is annoying.

This also resulted in a couple bugs being spun off to help us with importing: [one bug](https://bugzilla.mozilla.org/show_bug.cgi?id=449810) was just a few lines added to the legacy module and the password manager UI to handle an additional error, and [the other](https://bugzilla.mozilla.org/show_bug.cgi?id=449095) was just to ensure the legacy module didn’t create an empty file if it was never used.

## v0.6 - Tests

I finally got to writing the tests, which involved a lot of copy & paste from the legacy tests, then making small modifications. It’s not the most efficient way, but it works ok. Since the mozStorage module works slightly differently, the code duplication is a necessity for now. In theory they can be cleaned up, but that’ll be a task for the next intern :)

At this point I thought I was pretty much done, and I was. There were still a few problems though, and also not quite enough test coverage.

## v0.7, v0.8 - Cleanup, Tests, Corrupt Databases

v0.7 involved a lot of cleanup and adding tests. v0.8 was an important milestone in that I finally added the handling of a corrupt database. Before this point, if we encountered a corrupt database, we would fail and then as with a failed import, just try again and again. This was bad, really bad. So a “thank you” to Shawn for catching that. Now we backup the corrupt database and just create a new one. It should be difficult to get a corrupt database, but just in case (and to cover the case when people think they know what they’re doing, but don’t).

## v0.9, v1.0 - Performance

In one of the recent status meetings, [Mike Shaver](http://shaver.off.net/diary/) asked me about performance. At that point I hadn’t really done much except throw it up on the try server. The try server gives decent ball park figures, but it’s not perfect. So Justin worked on getting [Standalone Talos](http://wiki.mozilla.org/StandaloneTalos) working while I wrote some XPC shell “tests”. I discovered that while we were generally faster - faster init, faster add, faster remove - we were considerably slower for `countLogin`, which is a critical path, since it gets called on every page. Over 90% of the that time was actually spent initializing `nsLoginInfo` objects (since I tried to reuse code). This got improved, though we are still a couple milliseconds slower. This could likely be improved a little bit since we are still doing a `SELECT` and looping over the results. A little bit more work needs to be done that way, so making the query use `COUNT` would cut that out. Maybe I’ll write another patch to do that before Beta 1. For now though, we’ll keep doing it how we’re doing it.

## And that’s all… almost

After this got checked in, the Windows boxes turned orange on Tinderbox. This was because of the tests (trying to delete files). Justin and I thought we had a quick fix, committed that. As I was packing to come home, I got pinged on IRC since the boxes were still orange and it was my fault. So the tests for my changeset got backed out and we switched back to the legacy module, but the code was still in there.

On Sunday, my module [was re-enabled](http://hg.mozilla.org/mozilla-central/index.cgi/rev/063c145b2a09) (thanks Justin!). There was [another hiccup](https://bugzilla.mozilla.org/show_bug.cgi?id=451040) related to packages-static, but that was fixed as well. If you have any problems [please report them on Bugzilla](https://bugzilla.mozilla.org/enter_bug.cgi?component=Password%20Manager&product=Toolkit).
