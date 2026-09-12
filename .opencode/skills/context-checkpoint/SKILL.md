---
name: context-checkpoint
description: Use at meaningful milestones to persist material discoveries without copying transcripts or routine edits.
---

# Context Checkpoint

Checkpoint only at a material boundary: task completion, architecture decision, blocker, milestone change, or significant verification result.

Classify each discovery:

- current task detail -> task manifest;
- stable subsystem knowledge -> domain file;
- durable choice -> `DECISIONS.md`;
- current status/blocker -> `STATE.md`;
- future work -> `WORK_QUEUE.md`.

If no future agent needs the information, let it remain in the child session. Keep one authoritative home and link to it instead of duplicating the fact.
