import sharp from 'sharp';
import {mkdir,writeFile} from 'node:fs/promises';
const root='project-references/Biopol-3Dprinting_Workshop';
const evidence='tmp/biopol-evidence';
const out='static-portfolio/assets/projects/biopol-3d-printing';
await mkdir(out,{recursive:true});
const selections={
 'arch-components':[root,'5.jpg'], 'arch-series-small':[root,'1.jpg'], 'arch-series-large':[root,'10 (2).jpg'],
 'prototype-dimensions':[root,'proto1.jpg'], 'prototype-parts':[root,'proto8.jpg'],
 'slicing-surface':[root,'proto10.jpg'], 'slicing-toolpath':[root,'proto11.jpg'],
 'infill-plan':[root,'plan_brick7.png'], 'infill-perspective':[root,'perspective_view_brick7.png'],
 'velocity':[root,'printVelocities.png'], 'bead-width':[root,'beadWidth.png'],
 'displacement':[root,'displacement.png'], 'collapse':[root,'Collapse Prediction.png'],
 'learning':[root,'learning.png'],
 'vault-form':[evidence,'slide-14-image41.png'], 'form-finding':[evidence,'slide-13-image40.png'],
 'printed-count':[evidence,'slide-30-image65.png'], 'speed-test':[evidence,'slide-39-image70.jpeg'],
 'robot-printing':[evidence,'slide-42-image73.png'], 'brick-eight-test':[evidence,'slide-49-image91.jpeg'],
 'brick-seven-test':[evidence,'slide-52-image106.jpeg'], 'team-rewards':[evidence,'slide-46-image78.png'],
 'framework-rewards':[evidence,'slide-46-image77.png'], 'vault-visualisation':[evidence,'slide-54-image107.png']};
const manifest={};
for(const [name,[dir,file]] of Object.entries(selections)){
 const info=await sharp(`${dir}/${file}`).rotate().flatten({background:'#ffffff'}).resize({width:2600,withoutEnlargement:true}).webp({quality:95,effort:2}).toFile(`${out}/${name}.webp`);
 manifest[name]={source:`${dir}/${file}`,width:info.width,height:info.height};
}
await writeFile(`${out}/source-manifest.json`,JSON.stringify(manifest,null,2));
console.log(`Prepared ${Object.keys(manifest).length} images without upscaling.`);
