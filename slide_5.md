# Slide 5 Specification

## Slide Purpose
This slide names the **repeatable failure patterns** behind the examples shown in Slide 4.

Slides 1–4 created:
- recognition (this happened to me)
- analogy (Dory)
- consequence (never reaches the ending)
- proof (this happens across projects and tools)

Slide 5 answers:
**What is actually going wrong?**

This slide should make the problem feel:
- predictable
- understandable
- repeatable

It should NOT feel technical or overwhelming.

## Core Idea (locked)

It breaks in the same ways

## On-Slide Text (locked)

Partial updates  
Duplication  
System drift

Keep to exactly three lines. No additional text.

## Pattern Definitions (for speaker, NOT on slide)

### 1. Partial updates
Feature is applied in some places but not others.

Example (already given):
- reactions on posts
- not on comments
- not on chat

### 2. Duplication
Instead of updating an existing system, AI creates a new version.

Example:
- multiple inputs
- multiple follow systems

### 3. System drift
The overall logic becomes inconsistent over time.

Example:
- weekly challenge logic conflicting with existing rules

## Visual Design (locked)

### Primary Visual: System Fragmentation Diagram

Design a simple diagram that shows a system splitting and drifting.

#### Structure:
- Start with one central node (representing the system)
- From that node, branch into 2–3 slightly different versions
- Some branches should:
  - miss elements
  - diverge slightly
  - not reconnect

This should visually communicate:
- inconsistency
- fragmentation
- lack of coordination

#### Layout:
- Text labels (the three patterns) on left or top
- Diagram on right or center
- Maintain strong whitespace

### Visual Principles
- clean and minimal
- no clutter
- no icons competing with the diagram
- no memes

## Typography
- large font (>= 40pt equivalent)
- bold or semi-bold
- clean sans serif

## Color
- neutral base
- subtle differentiation between branches
- slight use of red or warning color for broken paths (minimal)

## Animation

### Entrance
- title text appears first
- each pattern label appears one by one (quick fade)

### Diagram Behavior
- central node appears
- branches grow outward sequentially
- each branch slightly different

### Timing
- keep pacing tight
- each reveal corresponds to one spoken idea

## Speaker Script (guideline)

Say approximately:

"And it wasn’t random…"

"It kept breaking in the same ways."

(point to first)

"Sometimes it would update part of the system…
…but completely miss the rest."

(point to second)

"Sometimes it wouldn’t update the system at all—
…it would just create a new version."

(point to third)

"And over time…
…the whole thing starts to drift."

## Timing and Delivery
- short pause after first line
- point to each label as you speak
- do not over-explain
- keep momentum moving forward

## Transition from Slide 4

Slide 4 ends with:
"Same problem. Every time."

Then:
"And it wasn’t random…"

This slide appears.

## Transition to Slide 6

After explaining the patterns:

"Once you see this…
…you realize the problem isn’t the feature."

"It’s how you’re directing the system."

This leads into the first principle (direction / blueprint).

## Do Not
- do not add more than three patterns
- do not add detailed explanations on slide
- do not use technical jargon
- do not clutter the diagram
- do not add multiple examples

## Success Criteria
The slide is successful if:
- audience recognizes these patterns from their own experience
- the patterns feel simple and reusable
- the audience starts to think: "I’ve seen that"
- it sets up the solution phase naturally

