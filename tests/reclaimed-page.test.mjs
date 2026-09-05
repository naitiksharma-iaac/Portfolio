import assert from 'node:assert/strict';
import { readFile, access, stat } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const file = path.resolve('static-portfolio/projects/reclaimed-reconfigured-reimagined.html');
const html = await readFile(file, 'utf8');
assert.equal((html.match(/<h1>/g) || []).length, 1);
assert.equal((html.match(/<section /g) || []).length, 11);
assert.equal((html.match(/<video /g) || []).length, 3);
assert(!/slide-gallery|Presentation Sequence|\/slides\/|\.gif["']/i.test(html));
for (const heading of ['Storage as architecture', 'From donor buildings to stock', 'Aggregation', 'Reconfiguration', 'Layering', 'Abundance and scarcity']) {
  assert(html.includes(`<h2>${heading}</h2>`), `Missing chapter: ${heading}`);
}
const urls = [...html.matchAll(/(?:src|href|poster)="([^"]+)"/g)].map(m => m[1]);
for (const url of urls) await access(path.resolve(path.dirname(file), url));
for (const match of html.matchAll(/<img\s[^>]*>/g)) {
  const tag = match[0];
  assert(/alt="[^"]+"/.test(tag), 'Image needs useful alt text');
  const src = tag.match(/src="([^"]+)"/)[1];
  if (!src.endsWith('.svg')) {
    const info = await sharp(path.resolve(path.dirname(file), src)).metadata();
    assert.equal(Number(tag.match(/width="(\d+)"/)[1]), info.width, src);
    assert.equal(Number(tag.match(/height="(\d+)"/)[1]), info.height, src);
  }
}
const media = [...new Set(urls.filter(url => /\/story\//.test(url)))];
const bytes = (await Promise.all(media.map(async url => (await stat(path.resolve(path.dirname(file), url))).size))).reduce((a,b) => a+b, 0);
assert(bytes < 3_000_000, `Page media should remain lightweight: ${bytes}`);
const response = await fetch('http://localhost:8080/projects/reclaimed-reconfigured-reimagined');
assert.equal(response.status, 200);
assert.equal((await response.text()).trim(), html.trim(), 'Preview must serve the edited file');
for (const url of media) {
  const res = await fetch(new URL(url, 'http://localhost:8080/projects/reclaimed-reconfigured-reimagined'), { method: 'HEAD' });
  assert.equal(res.status, 200, `Unavailable media: ${url}`);
}
console.log(`PASS: 11 chapters, 3 videos, ${media.length} media assets, ${(bytes / 1_000_000).toFixed(2)} MB; all local references and preview responses verified.`);
