---
title: 'To Rewrite or Not to Rewrite and The Sunk Code Dilemma'
summary: 'Stop. Don''t do it. I know what you''re thinking. You''re thinking: "This code is ugly. It''s messy, it''s big, it seems too complicated with too many features, trying to get my head into it will be too time consuming, I''ll just rewrite this. It won''t take long. A few hours, maybe". I''m here to tell you: Don''t do it.'
date: 2010-05-02
---

[![Sunk Code Comic](https://arnorhs.dev/wp-content/uploads/2010/05/sunk-code.jpg 'sunk-code')](https://arnorhs.dev/wp-content/uploads/2010/05/sunk-code.jpg) **Stop.** Don't do it. I know what you're thinking. You're thinking: _"This code is ugly. It's messy, it's big, it seems too complicated with too many features, trying to get my head into it will be too time consuming, I'll just rewrite this. It won't take long. A few hours, maybe"_. I'm here to tell you: **Don't do it.**

### The Programmer's Rewrite Fallacy

There's a big tendency with all programmers, especially good ones, to want to rewrite every bit of code they see. Code other people write, code they write themselves, even code that they don't even have to use themselves. I had a huge problem with this myself, at one point. It took a lot of self examination, but mostly **tight deadlines**, before I learned that sometimes, if something is working fine and maybe you just need to add one tiny bit of code once a year, rewriting might not be your best choice. Sometimes you just need to push a product out the window. Sometimes you also have to think about how many people are using what ever it is that you're creating/fixing. And you also need to realize one thing:

- If you think it will take 1 hour, it will take 10.
- If you think it will take 10 hours, it will take 100.
- If you think it will take 100 hours, it will take 1,000.

OK, now you're probably singing in your head: _"This guy is a moron, he is a horrible programmer, and he codes really slowly"_. And you are right. I really feel that I am a **horrible programmer**. But at least I know I am. I can get into the situation of wanting to rewrite something and I'm \*sure\* that I can do it in a couple of hours. I can picture all the tasks that need to take place, all the DB optimizations, all the recursive array mapping stuff I like to do in PHP, so I'm 99% positive that it's easy. By this time, however, I have to bring myself to the ground and remember: I **will** have that 1 hour bug hunt, debugging some fluke Javascript library, I **will** have the added complexity of feature X that I didn't think I would need and I **will** try to make everything look really smooth - my obsessiveness in that area can stretch my development time a LOT.

### The Fear of Rewriting - The Sunk Code Dilemma

When you, your employer, or someone else has invested huge amounts of time, energy or money on a project, the question whether to rewrite or reuse becomes a really big concern. Because even if the project really really needs a rewrite, nobody really wants to (except maybe yourself), because everybody would feel that the previous effort has been wasted for nothing. In finance, this is called the [_sunk cost dilemma_](https://en.wikipedia.org/wiki/Sunk_cost_dilemma). This dilemma can be applied to software just as well. Sometimes you can still get into this situation. The code might be impossible to maintain, it might be created on the wrong platform all together, it might be to inherently bug ridden or it's performance is just horrible. There can be many reasons. When somebody has spent their time or money on a project, nobody wants to tell them that it was all for nothing.

### So, how do you decide if you should rewrite a piece of code?

I've created a semi-simple formula for you to help you decide if you should rewrite a piece of code. Decide how true each argument is in your case and add the points together.

1.  The rewrite will reduce bugs. **1-7**
2.  The rewrite will make it easier for me to add features. **1-6**
3.  The rewrite will enable a feature or functionality that cannot otherwise be done. **1-10**
4.  The rewrite will help other people read the code and future maintenance will be easier. **1-10**
5.  This piece of software is very important to a lot of people. **1-10**
6.  The rewrite won't take long (Unlikely, but sometimes you can use some other piece of software with similar functionality as a base). **1-9**
7.  The current code base can't be used for anything. **1-20**
8.  You have a lot of time on your hands **1-15**

If you add the points together you should be able to decide based on this scale:

- 1-35 points: You should **not** rewrite. It's a waste of time.
- 36-46 points: You should **maybe** rewrite, it's your choice.
- 47-87 points: You should **definitely** rewrite this software! It will be helping society. You will be saving rain forests. You, my friend, will be saving lives.

I've sometimes got a pretty big problem of trying to decide things. I love quantifying problems like this one down to something I can calculate. I've run this formula over a few big projects I've taken part in that the question of rewrite/reuse has come up in and I'm pretty sure I nailed it down, but I might continue to improve this over time. Tell me what you think in the comments.
