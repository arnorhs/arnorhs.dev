---
title: Heartbreak - Why gatsby.js failed
summary: "
Back in 2017 the world of traditional websites was still dominated by monolithic traditional
CMSes - The likes of WordPress, Drupal, Umbraco, WooCommerce, etc - This is the story of how
gatsby.js became the love of my life and ultimately how it ended breaking my heart.
"
date: 2023-02-01

---

Disclaimer: I wrote this blog post 3 days ago and no idea that Gatsby was getting acquired by Netlify back then. I think that's terriffic news and great for them and for Netlify.

The Valhalla content hub that they recently introduced as well as the Gatsby Cloud part of Gatsby is a great match for Netlify and I'm sure those things will get integrated deeply into Netlify. I'm super excited about that, esp. since I'm an avid Netlify fanboy.

However, there are some ranty bits in here, but they are mostly focused on the framework side of things. I don't want this post to take away from the fact that I'm super happy for the Gatsby team.

Now, for the original post...

This is the story of how gatsby.js placed itself firmly in my heart and ultimately how it ended up shattering it.

### Small bit of CMS history

Back in 2017 the world of traditional websites was still dominated by monolithic traditional
CMSes - The likes of WordPress, Drupal, Umbraco, WooCommerce, etc

React had started making its way into most crooks and crannies when it came to SPAs (Single page apps) and there were a lot of teams migrating their various frontends to React at that time.

And with the amazing DX of React more and more teams also wanted to start adopting React for these more traditional content based websites.

The value proposition is obvious. You can have your frontend team owning a project all the way - no integration into a CMS templating languages etc - the whole frontend can be a React app. The component model maps really well to design elements and design systems, and the interoperability for team members made for an exciting business value prop.

### Server-side rendering (SSR)

The only problem with this new front-end first approach, was that a key feature of traditional websites is having your website pre-rendered on the server - you need that for SEO, facebook og:meta info, speed etc - and SSR for React was really not yet mainstream.

That didn't stop anybody of course. Some people were fooled thinking "oh Google bot runs JS now, and SEO will be no issue etc" - others started adopting various approaches like pre-rendering their websites with prerender.com, and lots of people were going with home-grown rendering react on the server etc.

For the most part, all of those approaches had various super annoying flaws.

## Gatsby: Love at first sight

But then Gatsby.js came along with a compelling feature set that got me personally (and lots of other people) super excited:

- Fully static build output - can deploy on netlify, github pages etc - foolproof security story - compared to eg. WordPress etc
- Slick pre-loading instant navigation on your routes.
- Gatsby image - responsive, lazy loaded images right from your build output
- All the traditional SEO features semi-baked in
- Amazing graphql api for data fetching ("I've heard graphql is cool")
- Nice presets and themes/starters and plugins for common datasources - eg. wordpress, Prismic, Contentful, etc

That is a really compelling feature set, right? Yes, and boy did me and the team I was working on at the time bite. We went all in on Gatsby.

But as it turns out - some of those nice features had huge drawbacks

- Graphql layer was powerful and actually pretty amazing, but was a little confusing
  - It's actually a gatsby-flavored data translation / normalization layer
  - "The fetch data up front => query data during builds" was unintuitive for a lot of developers
  - Some of the most used data fetching libraries had big outstanding issues for a long time - eg. fields could go missing when content changes - looking at you `gatsby-source-contentful` and `gatsby-source-wordpress` etc - to be fair there was eventually a workaround where you specify a manual schema for those bits of content, but that was both a later feature and also really complicated to teach to people and adopt.
- Gatsby image was actually a huge source of build-slowdowns, with inadequite build-cache strategies. Eventually going for remote URLs and image CDNs like cloudinary etc turned out to be a much easier approach
- Previewing content changes from a CMS was a big pain point and usually involved a lot of setup to get it working correctly. We tried so many things with this - continually running a dev server on a closed network, integrating client-side-only fetching and rendering of content etc - it was a mess.
- All these wonderful plugins had horrifying compatibility issues from one version to the next.
- Long build times - really really long build times. 10+ minutes.
- Debug cycle on broken builds could be really painful.

A few key aspects of Gatsby's architecture made these issues a little worse than they could have been:

