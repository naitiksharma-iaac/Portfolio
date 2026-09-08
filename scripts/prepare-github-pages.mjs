import { readdirSync, readFileSync, statSync, existsSync, mkdirSync, copyFileSync } from 'node:fs';
import { resolve, relative, dirname, extname, sep } from 'node:path';

const root = resolve('static-portfolio');
const output = resolve('_site');
if (existsSync(output)) throw new Error('Use a fresh _site directory for a reproducible Pages build.');
const files = new Set();
const missing = new Set();
function include(file) {
  if (files.has(file)) return;
  files.add(file);
  if (!['.html', '.css', '.js'].includes(extname(file))) return;
  const text = readFileSync(file, 'utf8');
  const refs = [...text.matchAll(/(?:src|href|poster|data-src)\s*=\s*["']([^"']+)["']|url\(\s*["']?([^\s)'";]+)|url=([^"'<>\s]+)/gi)];
  for (const match of refs) {
    let ref = (match[1] || match[2] || match[3]).replaceAll('&amp;', '&');
    if (/^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(ref)) continue;
    ref = decodeURIComponent(ref.split(/[?#]/)[0]);
    if (!ref) continue;
    let target = resolve(ref.startsWith('/') ? root : dirname(file), ref.replace(/^\//, ''));
    if (!target.startsWith(root + sep) && target !== root) throw new Error('Reference outside site: ' + ref);
    if (existsSync(target) && statSync(target).isDirectory()) target = resolve(target, 'index.html');
    if (!existsSync(target) && !extname(target) && existsSync(target + '.html')) target += '.html';
    if (!existsSync(target)) { missing.add(relative(root, file) + ': ' + ref); continue; }
    include(target);
  }
}
function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const file = resolve(dir, entry.name);
    if (entry.isDirectory()) walk(file);
    else if (['.html', '.css', '.js'].includes(extname(file)) || dirname(file) === root) include(file);
  }
}
walk(root);
if (missing.size) throw new Error('Broken local references:\n' + [...missing].join('\n'));
const bytes = [...files].reduce((sum, file) => sum + statSync(file).size, 0);
if (bytes > 1_000_000_000) throw new Error(`Pages output exceeds 1 GB: ${bytes} bytes`);
for (const file of files) {
  const target = resolve(output, relative(root, file));
  mkdirSync(dirname(target), { recursive: true });
  copyFileSync(file, target);
}
console.log(`Prepared ${files.size} files, ${(bytes / 1_000_000).toFixed(1)} MB. All local references verified.`);
