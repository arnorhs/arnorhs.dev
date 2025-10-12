---
title: 'Awesome thoughts on how programmers should think about TIME'
summary: "I saw this article on Hacker News today. It's very similar to a blog post I was planning to write, but never did."
date: 2011-07-04
---

I saw [this article on Hacker News](https://news.ycombinator.com/item?id=2725015) today. It's very similar to a blog post I was planning to write, but never did. Now I don't have to:

> When measuring time, measure Unix time. Its UTC. Its easy to obtain. It doesnt have timezone offsets or daylight saving or leap seconds. When storing time, store Unix time. Its a single number.If you want to store a humanly-readable time e.g. logs, consider storing it along with Unix time, not instead of Unix time. When displaying time, always include the timezone offset. A time format without an offset is useless. The system clock is inaccurate.

This and more points like this in this article by Emil Mikulic: via [Time](https://unix4lyfe.org/time/).
