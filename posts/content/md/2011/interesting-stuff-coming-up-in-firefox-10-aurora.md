---
title: "Interesting stuff coming up in Firefox 10 (Aurora)"
summary: "Yesterday, Mozilla announced the availability of Firefox 10 beta, named Aurora. The version introduces a bunch of new HTML5 features and some of them sound very interesting."
date: 2011-11-12
---

Yesterday, Mozilla [announced the availability of Firefox 10](https://hacks.mozilla.org/2011/11/announcing-firefox-aurora-10/) beta, named Aurora. The version introduces a bunch of new HTML5 features and some of them sound very interesting.

### HTML5 visibility API

Currently, there are no good ways for a website or web app to know when the window or tab is currently active AND **visible**. You could probably hack something together that would stipulate when any element on the page has focus or something simliar to that, but that could be very error prone. The [HTML5 visibility API](https://developer.mozilla.org/en/DOM/Using_the_Page_Visibility_API) allows your website to know if the browser window or tab is currently active. It provides both a function/property for retrieving the current state (there are three: visible, hidden, prerender) but it also introduces an event that gets triggered when that state changes. This is very handy as some of the examples on the [MDN website indicate](https://developer.mozilla.org/en/DOM/Using_the_Page_Visibility_API). Eg. when you want to check for updates in the background, but might not want to check unless the user is currently on the page. Another example would be when you are playing a video, the user might not want to have that video playing when not viewing the page. I have to admit I'm also a bit worried, if this feature will be used a lot, that websites will make too many assumptions around how you use them. For an example, I often listen to videos in the background while doing something else, but if there was built in functionality for stopping the video when I'm not watching, that would be horrible for me, personally. None the less, it's a very interesting feature.

### Battery status API

It's not linked in the feature list and not at all explained but they mention under the Javascript section that they implemented the Battery API. I can only guess but it might be the [Battery Status HTML5 API](https://www.w3.org/TR/battery-status/). Which adds events and an API for retrieving the battery status of the device that the website is being displayed on. That would allow your website to display a notification, or starting an auto-save or stopping compute-intensive processes. It's use is pretty limited for normal websites, but as we see more powerful applications being used and developed on mobile devices, this can be very useful for users and the developers. Native apps are, indeed, dying. Web apps ftw!

### IndexedDB improvements

[IndexedDB](https://developer.mozilla.org/en/IndexedDB) is a browser based storage which has been available since Firefox 5 and Chrome 12 (has not been implemented in any mobile browser yet). It is particularly well suited for storing large amounts of structured data (think SQL). The storage is persistant and is in that regards similar to Dom Storage (localStorage, sessionStorage etc) and could probably be used for a similar use case, however the API is a lot more complicated and is SQL based it works a lot like SQL based databases, but does not use SQL. You can see examples on [how to use IndexedDB](https://hacks.mozilla.org/2010/06/comparing-indexeddb-and-webdatabase/) on this Mozilla blog post. In Aurora the feature has been improved a lot with new functions for retrieving counts, being able to delete a database, improvements on accepting keys and key ranges in methods, etc. It seems like it's becoming a really viable option for production environments.

### Other interesting tweaks and features

*   Firefox will from now on not allow the same website to open more than one popup window.
*   Further improvements to WebWorkers
*   Rendering improvements to WebGL
*   And lots of bug fixes and minor improvements

Be sure to check out the [release announcement](https://hacks.mozilla.org/2011/11/announcing-firefox-aurora-10/) for a full list of additions and/or [download the Aurora beta](https://www.mozilla.org/en-US/firefox/channel/) from the Firefox release channel. I'll hopefully be playing with some of these features in the near future, if I have the time.