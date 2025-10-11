---
title: "Diving into Facebook's Timeline UI"
summary: "A couple of months ago, Facebook started rolling out it's Timeline feature. For those who don't know, it's a new form of a Facebook profile, which displays a user's profile in a very different way, based on their entire life's history. It's a very dramatic thing and is a very impressive endeavor. I signed up the very minute it was announced and have had it as my default profile, though it hasn't been viewable by anybody but me for some time, it's dust has now settled a bit and I've been trying to digest it and form an opinion. The Timeline is so interesting in so many ways. In one regard it's got a very inconsistent UI compared to the rest of Facebook and it introduces a lot of UI concepts and ideas that have not been known to websites in general before but on the other hand it's also a very pretty beast. Read on if you're interested in diving (probably way too) deep into the Timeline"
date: 2011-12-03
---

A couple of months ago, Facebook started rolling out its [Timeline](https://www.facebook.com/about/timeline) feature. For those who don't know, it's a new form of a Facebook profile, which displays a user's profile in a very different way, based on their _entire life's history_. It's a very dramatic thing and is a very impressive endeavor. I signed up the very minute it was announced and have had it as my default profile, though it hasn't been viewable by anybody but me for some time, it's dust has now settled a bit and I've been trying to digest it and form an opinion. ![](https://f.cl.ly/items/1i0Z2T1I162r2L2m2N1j/Screen%20shot%202011-12-03%20at%2012.53.11%20AM.png "timeline headline") The Timeline is so interesting in so many ways. In one regard it's got a very inconsistent UI compared to the rest of Facebook and it introduces a lot of UI concepts and ideas that have not been known to websites in general before but on the other hand it's also a very pretty beast. So I find it very interesting to think about and digest and both imagine what the developers were thinking and also think about if this is something that will be important in the future.

### Evaluating the Facbeook Timeline UI

I just read [this review / fan post](https://baymard.com/blog/facebook-timeline-design) about Facebook's timeline. I usually like the author's blog, but the article provides a pretty shallow view point on what the nice things are about the UI but doesn't dive very deep into it or ask some important questions. First off, I agree that the UI looks nice, and it's definitely one of the more pretty parts of Facebook. It's also very "Ballsy". It's a great example of the big risks Facebook is willing to take with its UI and compared to many other products out there, they've been very willing to do big changes, despite a large user base. However, in my opinion, the UI also has its shortcomings. (Which I might very well be wrong about) When you want to break something like the Timeline down and try to assess whether its good or bad, you have to first ask yourself the fundamental question: what makes this UI good or bad? And to find that out, you first have to ask yourself: what is the purpose of the Timeline? And what the user's intent is when visiting somebody's Timeline.

### The _intent_ of the user

The intents / incentives I can think of a user has when he visits someone's Timeline (in no particular order), could be something like: **The user wants to...**

*   See what their friend has been up to  lately.
*   Find a post again that they recently posted, but the user doesn't have in their feed anymore.
*   Interact with the user - either send them a message or write on their wall.
*   View their photos. Either see photos of them or recent photos to see what they've been up to (or more likely: find a picture of yourself that they posted)
*   Find a friend that they've added that you also want to add.
*   A user visits his own timeline to find something that they posted, either to delete it, view comments (if out of notifications etc).
*   The user doesn't know the person, but wants to view their profile and maybe see what they're like, what they've been up to, even though he doesn't want to become friends with him/her.
*   Find their phone number / email etc.

There are probably more intents that I haven't listed or couldn't remember, but those might cover 90% of the use cases.

### Does the timeline solve those scenarios?

I think for the most part it does. It's very easy to see what the user has been doing and posting lately. It's easy to write on their wall, there's a familiar textarea at the top-left of the timeline. Also, finding their friends is pretty easy: There's a large box for that on the right side, and another similar photo-button on the timeline header. The timeline uses these photo-style buttons to navigate to friends, photos, likes etc. (its probably a bit different depending on the user) - however I'm not so sure that they solve the navigation so easily.

### Photo based navigation elements in the header

Finding a user's photos is not as simple as you might think. Take my timeline header-buttons as an example: ![](https://f.cl.ly/items/3b261o2G0B092b0s1k3v/Screen%20shot%202011-12-03%20at%2012.06.00%20AM.png "screenshot of my timeline header navigation elements") The photos are much larger than the captions and when you skim over, they don't exactly represent what you might be looking for. I think the main problem lies in the inconsistency in navigation from regular Facebook profiles, where photos, friends etc are usually placed as text links on the left side of the page: ![](https://f.cl.ly/items/3n0C010W0z0i320Z2a0r/Screen%20shot%202011-12-03%20at%2012.07.38%20AM.png "normal facebook profile navigation elements") Those links also have icons that we've come to get used to and associate with the given task. But in the timeline, those icons are not there. There is no visual difference between photo, friends etc. So you actually have to read the labels. Especially since the thumbnail that's shown is always different depending on what you last did etc. So the mental model breaks down a bit for plain navigation. That's not to say that a user gets completely lost, it's just that it's a bit less intuitive than you might imagine. It makes Facebook's user interface a bit inconsistent and requires the user to learn two different methods of accessing the same information.

### Finding a user's phone number, email, etc.

We have a similar problem for finding user information, such as email or a mobile phone (if somebody lists those) We are used to seeing the "info" link on the left side navigation on people's profiles. But on the timeline, it shows up on the bottom left of the header, and it has also been renamed into "about" and when clicked, it now displays an alternative view of the about page you'll usually see on Facebook. ![](https://f.cl.ly/items/3M3F0E2H2Q0N422f2V2X/Screen%20shot%202011-12-03%20at%2012.13.37%20AM.png "facebook timeline about button") That's another example of an inconsistant UI where the user actually has to learn two methods of finding the same information.

### Friends

Almost every single thing on the Timeline works and looks differently than it does normally on Facebook. If you view somebody's friends list, you don't get the usual plain list, but you get a multi-columned view of them. It sure looks nice and you see large photos of them and visually it is more fun to browse. However, I'm not so sure a multi-column layout is good when viewing somebody's friends, because when you're skimming through them (they are in alphabetical order) and you want to find  a specific one, you need to move your eyes constantly in a z pattern to go through them. It's not immensely hard, especially since you have the search box, but for an ordered list like that, it makes less sense than a flat list.

### Why the inconsistent UI?

I'm beginning to have the hunch that Facebook is changing its entire UI to something more akin to the Timeline UI elements. The news feed itself probably won't have a timeline view, but the way you browse friends, view a user's photos etc. is probably all going to change soon. I doubt that all the brilliant people working at Facebook aren't aware of the inconsistent UI problems, so It's probably a part of a unified move to a larger nicer UI.

### Photos in the Timeline

The photos get arranged in the Timeline in a very visual and interesting way. Here's a summary of an album I recently updated, as an example: ![](https://f.cl.ly/items/1W1v202j3Y1O0k3Q3U2m/Screen%20shot%202011-12-03%20at%2012.50.40%20AM.png "some photos i uploaded displayed on the timeline")

### The really puzzling bit

Now what I find the most puzzling about the UI (and I might very well be the only one) is that the use case that the Timeline is mostly optimized for, is seeing somebody's life summarized on a single page. I think from an artistic, philosophical perspective it's very interesting. It's also enjoyable to scroll through people's Timelines, and I'm sure if we had 20 year old profiles, it would be even more fun. But its strange to optimize the most important representation of a person on Facebook for that use case. But that also means you are creating that use case. With that I mean, it is something people didn't use Facebook for before, but could now be something you might actually go and seek out. Personally I think the Timeline would serve its purpose much better as not a user's main profile, but a user's "life". It's something you don't go and do very often so I feel that it's strange to just push the user into that scenario. I've rarely found myself scrolling very far down.

### The societal hurdle of scrolling down in somebody's Timeline.

There's another thing that keeps me thinking. When I make friends on Facebook with users that have the Timeline enabled, the first thing I find myself doing is scrolling a bit down and checking their Timeline out. But it also awakes a strange feeling within me, which is that I almost feel like I'm nosing in people's personal stuff. Almost like looking in somebody's bag or looking through their personal photo album without consent. When it's somebody I know very well, I don't mind at all. And personally I don't mind the thought that my friends might be scrolling through my Timeline a few years back. But I feel guilty about doing that in Timelines of people that I don't know. That is a really surprising facade of a website which I'm not very used to.

### Conclusion (if there is one)

Like I mentioned before, I am very impressed with the Timeline. It does a lot of interesting things and it will be interesting to watch what Facebook does with it in the coming months / years. There are some UI issues in terms of consistency which I suspect they'll address as well very soon and there are some puzzling things, especially the fact that they've optimized the Timeline for a totally different use case than the one that you might expect a new profile to be optimized for. This has been a bit of a long post, and I'm probably diving way too deep into this, but I hope it has been somewhat interesting.