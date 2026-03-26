---
name: dev-browser
description: Use the local `dev-browser` CLI for browser automation, screenshots, scraping, and web app testing with persistent page state.
---

# Dev Browser

Use this skill when the user wants browser automation, website inspection, screenshots, data extraction, form filling, click flows, or local web app testing.

## Prerequisites

Make sure the CLI is available before using the skill:

```bash
npm install -g dev-browser
dev-browser install
```

Run `dev-browser --help` whenever you need the latest flags, examples, or API details.

## Operating rules

- Prefer `dev-browser --headless` for unattended runs. Omit `--headless` when visual debugging is useful.
- Write small, focused scripts. Each script should do one thing and log the state needed for the next decision.
- Use descriptive persistent page names with `browser.getPage("name")` so you can resume state across scripts.
- Use `console.log(JSON.stringify(...))` for structured output when the next step depends on parsed state.
- Inside `page.evaluate(...)`, write plain JavaScript only. Do not use TypeScript syntax in the browser context.
- The script sandbox is QuickJS, not Node.js. Do not use `require`, `import`, `process`, `fs`, `fetch`, or `WebSocket`.

## Recommended workflow

1. For unknown pages, start with `page.snapshotForAI()` to inspect the structure.
2. For known selectors or accessible names, use Playwright methods directly: `getByRole`, `locator`, `click`, `fill`, and `waitForURL`.
3. Re-run `page.snapshotForAI({ track: "<page-name>" })` after meaningful page changes when you need an updated structural view.
4. On failures, reconnect to the same page name, capture a screenshot, and log the page URL and title before deciding the next action.

## Examples

Navigate and inspect a page:

```bash
dev-browser --headless <<'EOF'
const page = await browser.getPage("docs");
await page.goto("https://example.com", { waitUntil: "networkidle" });
console.log(JSON.stringify({
  url: page.url(),
  title: await page.title(),
}, null, 2));
EOF
```

Take an AI-oriented page snapshot:

```bash
dev-browser <<'EOF'
const page = await browser.getPage("main");
const result = await page.snapshotForAI({ track: "main" });
console.log(result.full);
EOF
```

Capture a screenshot for debugging:

```bash
dev-browser <<'EOF'
const page = await browser.getPage("checkout");
const path = await saveScreenshot(await page.screenshot(), "debug.png");
console.log(JSON.stringify({
  screenshot: path,
  url: page.url(),
  title: await page.title(),
}, null, 2));
EOF
```

Attach to an existing Chrome session:

```bash
dev-browser --connect <<'EOF'
const tabs = await browser.listPages();
console.log(JSON.stringify(tabs, null, 2));
EOF
```

Pages returned by `browser.getPage(...)` are full Playwright `Page` objects, so use standard Playwright page methods once you have identified the right target.
