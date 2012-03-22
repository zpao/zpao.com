---
title: "Restore Previous Session"
tags:
  - firefox
  - firefox4
  - mozilla
  - session restore
  - beta7
layout: post
tumblr_permalink: post/1099464627/restore-previous-session
---

I landed [bug 588482](https://bugzilla.mozilla.org/show_bug.cgi?id=588482) today (September 10<sup>th</sup>), so starting with tomorrow's nightly version of Firefox (AKA Minefield), you'll be able to restore your previous session at any point after start up. This means that you no longer have to restore your whole session immediately at start up. This will be available through a menu item in the History menu, as shown below.

![Screenshot of History Menu](/img/posts/restore-previous-session.png)

This feature will be in Firefox 4 <strike>beta 6</strike> beta 7, due out in the next couple weeks.


## Details

* Restoring your previous session after you've browsed around will merge the sessions. You shouldn't lose any new data by restoring your previous session.
* We didn't break existing behavior. If you have Firefox set to show your windows and tabs from last time, we'll continue to do so and you won't even notice this feature exists
* App tabs still behave the same.
* This doesn't break any existing APIs, but it does add some new ones.
* [Discoverability is suboptimal](https://bugzilla.mozilla.org/show_bug.cgi?id=593421).
* [You are still prompted to save your session when quitting](https://bugzilla.mozilla.org/show_bug.cgi?id=592822) (assuming default prefs).


## Why?

We did this primarily for 2 reasons.

1. We want faster start up times. By encouraging users to always resume their previous sessions, we give the impression that Firefox takes a long time to load up. But really, you're loading 20, 50, 100+ tabs and that's what is slow.
2. When you're quitting, you there's a good chance you have no idea if you'll need your tabs next time.

(Keep in mind, if you're reading this post, you aren't the typical user. You're probably a developer of some sort who drags your 400 tabs around to each session. You know it's slow, but you really never got the hang of bookmarks, so you just keep tabs open.)


## Privacy

Obviously, in order for us to restore your session, we need to save it to disk. We save this data in a plain-text JSON file in your [profile](http://support.mozilla.com/kb/Profiles).

We currently consider sessions a little differently than some other browsers. We consider your session cookies (and a few other things) as part of your session. This means we write that information to disk. Under a normal session restore that you've explicitly opted-in to, that's fine. We have a hidden preference (`browser.sessionstore.privacy_level`) that specifies what level of privacy to use. **The default value is 1**.

There are 3 levels of privacy:

* **0** = Save private information for HTTP and HTTPS sites.
* **1** = Save private information for HTTP sites.
* **2** = Don't save any private information.

For deferred sessions, we created a new preference (`browser.sessionstore.privacy_level_deferred`) with a different default value. Since people are not making an informed decision to restore at shutdown, we don't want to expose information that can be used to, for example, log in to GMail. This new preference has the same possible values but **the default value is 2**, so that no session cookies will be restored.


## Safari

Yea. They've been doing this for ages. But as far as I know, they still don't allow you to restore your entire session at start up.
