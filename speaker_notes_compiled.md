# Speaker Notes

## Global Presenter Reminders
- Audience: AI-interested, non-technical founders.
- Core promise: help the audience go from building something that works once to building something that can become a real MVP they can keep improving.
- Core thesis: AI can often generate a working prototype from a simple prompt, but without deliberate direction it tends to create products that become harder to fix, extend, and trust as iteration continues.
- Delivery reminders:
  - Keep the talk accessible and outcome-focused.
  - Avoid technical jargon unless it is absolutely necessary.
  - Build emotion first, then explanation.
  - Treat the slides as visual support, not a script.
  - Keep reinforcing the distinction between a prototype that works once and a system that can survive iteration.

## Opening (Before Slide 1)
- Ask for a hand raise from people who have used AI to build something that worked.
- Ask who then tried to keep building on it and had things start breaking.
- Give the empowerment promise before any visual content appears:
  - "If that's happened to you, by the end of this talk, you'll know how to build with AI in a way that actually holds up, so you can turn what you build into something real, not just something that works once."

## Slide 1 - Build -> Break Pattern
### Visual cue
- `Build -> Fix -> Add -> Add -> Fix -> Add -> Break -> Fix -> Break -> Break -> Break`

### Say
- "It starts like this."
- "You build something. It works."
- "You fix things. Add features."
- "Still feels great."
- "Then something breaks."
- "You fix it."
- "Something else breaks."
- "Then something else breaks."
- "Then something else breaks."
- "At this point, you are not building anymore. You are just trying to keep it from falling apart."

### Timing
- Keep this short and rhythmic.
- Let each reveal feel like one beat in the story.
- Hold after the final state so the audience has a recognition laugh.
- The emotional progression should move from euphoria to momentum to first concern to false confidence to collapse.

### Transition to Slide 2
- "This is what it feels like. It's like building with Dory."

## Slide 2 - Dory Analogy
### Visual cue
- `Eagerly helpful`
- `Can't follow the plot`

### Say
- "This is what it feels like..."
- "It's like building with Dory."
- Pause.
- "She's always eager to help..."
- Pause.
- "But the second she sees a cool turtle, she completely forgets you're trying to find Nemo."
- Pause.
- Optional bridge line:
  - "So every moment makes sense, but the story goes nowhere."

### Timing
- Allow a beat for the audience to recognize Dory.
- Leave room for laughter or recognition after the turtle line.
- Do not rush this slide. It should feel like a calm pause after the chaos of Slide 1.

### Transition to Slide 3
- End on the idea that things make sense moment to moment, but the overall direction gets lost.
- Best bridge: "So every moment makes sense, but the story goes nowhere."

## Slide 3 - Starts Strong, Never Reaches the Ending
### Visual cue
- `Starts strong`
- `Never reaches the ending`

### Say
- "So every moment makes sense..."
- "But the story goes nowhere."
- Pause and let it land.
- "That's what's happening when you build this way."
- "You don't fail at the beginning..."
- "You fail as you try to finish."
- Then translate to product language:
  - "In product terms, you're great at getting to a prototype..."
  - "But you struggle to get to something you can actually build into an MVP."

### Timing
- Brief pause after the first line.
- Slight emphasis on "finish."
- Let the audience feel the move from analogy to consequence.

### Transition to Slide 4
- "I kept running into this across everything I built with AI..."

## Slide 4 - Credibility Across Projects and Tools
### Visual cue
- `I kept hitting this`
- `Across apps, games, tools, sites`

### Say
- "I didn't just run into this once..."
- "I hit it across everything I built with AI: apps, games, internal tools, websites..."
- Pause.
- "And I kept thinking, maybe it's the tool."
- "So I tried different ones: Claude, Codex, Cursor, Antigravity..."
- Pause.
- "Same problem. Every time."
- Give one concrete example:
  - "We'd add a feature, like reacting to posts, and it would show up on the feed..."
  - "...but not on the comment view..."
  - "...and totally break sharing."
- Pause.
- "That's when it clicked. This isn't a one-off bug. It's how the system behaves."

### Timing
- Keep pacing tight.
- Use one short pause before the example and one after it.
- Let the example feel familiar, not technical.

### Transition to Slide 5
- "And it wasn't random. It kept breaking in the same ways."

## Slide 5 - Repeatable Failure Patterns
### Visual cue
- `Partial updates`
- `Duplication`
- `System drift`

### Speaker definitions
- Partial updates:
  - A feature gets applied in some places but not others.
  - Example: reactions appear on posts, but not on comments or chat.
- Duplication:
  - Instead of updating an existing system, AI creates a new version.
  - Example: multiple inputs or multiple follow systems.
- System drift:
  - The overall logic becomes inconsistent over time.
  - Example: weekly challenge logic starts conflicting with existing rules.

### Say
- "And it wasn't random..."
- "It kept breaking in the same ways."
- Point to the first pattern.
- "Sometimes it would update part of the system..."
- "...but completely miss the rest."
- Point to the second pattern.
- "Sometimes it wouldn't update the system at all..."
- "...it would just create a new version."
- Point to the third pattern.
- "And over time..."
- "...the whole thing starts to drift."

