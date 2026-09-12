---
name: context-rehydrate
description: Use after compaction, restart, model change, or interruption to recover only the durable context needed for the active work.
---

# Context Rehydration

Read in this order:

1. `docs/agent/PROJECT_BRIEF.md` if present.
2. `docs/agent/STATE.md`.
3. Active rows in `docs/agent/WORK_QUEUE.md`.
4. Relevant sections of `docs/agent/DECISIONS.md`.
5. The active task manifest, if the task has one.
6. Git status and diff.
7. Source files required for the next decision.

Do not load every domain file, archived task, or historical transcript. Revalidate old manifests against relevant source changes before relying on them.
