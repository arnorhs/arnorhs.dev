---
title: "Where's your logic?"
summary: "_Ok, this is my first blog post here, so it probably sucks. If you value your time, don't read this._ When writing code these days, I keep running into these dilemmas. With the way the web a..."
date: 2010-02-20
---

_Ok, this is my first blog post here, so it probably sucks. If you value your time, don't read this._ When writing code these days, I keep running into these dilemmas. With the way the web and application development has been evolving, a greater part of the development and more importantly _my time_, goes into javascript development. This causes me to repeatedly get into these kinds of situations, where I'll have to choose between two paths when developing an app.

#### \_[![Comic: How do I placed logic](https://arnorhs.dev/wp-content/uploads/2010/02/howdoiplacedlogic.gif 'howdoiplacedlogic')](https://arnorhs.dev/wp-content/uploads/2010/02/howdoiplacedlogic.gif)\_The dilemma

Let's say you have a few rows of items that can be edited. You want the user to be able to edit these items without exiting the current page so you decide to make a form popup in front of the user in some sort of a dialog box. So do you...

1.  Keep the logic of the form in the back end and simply let the content of the popup box be requested using a simple ajax call?
2.  Keep the logic in the javascript front-end code as well as the current dataset and in turn save the ajax request.

With **option #1** our code becomes really simple and we can keep to our old coding habits, where we parse a dataset and display the form accordingly. The disadvantage is of course that you're calling a separate request to fetch the form, so this might include a delay of varying length. With **option #2** our back end might simply print out a form and your javascript code has an instance of the dataset in memory. So when a user clicks to edit, the javascript code will have to fill the form with the right information. This will happen fast for the user, but it seems very _dirty_ in the javascript code. Is this simply a problem because of my limited (but maybe above average) javascript coding skills? If we keep the code in the back end and do a simple ajax request, the development becomes very simple and you should be able to iterate faster, but if a bigger part of your code stays in the front end, you'll have greater complexities in your javascript code base. Maybe it's just a question of whether you like coding front end javascript code or back end code better. Any thoughts?
