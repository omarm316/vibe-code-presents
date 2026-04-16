# AI Slide Deck Build Brief

## Goal
Build a React-based presentation website for a talk about guiding vibe coding toward maintainable and expandable products.

This is NOT a traditional slide deck.

This should be implemented as a **continuous presentation scene** with camera movement, staged reveals, and smooth transitions between sections — similar to a high-end Prezi or cinematic keynote experience.

The audience is AI-interested non-technical founders. The presentation should feel polished, modern, visual, lightly playful, and extremely easy to follow live.

---

## Experience Requirements

The presentation should feel like:
- a continuous visual canvas
- composed of scenes rather than isolated slides
- with smooth transitions between ideas
- where the “camera” moves, zooms, or re-focuses attention

Even though content is defined in `slideX.md` files, these should be treated as:
- **logical sections**
- not rigid slide boundaries

---

## Transition Model

Transitions between sections should include:
- zooming into areas of the canvas
- panning between related concepts
- morphing or transforming existing elements
- maintaining spatial continuity where possible

Avoid:
- hard cuts between slides
- blank resets between sections
- traditional slide-by-slide transitions

---

## Interaction Model

The presentation must support:
- click / tap / keyboard navigation
- staged reveals within each section
- progression through scenes, not just slides

Each interaction should:
- either reveal new information
- or shift focus within the same visual space

---

## Visual Philosophy

The presentation should feel:
- cinematic
- fluid
- continuous
- intentional

Like:
- Apple keynote transitions
- Prezi-style zoom and context
- modern product demo storytelling

Not like:
- PowerPoint
- Google Slides
- static slide decks

---

## Important Constraint

The presentation should preserve **context across transitions**.

Elements from one section can:
- persist into the next
- transform into new forms
- or be reinterpreted

The goal is to make the presentation feel like:
**one evolving system, not a sequence of disconnected slides.**

When in doubt, prioritize **spatial continuity and transformation** over introducing new screens.

---

## Core Talk Promise
By the end of the talk, the audience should understand how to go from using AI to build something that works once to using AI to build something that can serve as a real MVP they can keep improving.

---

## Opening Structure (Critical)

The presentation must begin with a brief audience interaction (e.g. a hand raise), followed immediately by a clear empowerment promise BEFORE Slide 1 begins rendering.

The order is:

1. Audience engagement (e.g. "raise your hand if you've built something with AI that worked…")
2. Immediate empowerment promise (spoken, not a slide)
3. Then Slide 1 begins (the Build → Break sequence)

### Empowerment Promise Requirements

The promise must:
- clearly state what the audience will be able to do by the end
- focus on building something that holds up over time
- contrast "something that works once" vs "something you can keep building"

Example:

"If that’s happened to you—by the end of this talk, you’ll know how to build with AI in a way that actually holds up… so you can turn what you build into something real, not just something that works once."

### Important Constraint

The promise is NOT a slide.

It is spoken before any visual content appears.

---

## Core Thesis
AI can often generate a working prototype from a simple prompt, but without deliberate direction it tends to create products that become harder to fix, extend, and trust as iteration continues.

---

## Audience
AI-interested non-technical founders.

They are likely:
- excited by AI tools
- impressed by one-prompt builds
- less experienced with software architecture
- more interested in outcomes than implementation details
- vulnerable to thinking "it works" means "it is buildable"

---

## What the Deck Must Do
The presentation must:
- feel accessible to non-engineers
- avoid technical jargon unless absolutely necessary
- emphasize the transition from prototype to MVP
- make the failure mode emotionally recognizable
- make the speaker feel credible, practical, and insightful
- support live storytelling rather than replace it

---

## Slide Design Principles

- Slides are visual support, not scripts
- Minimal text only
- Every element must earn its existence
- Strong visual hierarchy
- Large type, lots of whitespace
- No cluttered backgrounds
- No unnecessary logos
- No dense layouts
- Prefer one idea per stage
- Build emotion → then explanation

---

## Presentation Style

The presentation should feel:
- modern
- clean
- cinematic
- slightly playful
- highly legible
- like a product demo or keynote, not a document

---

## Technical Build Requirements

Build the presentation as a React website.

### Required capabilities
- full-screen scenes
- staged reveals within scenes
- camera-based transitions (zoom/pan)
- keyboard navigation
- click/tap progression
- responsive but optimized for large screen

### Suggested stack
- React
- Tailwind CSS
- Framer Motion

---

## Global Visual Language

Use a restrained visual system:
- neutral background (light or dark)
- high contrast text
- red reserved for failure states only
- motion used intentionally, not excessively
- meme usage should feel integrated and purposeful

---

## Content Philosophy

This talk is not arguing that vibe coding is bad.

It is arguing:
- vibe coding gets you to something that works
- but not necessarily something that holds up

The talk should distinguish between:
- a demo that works once
- a system that can survive iteration

---

## Planned Deck Structure

Treat these as **logical scenes**, not separate slides:

1. Build → Break pattern (emotional hook)
2. Dory analogy
3. The Gap (never reaches the ending)
4. Credibility (pattern across projects/tools)
5. Failure patterns (partial updates, duplication, drift)
6. The Shift (prompting → directing)
7. First behavior change (Describe → Plan → Build)
8. Context drift (reinforcing what matters)
9. Prompting approaches (multi-stage evolving scene with zoom)
10. Real-world mapping (integrated into Slide 9 expansion)
11. Contributions (what you can do now)

---

## Implementation Notes for the AI Agent

When building:
- optimize for live speaking rhythm
- avoid over-explaining visually
- prioritize transitions over new screens
- preserve spatial relationships where possible
- use transformation instead of replacement
- treat the presentation as a **single evolving system**

---

## Critical Instruction

This is not a sequence of slides.

This is:
👉 **one continuous visual narrative that evolves over time**

The implementation should reflect that at every level.