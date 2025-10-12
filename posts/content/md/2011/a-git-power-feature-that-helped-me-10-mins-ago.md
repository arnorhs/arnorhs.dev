---
title: 'A git power feature that helped me 10 mins ago'
summary: 'I was setting up a new git repository (more on that in a later post) and I was using a wrong author, so the name was wrong on all the commits. I googled around and found this command which allow you t...'
date: 2011-09-25
---

I was setting up a new git repository (more on that in a later post) and I was using a wrong author, so the name was wrong on all the commits. I googled around and found this command which allow you to basically rename all the authors: It's deep in dirty-commit-territory, so if there are more people who have pulled from you repo, you'll have all kinds of nasty issues, but if it's a new repo which hasn't been pulled/forked by anybody, you shouldn't have problems with pushing with "git push -f origin branchname" Here is the blog entry that describes the method: [https://coffee.geek.nz/node/22723](https://coffee.geek.nz/node/22723) There's also some helpful discussions on Stack Overflow: [https://stackoverflow.com/questions/750172/how-do-i-change-the-author-of-a-commit-in-git](https://stackoverflow.com/questions/750172/how-do-i-change-the-author-of-a-commit-in-git)
