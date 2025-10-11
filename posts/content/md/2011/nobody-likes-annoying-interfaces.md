---
title: "Nobody Likes Annoying Interfaces"
summary: "I came upon this blog post by Seth Hoenig titled \"Open letter to sites with annoying interfaces\" yesterday. In the article he talkes about how some web sites and/or apps hide user interface actions until a later state. The post is a little bit funny and there might be a little bit of truth to it, but mostly it's inaccurate. The examples he covers are gmail's edit-contact page and the button used to edit a project's description on github. I'd like to talk a little bit about those and then give another perspective on hiding UI elements."
date: 2011-12-26
---

I came upon [this blog post](https://bitonic.org/blog/?p=176) by Seth Hoenig titled "Open letter to sites with annoying interfaces" yesterday. In the article he talkes about how some web sites and/or apps hide user interface actions until a later state. The post is a little bit funny and there might be a little bit of truth to it, but mostly it's inaccurate. The examples he covers are gmail's edit-contact page and the button used to edit a project's description on github. I'd like to talk a little bit about those and then give another perspective on hiding UI elements.

### The Gmail example

Gmail's contact editing is not stellar. But the fact that mr. Hoenig completely misunderstands how it works, really is an excellent indicator of how the whole contact editing page could be better. Mr. Hoenig believes the delete contact button is only shown when you edit a contact's name, but really the button he's referring to is the "clear title" button. What's wrong about that is a) it shows a trashcan icon b) the tooltip for the icon is "delete" which is really ambiguous c) there's no other delete button visible. In order to simplify it's interface and reduce clutter, the gmail team chose to put the delete button in the "more" drop down menu: ![more drop down menu](https://f.cl.ly/items/1T1L1d2O0w162d280X3G/Screen%20shot%202011-12-26%20at%208.08.19%20PM.png "more drop down menu") I'll admit that it's very low affordance for that button, but then again, how often do you actually delete contacts? The action is also available from the same drop down when you're in the contacts list view, in which case you would have a pretty easy time finding the action behind the drop down. So personally, it's not that big of a problem, in my opinion. But the problem with the "clear contact name" button is still there, and personally I don't understand why you would even need a button to clear the name, since it's hard for me to think of a use case where you would want to clear somebody's name, especially where it's not enough to just manually select the text and delete it. The tooltip is totally misleading as well and the icon doesn't help. Gmail team: You really should just get rid of that button.

### The github example

Now, in the case of the github example, it feels to me like editing a project's description is an uncommon task. I remember having done that possibly once or twice, and yet don't remember having any problem finding the button. Of course you could make the argument that it might be better to show the edit button closer to the description when you hover, but then again, some descriptions might be a bit longer than others, and the position of the button would be different between projects. So this solution is probably fine for the task at hand, in my opinion.

### Hiding actions -- good or bad?

Hiding user interface elements / actions is a totally valid user interface pattern in my opinion. If you have a lot of actions and tasks you need a user to be able to do, you really have 3 options:

1.  Cluttering everything up with a lot of buttons
2.  Putting the buttons on different pages/dialogs
3.  Hiding them until they are in context

If you clutter everything up with visible buttons everywhere, it becomes much harder to find the buttons you are looking for. It also makes the design more busy and confusing and hurts readability of the content you are viewing. Having to search for the buttons in different dialogs and contexts is not great either, so personally I feel that 3) is a great solution that both highlights the content you are viewing, doesn't clutter things up and makes the appropriate actions available when you are searching for them. There are some other examples of how web sites and apps hide actions until in context, which I would love to talk about in more detail, but I'll probably leave that for a separate post.