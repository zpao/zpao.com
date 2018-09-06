---
title: "DTrace and Treemaps: Part 1"
blurb: "An experiment to analyze performance in a visual way."
date: 2008-07-24
tags:
  - mozilla
  - opensource
  - mozilla
  - firefox
  - dtrace
  - treemap
  - ruby
  - javascript
  - svg
old_permalink: "articles/8-dtrace_treemaps_part_1"
---

One of my goals for this summer at Mozilla was improving performance when Firefox starts. Admittedly, I’ve done nothing of the sort. Instead I’ve tackled this from a more general angle - making a tool that uses DTrace and creates a treemap of the output. This serves as a way of analyzing performance in a very visual way. Before I go further, a little background.

## DTrace

“DTrace is a comprehensive dynamic tracing framework created by Sun Microsystems for troubleshooting system and application problems in real time.”[^1] It was originally in Solaris and OpenSolaris, but has since been ported to OS X and was [included in Leopard](http://arstechnica.com/reviews/os/mac-os-x-10-5.ars/5#dtrace). In a nutshell, it lets you take a look at the inner workings of applications and kernel activity, with a low overhead. You can do everything from looking at file IO to time spent in functions to analyzing system call times. It’s pretty powerful and I’ve only just touched the surface of it.

Developers at Mozilla have done a lot of work getting probes into Firefox so that we can take advantage of all DTrace has to offer. One of these places where probes have gone is into JavaScript execution. This opens up the doors to using DTrace to track what’s happening in JavaScript, which is especially useful at Mozilla since a lot of our front-end code is JavaScript.

## Treemaps

“Treemapping is a method for displaying tree-structured data using nested rectangles.”[^2] In other words, pretty damn cool. One of the coolest uses I’ve seen recently is [newsmap](http://marumushi.com/apps/newsmap/) - which takes the news as aggregated by Google News, and builds a beautiful representation of what’s “hot” in the news.

## What I’ve done

The work that I’ve been doing so far is pretty simple. I’ve taken the output of a single DTrace script (`js_functime`, [available on Brendan Gregg’s blog](http://blogs.sun.com/brendan/entry/dtrace_meets_javascript)) and used that to create a treemap. This DTrace script measures the time spent in Javascript functions. It’s not the most accurate measurement since the output is the overlapping times, but it’s still a good place to start. The output contains the number of times each function was called, the average time spent in the function, and the total time spent (across calls). From there I build these treemaps.

I’ve used a modified version of the [RubyTreemap](http://rubytreemap.rubyforge.org/) gem to create SVG (Scalable Vector Graphics)s of this output. I create 3 different high-level maps, each representing the bits of information I get (count, average time, total time). Each of these maps is made from a tree 3 levels deep (though the root node is insignificant). The topmost level is the file from which the function is in. The second level is the function name. Size is determined from the measurement type (thus 3 maps). Each of these maps can then be broken down further, stepping into each individual file. So from these 3 “index” SVGs, I’ve linked down into the second level, and a new SVG is generated for each file, making it a bit easier to read the smaller nodes. Colors are consistent between runs and based on an adapted hashing algorithm.

I can’t hand out the source yet since the original RubyTreemap is GPL’ed and I’m not ready to redistribute. The changes aren’t huge, but are very focused for this task, so might not even be able to be merged back. Also, my code is pretty ugly right now and that would just lead to embarrassment.

So without further ado, here’s the page on playground: *[DTrace Treemaps](http://playground.zpao.com/dtrace_treemaps/)*. Keep in mind that this is not complete and what you see may very well change soon. Here are the direct links to the SVGs if you are a bit impatient: [count](http://playground.zpao.com/dtrace_treemaps/js_functime_count/index.svg), [average](http://playground.zpao.com/dtrace_treemaps/js_functime_avg/index.svg), [sum](http://playground.zpao.com/dtrace_treemaps/js_functime_sum/index.svg).

## Future Directions

From here I plan on using the output from some of the scripts in the [DTrace Toolkit](http://opensolaris.org/os/community/dtrace/dtracetoolkit/) to create other visuals, likely more treemaps. I also need to do a number of things to package this nicely so it’s easy to adapt and use for different DTrace outputs. Last, but certainly not least, I need to make the code much better - it’s my own personal Frankenstein right now, and needs to suck less.


[^1]: [Wikipedia DTrace article](http://en.wikipedia.org/wiki/DTrace)
[^2]: [Wikipedia Treemapping article](http://en.wikipedia.org/wiki/Treemap)
