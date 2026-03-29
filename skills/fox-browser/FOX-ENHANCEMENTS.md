# FOX Browser — Enhancements over dev-browser

Fork of [SawyerHood/dev-browser](https://github.com/SawyerHood/dev-browser) with security and automation improvements for the FOX Digital ecosystem.

## 1. Domain Whitelist

Verify domains before navigation:
- Allowed domains in `config/fox-domains.json`
- Auto-block unauthorized domains
- Wildcard support (`*.vercel.app`, `*.stripe.com`)

## 2. Audit Log

Record all actions to `~/.fox-browser/audit.log`:
- Timestamp (ISO 8601)
- URL visited
- Action executed (click, fill, screenshot, navigate)
- Auto-screenshot on each navigation

## 3. FOX Mode

FOX-specific automation commands:
- `fox-browser deploy [vercel|vps]` — automate deployments
- `fox-browser stripe [test|live]` — navigate Stripe Dashboard
- `fox-browser test [foxshield|foxreview]` — test checkout flows

## 4. Safety Limits

- Max 50 actions per session
- 30-minute session timeout
- Mandatory confirmation before form submissions
- No navigation to non-HTTPS URLs (except localhost)

## 5. Integration

- Works with FOX ULTRA Signals API
- Compatible with FoxShield/FoxReview testing
- Telegram notifications on critical actions

## Status

Planned enhancements. The base `dev-browser` functionality works as-is.
