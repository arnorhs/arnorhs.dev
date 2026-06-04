---
title: '"maybe later" was a feature'
summary: "
  The most valueble code in my repo, is the code I didn't write.
"
date: 2026-06-04

---

The most valueble code in my repo, is the code I didn't write.

Have you ever thought back to when you were kind of excited about something - eg. of having more tests for some particular part of your stack, or rewriting legacy website from "legacy old thing" to "shiny new thing"? Or deploying your services on AWS intead of GCP?

Or maybe it was a feature you wanted to build - such as a task management thing on top of your CRM, or some slick way of handling images in your infra?

Is your team's backlog filled with these things? I know mine is. Those are ideas and tasks that the business, your boss, your team, or yourself never prioritized. You thought to yourself: I'll get to it later.

The ideas that are actually worth prioritizing, you work on. Or you hire people to work on. They get done because they are deemed important enough.

4 years later it's clear that those backlog features would not have helped at all. It is a good thing they never got built. They're either irrelevent today or you already pivoted your product to something completely different.

They'd simply be legacy cruft you either need to support or remove.

I think about those things all the time. **All the things I never built.**

Every time you don't build something, you are accelerating your team, the product and you are prioritizing what is important at any given moment. Not building is a really powerful feature. Picking is a product and development strategy.

## "the models keep getting better"

People talk about AI taking our jobs all the time now. I'll admit, that I worry about that sometimes as well. It's hard not to. Tech CEOs keep reminding me.

On the surface they already are better and in some localized cases I they can produce better code than I can.

But in the larger picture I feel like they're still ways off. How many times have you tried to completely vibe-out but then you look at the code after a while and you ask yourself why the same thing is defined in 15 different places? Or seen 4 different implementations of the same schema validation in nested if-statements?

Personally, I just find LLM output often hard to read. And when it's hard for me to read, it's probably also hard for the AI to read.

But we will get there. I'm sure.

## When to build

So LLMs are improving and everybody is using them. Tokenmaxxing like there is no tomorrow (literally and figuratively).

But I worry that that people are, and will be, spending their tokens building exactly these things that you previously would not have built. **The backlog ideas.** They are no longer picking, they are just building.

And what happens down the road is that all the code bases will just grow with more features and more frameworks and more things that have been re-written from A to B, when you otherwise would not have.

I also worry that the code ends up in a state where it is illegible to a human, and you can only get AI to interface with the code.

And yes, you will be able to use AI to help you remove those things and reshape them. But will you do that? Won't there simply be more systems or more things or people that now rely on this feature?

It's also really difficult making the argument that you need to spend time, tokens or other resources to remove something. It's often hard for non-developers to undestand how removing things can be a net positive.

Additionally, [Hyrum's Law](https://www.hyrumslaw.com/) will affect your APIs

There's a lot of value in the code that we don't write. and often not choosing to write some code, is the best thing you can do.
