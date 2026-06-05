---
title: 'MySQL Query Cache Resources'
summary: "To follow up on my post about Drupal's MySQL performance, I wanted to share some resources I found during that journey."
date: 2010-05-29
---

To follow up on [my post about Drupal's MySQL performance](/posts/2010-05-27/drupal-and-slow-mysql-queries/), I wanted to share some resources I found during that journey. First, the MySQL documentation has some resources on the subject, which are fairly vanilla type of resources.

- [General docs/specs about the query cache](https://dev.mysql.com/doc/refman/5.1/en/query-cache.html)
- [A very detailed explanation on how you can use and measure the query cache](https://dev.mysql.com/tech-resources/articles/mysql-query-cache.html)

There was a [commentator on the article](/posts/2010-05-27/drupal-and-slow-mysql-queries/#comment-53) that pointed me to his blog, which has an excellent resource on a kind of a "best defaults" configuration for MySQL. His argument is that MySQL's default configuration is made for old 32 MB boxes but most machines we run today have many GBs of memory, so the default configuration isn't very good. Highly recommended:

- Cafuego's [recommended defaults for MySQL settings](https://cafuego.net/2009/10/10/mysql-yoursql)

And of course, you can't talk about MySQL performance without referring to the [MySQL Performance Blog](https://www.mysqlperformanceblog.com/), which I read regularly and can also recommend.

- MySQL Performance Blog's [article about the Query Cache](https://www.mysqlperformanceblog.com/2006/07/27/mysql-query-cache/)
