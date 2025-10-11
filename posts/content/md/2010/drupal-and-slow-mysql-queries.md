---
title: "Surprising mysql queries in Drupal"
summary: "Warning: This blog post is unusually technical for most of the posts here. The hosting provider I work for in Iceland has been having some problems with one of the servers. Turns out the problems are caused by a single website running Drupal and it has a lot of traffic."
date: 2010-05-27
---

Warning: This blog post is unusually technical for most of the posts here.

### Slow mysql query in Drupal

The hosting provider I work for in Iceland has been having some problems with one of the servers. Turns out the problems are caused by a single website running [Drupal](https://drupal.org/) and it has a lot of traffic. Currently, most websites do not have any issues even though they have quite a bit of traffic, so I wanted to analyze things. My coworker set up something called [mysql slow query log](https://dev.mysql.com/doc/refman/5.0/en/slow-query-log.html). It's basically logs all sql queries that take a long time to parse. What I found was pretty interesting. The recurring theme of the log file was this query:

    SELECT DISTINCT n.nid, n.uid, n.title, n.type, e.event_start, e.event_start AS event_start_orig, e.event_end, e.event_end AS event_end_orig, e.timezone, e.has_time, e.has_end_date, tz.offset AS offset, tz.offset_dst AS offset_dst, tz.dst_region, tz.is_dst, e.event_start - INTERVAL IF(tz.is_dst, tz.offset_dst, tz.offset) HOUR_SECOND AS event_start_utc, e.event_end - INTERVAL IF(tz.is_dst, tz.offset_dst, tz.offset) HOUR_SECOND AS event_end_utc, e.event_start - INTERVAL IF(tz.is_dst, tz.offset_dst, tz.offset) HOUR_SECOND + INTERVAL 0 SECOND AS event_start_user, e.event_end - INTERVAL IF(tz.is_dst, tz.offset_dst, tz.offset) HOUR_SECOND + INTERVAL 0 SECOND AS event_end_user, e.event_start - INTERVAL IF(tz.is_dst, tz.offset_dst, tz.offset) HOUR_SECOND + INTERVAL 0 SECOND AS event_start_site, e.event_end - INTERVAL IF(tz.is_dst, tz.offset_dst, tz.offset) HOUR_SECOND + INTERVAL 0 SECOND AS event_end_site, tz.name as timezone_name FROM node n
    
    INNER JOIN event e ON n.nid = e.nid
    
    INNER JOIN event_timezones tz ON tz.timezone = e.timezone
    
    INNER JOIN node_access na ON na.nid = n.nid
    
    LEFT JOIN domain_access da ON n.nid = da.nid
    
    LEFT JOIN node i18n ON n.tnid > 0 AND n.tnid = i18n.tnid AND i18n.language = 'en'
    
    WHERE (na.grant_view >= 1 AND ((na.gid = 0 AND na.realm = 'all'))) AND ((da.realm = "domain_id" AND da.gid = 4) OR (da.realm = "domain_site" AND da.gid = 0)) AND (n.language ='en' OR n.language ='' OR n.language IS NULL OR n.language = 'is' AND i18n.nid IS NULL) AND (  n.status = 1 AND ((e.event_start >= '2010-01-31 00:00:00' AND e.event_start <= '2010-03-01 23:59:59') OR (e.event_end >= '2010-01-31 00:00:00' AND e.event_end <= '2010-03-01 23:59:59') OR (e.event_start <= '2010-01-31 00:00:00' AND e.event_end >= '2010-03-01 23:59:59')) )
    
    GROUP BY n.nid HAVING (event_start >= '2010-02-01 00:00:00' AND event_start <= '2010-02-28 23:59:59') OR (event_end >= '2010-02-01 00:00:00' AND event_end <= '2010-02-28 23:59:59') OR (event_start <= '2010-02-01 00:00:00' AND event_end >= '2010-02-28 23:59:59')
    
    ORDER BY event_start ASC;

**That's one hell of a query.** It's from the built-in events system of Drupal which has a few plugins, such as internationalization and so fourth. The query usually took around **5-6 seconds to compute**. You have to realize that we're running a Dell PowerEdge machine with lots of processing power and memory. I ran the [mysql explain command](https://dev.mysql.com/doc/refman/5.0/en/using-explain.html) on that query to find out what's going on and this is what I found:

id

select\_type

table

type

possible\_keys

key

key\_len

ref

rows

Extra

1

SIMPLE

da

index

PRIMARY,nid

PRIMARY

775

_NULL_

2146

Using where; Using index; Using temporary; Using f...

1

SIMPLE

n

eq\_ref

PRIMARY, node\_status\_type

PRIMARY

4

dbname.da.nid

1

Using where

1

SIMPLE

i18n

ref

tnid

tnid

4

dbname.n.tnid

240

Using where

1

SIMPLE

na

eq\_ref

PRIMARY

PRIMARY

775

dbname.n.nid,const,const

1

Using where

1

SIMPLE

e

eq\_ref

PRIMARY, event\_start, event\_end, timezone

PRIMARY

4

dbname.na.nid

1

Using where

1

SIMPLE

tz

eq\_ref

PRIMARY

PRIMARY

4

dbname.e.timezone

1

My "EXPLAIN"-understanding is limited, but there is a thumb rule that I heard once that you can multiply the number in the "rows"-column together to find out how many rows are actually being read, so 2146 \* 240 = 515,040 rows. That would certainly explain the slowness, up to a point. Another hint of something being slow is that the query is not using an index for the i18n table (internationalization plugin), which means it's querying 240 rows all the time without a key.

### Number of queries in Drupal

This is clearly a problem with the i18n plugin, so you can't really blame Drupal for this. However, when I googled stuff like "drupal slow" or "drupal mysql queries", I found this [rediculous quote in the Drupal forums](https://groups.drupal.org/node/34822):

> 160 \[mysql queries per request\] doesn't sound like very many to me. But there may be a few really bad ones. I would enable the devel module and see if there are any queries taking much longer than the others. Also the total time spent on queries is also an important stat.

Written by "[dalin](https://groups.drupal.org/user/1049)" This person is probably not one of the core devs of Drupal but this is certainly a hint at what kind of standards are set by Drupal in regards to performance.

### Increasing performance

There's a lot of information out there regarding [Drupal performance](https://drupal.org/node/627252), especially in their documentations, so if you're running some sort of Drupal site they are definitely worth taking a look at. Drupal has a [caching module](https://drupal.org/node/326504) that is not enabled by default. It has two modes, basic caching and advanced caching, which is not available in this instance because of modules that don't support it (namely the i18n module, as well as others), so I enabled basic caching. I also increased our server's mysql query cache size to 256 MB, which isn't actually so much, but helped a lot. Clearly, if this site's user base is to grow any more, some more adjustments need to be done on the website, it's not in a sustainable mode.

### Number of MySQL queries

There aren't any international standards or best practices for the number of queries per request on a website, so there's not really anything I can complain about. However, 160 queries sounds like an awfully high number to me. I try not to use more than around 10-20, maybe 30 queries per request and I stay away from large joins like Drupal seems to use. Sometimes you need to sacrifice [normalization](https://en.wikipedia.org/wiki/First_normal_form) for performance. Any thoughts?