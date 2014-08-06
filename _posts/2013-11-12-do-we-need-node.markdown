---
title: "Do We Need Node?"
date: 2013-11-12
tags:
  - javascript
  - node
  - mozilla
---

Lately I've been thinking a lot about JS modules and the different implementations of module loaders. At the end of the day we've all mostly settled on CommonJS, but even then we have our rough patches supporting AMD, "pure" `require`, and global script tags. There are tools to make all of this relatively painless, but I'm pretty excited for a future where we don't need any of it.

ES6 will hopefully bring with it modules in some form. Last I heard, [Dave Herman][dherman] and others really want to push it through, though it's an understandably difficult thing to push into the language, especially now. Languages like Python and Ruby have had this sort of capability from the beginning. Hell, even C had the ability to import into scope, even if it is kludgy. So I have no doubt we will have sane support for modules across modern JS engines in the next 2 years.

Working from that assumption… I have to ask, do we really need Node anymore? Node has baggage. It's tightly tied to a single JS engine, which makes it next to impossible for anybody to compare JS engines outside of the browser. V8 may have been the right choice for Ryan Dahl to make at the time, *a lot* of that had to do with the C++ API, but is it still the best engine today? In 2 years? Node has it's own standard library on top of the JS standard library. It [adds globals][nodeglobals] to your scripts. Some are there to make CommonJS work (`require`, `module`, `exports`, which are actually local to each module but still considered "global"). Other globals are there to make scripting easier (e.g. `__dirname` is not unusual for scripting languages to have). There's only 1 really odd one out and that's `Buffer`. It may be useful, but it really has no place in the global scope. With a large portion of Node's API written in JS, why can't we ship each of those as a standalone module/package? We already mostly use these APIs by requiring them (`require('fs')`).

I think we'll always need a way to package and distribute modules. NPM has proven how valuable that is. Look around - Ruby has [rubygems][rubygems], Python has [PyPI][pypi], Objective-C has [CocoaPods][cocoapods]. The thing to note here is that these are *language* based and not built around an additional layer on top of a language. When you look at gems built for Ruby on Rails, they are still distributed the same way, they just have different dependencies. Going further, there are multiple interpreters for some of these languages. Ruby has MRI, JRuby, and Rubinius (and others); Python has CPython and PyPy (and likely others). For the most part these are all interchangeable (you run into issues with binary compatibility, e.g., the sqlite gem isn't compatible with JRuby).

So what do I want? I want a world where the core JS engine is swappable. Maybe I'm deploying on an architecture not supported by V8 (Node on SPARC came up while working on SpiderNode). Maybe my employer only wants to use the JVM. Or maybe Microsoft can get some performance wins by using Chakra for Windows Azure. Back to modules, I don't want to get rid of npm. Or maybe I do and I want something that only supports ES6+ modules.

I think Node and npm have been forces of awesome over the past few years and there is no doubt they have helped propel JavaScript forward, but I think we're outgrowing them. There are lots of things to figure out to replace `node` with `js`, but maybe we should start thinking about it.

Just imagine: `#!/usr/bin/env js`

[dherman]: http://twitter.com/littlecalculist
[nodeglobals]: http://nodejs.org/docs/latest/api/globals.html
[rubygems]: http://rubygems.org/
[pypi]: https://pypi.python.org/pypi
[cocoapods]: http://cocoapods.org/
