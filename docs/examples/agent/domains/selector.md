# Domain - Selector

Use this file only when selector work has become repeated enough that stable context is worth maintaining.

## Purpose

Guide a user from machine selection and goals to a truthful matched result and bundle state.

## Important Files

- `src/components/selector/**`
- `src/lib/matching.*`
- `tests/selector.*`

## Invariants

- Unsupported compatibility must not be presented as verified compatibility.
- Goal selection is capped by the product requirement.
- Mobile flows must preserve access to the final result and controls.
- A result expansion must expose the product state it claims to represent.

## Known Pitfalls

- Keyboard dismissal can reveal fixed-footer overlap.
- Search typo handling must not silently broaden into an incorrect match.
- Loading transitions should be distinguished from failed matching.

## Verification

- focused selector tests;
- browser flow at required desktop and mobile viewports;
- console and network inspection when matching or cart behavior changes.
