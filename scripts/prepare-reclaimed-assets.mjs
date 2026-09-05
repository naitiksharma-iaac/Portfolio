import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

// Extract project artwork, not presentation-page furniture. Original files stay intact.
const source = path.resolve('project-references/REclaimedREconfiguredREimagined');
const slides = path.join(source, 'PresentationImages/260116_Group 5 final review upload');
const output = path.resolve('static-portfolio/assets/projects/reclaimed-reconfigured-reimagined/story');
await mkdir(output, { recursive: true });
const crops = [
  ['site', 14, 0, 65, 1280, 655],
  ['donor-structures', 20, 799, 52, 416, 630],
  ['inventory', 61, 155, 38, 1020, 635],
  ['programme', 38, 0, 38, 1280, 640],
  ['connection-options', 47, 18, 78, 1245, 560],
  ['milling', 55, 235, 72, 810, 537],
  ['prototype', 58, 192, 59, 884, 591],
  ['frame', 81, 79, 154, 1150, 475],
  ['brick-storage', 83, 144, 90, 1084, 580],
  ['tile-storage', 84, 85, 40, 1010, 600],
  ['section', 96, 0, 145, 1280, 425],
  ['production-hall', 90, 788, 278, 463, 280],
];
for (const [name, slide, left, top, width, height] of crops) {
  await sharp(path.join(slides, `Slide${slide}.JPG`))
    .extract({ left, top, width, height }).webp({ quality: 90 })
    .toFile(path.join(output, `${name}.webp`));
}
for (const [name, file] of [['hero', 'image (14).png'], ['showroom-low', 'showroom layer 1.png'], ['showroom-full', 'showroom layer 4.png']]) {
  await sharp(path.join(source, file), { limitInputPixels: false })
    .resize({ width: 1600, withoutEnlargement: true })
    .flatten({ background: '#ffffff' }).webp({ quality: 87 })
    .toFile(path.join(output, `${name}.webp`));
}
console.log(`Prepared ${crops.length + 3} project images.`);
