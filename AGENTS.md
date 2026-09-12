# Public Orchestration Reference

This repository is a portable reference architecture for OpenCode. Keep changes small, readable, and verifiable.

## Authority

- The model selected in the OpenCode picker is the default primary orchestrator.
- The user's latest explicit model or role assignment takes precedence when clear and available.
- Do not silently substitute a model or provider.
- Applicable system, security, privacy, and public-contract constraints must be respected even when a task request conflicts with them.

## Context

- Normal tasks use concise English and direct repository paths.
- Use one task manifest only when shared context, dependencies, ownership, or continuity justify it.
- Use one reusable spec only for a stable repeated procedure.
- Do not create universal indexes, aliases, registries, or opaque protocol fields without measured value.
- Preserve material discoveries in the smallest authoritative durable file; let temporary details die with the child session.
- Revalidate old manifests against current source and diff before relying on them.

## Delegation

- Give workers a bounded objective, ownership, prohibited scope, acceptance criteria, verification, and stop conditions.
- Start with no more than four useful independent workstreams. Do not create workers to fill a quota.
- Keep shared-file writes sequential unless ownership is genuinely isolated.
- Workers retrieve source directly instead of receiving pasted source.

## Verification

- Current-state claims require source, runtime, test, or direct evidence.
- Intended behavior comes from applicable constraints, explicit requirements, accepted decisions, specifications, and acceptance criteria.
- Worker reports are claims. Inspect actual diffs and evidence.
- Writers run focused checks. The primary orchestrator performs broad integration checks after the worker wave.
- Do not repeat unchanged passing checks.
- A step cap is not task success. Continue a bounded worker only for concrete progress; otherwise return BLOCKED with evidence.

## Public Safety

- Never commit credentials, auth state, private paths, logs, customer data, or unreviewed screenshots.
- Run `scripts/validate-public.ps1` before publishing.
