---
name: visual-browser-qa
description: Use for frontend and browser verification requiring DOM, accessibility, behavior, console, network, or visual evidence.
---

# Visual Browser QA

The task manifest or assignment defines product flows, states, viewports,
expected behavior, evidence, output ownership, and task-specific stop conditions.
This skill exclusively defines the generic inspection method; reusable task
specs should say `Apply: visual-browser-qa skill` instead of copying it.

- Start or reuse the correct server safely and verify the target origin before captures.
- Inspect DOM and accessibility structure before relying on screenshots.
- Exercise focus, keyboard navigation, back, Escape, and reduced-motion behavior when relevant.
- Inspect console and network for errors or unexpected requests.
- Capture screenshots only when visual judgment or evidence requires them.
- Distinguish observed behavior, intentional blockers, unknowns, and defects.
- Use qualitative ratings or a coarse 1-5 scale unless a calibrated rubric
  justifies greater precision.
- Stop after three access failures or two repeated no-evidence loops unless new evidence justifies a different approach.
