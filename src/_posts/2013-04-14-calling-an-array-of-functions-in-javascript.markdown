---
title: "Calling an Array of Functions in JavaScript"
tags:
  - javascript
  - programming
---

I've reviewed some bits of code over the past couple months that stored functions in an array and then at some point in the future needed to call all of them. This is a very simple thing to do, but something about the code always bothered me.

Assuming:

``` js
var callbacks = [
  function() { console.log(1); },
  function() { console.log(2); }
];
```

You end up iterating over the array and calling each function explicitly:

``` js
callbacks.forEach(function(callback) {
  callback();
});
```

Part of the beauty of `forEach` is that you can pass it a function without it having to be defined each time. So we could define a function that does what our anonymous function does for us.

``` js
function call(fn) {
  fn();
}
callbacks.forEach(call);
```

This works but it feels silly. JS already has `Function.prototype.call` so why should we have to write our own. Let's figure out if we can make `Function.prototype.call` work for us...

## Function.prototype.call

The very first thing to know about is some internal implementation details. Like most objects in JS, functions use prototypes, and so within the prototype `this` refers to a particular instance. So a simplified implementation of `call` would look something like this:

``` js
Function.prototype.call = function(thisArg, arg1, arg2, ...) {
  CALL_FN_WITH_SCOPE(this, thisArg, arg1, arg2, ...);
}
```

That's going to be down in native code and will of course vary by engine, but the important thing to remember is that `this` is the function that gets called. There are a few more details in [the spec](http://es5.github.io/#x15.3.4.4).

The second thing to know is that you can call functions on prototypes, so long as you use them correctly. So let's try just calling one function.

``` js
Function.prototype.call(callbacks[0]);
```

That's not going to work. Effectively you're just calling a function that then calls `this`. We might be able to write some weird code that ends up doing what we want but let's not. What you actually want to do is call `Function.prototype.call` with a specific `this` so it knows what function to actually run. Confused?

``` js
Function.prototype.call.call(callbacks[0]);
```

This works, but it's also equivalent to just saying `callbacks[0].call()` so it's pretty bad form to do. But the point here is that we can now call a function by passing it as an argument instead of needing a proper handle to that function.

## Array.prototype.forEach

The way `forEach` works is also important to know. Go read [the spec](http://es5.github.io/#x15.4.4.18), or even just the [MDN page](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/forEach).

The key take away: the 2nd argument will be used as the `this` that is accessible in the function argument. If you followed along with that chunk of the spec, you may have seen `[[Call]]` — this is effectively saying that your JS is transformed into this:

``` js
myFunction.call(thisArg, item, index, array);
```

(I say "effectively" because that's not *exactly* how it happens but if you read the spec, the result is the same, with the same possible errors.)

## Putting it Together...

We know we want to call `Function.prototype.call` and we know what function we want to be run. So the next thing to try is:

``` js
callbacks.forEach(Function.prototype.call);
```

But that doesn't work. It's actually going to throw an error. Remember, `this` is what gets called and we've actually passed `undefined` as this, not an item from our array. It really looks something like this:

``` js
Function.prototype.call.call(undefined, callbacks[0]);
```

We're almost there. We actually want to pass `Function.prototype.call` as `this` so it gets called — effectively `Function.prototype.call.call`. And that in turn is passed our callback. Basically, we're creating a little JavaScript [Matryoshka doll](http://en.wikipedia.org/wiki/Matryoshka_doll). It's a little crazy but it works.

``` js
callbacks.forEach(Function.prototype.call, Function.prototype.call);
```

At the end of the day though, this isn't straightforward code. And in fact, [it's quite slow](http://jsperf.com/call-vs-prototype-call). So I can't recommend ever writing this code, though it made for an interesting thought experiment.
