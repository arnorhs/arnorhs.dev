---
title: "My Take on css-tricks.com's Group Design Project"
summary: "I ran across this post yesterday, by css-tricks.com. They had a little UI design competition where they asked participants to design and develop a UI for editing and deleting items of a list. It's a cool idea for a competition and you can read the whole thing here: https://css-tricks.com/ui-pattern-ideas-list-with-functions/ I chimed in at the comments, but realized quickly that this should become a blog post by itself."
date: 2010-09-29
---

I ran across this post yesterday, by css-tricks.com. They had a little UI design competition where they asked participants to design and develop a UI for editing and deleting items of a list. It's a cool idea for a competition and you can read the whole thing here: [https://css-tricks.com/ui-pattern-ideas-list-with-functions/](https://css-tricks.com/ui-pattern-ideas-list-with-functions/) I chimed in at the comments, but realized quickly that this should become a blog post by itself.

### Touch screen device interaction on websites

Touch device applications use touch and hold to edit all the time, so that’s becoming a common and very useful way to edit things **on touch screens**. It’s especially helpful because you don’t have to give up any screen real estate for the interaction. Furthermore, clicking a special icon on touch screens is also annoying, since when you’re trying to scroll by dragging, pinching to zoom etc, the little menu would pop out (even though it disappears once the device realizes you weren’t clicking). However, just like right clicking has been around on computers (desktops) for a long time without ever becoming helpful on the web, in the same way a click+hold action will never be succinct on desktops. A commenter named _traq_ mentioned that Chrome uses click+hold on the back button for displaying the history. I would also say that's pretty poor behavior.

### The nature of the beast

I would say the behavior/UI you create should depend entirely on what kind of a “thing” you’re editing in the first place and what it’s purpose/weight is in the application. In most cases you should be able to edit the item both from the list and from the supposed page you access when you have clicked it. You should also be able to delete many items at a time, because when you have to delete 7 items and have to press and hold or click an icon and then probably confirm the action 7 times, it’s quite possible to go mad. (It also causes more stress on your servers). I think the edit mode is a great suggestion, but it does take up more space and it might also be weird in an environment where the list becomes very long and you have to find the edit mode button first. Also, should it be on the top or at the bottom?

### Further functionality

There’s also one aspect that some of the examples didn’t cover which is that as applications progress and you add more functionality, you will probably need more actions than edit and delete, so where will you put those? Anyways, great post. I'll be watching their RSS feed. I'll be doing my version of this list control (since I've done one a million times anyways) and posting it here. So please let me know in the comments if that makes you excited.
