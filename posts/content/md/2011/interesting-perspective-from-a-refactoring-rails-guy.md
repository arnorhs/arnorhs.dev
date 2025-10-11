---
title: "Interesting perspective from a refactoring rails guy"
summary: "I ran into this post on HN today. It's from a guy who often gets brought in to help teams refactor old ruby on rails code. My experience with rails has been that it's pretty good at abstracting most of the crap away from your code base and gives you a nice clean structure for your code, but his argument seems to be that as soon as you start doing some spaghetti stuff, you get into trouble."
date: 2011-08-23
---

I ran into this post on HN today. It's from a guy who often gets brought in to help teams refactor old ruby on rails code. My experience with rails has been that it's pretty good at abstracting most of the crap away from your code base and gives you a nice clean structure for your code, but his argument seems to be that as soon as you start doing some spaghetti stuff, you get into trouble. Probably not exactly Rails' fault. It's interesting to read, if you find that kind of stuff interesting :)

> In the days before I got paid to write Ruby, I worked on some legacy codebases that had histories spanning multiple decades and 100s of KLOCs. That’s a lot of opportunity for bad code to accumulate; and in some cases, the accumulations were impressive. But here’s the dirty little secret of Rails development: the messiest, nastiest big-ball-of-mud code I have seen in my entire career has been in Ruby on Rails projects. I’ve seen Rails projects that accumulated enough technical debt and waste in two years to make 10 year-old C/C++ programs look clean and elegant by comparison. And it wasn’t just one project. I’ve seen it over and over.

via [Your Code is My Hell](https://avdi.org/devblog/2011/08/22/your-code-is-my-hell/)