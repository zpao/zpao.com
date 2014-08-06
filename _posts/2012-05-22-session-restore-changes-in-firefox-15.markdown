---
title: "Session Restore Changes in Firefox 15"
date: 2012-05-22 14:23
tags:
  - Mozilla
  - Firefox
  - Session Restore
---

There are a few changes coming in Firefox 15's Session Restore. There are a few under the hood changes which should be transparent to anybody using the API, but there are also some changes to the format of the `JSON` that is exposed.


## Form Data

All of the changes have to do with the `formdata` object that is used to store (wait for it...) form data. Historically we've done our best to save the data so that when you recover from a crash or resume a session, we can do our best to get you going again. When we've saved the data in the past, it was just in a flat object that looked something like this:

    "formdata": {
      "#elementID": "value for form field with id",
      "/xpath/string": "value for form field without id"
    }

Starting with Firefox 15, [we've broken that up a bit further](https://bugzilla.mozilla.org/show_bug.cgi?id=697903), with `id` and `xpath` keys to scoped data. The other key difference is that we no longer prepend `#` to the element's id (it was only being used to distinguish id vs xpath). The updated format looks like this:

    "formdata": {
      "id": {
        "elementID": "value for form field with id"
      },
      "xpath": {
        "/xpath/string": "value for form field without id"
      }
    }

This was a part of making some of Session Restore more usable to other components. In this case it was something originally thought up for Sync to be able to reuse code when syncing tabs between devices.


## Better Restoration of `<select>` Elements

[The other change](https://bugzilla.mozilla.org/show_bug.cgi?id=662743) will result in better restoration of `<select>` elements. For the simple case (no `multiple`) we would simply store the `selectedIndex` and move on. When restoring, we would re-select that index (unless it was suddenly out of bounds). This resulted in the wrong `<option>` being selected if `<option>`s were added or removed. This has been a problem for years with Bugzilla where a new product or component would get added and then people would accidentally save changes to bugs and make changes they didn't intend.

So now we save the value of the selected `<option>` and check that when restoring the form. If the value at `selectedIndex` doesn't match what we saved, we'll look through all of the `<option>`s until we find a match. It's a simple change but should result in more reliable form restoration.

    "selectEl": 1

becomes

    "selectEl": {
      "selectedIndex": 1,
      "value": "option value"
    }


## Backwards Compatability

As with all changes in Session Restore, we'll be maintaining compatability with the old format for some extended period of time. We will continue to be able to read the old format, but we won't write it back out. If you're an API consumer, you should update accordingly. Extension authors should be ready to handle both formats while supporting Firefox 14 and below.


## Not Me!

I didn't write code for any of this! Thanks to Andres and Bellindira from AppCoast for picking up half-written patches and taking them the rest of the way. Tim Taubert helped out a bunch with reviews too. There are other Session Restore changes that this group is working on so there's more to come!

