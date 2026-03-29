# FOX Browser — Enhancements over dev-browser

Fork of [SawyerHood/dev-browser](https://github.com/SawyerHood/dev-browser) with security and automation improvements for the FOX Digital ecosystem.

## 1. Domain Whitelist

Verify domains before navigation:
- Allowed domains listed explicitly in `config/fox-domains.json`
- Auto-block domains in the `blocked_domains` list
- Prefer explicit subdomains over wildcards for security-critical domains (e.g., `dashboard.stripe.com` instead of `*.stripe.com`)

## 2. Audit Log

Record all actions to `~/.fox-browser/audit.log`:
- Timestamp (ISO 8601)
- URL visited (tokens in query params redacted)
- Action executed (click, fill, screenshot, navigate)

Security controls:
- Password and sensitive fields (marked `data-sensitive`) are excluded from logs
- Log file permissions: `600` (owner read/write only)
- Automatic log rotation after 30 days
- Screenshots skip pages with payment forms or password fields

## 3. FOX Mode

FOX-specific automation commands:
- `fox-browser deploy [vercel|vps]` — automate deployments
- `fox-browser stripe [test|live]` — navigate Stripe Dashboard
- `fox-browser test [foxshield|foxreview]` — test checkout flows

## 4. Safety Limits

- Max 50 actions per session
- 30-minute session timeout
- No navigation to non-HTTPS URLs (except localhost)
- Confirmation required for high-risk forms only (payment, delete actions)
- Trusted automation scripts can disable confirmation via `--no-confirm` flag

## 5. Integration

- Works with FOX ULTRA Signals API
- Compatible with FoxShield/FoxReview testing
- Optional Telegram notifications for failed actions (configurable, disabled by default)

## Status

Planned enhancements. The base `dev-browser` functionality works as-is.
