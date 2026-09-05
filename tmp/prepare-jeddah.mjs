import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
const out='static-portfolio/assets/projects/arwad-tower-jeddah';
await mkdir(out,{recursive:true});
const renders=[['hero','Image_18.png'],['terraces','Q_2.png'],['facade-detail','Image 12.png'],['street-view','Image_21.png'],['night-view','A_1.png'],['front-view','Image_19.png']];
for(const [name,file] of renders) await sharp('project-references/JeddahProject/'+file).resize({width:1800,withoutEnlargement:true}).webp({quality:86}).toFile(`${out}/${name}.webp`);
for(const name of ['site-access','urban-envelope','urban-alignments','sun-hours','incident-radiation','option-one','option-two','programme-section','office-plan','office-variants','parking-section']) await sharp(`tmp/jeddah-review/${name}.png`).webp({quality:92}).toFile(`${out}/${name}.webp`);
await sharp(`${out}/hero.webp`).resize({width:900}).webp({quality:84}).toFile(`${out}/home.webp`);
console.log('Prepared 18 web images');
