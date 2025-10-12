---
title: 'Check out my weekend project: FridgeList todo list'
summary: "I've been spending most of this weekend knees deep in HTML5, localStorage, CSS3 for a hobby weekend project of mine: FridgeList The original intention was to create a HTML5 web app using the Facebook Graph API, since I've been pretty excited about that. But then I got this idea for a super simple task list and I guess the Facebook Graph project will have to wait...."
date: 2010-04-25
---

I've been spending most of this weekend knees deep in HTML5, localStorage, CSS3 for a hobby weekend project of mine: [FridgeList](https://lvl-1.net/fridgelist/) The original intention was to create a HTML5 web app using the Facebook Graph API, since I've been pretty excited about that. But then I got this idea for a super simple task list and I guess the Facebook Graph project will have to wait. HTML5 introduces some new elements that provide semantic structure into the HTML code. If you view the source you can see that I'm using strange tags like <header>, <section>, <nav> etc... There are some problems with using these tags in browsers that have yet to support HTML5, so I used a plugin called [Modernizr](https://www.modernizr.com/) that allows other browser to gracefully handle the weird stuff. So far, the cutting edge technologies I'm using in this app are:

- **HTML5** - using semantic structure tags
- **CSS3** for gradients, rounded corners, box shadow, text shadow
- **localStorage** - all the data in the app that you edit get's saved locally in your browser. So you can close your browser and come back to it and all your data is still there.
- **@font-face -** I've been meaning to try this out. The fonts get rendered completely different in Firefox vs Chrome. That was a bit of a surprise. They also handle bold differently and some of the variations of the font look horrible. But other than that I'm pretty happy to be able to use what ever font I'd like :P

**Mobile use and offline** I have plans for the app to support offline mode. That would mean if you're up on the mountains with your iPhone, you can still view your tasks, edit them and save them etc. Before you can do that I have to enable offline mode, which I just need to debug a little bit.

### IE and the limitations of web development

I haven't looked at the site in IE, and I expect the site not to work, and that was kind of the point. When you're developing websites for normal clients, the expectancy is that everything looks the same and feels the same no matter which browser you're using, so often we as designers/developers get limited in the technology choices we can allow ourselves to use. But not this time around :)

### Great resources

Of course I'm borrowing 99% of the stuff behind the app from somewhere else. I'd like to give credit where credit's due and point out some of the great resources I used.

1.  **@font-face** Nice tutorial on what you need to get @font-face up and running: [https://www.miltonbayer.com/font-face/](https://www.miltonbayer.com/font-face/) Some nice free fonts with prebuilt packages: [https://www.fontsquirrel.com/](https://www.fontsquirrel.com/) - The great thing about this is that some of the fonts provide a @font-face ready packages that you can just download and start using.
2.  **HTML5** Enabler: [https://www.modernizr.com/](https://www.modernizr.com/) - allows html5 elements to render correctly on unsupported browsers
3.  **CSS3**: Cross browser gradient: [https://www.webdesignerwall.com/tutorials/cross-browser-css-gradient/](https://www.webdesignerwall.com/tutorials/cross-browser-css-gradient/) CSS gradient generator: [https://gradients.glrzad.com/](https://gradients.glrzad.com/)
4.  **localStorage**: Remy Sharp's (@rem) awesome tutorial on localStorage: [https://24ways.org/2009/breaking-out-the-edges-of-the-browser](https://24ways.org/2009/breaking-out-the-edges-of-the-browser)

### The results

I'm pretty happy with the results. I will continue to edit and improve the app and you should feel free to use it. Eventually I will have server side saving of data as well, since you might want to sync your data across multiple browsers and what not. I'm thinking of using Facebook login for this purpose. It's a whole new ballgame with local storage. Everything feels super fast and easy. I'm getting pretty excited about the future and I hope you are as well. Tell me what you think in the comments.