### Timing
- Short pause after the first line.
- Point to each label as you speak.
- Keep it simple and keep momentum moving.

### Transition to Slide 6
- "Once you see this, you realize the problem isn't the feature."
- "It's how you're directing the system."

## Slide 6 - From Tasking to Directing
### Visual cue
- `From tasking`
- `To directing`

### Say
- "Once you see these patterns, you realize the problem isn't the feature."
- Pause.
- "It's how you're approaching the build."
- Pause.
- "Most people are just giving AI tasks."
- "And that works when you're building something small enough to be one task."
- Pause.
- "But the moment you're building a system that's more than a one-off..."
- Pause.
- "You have to start directing it."
- Optional reinforcement:
  - "AI builds features. You direct the system."

### Timing
- Use more pause here than on the previous slides.
- Emphasize the word "directing."
- Let the reframe land before moving to tactics.

### Transition to Slide 7
- "And that starts with giving the system a direction before you ask it to build anything."

## Slide 7 - Ask How It Should Work First
### Visual cue
- `Don't rush to build`
- `Ask how it should work first`

### Say
- "Here's the small change that makes a huge difference..."
- "Most people describe what they want..."
- "And then immediately ask AI to build it."
- Point to `Describe -> Build`.
- "That only works for simple things."
- Pause.
- "For launchable products, you must..."
- "Ask the AI how it should work."
- Point to `Describe -> Plan -> Build`.
- Then expand slightly:
  - "What's the best way to structure this?"
  - "How should the pieces connect?"
  - "How do we keep this consistent as it grows?"

### Timing
- Quick pacing at the start.
- Slight emphasis on `Plan`.
- Do not go deep into examples yet.

### Transition to Slide 8
- "And once you do that..."
- "Now you have something to keep consistent."

## Slide 8 - Reinforce What Matters as Things Grow
### Visual cue
- `Stay focused`
- `Reinforce what matters as things grow`

### Say
- "Even if you plan the system..."
- "There's another problem."
- Pause.
- "As the context grows, the AI loses focus."
- Point to the drift side.
- "It stops prioritizing the important ideas..."
- "And starts making decisions that are locally correct..."
- "...but globally inconsistent."
- Point to the aligned side.
- "So your job isn't just to plan once..."
- "It's to keep reinforcing what matters."
- Tie back to the examples:
  - "That's why reactions showed up in one place but not another."
  - "That's why inputs drifted."
  - "That's why logic broke over time."

### Timing
- Pause after "loses focus."
- Emphasize "locally correct, globally inconsistent."
- Keep the pacing steady.

### Transition to Slide 9
- "So what does this actually look like in practice?"

## Slide 9 - Use the Right Approach
### Visual cue
- Four columns:
  - `Quick build`
  - `Structured spec`
  - `Planned system`
  - `Full system design`

### Reveal and talk track
1. Empty columns:
   - Let the audience register the structure before you explain it.
2. Labels appear:
   - "This isn't about good versus bad."
   - "Each of these is actually the right approach, depending on what you're building."
3. Walk the approaches left to right:
   - Quick build: "If you're building something simple, just ask AI to build it."
   - Structured spec: "If it's more structured, write a better spec."
   - Planned system: "If it's a real prototype, plan the system."
   - Full system design: "But if you're building something long-term, this is where everything changes."
4. Mapping to real examples:
   - "Here's how I've actually used each of these."
   - Walk across briefly:
     - Quick build -> March Yakness Bracket Site
     - Structured spec -> Pong Rush Game
     - Planned system -> Internal Monitoring Tool
     - Full system design -> Lift & Learn App
5. Zoom into the final column:
   - Point to Lift & Learn.
   - "Lift & Learn is where everything breaks if you don't do this properly."
   - "And this is what it actually looks like."
6. Expanded example:
   - Explain at a high level:
     - define product
     - define docs
     - define rules
     - keep system aligned

### Final line
- "The goal is not just to build something..."
- "It's to build something that holds up."

### Timing
- Keep early stages steady.
- Pause before the real-world mapping.
- Pause longer before the zoom.
- Slow down during the final explanation so the structured example feels usable, not intimidating.

### Transition to Slide 10
- "This is the difference between something that works once..."
- "...and something you can actually build into a product."

## Slide 10 - What You Can Do Now
### Visual cue
- `Turn ideas into buildable MVPs`
- `Keep AI systems from breaking as they grow`
- `Direct AI instead of reacting to it`
- `Build products - not just prototypes`

### Say
- "So now, instead of just prompting AI..."
- "You can actually build something that holds up."
- Pause.
- Walk through the bullets lightly:
  - "You can take an idea and turn it into something you can actually build on."
  - "You can keep it from breaking as it grows."
  - "You can direct the system instead of reacting to it."
  - "And you can build products, not just prototypes."
- Pause.
- Final line:
  - "That's the difference between something that works once and something you can actually build into a real product."

### Timing
- Slow down slightly compared to earlier slides.
- Give each bullet some space.
- Do not rush the closing line.

### Post-slide note
- Leave this slide on screen during Q&A.
- Do not replace it with `Thank you` or `Questions?`
- "I'm Assaf Packin. I build fast prototypes and MVPs, and I spend a lot of time thinking about how to turn the right ones into systems that can scale without falling apart."