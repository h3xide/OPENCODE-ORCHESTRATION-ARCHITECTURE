# Architecture

## Current Reference Architecture

The installed working pattern has four layers:

1. **Primary orchestration**: a model-neutral `orchestrator` agent follows the model selected in the OpenCode picker. The startup example defaults to Astra, but explicit model selection remains authoritative.
2. **Specialist execution**: GLM-5.3-Flash handles bounded exploration, implementation, testing, review, research, browser QA, debugging, and context curation where configured.
3. **Durable state**: project-specific `PROJECT_BRIEF.md`, `STATE.md`, `WORK_QUEUE.md`, and `DECISIONS.md` preserve only verified, future-useful knowledge.
4. **Verification**: workers run focused checks; the orchestrator inspects actual changes and performs integration verification.

The architecture plugin supplies missing worker defaults and keeps OpenCode Go disabled. It deliberately does not rewrite `config.model`, does not read credentials, and preserves explicit project-level model assignments.

## Adaptive Context

The repository is not required to contain a context database. The filesystem is sufficient:

```text
docs/agent/
  PROJECT_BRIEF.md
  STATE.md
  WORK_QUEUE.md
  DECISIONS.md
  tasks/       # only substantial active tasks
  specs/       # only reusable procedures
  domains/     # only mature repeated subsystem knowledge
```

### Normal task

Use concise English. Include role, task, read paths, ownership, acceptance, and verification. Do not create a manifest for an obvious bounded change.

### Substantial task

Use one task manifest when shared acceptance, dependencies, cross-session
continuity, nontrivial ownership, or repeated context creates real coordination
value. Two workers, one blocker, task length, or several steps alone do not
justify it. The manifest is a working set, not a project encyclopedia.

### Repeated workflow

Use one reusable spec when the procedure is stable, detailed, and likely to recur. Project-specific facts remain in the task manifest.

## Coordination Rules

- Start with no more than four independent workstreams. Expand only when ownership and integration remain clear.
- Prefer one writer for shared files and contracts.
- Repeated operations are legitimate after source, inputs, environment,
  hypothesis, or evidence changes. A stall requires unchanged relevant state
  and materially identical failure without new evidence.
- A bounded worker may be continued only when new evidence, a changed hypothesis, or measurable progress justifies it.
- The primary orchestrator does not accept a worker result solely because the worker used many steps.
- A capped unfinished worker returns `LIMIT_REACHED` with completed work,
  verification, remaining work, files/evidence, blockers, and a continuation
  proposal. The overall task remains active until verified DONE, genuine
  BLOCKED, or user interruption.
- Worker returns should state changed files, verification, acceptance status, blockers, and causal explanations for nontrivial failures.

## Source and Requirement Truth

Use current-state evidence to understand what exists. Use intended-behavior
authority to decide what should exist. System, safety, legal, platform, and
explicit contract constraints outrank ordinary task preferences. Then apply the
latest clear in-scope user requirement, accepted decisions, authoritative specs,
acceptance criteria, tests, and current code in that order. Recency alone does
not invalidate an authoritative constraint. Conflicts are surfaced rather than
silently resolved by treating a bug as a requirement.

## What This Architecture Does Not Do

- It does not guarantee provider availability or model quality.
- It does not sandbox tools or replace OpenCode permissions.
- It does not automatically discover all stale references.
- It does not make subjective visual judgment objective.
- It does not eliminate the need for tests, review, or human decisions.
