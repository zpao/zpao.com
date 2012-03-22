---
title: "Multiple Assignment in JS With Objects"
tags:
  - mozilla
  - javascript
  - firefox
  - wtf ecma
layout: post
tumblr_permalink: post/3513047019/multiple-assignment-in-js-with-objects
---

Note: Turns out this only works in Firefox since it is the only browser to include versions of JavaScript beyond 1.5. Perhaps something will show up in ECMAScript N/Harmony/whatever.

- - -

Alright, JavaScript is pretty cool. There are plenty of "tricks" that still boggle my mind. I just found another cool trick in [Mardak code](https://github.com/Mardak/restartless/blob/examples%2Fl10nDialogs/bootstrap.js#L37) (he would do this...).

This is about multiple assignment in JS. Well, it's actually about destructuring assignment, but potato, potato.

Hopefully by now we all know that it can be done with arrays.

<script src="https://gist.github.com/844787.js?file=assignment_array.js"></script>

What I didn't know is that it can also be done using objects.

<script src="https://gist.github.com/844787.js?file=assignment_object.js"></script>

This mostly makes sense now that I know it works, I was just a bit surprised. The syntax is strange, but it's oddly satisfying (and follows from the assignment from an array).

Turns out this works for nested objects too...

<script src="https://gist.github.com/844787.js?file=assignment_object_nested.js"></script>

Just keep in mind the same rules for object references applies. If I change `obj2.foo.dude`, that changes `e.dude`

And last but not least, we can also access values directly with nested objects.

<script src="https://gist.github.com/844787.js?file=assignment_object_nested2.js"></script>

Modifying `obj2.foo.dude` here will have no effect on `g`.

Add this to the list of cool things that have been implemented in JS [1.6](https://developer.mozilla.org/en/JavaScript/New_in_JavaScript/1.6), [1.7](https://developer.mozilla.org/en/JavaScript/New_in_JavaScript/1.7), and [1.8](https://developer.mozilla.org/en/JavaScript/New_in_JavaScript/1.8), but yet still aren't available in all browsers (sigh). Generators, Iterators, array comprehensions, block scoping with `let`... all cool things that are used regularly within the Firefox codebase.
