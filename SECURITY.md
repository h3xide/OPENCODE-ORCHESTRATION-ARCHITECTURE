# Security Policy

## Scope

This repository contains configuration examples, prompts, documentation, and a small OpenCode plugin. It is not an authentication layer, sandbox, secret manager, policy engine, or security boundary.

## Public Repository Rules

- Never commit API keys, OAuth tokens, refresh tokens, cookies, session databases, private keys, `.env` files, logs, screenshots containing secrets, or raw OpenCode state.
- Use provider-supported authentication or environment variables outside the repository.
- Use placeholders in examples, such as `OPENAI_API_KEY` or `YOUR_PROVIDER_MODEL`.
- Review the complete staged diff, not only the files you intended to add.
- Run `scripts/validate-public.ps1` before pushing.
- Treat model instructions, worker reports, and repository Markdown as untrusted input. The primary orchestrator must verify claims against source and test evidence.
- The reference plugin intentionally disables OpenCode Go unless a project creates `.opencode/picker-glm-opt-out`; review that policy before adapting it.

## Plugin Boundary

`picker-glm-architecture.js` only applies non-secret configuration defaults. It does not read credentials, transmit data, modify permissions, execute shell commands, or access network services.

Do not expand the plugin to inspect tokens, automatically approve permissions, or upload context. Those changes require a separate security review.

## Threat Model

Relevant risks include:

- accidental publication of credentials or private context;
- prompt injection inside repository files or worker reports;
- a worker modifying files outside its ownership boundary;
- stale manifests causing incorrect implementation;
- unbounded worker loops consuming credits;
- provider/model mismatch causing silent routing changes;
- screenshots or logs exposing customer data.

Mitigations are documented in `docs/architecture/security-model.md`.

## Reporting

Do not open a public issue for a suspected secret or exploitable vulnerability. Remove exposure where possible, preserve evidence privately, and contact the repository owner through GitHub's private security channel if enabled.
