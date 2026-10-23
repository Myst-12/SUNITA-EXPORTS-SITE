// Pre-makes the image sizes the site shows, so Vercel never has to resize images
// (the free plan allows only 5,000 resizes a month). Runs before every build.
//
// public/images/catalog/cumin-seeds.webp → public/images/_sized/catalog/cumin-seeds-640.webp, -1200.webp …
// The custom loader (src/lib/imageLoader.js) points each <Image> at the nearest size.
// Files that already have all their sizes are skipped, so re-runs take seconds.

import { readdir, stat, mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { IMAGE_WIDTHS, SIZED_DIR } from '../src/lib/imageSizes.mjs';

const ROOT = path.join(process.cwd(), 'public', 'images');
const OUT = path.join(process.cwd(), 'public', SIZED_DIR.replace(/^\//, ''));
const EXT = /\.(webp|jpe?g|png)$/i;

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (full !== OUT) yield* walk(full);
    } else if (EXT.test(entry.name)) {
      yield full;
    }
  }
}

const exists = (p) => stat(p).then((s) => s, () => null);

let made = 0;
let skipped = 0;
const jobs = [];
for await (const file of walk(ROOT)) jobs.push(file);

async function sizeOne(file) {
  const rel = path.relative(ROOT, file).replace(EXT, '');
  const src = await stat(file);
  for (const w of IMAGE_WIDTHS) {
    const out = path.join(OUT, `${rel}-${w}.webp`);
    const have = await exists(out);
    if (have && have.mtimeMs >= src.mtimeMs) { skipped++; continue; }
    await mkdir(path.dirname(out), { recursive: true });
    // Never enlarge: a 900px photo asked for at 1920 is saved at 900.
    await sharp(file).rotate().resize({ width: w, withoutEnlargement: true }).webp({ quality: 80 }).toFile(out);
    made++;
  }
}

// A few at a time so the build machine is not overloaded.
const POOL = 6;
let i = 0;
await Promise.all(Array.from({ length: POOL }, async () => {
  while (i < jobs.length) await sizeOne(jobs[i++]);
}));

console.log(`size-images: ${jobs.length} images, ${made} sizes made, ${skipped} already there`);
