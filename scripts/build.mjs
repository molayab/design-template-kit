#!/usr/bin/env node
// Builds dist/*.css by inlining `@import './x.css'` chains, so consumers (and CDNs) get one
// request per entry instead of a waterfall. No dependencies. Run: npm run build

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const entries = { 'core.css': 'src/index.css', 'foundation.css': 'src/foundation.css', 'tokens.css': 'src/tokens.css' };
const IMPORT = /^@import\s+['"](\.[^'"]+)['"];\s*$/gm;

function inline(file, seen = new Set()) {
  const abs = resolve(root, file);
  if (seen.has(abs)) return '';           // each partial is emitted once, at its first import
  seen.add(abs);
  const src = readFileSync(abs, 'utf8');
  return src.replace(IMPORT, (_, rel) => inline(resolve(dirname(abs), rel), seen).trimEnd() + '\n');
}

mkdirSync(resolve(root, 'dist'), { recursive: true });
const pkg = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'));
for (const [out, entry] of Object.entries(entries)) {
  const css = `/* design-template-kit v${pkg.version} — ${out} */\n${inline(entry).trimEnd()}\n`;
  writeFileSync(resolve(root, 'dist', out), css);
  console.log(`dist/${out}  ${(css.length / 1024).toFixed(1)} KB`);
}
