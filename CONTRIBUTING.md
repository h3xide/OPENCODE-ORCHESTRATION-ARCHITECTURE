# Contributing

## Design Standards

- Prefer the smallest change that improves verified execution quality.
- Keep normal tasks in readable English; do not introduce protocol theater.
- Add a manifest only when shared context or continuity justifies it.
- Add a reusable spec only when a procedure is stable and likely to recur.
- Preserve the distinction between current-state truth and intended behavior.
- Keep worker permissions and ownership boundaries explicit.
- Do not add provider credentials, private paths, logs, screenshots, or user-specific state.

## Validation

Run:

```powershell
pwsh -File scripts/validate-public.ps1
node --check .opencode/plugins/picker-glm-architecture.js
```

Review the full diff and inspect the staged file list before publishing.
