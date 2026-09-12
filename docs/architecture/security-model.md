# Security Model

## Assets

- provider credentials and OAuth state;
- private source code and customer data;
- screenshots, logs, and browser state;
- repository integrity and deployment credentials;
- model/provider routing policy.

## Trust Boundaries

```text
User and local auth store
        |
        v
OpenCode runtime and permissions
        |
        +--> primary orchestrator
        |        |
        |        +--> worker sessions
        |        +--> repository files
        |        +--> browser/MCP tools
        |
        v
Public repository artifacts
```

Public artifacts must contain only sanitized instructions, examples, and code. They must never contain raw runtime state, logs, credentials, private paths, customer data, or unreviewed screenshots.

## Threats and Controls

| Threat | Control |
| --- | --- |
| Secret publication | `.gitignore`, pre-push scan, staged-diff review, no auth files in the reference tree |
| Prompt injection in source or worker output | Treat reports as claims; verify against source, tests, and evidence |
| Worker scope creep | Explicit ownership and prohibited scope; one writer for shared files |
| Stale task context | Freshness marker plus revalidation against current source and diff |
| Runaway worker cost | Role-specific step budgets, changed-state retry rules, blocked status |
| Silent model substitution | Picker-authoritative orchestrator and no model rewrite in the plugin |
| Unsafe provider routing | Explicit disabled-provider safety default; no credentials or network code in plugin |
| Sensitive browser evidence | Store locally or in a private artifact location; publish only sanitized captures |

## Plugin Security Review

The reference plugin is intentionally narrow:

- it mutates merged configuration only;
- it reads one local opt-out marker;
- it does not call APIs or spawn processes;
- it does not inspect environment variables or auth stores;
- it preserves explicit model settings and existing provider restrictions;
- it always adds `opencode-go` to the disabled-provider list unless the project
  uses the documented opt-out marker.

Create `.opencode/picker-glm-opt-out` in a project when this plugin's defaults
should not apply. The marker skips this plugin only; it does not remove other
global configuration or agent definitions.

Any expansion beyond those properties requires a new threat review.
