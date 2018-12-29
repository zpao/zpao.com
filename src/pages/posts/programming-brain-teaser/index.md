---
title: "Programming Brain Teaser"
blurb: "i is smart!"
date: 2008-07-09
tags:
  - ruby
  - programming
old_permalink: "articles/6-programming_brain_teaser"
---

Since I was at a presentation during lunch, I took some time for myself and took a quick crack at Dustin Diaz’s [programming brain teaser](http://www.dustindiaz.com/programming-brain-teaser/). He said any language, so the quickest to get running for me is Ruby (and `Command-R` in Textmate is so easy).

It’s not terribly clever, but it takes a different approach from some of the other solutions in that it modifies the array elements then just joins them, instead of creating a single output string and concatenating as time goes. My favorite solution in the comments used a regular expression, which I thought was particularly clever. Anyway, here’s mine:

```ruby
# the array
arr = ['a', 'b', 'c', 'c', 'd', 'e', 'e',
       'e', 'e', 'e', 'f', 'e', 'f', 'e',
       'f', 'a', 'a', 'a', 'f', 'f', 'f']

# some variables
count = 0
arr.each_index do |i|
  # not the same as previous letter, so do some things
  if i > 0 && arr[i] != arr[i-1]
    if count > 2
      arr[i-1] = arr[i-1] + ""
      arr[i-count+2] = "" + arr[i-count+2]
    end
    count = 0
    put_tag = false
  end
  # increment count
  count += 1
end
if count > 2
  arr[-1] = arr[-1] + ""
  arr[-count+2] = "" + arr[-count+2]
end

puts arr.join(" ")
```

Thinking back, I should have gone for some JavaScript, since that’s mostly what I’m writing these days. Oh well.
