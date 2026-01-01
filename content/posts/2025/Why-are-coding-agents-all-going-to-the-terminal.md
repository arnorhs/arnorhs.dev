---
title: Why are coding agents all going to the terminal?
summary: "
  I've noticed that these cli tools are really starting to become popular and judging from the effort put into their respective offerings by the model vendors, it seems to be what they are all betting on now.

  Even OpenAI released yet another variation of Codex, this time as a terminal based one.

  But I think the whole thing is wrong...
"
date: 2025-10-11

---

A quick note: I don't work in AI research, so this is my personal, biased take on agentic coding agents

## Agentic Coding

In the last couple of years my use of coding agents has slowly been ramping up. I really liked copilot when it came out and was a paying customer from day 1. I used the agent mode in VSCode, I dabbled with Cursor & Windsurf, but never really wanted to switch editors completely.

But when I saw the terminal based Claude Code, I was instatly interested. Because I love terminal based tools.

- CLI tools have a unified interface (posix based command line arguments etc)
- I can start them and use them anywhere I have a terminal - so in theory I can use a terminal agent in CI, or in a remote VM or wherever.
- I like keeping these tools in terminal windows using tmux, and i can switch to/from them and pick up where I left off wiithout it cluttering up my UI space
- The main reason I like them is because I can use them without my main editor - in my editor I can be looking at other stuff while the agent crunches code in another part of the code base.

Also, the idea of having the agent be separate from the editor was really
appealing. But I thought, for the moast part, that this was not a mainstream opinion...

## Surprising rise of the terminal agents

Lately, I've noticed that these cli tools are actually starting to become popular and judging from the effort put into their respective offerings by the model vendors, it seems to be what they are all betting on now.

Even OpenAI released yet another variation of Codex, this time as a terminal based one. Great, I'm all in.

So all in all, it looks like that's where the market is headed, and that's great for people like me, who prefer terminal based coding agents.

But, when you think about it, it's weird, right? This is not a `find` or an `ls` or `git` - These coding agents are interactive tools - not just commands that you run.

But when they are trying to be gui tools in the terminal, there are just a lot of issues:

- You can't use the mouse in any meaningful way, except for selecting text (if you even can do that!)
- Resizing is finicky
- Menu navigation and hijacked focus
- Klunky special keys for scrolling chat history..
- Copy/pasting is tricky
- alt+enter to create newlines etc.

These agents also aren't like traditional TUI apps (like `htop` or `mutt`) - they're trying to render a **modal chat interface** in a space that struggles with history, resizing, and complex input.

And these aren't at the fault of the vendors - those things are just inherently more difficult in a terminal based application. Applications with those kinds of interactions are usually not popular as terminal apps. So a gui app in a terminal feels like one big oxymoron.

And yet, I prefer them. And all the model vendors are also betting on them.

It's weird, right?

## Theorycrafting the big misunderstanding

My theory is that these companies are misunderstanding what the appeal of the terminal agents is - they all think that developers just prefer a terminal based tools, and that's just that.

But I believe the reality is that developers simply prefer their coding agents to be stand-alone outside their editor. This frees them to just use neovim or intellij or whatever they want, without having a coding agent-specific editor. Meanwhile  allowing them to try different tools, without setting up all kinds of editor plugins and themes in each editor etc..

So, according to this theory, they don't prefer terminal based agents, they are simply the best option, without the baggage of running a separate editor.

Now I bet you are asking _"but what about cursor/windsurf, weren't they already that?"_ -- IMO no, because they feel like editors **first** - Autonomous coding agents **second**.

So that is my observation - I bet you that in 2-3 years, all these agentic cli tools will have transitioned to desktop apps, because this trend doesn't make any sense to me (and I say that, despite being heavily into the CLI tools myself)..

## So what would that look like?

If I were building one, I'd probably borrow from the UI of the terminal UI agents. It would be a simple floating GUI window, where chat is the primary interface.

It would probably look exactly like ChatGPT or T3 chat, except you'd have "project" open - ie a directory.

What do you think? Am I missing something?
