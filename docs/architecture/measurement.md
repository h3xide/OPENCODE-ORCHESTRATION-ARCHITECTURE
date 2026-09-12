# Measurement Plan

## Hypothesis

Adaptive durable context reduces repeated instructions and forgotten requirements without increasing total cost or latency.

## Compare

- **Control**: concise natural-language assignment with direct source paths.
- **Treatment**: the same assignment using one task manifest and, only when justified, one reusable procedure spec.

Use representative tasks: bounded implementation, exploration, multi-agent implementation, browser QA, review, and context curation.

## Metrics

```text
primary tokens
worker tokens
total tokens until accepted completion
wall-clock duration
retrieval/tool-call count
file reads
retries
clarifications
acceptance-criteria coverage
integration defects
stale-context incidents
orchestrator interventions
```

## Counting Rules

- Count one task from initial assignment through accepted result.
- Include retrieval and verification work, not just assignment text.
- Record model/provider/session identifiers without publishing credentials.
- Mark quality outcomes from actual acceptance criteria, not subjective impressions alone.
- Record blockers separately from defects.
- Do not claim percentage savings until both control and treatment have comparable runs.

## Decision Rule

Keep a mechanism only if it lowers total cost or latency, improves verified quality or continuity, reduces retries/omissions, or materially improves evidence traceability. Remove mechanisms that add reads, stale state, bookkeeping, or confusion without measurable benefit.
