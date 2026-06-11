#!/usr/bin/env node
// Boundary validation gate.
//
// Usage: node scripts/validate-boundaries.mjs
//
// Rules enforced:
//   - No markdown (.md) files inside app/ or public/ — docs live under /docs only.
//   - Page components (app/**/*.tsx) must not contain raw markdown/README content.
//   - content/marketing/en/hero.json and trust.json must define segmented copy
//     (hero: executive/technical/end-user, trust: social/technical/security).
// If this script fails: do not push, do not deploy. Fix the leak, then re-run.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const errors = [];

const MARKDOWN_LEAK_PATTERN = /^#{1,6}\s|```|^## (Getting Started|Installation|Usage|License)/m;

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

for (const dir of ['app', 'public']) {
  for (const file of walk(path.join(root, dir))) {
    if (file.endsWith('.md')) {
      errors.push(`Markdown file found in /${dir}: ${path.relative(root, file)} — docs must live under /docs, not /${dir}.`);
    }
  }
}

for (const file of walk(path.join(root, 'app'))) {
  if (!file.endsWith('.tsx')) continue;
  const content = fs.readFileSync(file, 'utf-8');
  if (MARKDOWN_LEAK_PATTERN.test(content)) {
    errors.push(`${path.relative(root, file)} appears to contain raw markdown/README content — marketing copy must come from /content/marketing, not docs.`);
  }
}

const heroPath = path.join(root, 'content', 'marketing', 'en', 'hero.json');
const trustPath = path.join(root, 'content', 'marketing', 'en', 'trust.json');

if (!fs.existsSync(heroPath)) {
  errors.push('content/marketing/en/hero.json is missing — landing copy must be segmented by audience.');
} else {
  const hero = JSON.parse(fs.readFileSync(heroPath, 'utf-8'));
  for (const segment of ['executive', 'technical', 'end-user']) {
    if (!hero[segment]) errors.push(`content/marketing/en/hero.json is missing the "${segment}" segment.`);
  }
}

if (!fs.existsSync(trustPath)) {
  errors.push('content/marketing/en/trust.json is missing — trust copy must be segmented by audience.');
} else {
  const trust = JSON.parse(fs.readFileSync(trustPath, 'utf-8'));
  for (const segment of ['social', 'technical', 'security']) {
    if (!trust[segment]) errors.push(`content/marketing/en/trust.json is missing the "${segment}" segment.`);
  }
}

if (errors.length) {
  console.error(`FAIL: boundary validation failed for ${root}\n`);
  for (const error of errors) console.error(` - ${error}`);
  console.error('\nDo not push. Do not deploy. Fix the leak, then run this check again.');
  process.exit(1);
}

console.log(`PASS: ${root} has clean docs/marketing-content boundaries.`);
process.exit(0);
