# Task - EXAMPLE-Q02

## Goal

Run post-upgrade functional and visual QA for the current product flow.

## Relevant files

- `src/`
- `qa/competitors/`
- `qa/upgrade-final/`

## Requirements

- Verify the selector flow on desktop and mobile.
- Preserve intentional prelaunch cart limitations.
- Do not fabricate price, checkout, or licensed-asset evidence.

## Ownership

May write:

- `qa/upgrade-final/**`

Must not modify:

- `src/**`
- `config/**`
- `tests/**`

## Acceptance Criteria

- AC1. Homepage desktop states are captured and reviewed.
- AC2. Selector machine, goals, matching, expansion, and removal states are verified.
- AC3. Mobile selector has no overflow or hidden final content at required viewports.
- AC4. PDP compatibility state remains truthful.
- AC5. Cart limitations and unexpected network requests are classified correctly.
- AC6. Competitor comparison is evidence-backed and avoids false precision.

## Known Blockers

- Price or checkout may be unavailable in prelaunch mode.
- Licensed imagery may not be available for public capture.

## Verification

Apply the generic `visual-browser-qa` skill and the procedure in `../specs/post-upgrade-visual-qa.md`.

## Stop Conditions

- Three access failures.
- Two repeated no-evidence loops without changed state or a new hypothesis.

## Freshness

Last verified: example only
Verified against: current working tree before the QA run

## Continuation

If the worker reaches its invocation limit, return `LIMIT_REACHED` with completed
acceptance criteria, evidence paths, remaining states/checks, blockers, and a
continuation recommendation. Do not report the task as complete.
