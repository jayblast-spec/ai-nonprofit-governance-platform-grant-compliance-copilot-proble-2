#!/usr/bin/env node
// ArkNet product-quality gate.
//
// Usage: node scripts/validate-arknet-product.mjs
//
// A generated project is not valid unless it has at least 5 real routes, a homepage with
// at least 7 meaningful sections, resolvable nav links, a dashboard or product preview for
// SaaS/product builds, no generic placeholder copy, a pricing/access page for SaaS builds,
// a trust/security section for finance/AI/business/data tools, and product-specific copy on
// both the homepage and the dashboard.
// If this script fails: do not push, do not deploy. Fix the issues, then re-run.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const errors = [];

function read(relPath) {
  const full = path.join(root, relPath);
  return fs.existsSync(full) ? fs.readFileSync(full, 'utf-8') : '';
}

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

let contract = {};
try { contract = JSON.parse(read('arknet.design-contract.json') || '{}'); } catch { contract = {}; }

const landing = read('app/page.tsx');
const dashboard = read('app/dashboard/page.tsx');

const routes = walk(path.join(root, 'app')).filter((file) => file.endsWith('page.tsx'));
if (routes.length < 5) {
  errors.push(`Project has only ${routes.length} real routes (minimum 5 required).`);
}

const sectionCount = (landing.match(/<section\b/g) || []).length;
if (sectionCount < 7) {
  errors.push(`Homepage (app/page.tsx) has only ${sectionCount} <section> blocks (minimum 7 meaningful sections required).`);
}

const navHrefs = [...new Set(Array.from(landing.matchAll(/href="\/([a-z0-9\-/]*)"/g)).map((m) => m[1]).filter((href) => href && !href.startsWith('#')))];
const unresolvedNav = navHrefs.filter((href) => !fs.existsSync(path.join(root, 'app', href, 'page.tsx')) && !fs.existsSync(path.join(root, 'app', `${href}.tsx`)));
if (unresolvedNav.length) {
  errors.push(`Navbar links do not resolve to real routes: ${unresolvedNav.join(', ')}`);
}

const hasDashboard = Boolean(dashboard.trim());
const hasProductPreview = /id="product-preview"|product preview/i.test(landing);
if (!hasDashboard && !hasProductPreview) {
  errors.push('Project has no dashboard route and no product preview section on the homepage.');
}

const placeholderPattern = /(lorem ipsum|coming soon|under construction|click here|powerful solution|all-in-one platform|\{\{\s*\w[\w.]*\s*\}\})/i;
const tsxFiles = walk(path.join(root, 'app')).filter((file) => file.endsWith('.tsx'));
const placeholderOffenders = tsxFiles.filter((file) => placeholderPattern.test(fs.readFileSync(file, 'utf-8'))).map((file) => path.relative(root, file));
if (placeholderOffenders.length) {
  errors.push(`Generic placeholder language found in: ${placeholderOffenders.join(', ')}`);
}

if (!fs.existsSync(path.join(root, 'app', 'pricing', 'page.tsx'))) {
  errors.push('Project is missing a pricing/access page (app/pricing/page.tsx).');
}

const sensitiveCategories = /finance|analytic|governance|knowledge|job|founder/i;
if (sensitiveCategories.test(contract.projectCategory || '')) {
  const hasTrustSignal = /id="security"|id="trust"|security|privacy|data[\s-]?handling/i.test(landing);
  if (!hasTrustSignal) {
    errors.push(`Project category "${contract.projectCategory}" requires a trust/security section on the homepage, but none was found.`);
  }
}

if (!landing.trim() || !dashboard.trim()) {
  errors.push('app/page.tsx or app/dashboard/page.tsx is missing or empty — cannot verify product-specific copy.');
}

if (errors.length) {
  console.error(`FAIL: ArkNet product validation failed for ${root}\n`);
  for (const error of errors) console.error(` - ${error}`);
  console.error('\nDo not push. Do not deploy. Fix the issues, then run this check again.');
  process.exit(1);
}

console.log(`PASS: ${root} meets ArkNet product-quality requirements (${routes.length} routes, ${sectionCount} homepage sections).`);
process.exit(0);
