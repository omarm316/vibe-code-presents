# Build a Vibe-Coded Presentation with ChatGPT + Codex

This repo is a starter kit for building an interactive presentation website with AI.

If you want to see what this kind of project looks like when it is finished, start with the live example: [vibe-code-presents.pages.dev](https://vibe-code-presents.pages.dev/).

Created by [Assaf Packin](https://www.linkedin.com/in/apackin/), a technical cofounder focused on rapid prototyping, MVPs, and the transition from fast builds to scalable product systems.

You do not need to understand the code before you begin. Think of the code in this repo as the presentation engine. Your main job is to create the presentation content in a few markdown files at the root of the project, then use Codex to turn those files into the finished presentation.

This guide is written for beginners. If you have never used AI to make a project before, start here.

You should not need to open a terminal or figure out build commands yourself. If something feels technical, ask Codex to do it for you.

## What You Are Making

You are making a presentation that feels more like a guided visual experience than a normal slide deck.

Instead of designing every slide by hand, you will:

1. Use ChatGPT to help you think through your topic.
2. Use ChatGPT to write the presentation content files.
3. Ask Codex to find or prepare visual assets for the presentation.
4. Use Codex to build the interactive presentation site from those files.
5. Ask Codex to preview and check the presentation for you.
6. Optionally ask Codex to publish it with Cloudflare Pages.

The most important idea is this:

- ChatGPT helps you plan and write the presentation.
- Codex can handle the asset work too: searching, downloading, resizing, converting, and placing images or GIFs.
- Codex helps you build the actual website from your plan.
- If a step feels technical, ask Codex to do it for you.

## What Files Matter

These are the files beginners should care about first:

| File or folder | What it does |
| --- | --- |
| `ai_slide_deck_overview.md` | The big-picture brief for the whole presentation: audience, tone, purpose, style, and overall experience. |
| `slide_1.md` to `slide_10.md` | One scene per file. These are the main source files for the presentation content. |
| `speaker_notes_compiled.md` | Optional speaker notes for the full talk. |
| `speaker_script_only.md` | Optional script version if you want a cleaner speaking draft. |
| `assets/` | Images, screenshots, and other visual files used in the presentation. |

For most beginners, the content files above are the only files you need to edit.

## What You Should Edit vs. Leave Alone

Usually edit:

- `ai_slide_deck_overview.md`
- `slide_1.md` to `slide_10.md`
- `speaker_notes_compiled.md` and `speaker_script_only.md` if you want speaking help
- files inside `assets/` if you want to add images

Usually leave alone:

- `src/`
- `package.json`
- `vite.config.*`
- `wrangler.jsonc`

If you are new to this, do not start by changing the code. Start by improving the markdown files.

A simple workflow is to give Codex your ChatGPT output and ask it to place the content into the correct files for you.

## Beginner Workflow

Follow these steps in order.

### 1. Pick Your Topic, Audience, and Goal

Before you ask AI to write anything, decide three things:

- your topic
- who the presentation is for
- what you want the audience to understand, feel, or do by the end

If you are unsure, use this first ChatGPT prompt:

```text
I am a beginner making a presentation website with AI.

Help me choose a strong presentation idea.

First, ask me questions one at a time about:
- my topic
- my audience
- the goal of the talk
- the tone I want
- how long the presentation should feel

After we talk, help me write a one-paragraph summary of the presentation I am trying to create.
Keep your language simple and beginner-friendly.
```

### 2. Use ChatGPT to Turn the Idea into an Outline

Once you know your topic, ask ChatGPT to make the outline before you ask it to write slides.

Copy and paste this prompt:

```text
I am building an interactive presentation website, not a normal slide deck.

My topic is: [PUT YOUR TOPIC HERE]
My audience is: [PUT YOUR AUDIENCE HERE]
My goal is: [PUT YOUR GOAL HERE]

Please help me turn this into a 10-scene presentation.

First, ask me the most important questions you need answered.
After I answer, create:
1. a simple talk outline
2. a 10-scene plan
3. one sentence explaining the job of each scene

Keep it clear, visual, and easy for a live audience to follow.
Avoid overly technical language.
```

What you want from this step:

- a clear beginning, middle, and end
- one main idea per scene
- a sequence that feels easy to present live

### 3. Use ChatGPT to Write `ai_slide_deck_overview.md`

This file gives the whole project a clear direction. It helps Codex understand the purpose of the presentation before it builds anything.

Copy and paste this prompt into ChatGPT after your outline is ready:

```text
I am using a repo that turns markdown files into an interactive presentation website.

Please write the full contents for a file called `ai_slide_deck_overview.md`.

Use this information:
- Topic: [PUT YOUR TOPIC HERE]
- Audience: [PUT YOUR AUDIENCE HERE]
- Goal: [PUT YOUR GOAL HERE]
- Tone: [PUT YOUR TONE HERE]
- Outline: [PASTE YOUR OUTLINE HERE]

Important:
- This is not a normal slide deck.
- Treat the presentation as a sequence of visual scenes.
- Keep it easy to follow live.
- Focus on clarity, pacing, and strong visuals.
- Avoid technical jargon unless it is necessary.

Please include sections for:
- Goal
- Audience
- Experience Requirements
- Visual Style
- Interaction Model
- Important Constraints
- Core Takeaway

Before writing, ask me any missing questions that would improve the result.
```

When ChatGPT gives you the result, send it to Codex and ask it to update `ai_slide_deck_overview.md` for you.

You can use a prompt like this:

```text
Please put the following content into `ai_slide_deck_overview.md` for me.
Do not change the meaning unless you need to fix obvious formatting issues.

[PASTE THE CHATGPT OUTPUT HERE]
```

### 4. Use ChatGPT to Write `slide_1.md` to `slide_10.md`

Now turn the outline into the actual scene files.

Best practice: do this one file at a time, not all ten at once.

When ChatGPT gives you a slide file, send it to Codex and ask it to update the matching markdown file for you.

Use this prompt template for each slide:

```text
I am creating a presentation website from markdown files.

Please write the full contents for `slide_[NUMBER].md`.

Use these inputs:
- Topic: [PUT YOUR TOPIC HERE]
- Audience: [PUT YOUR AUDIENCE HERE]
- Goal: [PUT YOUR GOAL HERE]
- Overview file: [PASTE `ai_slide_deck_overview.md` HERE]
- Scene plan: [PASTE THE RELEVANT PART OF YOUR OUTLINE HERE]

This file should describe one presentation scene.
It should not feel like a crowded or text-heavy slide.

Please include:
- Slide Purpose
- Core Idea
- On-Slide Text
- Visual Design
- Layout
- Animation
- Speaker Notes

Rules:
- Keep the on-screen text short.
- Prefer one main idea per scene.
- Make the scene visually clear.
- If the scene has staged reveals, explain the reveal order.
- Keep the language simple enough for beginners to understand.
- Do not add unnecessary technical language.

Before writing, ask me any missing questions.
```

If you want ChatGPT to help you plan all ten scene files before writing them, use this first:

```text
Using my topic and outline, make a file plan for:
- slide_1.md
- slide_2.md
- slide_3.md
- slide_4.md
- slide_5.md
- slide_6.md
- slide_7.md
- slide_8.md
- slide_9.md
- slide_10.md

For each file, tell me:
- the job of the scene
- the emotional beat
- the main visual idea
- the short on-screen text

Keep each answer concise and easy to build from.
```

### 5. Ask Codex to Handle Assets for You

Yes, Codex can help with the visual asset work too.

That can include:

- deciding which scenes need images, screenshots, or GIFs
- searching sites like Tenor or other public sources for relevant assets
- downloading the files
- resizing, cropping, converting, or compressing them
- placing them into the `assets/` folder
- connecting them to the right parts of the presentation

The easiest way to do this is to ask Codex to read your scene files and make the asset decisions for you.

Start with an asset-planning prompt like this:

```text
Please review this presentation and figure out what visual assets it needs.

Read:
- `ai_slide_deck_overview.md`
- `slide_1.md` to `slide_10.md`
- `assets/README.md`

I want you to:
- decide which scenes need images, screenshots, or GIFs
- suggest what each asset should show
- tell me which assets can stay simple and which need stronger visuals
- keep the overall style clean and presentation-friendly

If a scene does not need an asset, say so.
Keep the recommendations practical and easy to implement.
```

Then, if you want Codex to actually gather and prepare the assets, use a prompt like this:

```text
Please handle the assets for this presentation for me.

Read:
- `ai_slide_deck_overview.md`
- `slide_1.md` to `slide_10.md`
- `assets/README.md`

What I want you to do:
- find relevant assets from Tenor or other suitable public sources
- download the best options
- resize, crop, convert, or compress them if needed
- save them into the correct `assets/` locations
- update the presentation so the assets appear in the right scenes

Important:
- keep the visuals clean, readable, and appropriate for a live presentation
- prefer assets that are easy to understand quickly
- avoid cluttered, low-quality, or distracting visuals
- if an asset choice is uncertain, show me the options before making a final choice
```

If you care about source rules, school-safe content, or reuse rights, say that in the prompt too. For example:

```text
Only use assets that are appropriate for a general audience.
If there are licensing or reuse concerns, ask me before using that asset.
```

If you already know the kind of asset you want, be specific. For example:

```text
For slide 2, find a clean Dory image.
For slide 1, look for reaction GIFs that show excitement, confidence, concern, recovery, and total meltdown.
For slide 9, help me gather screenshots or simple example visuals for each project example.
```

### 6. Optionally Generate Speaker Notes or a Script

If you want help presenting, ask ChatGPT to turn your final scene files into notes or a script.

Copy and paste this prompt:

```text
I have finished the content files for my presentation website.

Please create:
- `speaker_notes_compiled.md`
- `speaker_script_only.md`

Use these files as the source of truth:
- `ai_slide_deck_overview.md`
- `slide_1.md` to `slide_10.md`

What I want:
- natural speaking language
- short sentences I can actually say out loud
- simple transitions between scenes
- no unnecessary jargon

For the notes version, include slide-by-slide reminders.
For the script version, write it as a cleaner speaking draft.
```

### 7. Use Codex to Turn the Markdown Files into the Presentation Site

Once your markdown files are in place, switch to Codex and ask it to build the presentation from those files.

Copy and paste this prompt into Codex:

```text
Build this presentation site from the files already in this repo.

Start by reading:
1. `ai_slide_deck_overview.md`
2. `BUILD.md`
3. `slide_1.md` to `slide_10.md`
4. `assets/README.md`

Treat the root markdown files as the source of truth for the presentation content and scene behavior.

Important:
- This is not a normal slide deck.
- Build it as a continuous, scene-based presentation.
- Use staged reveals when the markdown files call for them.
- Keep the visuals clean, readable, and presentation-friendly.
- Preserve the meaning of the markdown files.
- If something is unclear, ask before changing the content.

Before coding, briefly explain:
1. how you will structure the presentation
2. how reveals will work
3. how transitions will work
4. how image placeholders will be handled
```

This is the moment when Codex works on the code and turns your written plan into the actual presentation.

### 8. Ask Codex to Preview the Presentation for You

Once Codex has built or updated the presentation, ask it to handle the technical preview steps for you.

Copy and paste this prompt into Codex:

```text
Please preview this presentation for me.

I want you to:
- install anything needed
- run the project locally
- check that it loads correctly
- tell me the local URL to open
- tell me if anything is broken or needs to be fixed
```

If the presentation feels too busy, too wordy, or too confusing, go back to the markdown files first. Most of the time, the easiest fix is improving the content instructions rather than changing the code.

If you want extra confidence before sharing it, you can also ask Codex:

```text
Please verify that this presentation builds cleanly and tell me whether it is ready to share.
If there are build or formatting problems, fix them for me.
```

### 9. Optionally Ask Codex to Publish with Cloudflare Pages

If you want to put the presentation online, this repo is set up to use Cloudflare Pages. It is a good beginner choice because it has a generous free tier.

For this workflow, you should expect Codex to handle the technical deployment steps for you.

Before deployment, you will need:

- a GitHub account
- a Cloudflare account

Once you have those accounts ready, ask Codex to deploy it for you with a prompt like this:

```text
Please deploy this presentation to Cloudflare Pages for me.

Use the deployment setup already in this repo if possible.
If anything is missing, tell me exactly what account access or login step you need from me.

I have or will create:
- a GitHub account
- a Cloudflare account

Please handle the technical steps and explain only the minimum I need to do.
When deployment is done, give me the live link.
```

For setup details, see `DEPLOY.md`.

## A Good Way to Work with ChatGPT

If you are new to AI tools, this is the safest beginner workflow:

1. Ask ChatGPT to ask you questions first.
2. Get the outline right before asking for final files.
3. Create `ai_slide_deck_overview.md` before the slide files.
4. Generate one slide file at a time.
5. Ask Codex to help with assets once the scenes are clear.
6. Review the result and ask for small revisions.
7. Move to Codex for the build once the content files feel clear.

This usually works better than asking for everything in one giant prompt.

Once your content files are ready, let Codex handle the technical work. You should not need to manually run setup, build, preview, or deploy commands unless you want to.

## Prompting Tips That Help a Lot

- Paste the exact file names you want ChatGPT to create.
- Tell it who the audience is.
- Tell it what the presentation should help the audience understand, feel, or do.
- Ask for fewer words on screen if the result feels too crowded.
- Ask it to rewrite only one file at a time when making changes.
- Keep your requests specific. "Make slide 4 simpler" works better than "make it better."
- If the chat gets messy, start a fresh chat and paste your current files back in.

## Revision Prompt You Can Reuse

When something feels off, use a revision prompt like this instead of starting over:

```text
I want to improve my presentation source files, but I do not want to start over.

Please revise only these files:
- [LIST THE FILES HERE]

What I want changed:
- less text on screen
- clearer reveal order
- stronger visual contrast between scenes
- simpler language for beginners

Keep the main message the same.
Explain what you changed before you rewrite the files.
```

## Simple Example: From Zero to Finished Presentation

If you want the shortest possible version of the whole workflow, it looks like this:

1. Ask ChatGPT to help you choose a topic, audience, and goal.
2. Ask ChatGPT to create a 10-scene outline.
3. Ask ChatGPT to write `ai_slide_deck_overview.md`.
4. Ask ChatGPT to write `slide_1.md` to `slide_10.md`.
5. Ask Codex to gather and prepare the assets.
6. Optionally ask ChatGPT for speaker notes.
7. Paste the Codex build prompt.
8. Ask Codex to preview and check the presentation for you.
9. Ask Codex to deploy it to Cloudflare when you are ready to publish.

## Common Beginner Mistakes

- Asking AI to build the whole presentation before you have a clear outline
- Putting too much text on each scene
- Waiting too long to think about the visuals and assets
- Trying to fix a content problem by changing the code
- Changing many files at once when only one scene needs work
- Forgetting to tell ChatGPT who the audience is
- Assuming you need to do the technical setup yourself instead of asking Codex to handle it

## Why This Project Exists

This project reflects Assaf Packin’s approach to vibe coding: use AI to prototype quickly, build strong MVPs, and add structure when a product is ready to scale.

The key skill is not just building fast. It is knowing when to stay lightweight, when to formalize the system, and how to keep momentum without creating long-term chaos.

That is the core idea behind this repo and the broader body of work around it.

## Final Reminder

This repo works best when you treat the markdown files as the source of truth.

Start with the idea.
Turn it into a plan.
Turn the plan into scene files.
Then let Codex build the presentation from that plan.

That is the core habit behind vibe coding a presentation that still feels organized and easy to improve.

## PII Finance Town Hall Deck

The June 2026 PII Finance Town Hall presentation is a standalone, single-file deck at:

- [`pii_townhall_v8.html`](./pii_townhall_v8.html)

To run it locally without any build system:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000/pii_townhall_v8.html
```

If you are using the Vite app instead, run `npm run dev` and open the same `/pii_townhall_v8.html` path on the Vite dev server. The Vite build is configured to include this standalone HTML file in `dist/` so it is also available at `/pii_townhall_v8.html` after deployment.
