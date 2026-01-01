---
title: 'Open all files from a git diff or git show with this handy command utility'
summary: "We use git as our versioning tool at work and I've gradually been learning a few tricks on how to speed up my development time and time spent managing my repo. When jumping between branches, continuing your work from where you stopped last time, etc., you very often open the same files as you were editing in a previous commit. This may not be a problem if you use something like Command-T for vim or rely on the file browsing in TextMate, but often it might just be quicker to open all the files from a particular ref in git or opening all files from your branch's diff from master/dev or something."
date: 2011-12-25
---

We use _git_ as our versioning tool at work and I've gradually been learning a few tricks on how to speed up my development time and time spent managing my repo. When jumping between branches, continuing your work from where you stopped last time, etc., you very often open the same files as you were editing in a previous commit. This may not be a problem if you use something like [Command-T](https://www.vim.org/scripts/script.php?script_id=3025) for vim or rely on the file browsing in _TextMate_, but often it might just be quicker to open all the files from a particular ref in git or opening all files from your branch's diff from master/dev or something. I made this little snippet of a shell script that allows you to [open all files from a git diff or show](https://gist.github.com/1517095) command in one fell swoop. Usage goes something like:

> gitopen diff master

or

> gitopen show 3663c033

or simply

> gitopen

The command takes two arguments:

> gitopen \[diff <ref>\] \[show <ref>\]

Where ref could be a hash or a branch name etc. If you want to try it, you can download it here: [https://gist.github.com/gists/1517095/download](https://gist.github.com/gists/1517095/download) [Paul Rosnia](https://paul.rosania.org/) also made a change which makes the script try to use the $EDITOR environment variable if it exists. You can override that if you like to use a different editor than is set by your environment. If you find this utility useful, please let me know in the comments. **Update:** [Jarin Udom](https://jarinudom.com/) pointed out to me [on Hacker News](https://news.ycombinator.com/item?id=3394343) the following: If you add a git alias, like so:

> git config --global alias.open '!sh ~/gitopen.sh'

It will allow you to use the command like other git commands:

> git open diff master

Apparently you should also be able to name the file git-open somewhere in your path, and that should have the same effect. However, it did not work for me and I have no idea why, but the git global config variable worked great.
