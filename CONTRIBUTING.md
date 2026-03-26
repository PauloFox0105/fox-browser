# Contributing to dev-browser

Thank you for your interest in contributing!

## Before You Start

**Please open an issue before submitting a pull request.** This helps us:

- Discuss whether the change aligns with the project's direction
- Avoid duplicate work if someone else is already working on it
- Provide guidance on implementation approach

For bug reports, include steps to reproduce. For feature requests, explain the use case.

## Pull Request Process

1. Open an issue describing the proposed change
2. Wait for maintainer feedback before starting work
3. Fork the repo and create a branch from `main`
4. Make your changes, ensuring tests pass (`npm test`) and types check (`npx tsc --noEmit`)
5. Submit a PR referencing the related issue

## Skill Sync

Edit the canonical dev-browser skill at `skills/dev-browser/SKILL.md`.

When you change that file, run `npm run sync-skills` to copy it to plugin locations such as `plugins/dev-browser/skills/dev-browser/SKILL.md`.

CI runs `npm run sync-skills -- --check`, so plugin copies must stay in sync with the canonical skill.

## Questions?

Open an issue with your question - we're happy to help.
