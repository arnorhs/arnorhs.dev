---
title: 'Online Magazine Launched: Nordic Innovation'
summary: "I've been working together with the great people at the startup hub Klak (See https://klak.is/) to launch a new magazine called Nordic Innovation. It's an online magazine focused on startups, innovation and design in the Nordic countries. The first issue has some amazing interviews with out-of-the-box people. I encourage you to give it a read."
date: 2011-02-17
---

I've been working together with the great people at the startup hub **Klak** (See [https://klak.is/](https://klak.is/)) to launch a new magazine called [Nordic Innovation](https://www.nordicinnovation.is/). It's an online magazine focused on startups, innovation and design in the Nordic countries. The first issue has some amazing interviews with out-of-the-box people. I encourage you to [give it a read](https://www.nordicinnovation.is/). [![screenshot of the nordic innovation website](/wp-content/uploads/2011/02/screenshot-300x252.jpg 'screenshot of the nordic innovation website')](https://www.nordicinnovation.is) I liked the interviews with Paul Bennet, Creative designer at IDEO and Roberto Verganti, Professor at Politecnico Di Milano. But the magazine has some really interesting content.

### From a technical perspective...

_(Since this is a web development blog)_ **The magazine's format** There was a decent pressure to keep it in a magazine-like format and even though almost everybody knows [how much I hate flash](/posts/2010-02-27/why-flash-based-websites-are-usually-a-bad-idea/), we still went away and created a flash based version using software called [yudu](https://yudu.com/). It's free and it works nice. We also published a downloadable PDF and a "web version", which is basically just a html page with a JPG of all the pages. None of these solutions are very web-friendly or crawlable so that's a big problem in my book. **Treesaver.js** In the next version I hope to implement the magazine using [treesaver.js](https://treesaverjs.com/). It's relatively new beta-level software that allows you to create online magazines that plays well with the web. So if you compare it to the normal flash-based magazine viewers out there, treesaver.js wins hands down:

- It's all 100% HTML5 - so it's very search engine friendly and doesn't break the browser
- It still looks good (and better than 99% of the flash-based magazine viewers out there)
- You can link to the pages, copy text etc, because it's just a web page, essentially.
- It works perfectly on a mobile phone (well almost perfectly)

**The website itself** The website is a very simple HTML page, since there's basically nothing there yet, but I made it so that it will resize very nicely in a mobile browser. I didn't use any @media queries, I just did some width adjustments to make it work nicely. I'm pretty fond of that. Tell me what you think of the magazine, the website or anything in the comments.
