---
title: "Great tip on finding transaction bottlenecks in MySQL"
summary: "On the MySQL performance blog there was a great article posted two days ago on how to debug long-running transactions in MySQL. Long-running transactions are transactions that are left open and not committing or reverting. Maybe because of a failed/halting application or just an application that is taking long to process."
date: 2011-03-10
---

On the MySQL performance blog there was a great article posted two days ago on how to debug long-running transactions in MySQL. Long-running transactions are transactions that are left open and not committing or reverting. Maybe because of a failed/halting application or just an application that is taking long to process. The article goes into details about the problem and they also share a little bash script you can use to capture these long running transactions. You should check the article out if you're into databases: [https://www.mysqlperformanceblog.com/2011/03/08/how-to-debug-long-running-transactions-in-mysql/](https://www.mysqlperformanceblog.com/2011/03/08/how-to-debug-long-running-transactions-in-mysql/)