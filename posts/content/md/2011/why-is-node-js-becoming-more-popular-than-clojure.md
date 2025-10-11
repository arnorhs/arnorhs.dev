---
title: "Why is Node.js becoming more popular than Clojure?"
summary: "I did a post recently about the popularity of Node.js over Clojure. I didn't want to go into \\*why\\* Node is getting much more traction than Clojure, since I didn't want to start a language war in that post. However, I have my opinion on the topic, so here's why I think Node.js is becoming much more popular."
date: 2011-03-02
---

I did a post recently about [the popularity of Node.js over Clojure](https://arnorhs.dev/2011/02/28/node-js-surpasses-clojure-in-popularity/). I didn't want to go into \*why\* Node is getting much more traction than Clojure, since I didn't want to start a language war in that post. However, I have my opinion on the topic, so here's why I think Node.js is becoming much more popular.

### Clojure vs Node.js

To start with, I'm completely biased towards [Clojure](https://clojure.org/). I like lisps in general and I would really like Clojure to become more popular. That being said, I'm not very surprised that [Node.js](https://nodejs.org/) is getting more popular. I think the reasons are (in order of importance):

1.  There's a **big** difference in the ease of install.
2.  There are a lot of Javascript developers out there that recognize a big benefit in using a single language for the front and back end.
3.  Lisps in general are not understood very well, so that might be off-putting to some.

### Clojure's complexity and dependencies

I tried hard to get into Clojure programming a few months ago. I managed to make a simple app, but it took **hours!**. Why? You mean besides my extremely low IQ and attention disabilities? Because of **complexities and dependencies**. Most of Clojure environment has the assumption that you're used to working with Java applications. For me  (and probably others) that's not the case. On top of that there are a lot of dependencies that you might never have used before and the "stack" seems to be much larger than node's stack. This is best demonstrated by example:

#### A typical Clojure install:

_Oh, so you want to try Clojure? No problem, it's easy! Just install [java](https://www.java.com/en/), install [maven](https://maven.apache.org/), install [ant](https://ant.apache.org/), install [git](https://git-scm.com/), install Clojure, install [clojure contrib](https://code.google.com/p/clojure-contrib/) and you're done. Almost... If you're not a java expert, you're probably going to want to use [Leiningen](https://github.com/technomancy/leiningen). Everybody does. And if you \*really\* want to do something in Clojure you should also use Emacs, install [swank](https://github.com/jochu/swank-clojure), install [slime](https://common-lisp.net/project/slime/), install [clojure mode](https://www.emacswiki.org/emacs/clojure-mode.el)..._

#### Compare that with the node.js install

_Oh, you want to try Node.js? Install node.js, install [npm](https://npmjs.org/). Have some coffee._ Clojure people might tell you that that's simply not true and you "can" get by without most of those things. Well, you \*might\* be able to get away with not using Emacs/swank/slime, but eventually you'll run into problems if you want to skip any of the other dependencies. Of course, this only applies to the install procedure and past that you're basically on green grounds.

### The future

I can only see the popularity of Node.js increasing over the next months and years. There's a lot of hype surrounding it and a lot of talented people are hard at work creating various helpful libraries. Even though I am really interested in using Clojure more, it's very easy to get drawn into the node.js world.