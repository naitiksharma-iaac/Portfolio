import sharp from 'sharp';
import {mkdir} from 'node:fs/promises';
await mkdir('static-portfolio/assets/projects/hilton-hotel-nepal',{recursive:true});
await sharp('project-references/HiltonKathmandu/1.jpg').resize({width:1300}).webp({quality:88}).toFile('static-portfolio/assets/projects/hilton-hotel-nepal/home.webp');
