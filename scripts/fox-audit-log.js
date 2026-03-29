#!/usr/bin/env node

/**
 * FOX Browser Audit Logger
 *
 * Records browser actions to ~/.fox-browser/audit.log
 * Usage: node fox-audit-log.js <action> <url> [result] [screenshot_path]
 */

import { appendFileSync, existsSync, mkdirSync } from "fs";
import { homedir } from "os";
import { join } from "path";

const FOX_DIR = join(homedir(), ".fox-browser");
const AUDIT_LOG = join(FOX_DIR, "audit.log");

function ensureDir() {
  if (!existsSync(FOX_DIR)) {
    mkdirSync(FOX_DIR, { recursive: true });
  }
}

function logAction(action, url, result, screenshotPath) {
  ensureDir();

  const timestamp = new Date().toISOString();
  const entry = [
    timestamp,
    url || "-",
    action || "-",
    result || "ok",
    screenshotPath || "-",
  ].join(" | ");

  appendFileSync(AUDIT_LOG, entry + "\n", "utf8");
  return entry;
}

function getSessionStats() {
  if (!existsSync(AUDIT_LOG)) {
    return { total: 0, session_start: null };
  }

  const fs = await import("fs");
  const lines = fs.readFileSync(AUDIT_LOG, "utf8").trim().split("\n").filter(Boolean);

  const thirtyMinAgo = Date.now() - 30 * 60 * 1000;
  const sessionLines = lines.filter((line) => {
    const ts = line.split(" | ")[0];
    return new Date(ts).getTime() > thirtyMinAgo;
  });

  return {
    total: sessionLines.length,
    session_start: sessionLines.length > 0 ? sessionLines[0].split(" | ")[0] : null,
    limit_reached: sessionLines.length >= 50,
  };
}

// CLI mode
const args = process.argv.slice(2);
if (args.length > 0) {
  const [action, url, result, screenshot] = args;
  const entry = logAction(action, url, result, screenshot);
  console.log(`[FOX-BROWSER] ${entry}`);
} else {
  console.log("Usage: fox-audit-log.js <action> <url> [result] [screenshot_path]");
  console.log(`Log: ${AUDIT_LOG}`);
}

export { logAction, getSessionStats, AUDIT_LOG, FOX_DIR };