- Complicated build pipeline / api - large unintuitive api surface area - eg. all the different rendering hooks and what they exposed in gatsby-node, all the similar-but-not-same-it-was-working-in-dev-now-its-not issues with gatsby-client.js vs gatsby-server.js
- Gatsby's graphql layer provided an extra layer of complexity you wouldn't have if you just randomly queried things via their respective APIs - so figuring out issues there would often be very time consuming.
- Lots of node-compatibility issues with all these plugins - most of that is to blame to the native binary plugins, node-sass, sharp-family of plugins and image processors etc - not really to blame on gatsby itself, but the implicit plugin dependency structure together with versioning made things hard to debug. Like with a lot of fast moving projects it's all great and nice if every website is always at the very latest version of everything, or fresh off a starter, but when they're not, upgrading packages became very time consuming.

## Early adoption

When you adopt something early, you are bound to have issues. That is to be expected. And while you could argue that we should probably not have been such early adopters, I think in the long term, solving these isssues did make our team stronger in many regards.

And Gatsby was promising. It seemed worth it to invest a lot of time into it. At this point in time Gatsby had been incorporated and seemed like they were really committed to making gatsby.js better for all developers.

And Gatsby had great developers on their team and surely they were working around the clock to improve Gatsby! .. Right?

## Along comes Gatsby cloud

So at some point the Gatsby team released Gatsby Cloud. A really innovative hosting solution for Gatsby websites, that seemed to promise to make all the issues with running and deploying gatsby disappear. With both a proprietary preview solution, incremental builds and just crazy fast builds, it seemed Gatsby Cloud was supposed to be the be-all-end-all solution for deploying Gatsby websites.

And you were reminded of it. A lot. It felt like every week there was a new newsletter telling you about Gatsby Cloud and how Gatsby cloud magically makes all these painpoints go away.

But often we were working in a somewhat enterprisey situation, where we needed to build things according to some company's security and network policy that might not allow it, and we also didn't really want to get stuck in a somewhat proprietary situation.

I don't know anybody at Gatsby HQ and I have no idea if that feeling is misplaced or not, but it really did feel to me like the only way Gatsby was addressing these fundamental issues (build time, previewing, etc) was with Gatsby Cloud. They were obviously at least assigning lots of resources into developing it and promotiing it.

> **Edit**: And obviously that ended up working out great for them in the end :)

Now, I realize were were not paying for Gatsby as a solution. We were using Gatsby on the premise that it was open source software and there are no guarantees when it comes ot that.

But it still left a bit of a bad taste in my mouth.

## That ship has sailed

Most of the issues we were facing back then have probably been fixed in Gatsby 4 or 5 or whatever. Or fixed by going into vendor lock-in with Gatsby Cloud.

I also do not know if other teams had similar issues as we did with deploying Gatsby for traditional websites, but I have a hard time imagining them not having them. But also, as you can tell from this graph, that ship has sailed.

In time, our team eventually started moving away from Gatsby - at around Gatsby v3 - having invested a lot of time and effort into making it easier for us to build websites with Gatsby - we had our own in-house plugins for things, our own starter, and we had lots of internal knowledge on deploying gatsby websites.

At that point in time Next.js had recently announced static builds, and with the much simpler approach and less of a framework, it just seemed like Next was a much more natural way forward. Being able to pick between SSR and SSG was a killer feature. And with a simpler approach to data fetching, it was just a very natural transition.

Next is not perfect. Far from it. It has peculiarities as well - not to mention the semi-proprietary edge rendering - but at least the whole approach is a lot simpler, which requires you to think a lot less. And I like thinking less.

## Conclusion <3

At one point in time it seemed like Gatsby was just crushing it. Gatsby and Next.js were just neck in neck in terms of downloads and usage and honestly Gatsby had much better momentum back in 2018/2019 - but as you can see from this chart. That is not the case anymore.

![gatsby next trends](/post-content/gatsby-next-trends.png)

I know this post sounds like the most detailed negative rant you've ever read, but in reality a part of me really likes Gatsby and a part of me wants to see Gatsby succeed.

A part of me also wishes I had chimed in more in issues or expressed this frustration with Gatsby themselves in github issues etc, but I was drowning in work and it seemed like it would be futile - perhaps - perhaps not.

I'm sure Gatsby 4 or 5 or 6 or whatever will be a totally different ball game. I have heard they have SSR now, so I suppose that is interesting, but it just really feels like too little too late.

### Conclusion: So why did gatsby.js fail?

Gatsby.js ultimately failed to continue to increase traction by moving too slowly, and emphasizing Gatsby Cloud over the framework itself.

The value prop got eaten and out-done by Next.js and Gatsby was no longer solving problems most people are having.

### Do you agree?

Does any of this sound familiar to you? Am I wrong? Did I miss something?

Hit [me up on twitter](https://twitter.com/arnorhs) and tell me whether this post resonates with you.
