---
title: 'Android deterrent'
summary: 'We’re in the middle of a huge revolution. We all know that. It’s been said a hundred times. Phones and tablets are taking over. People all over the world, especially in countries that are considered less wealthy, are adopting mobile platforms at a much greater rate than desktop computers. Meanwhile developers continue to be disproportionally excited about web development tools.'
date: 2014-01-07
---

_Disclaimer: This blog post is infuriatingly opinionated. You have been warned._ We’re in the middle of a huge revolution. We all know that. It’s been said a hundred times. Phones and tablets are taking over. People all over the world, especially in countries that are considered less wealthy, are adopting mobile platforms at a much greater rate than desktop computers. Meanwhile developers continue to be disproportionally excited about web development tools. There are countless technologies being invented every day, and interesting new platforms emerging such as [Node.js](https://nodejs.org/) & [NPM](https://npmjs.org/), [Grunt](https://gruntjs.com/), lots of front end frameworks for single page apps (SPAs) such as [Angular](https://angularjs.org/), [Facebook’s React](https://facebook.github.io/react/), [Backbone](https://backbonejs.org/) etc. This has been happening for a while, but the number of projects getting created around this space is immense. This excitement over the web, when the future of the internet is clearly mobile, baffles me.

### Good old web

The web is large, and literally has billions of people using it 4-18 hours a day, so it’s pretty reasonable that there’s innovation happening. But the growth of the mobile platform is so much faster, that it’s insane that it hasn’t taken off more by now. By mobile platforms, I of course mostly mean Android. ![](https://d262ilb51hltx0.cloudfront.net/max/800/1*2AjilRZtXqwtJnPytx4Q6g.jpeg) The state of Android development tools and libraries is a complete mess, so there’s an opportunity to make a huge difference and create something truly interesting, not just when it comes to building products, but also in building tools and libraries. The most prolific repository of code for Android is not on Github, but in the form of various stack overflow answers, with super questionable quality and references. A lot of the core components built into android are either way too complicated, missing in features, not very customizable or just useless. Examples include the ListView, ImageView, Button, etc. A lot of how you style things in Android is super unintuitive with not a lot of really clear information about best practices out there (statelists, 9-patches, default styles etc). All the source code for Android and its built in apps is out there, free for anybody to browse through and learn how to build apps. Unfortunately, reading through the source code of them makes you want to claw your eyes out. And if that’s what would be considered the creme de la creme of Android development, it really makes you stop worrying about [the singularity](https://en.wikipedia.org/wiki/Technological_singularity) ever becoming a possibility.

### Why?

The popularity of web development over mobile development, might come down to how easy it is to host a website and just clobber things together. The development tools are all in place, and Javascript is a language that’s pretty easy to get into. We’ve been doing it for years and there’s a body of content out there that’s so easy to tap into to learn anything. Compare that to Android, where you basically have to:

- Use the most horrible IDE of all times, Eclipse. (Though Android Studio is probably going to be a lot nicer of an experience, but to each their own)
- Get familiar with Java, a programming language that’s not as easy to learn and get into as Javascript, PHP, Ruby etc.
- Learn an over-engineered complicated mess which is the Android layout DSL and drawables.
- Deal with all the inconsistencies of the UI in different Android versions and the different APIs.
- Threading hard is. And with Android you definitely will have to do a lot of threading code to make something that feels good.
- And on top of that, just designing a good mobile app is hard. It takes skill to create something that works well and users understand, and even more skill to get the design implemented well.

So given all these facts, it serves my personal cognitive dissonance to be more excited about web development. Even though the mobile platform is the more interesting one, long term.

### What can be done?

A lot of all of what can be done rests in the hands of the Google Android team, and frankly I’m not really hopefully that the APIs will ever get any easier to use. The lifecycle of objects will continue to be hard to get right, I don’t see xml layouts or drawables going away any time soon, threading will continue to be hard to get right, so a lot of it is just inherently difficult. As a side note, I wish the Android team would be more inspired by what iOS has done to make the lifecycle of ViewControllers and its views easier to manage (ie. easier to get wrong, without disasters) Just complaining without proposing any solutions doesn’t get us anywhere, though, so here’s a few things that I think could be done, which are probably beyond my knowledge of build tools, Java and Android in general, but if somebody were to tackle, it would greatly help the ecosystem of Android.

- Somebody could, theoretically, build a new stand alone UI layer that didn’t use any of the built in libraries in Android. Yes, I know that sounds insane.
- A modern module system, similar to Ruby gems, NPM or Cocoa Pods (on iOS). A way to declare versioned dependencies that live outside of your git repository, where you’re able to include libraries easily that have lots of other dependencies. Maybe this is a pipe dream and simple cannot be done in Java, but it definitely would be nice. (ps. if you know of one, let me know)
- The prior point would allow for smaller modules and libraries. That do just one thing and do them well.
- We need a healthy developer ecosystem around building modules, libraries, UI objects to replace all the stuff that’s built into Android. Smaller modules that can be composed together more easily.
- We need way better, and more ambitious resources and learning material out there for how to build Android apps the right way.

### Opportunity

Despite all these downsides, there’s actually also a huge opportunity. The platform is huge, the amount of bad apps with large download numbers is staggering, and the lack of libraries out there should just tell developers that there’s an opportunity to build some really interesting stuff that will make the lives of countless developers much easier.
