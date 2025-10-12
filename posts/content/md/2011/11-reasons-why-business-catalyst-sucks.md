---
title: '11 Reasons Why Business Catalyst Sucks'
summary: "I've recently been working for a colleague and a client on implementing a website and ecommerce site in Business Catalyst. Business Catalyst is a web publishing platform originally developed by a couple of Australians in 2004, but was acquired by Adobe Systems in 2009. It promises to be an all-in-one solutions for business websites (there's your red flag right there) with tight integration of it's online store, tracking and analytics. But there's just one problem with it. It sucks."
date: 2011-01-19
---

_Ok, I know this title sounds like total link bait, but bare with me. I don't believe there's any better way to present my feelings and experiences with this system. Of course you should know, like [Stjáni Gunnars](https://www.stjanigunnars.com/) pointed out to me, that this is written from a developer's perspective. When you're a business, this might be a different story._ I've recently been working for a colleague and a client on implementing a website and ecommerce site in [Business Catalyst](https://en.wikipedia.org/wiki/Business_Catalyst). [![](https://arnorhs.dev/wp-content/uploads/2011/01/business-catalyst-front-page.png 'business-catalyst-front-page')](https://businesscatalyst.com/) Business Catalyst is a web publishing platform originally developed by a couple of Australians in 2004, but was acquired by Adobe Systems in 2009. It promises to be an all-in-one solutions for business websites (there's your red flag right there) with tight integration with it's online store, tracking and analytics. **But there's just one problem with it.** It sucks.

### Why Business Catalyst sucks

1.  **Modern design meets software from the '90s** - It actually looks pretty nice, but the interface is pretty horrible and it reminds you of what using web software felt like in the early '00s and the structure of the software feels like it's from the '90s
2.  **It uses tables extensively** for the front end content and you can't customize them away. Eg. the product list and product view get wrapped in tables and there's no way to customize them away. Also, you will not have any way of referencing one table and not the other with CSS since the same table classes wrap a product lits and a single product.
3.  **The admin UI sucks.** It looks nice on the surface and at first glance you get a positive vibe, but as soon as you try to do anything, you need to click at least 4 times to access everything and there are inconsistencies and confusion everywhere.
4.  **The admin interface uses frames**. Need I say more?
5.  **The templating language isn't a language.** It only uses tags, so you are unable to create any conditional statements. All the logic you'll ever want to do in templates will have to be done using Javascript, which is the primary reason you'll find many examples of JS/CSS hacks when you google around for problems.
6.  **Pricing.** We're already in number six and I haven't mentioned the price. Well, all I can say is that it's not cheap.
7.  **Rudimentary API.** Their ecommerce API has 6 function calls and they're all related to product/catalog information.
8.  **Lack of flexibility.** The built in Contact form application forces you to require a title, name & last name. On the positive side you can create many kinds of forms, however they all have this limitation.
9.  **Only a basic WYSIWYG editor.** BC obviously doesn't have a lot of SEO or semantic web oriented userbase since the WYSIWYG editor isn't very paragraph-oriented - you'll need to add them manually.
10. **Closed platform.** Since it's a closed platform you won't have any developers working on cool plugins or anything value adding beyond what Adobe can deliver. Compared to open source solutions like wordpress, drupal, plone, etc it looks pretty late to the game. This also means that there isn't a plethora of blogs out there covering "how to do X in BC", so you'll have to make do with their online forum or the support channels.
11. **Template editing is achieved through the WYSIWYG editor.**
12. **Bonus point:** Lack of ready-made custom themes out there. This is mostly attributed to the small user base and I'd say it's a typical problem compared to the small number of users.

### Localized issues

And then there's the Icelandic localization issues:

1.  **Fixed pricing format.** The price format is a fixed format like this: **Kr15.388,00** - the decimals are correctly formatted (ie. they have the right symbols) but it doesn't have a space between the currency and the price. Also, Icelandic prices never have the decimal points and some people like to disambiguate the price from other types of Kroner and use "ISK" instead of Kr or even skip the currency symbol all together. Not possible.
2.  **The WYSIWYG editor changes Icelandic characters to their HTML entities**, so it might affect some search engines and other website parsers/crawlers.

If those issues are not of concern to you, you shouldn't worry about it and you can go ahead and have fun. But if you care about your website and your business, I don't believe you should be using Business Catalyst.

### What do other people think?

Other people have covered and reviewed BC to some extent, so if you'd like more diverse opinions you can read Linton Web Blog's Review of Business Catalyst [here](https://www.lyntonweb.com/blog/bid/34352/Business-Catalyst-CMS-Review).

### What do you think?

If you have any experience using and implementing Business Catalyst I would love to hear from you in the comments. Please chime in.
