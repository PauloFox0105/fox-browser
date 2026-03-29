---
name: dev-browser
description: Browser automation with persistent page state. Use when users ask to navigate websites, fill forms, take screenshots, extract web data, test web apps, or automate browser workflows. Trigger phrases include "go to [url]", "click on", "fill out the form", "take a screenshot", "scrape", "automate", "test the website", "log into", or any browser interaction request.
---

# Dev Browser

A CLI for controlling browsers with sandboxed JavaScript scripts.

## Installation

```bash
npm install -g dev-browser
dev-browser install
```

## Usage

Run `dev-browser --help` to learn more.

## FOX Digital Rules

When operating in the FOX ecosystem, follow these rules:

### Domain Verification
- Before navigating, verify the target domain is in `config/fox-domains.json`
- If domain is in `blocked_domains`, refuse and report
- If domain is not in `allowed_domains`, warn the user before proceeding

### Action Reporting
- Report each action BEFORE executing it
- Format: `[FOX-BROWSER] action: navigate to example.com`
- Wait for confirmation on destructive actions (form submit, delete, payment)

### Audit Log
- Every action is logged to `~/.fox-browser/audit.log`
- Format: `{timestamp} | {url} | {action} | {result}`
- Log is append-only, never truncated during a session

### Safety Limits
- Maximum 50 actions per session
- 30-minute session timeout
- No navigation to non-HTTPS URLs (except localhost)
- Mandatory confirmation before form submissions
