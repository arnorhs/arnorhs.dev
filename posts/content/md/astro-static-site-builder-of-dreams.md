---
title: Astro - static site builder of my dreams
summary: "
  Recently, a new static site builder arrived on the block called Astro.
  Lets talk a bit about static site builders. What they're good for, what they're not
  and why I think Astro is a bit of a game changer."

date: 2021-10-29
---

So for the past few years I've been obsessed with static site builders. [At work](https://juni.is) we've been
building a lot of static sites for clients, mostly using [Gatsby.js](https://www.gatsbyjs.com/).
Static sites are great for a lot of things. There are also, as with all things, some drawbacks.

**Pros:**

- Ease of deployment - only requirement is that the host can serve web assets
- Security - less surface area for attacks, since the only software running to serve
  a website is the HTTP server.
- Speed - there is no database that needs to respond, there's no server-side application
  logic that needs to make any decisions. User just needs to download the HTML and assets

**Cons:**

- No server rendered dynamic content
- Content changes usually require a CI build - meaning things like previewing content changes
  can be a challenge
- Harder to implement / plan / think about

## Astro

Before [Astro](https://astro.build) arrived, I had actually thought a lot about building my
own static site builder. I wanted one that could just run simple queries
with very simple setup, use something like a simple file based router, along with just
javascript to fetch content for each page and render through some html renderer.

The not-so-nice part of that approach is that if you needed a React/Svelte/Solid
component for anything, that part would have to be manually implemented - and you have
the potential of having some of your site component based and some if it in some other way.

So Astro's approach is pretty much the same as I had dreamed of, except that it also supports
fully static renders of components and automatically hydrates them for you. Also in general
the whole thing is thought out much more than I ever would have with some clobbed together
stuff.

On top of that it has a lot of really nice features, including its own component system which
just renders out html with no javascript.

## "Framework agnostic"

So I re-implemented this website using Astro, and in theory could have gone with no javascript
at all, but I also added a Solid.js based graphical element, just to figure out how well
integrated the concept was.

So that part is actually super powerful. Not only does it server render your component, but it
also allows you to pass props into it, as if it was all part of the same component system. So
this is probably the first fully "framework agnostic" tool I've seen that works so well and
fully from server to code.

I believe they are also planning an SSR-based approach, so you could have your cake and also
eat it.

All in all, I'm super excited to see where this thing goes.

I think you should give it a try: [astro.build](https://astro.build)

If you are curious how I built the site, you can take a look at the github repo:
[arnorhs/arnorhs.dev][https://github.com/arnorhs/arnorhs.dev]

PS. I actually contemplated naming this post "arnorhs.dev launches (again)", which would be an
apt name. Because since last time I posted, I actually rewrote this thing in "Astro".
