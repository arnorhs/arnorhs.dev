---
title: 'Change vim tab size'
summary: "If you like vim you probably know this already, but if you don't, here's how you change vim's tab size from the default 8."
date: 2011-05-26
---

If you like vim you probably know this already, but if you don't, here's how you change vim's tab size from the default 8. There are actually two configuration options - one is for tab sizes of entered tabs and one is for indenting via indenting functions (such as >>, C-t etc) and autoindent: You can add this to your .vimrc:
`:set tabstop=4  :set sw=4`

If you're interested at all I keep a gist with my vim config options: \[gist id="993793" file="vimrc"\]
