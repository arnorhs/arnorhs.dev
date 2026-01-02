---
title: "Arnor's Handy Bookmarklet for Measuring Page Scroll Performance"
summary: "I've been dealing with some unfortunate scroll performance issues at work lately, and to aid me in that task I've been using a handy CSS stress test bookmarklet made by Andy Edinborough. It works by iterating through all your classes and measuring the performance improvement you get from dropping them - thus helping you find out which classes are making your page scroll speed slow. It's handy but the use case too constrained for my needs. I wanted to be able to simply run a test anywhere on the page just for a single run, and I didn't really care about the classes, since I was manually disabling styles and moving things around, unbinding event etc to find out where the biggest performance improvements could be had."
date: 2011-12-11
---

_Note from 2025: This concept doesn't really work anymore, since the browser's
rendering is no longer tied to scrolling - so you will always get the same results.
I could probably try to update it, but browsers these days have way better tools
to measure these things, so this is just a relic of the past._

I've been dealing with some unfortunate scroll performance issues at work lately, and to aid me in that task I started using a handy [CSS stress test bookmarklet](https://andy.edinborough.org/CSS-Stress-Testing-and-Performance-Profiling) made by [Andy Edinborough](https://twitter.com/#!/andyedinborough/). It works by iterating through all your classes and measuring the performance improvement you get from dropping them - thus helping you find out which classes are making your page scroll speed slow. It's handy but the use case too constrained for my needs.

### Another approach for measuring page scroll performance

I wanted to be able to simply run a test anywhere on the page just for a single run, and I didn't really care about the classes, since I was manually disabling styles and moving things around, unbinding event etc to find out where the biggest performance improvements could be had. So I ended up writing this snippet of Javascript to aid me in my work. Drag this link to your bookmark bar / toolbar to try it out:
<a href="javascript:(function(){'use strict';const a=500,b=100;let c=1;const d=new Date,e=window.scrollY;function f(a){return a%2*b}function g(){setTimeout(()=>{window.scrollTo(0,e+f(c))},0)}function h(){if(c>=a){const b=(new Date)-d;console.log('--- Scroll Test Complete ---'),console.log('Total scrolls: '+a),console.log('Time taken: '+b+' ms'),console.log('Time per scroll: '+b/a+' ms'),window.removeEventListener('scroll',h);return}c++,g()}window.addEventListener('scroll',h),g()})();">Arnor's scroll performance test</a>

### Requirements

- Keep your dev tools console open

### How to use it

Visit any webpage that has the jquery object available and click your new bookmarklet. When it finishes running, it will display the stats in the javascript console of your browser, in ms. You can modify the code and add more runs if you want more consistent results.

### How does it work

It basically scrolls a few hundred down and up 100 pixels, measuring the total time it takes to do that. I had to make a hack to get the thing to get triggered more often - I believe that it's because the browser is optimizing scroll events somehow - making sure the scroll event isn't triggered way too often. So I wrapped the thing that triggers the page to scroll in a timeout thing. It's probably not super super reliable, but at least I had pretty much consistent results.

### Finally

If you have any questions, suggestions, bug reports or whatever, feel free to let me know by commenting or pinging me on Twitter. I don't expect to be maintaining this much or putting any more effort in it, unless there's somebody else out there that will find this useful.
