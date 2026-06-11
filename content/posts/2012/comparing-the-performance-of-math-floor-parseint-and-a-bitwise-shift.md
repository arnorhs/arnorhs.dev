---
title: 'Comparing the performance of Math.floor(), parseInt and a (bitwise) shift'
summary: "I read somewhere that a bitwise left shift was a faster method of removing a fraction of a floating point number in Javascript than using parseInt or Math.floor(). I wasn't surprised that parseInt was slow, since I think it parses the number as a string, but the left shift being faster than Math.floor() was a bit more puzzling to me. So I decided to make a JSPerf test to compare those three methods. Read on for the full results"
date: 2012-05-30
---

_Note: Sorry, this post might be a bit more technical than usually._ I read in an article about [HTML5/canvas rendering stuff](https://devworks.thinkdigit.com/channel5/blogs/Unleash-the-power-of-HTML-5-Canvas_9141.html) that a bitwise left shift was a faster method of removing a fraction of a floating point number in Javascript than using parseInt or Math.floor(). I wasn't surprised that parseInt was slow, since I think it parses the number as a string, but the left/right shift being faster than Math.floor() was a bit more puzzling to me. So I decided to make a JSPerf test to compare those three methods.

### The results:

[![](/wp-content/uploads/2012/05/jsperf-646x325.png 'JS perf results')](https://jsperf.com/math-floor-parseint-and-left-shift) There are only a handful of browsers that have been tested, but it seems that the left shift is indeed faster in at least Firefox, my Android browser and in Internet Explorer.

### V8's internals

My good friend, Paul Rosania (who's blog you should read), looked at the V8 source to look at what it's doing internally. [Math.floor() does seem to be implemented using the bitwise left shift operator](https://github.com/v8/v8/blob/master/src/math.js#L96-110).

### What is a left shift and how/why does it work?

If you are not familiar with bitwise operators, they are are used for doing bit-level computations on variables. Anything you do with them is usually very fast, since it's one of the most simple operations you can do (internally all operations, such as subtraction, division, multiplication etc are done using bitwise operations.) I'm not going to bore you with bitwise math, there are plenty of posts about those. [This one on the MDN site](https://developer.mozilla.org/en/JavaScript/Reference/Operators/Bitwise_Operators) is pretty detailed so I recommend that as a good read. But as a super-quick overview, a left shift moves all the binary values of a number one slot.. so 25 left shifted 2 slots becomes 6:

> 25 >> 2
>
> \> 6

or:

> 011001 << 2
>
> \> 000110

So, the burning question on your mind is probably what **happens when you perform a bit wise operation on a floating point number?** Excellent question. Traditionally, floating point numbers work in a weird way at the machine level, in that the way they are stored and handled makes it so that you don't really know where the "dot" (the radix) is positioned at the bitwise level, so it never really makes sense to perform one on a float, so what happens in Javascript is actually just that the floating point number gets converted to an integer first. That's all. So doing any left shift on any floating point number results in it getting converted to an integer first. A left shift of 0 shifts the thing **zero slots**. So the only thing that \*actually\* happens is that So why don't we just convert the number to an integer? Isn't there an (int) or an (integer) typecast in Javascript? Well, no. So a left shift on a float is a poor man's type cast. You can read a pretty good article about typecasting in Javascript and the internal ToInt32 function [here](https://jibbering.com/faq/notes/type-conversion/#tcToInt32):

### Caveat of using a left shift to round a float

Of course you should be aware that the bitwise operation will only work for floats that are smaller than 2147483648 (0x80000000) or the number will actually become negative, since the first bit is used for the signing (negative or positive number). But as long as the number isn't larger than that, you should be pretty safe knowing that on average the poor man's type cast will be the fastest method of converting a float to an integer in Javascript. I hope this was interesting. If you have an suggestions or correction etc, feel free to comment and I can amend the article and claim full credit. Thanks.
