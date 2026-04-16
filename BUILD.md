# Build Instructions

## How to Use This Project

This folder contains a presentation system.

- `ai_slide_deck_overview.md` = overall experience and architecture
- `slide1.md` → `slide10.md` = scene definitions

Treat each slide file as:
- a logical scene
- not a hard page boundary

## Critical Requirements

- This is NOT a slide deck
- Build as a continuous scene-based presentation
- Use camera movement (zoom, pan, focus)
- Maintain visual continuity between sections

## Interaction Model

- Right arrow / space / click → advance stage
- Left arrow → go back
- Each slide contains multiple stages

## Implementation Order

1. Build presentation shell (navigation + scene system)
2. Implement stage reveal system
3. Implement shared visual system
4. Then implement slides in order

## Visual Priority

- Consistency over creativity
- Motion quality over quantity
- Readability over density

## Important Rule

When slide specs and visual consistency conflict:
→ preserve meaning, normalize implementation

## Agent Behavior Rules

You are not generating a static site.

You are implementing a continuous presentation system.

Follow this workflow:

1. Read all docs before coding
2. Build shared presentation primitives first (scene system, transitions, reveal system)
3. Then implement scenes using those primitives
4. Do NOT hardcode slide-specific logic if it can be generalized
5. Maintain a consistent visual system across all scenes
6. If a slide spec conflicts with the visual system, preserve intent but normalize implementation

Always optimize for:
- continuity between scenes
- elegance of transitions
- live presentation rhythm