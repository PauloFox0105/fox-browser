#!/usr/bin/env node

import { mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, join, relative } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..");

const canonicalSkillPath = join(projectRoot, "skills", "dev-browser", "SKILL.md");
const skillCopyPaths = [
  join(projectRoot, "plugins", "dev-browser", "skills", "dev-browser", "SKILL.md"),
];

const args = process.argv.slice(2);
const checkMode = args.includes("--check");
const unknownArgs = args.filter((arg) => arg !== "--check");

if (unknownArgs.length > 0) {
  console.error(`Unknown argument(s): ${unknownArgs.join(", ")}`);
  process.exit(1);
}

const canonicalContents = readFileSync(canonicalSkillPath, "utf8");
const outOfSyncPaths = skillCopyPaths.filter((path) => {
  try {
    return readFileSync(path, "utf8") !== canonicalContents;
  } catch {
    return true;
  }
});

if (outOfSyncPaths.length === 0) {
  console.log("Skill copies are in sync.");
  process.exit(0);
}

if (checkMode) {
  console.error("Skill copies are out of sync:");
  for (const path of outOfSyncPaths) {
    console.error(`- ${relative(projectRoot, path)}`);
  }
  process.exit(1);
}

for (const path of outOfSyncPaths) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, canonicalContents);
  console.log(`Synced ${relative(projectRoot, path)}`);
}

console.log("Skill copies updated.");
