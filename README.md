# OpenCode Orchestration Architecture

> A practical, picker-authoritative multi-agent coding harness for OpenCode.

This repository documents and packages a production-minded orchestration pattern:

- the model selected in the OpenCode picker is the primary orchestrator;
- specialist workers are assigned bounded, non-overlapping work;
- GLM-5.3-Flash is the reference worker model where configured;
- durable context is filesystem-native and proportional to task complexity;
- verification, ownership, evidence, and security boundaries remain explicit;
- compact transport never replaces materially necessary knowledge.

The design is intentionally lean. It uses Markdown, repository paths, OpenCode agents, and one small configuration plugin. It does not require a database, vector store, custom protocol, or orchestration service.

## Why This Exists

Multi-agent systems often waste context in two ways:

1. The orchestrator repeatedly pastes the same requirements, source excerpts, and history into every worker prompt.
2. Workers repeat broad discovery and full-suite verification because ownership and completion criteria are unclear.

This architecture addresses both problems without turning the repository into a second issue tracker. Normal tasks use concise English. Substantial tasks may use one task manifest. Repeated procedures may use one reusable specification.

## Architecture

```text
User
  |
  v
Picker-selected primary orchestrator
  |  owns intent, decomposition, integration, and final acceptance
  |
  +--> bounded explorer / researcher
  +--> bounded implementer
  +--> bounded tester / reviewer
  +--> visual-browser QA when needed
          |
          v
     repository source, tests, evidence, and durable state
          |
          v
     compact result with verification and remaining risks
```

The orchestrator is model-neutral. The example configuration defaults to Astra, but the picker or an explicit model selection can choose another supported primary model. Worker defaults remain independently configured.

## Three-Tier Context Model

| Tier | Use when | Transport | Durable files |
| --- | --- | --- | --- |
| 1. Normal | One bounded task with obvious scope | Concise natural language | None required |
| 2. Substantial | Shared criteria, handoffs, dependencies, or resumption | One task manifest | `docs/agent/tasks/` |
| 3. Repeated workflow | A detailed procedure is stable and reused | Manifest plus one spec | `docs/agent/specs/` |

Optional domain files belong in `docs/agent/domains/` only after repeated subsystem work proves they are useful.

### Tier 1

```text
Role: implementer

Task:
Fix mobile overflow in the selector.

Read:
- src/components/selector/Selector.tsx
- tests/selector.spec.ts

Own:
- src/components/selector/Selector.tsx

Acceptance:
- no horizontal overflow at 390x844
- desktop behavior unchanged

Verify:
- selector tests
- Playwright at 390x844 and desktop
```

### Tier 2

```text
Task: EXAMPLE-Q02
Role: ui-qa
Context: docs/examples/agent/tasks/EXAMPLE-Q02.md
Output: qa/upgrade-final/**
```

### Tier 3

```text
Task: EXAMPLE-Q02
Context: docs/examples/agent/tasks/EXAMPLE-Q02.md
Procedure: docs/examples/agent/specs/post-upgrade-visual-qa.md
```

The filesystem is the addressing system. Prefer direct paths and headings over opaque aliases, custom resolvers, or registries.

## Truth Model

The harness distinguishes what is true now from what should be true.

### Current-state truth

Used for debugging and inspection:

```text
runtime observation
> actual source
> tests and direct evidence
> current documentation
> task manifests
> worker summaries
> conversation memory
```

### Intended-behavior truth

Used for requirements and acceptance:

```text
applicable system/security constraints
> latest explicit user requirement
> accepted product or architecture decision
> authoritative specification
> acceptance criteria
> tests
> current implementation/runtime
> worker summaries
```

Conflicts are reported and clarified. Existing buggy behavior is never promoted into a requirement merely because it is observable.

## Core Safeguards

- Picker authority: no global plugin rewrites the selected primary model.
- Worker boundaries: ownership, prohibited scope, acceptance criteria, and verification are explicit.
- Adaptive concurrency: use only genuinely independent workstreams; concurrency is a ceiling, not a target.
- Context discipline: workers retrieve source directly instead of receiving pasted source.
- Material discovery persistence: only future-useful information is promoted to task, domain, decision, state, or queue files.
- Targeted verification: workers run the smallest meaningful checks; integration verification is centralized.
- Bounded execution: specialist step budgets remain resource guardrails. A worker may be continued only when new evidence or measurable progress justifies it.
- Stall protection: repeated unchanged failures trigger a clear blocked result rather than silent looping.
- Public-safe configuration: this repository contains no credentials, logs, personal paths, OAuth state, or private project context.

## Repository Layout

```text
.opencode/
  agents/                       # portable role definitions
  plugins/picker-glm-architecture.js
  skills/                       # reusable operational guidance
docs/
  architecture/                 # design, security, and measurement docs
  examples/agent/               # sanitized task/spec/domain examples
scripts/validate-public.ps1     # public-repository security scan
opencode.example.jsonc          # copy into a user's config and customize
```

## Quick Start

1. Review `docs/architecture/architecture.md`.
2. Copy `opencode.example.jsonc` into the appropriate OpenCode configuration scope.
3. Copy or reference the `.opencode/agents`, `.opencode/plugins`, and `.opencode/skills` files.
4. Replace example model IDs with models available to your providers.
5. Keep credentials in OpenCode's supported auth store or environment variables. Never place them in this repository.
6. Start with Tier 1 assignments. Add a task manifest only when it reduces repeated context or improves continuity.
7. Create `.opencode/picker-glm-opt-out` in a project if this plugin's worker defaults and OpenCode Go safety default should not apply there.
8. Run `pwsh -File scripts/validate-public.ps1` before every public push.

## Measurement

The design is not considered successful because assignments are shorter. Measure total cost to accepted completion:

- primary and worker tokens;
- wall-clock time;
- retrieval and tool-call count;
- retries and clarifications;
- acceptance-criteria coverage;
- integration defects;
- stale-context incidents;
- orchestrator interventions.

See `docs/architecture/measurement.md` for the A/B plan.

## Security

Read `SECURITY.md` before adapting this repository. The reference plugin controls model defaults and worker routing; it does not provide authentication, secret storage, sandboxing, or authorization. Those remain environment and OpenCode configuration responsibilities.

## Status

This is a reference architecture, not an OpenCode distribution or a claim that every provider exposes the same models. Validate model availability, permissions, and plugin behavior in the target environment before rollout.

## License

MIT. See `LICENSE`.
