import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';
const assets = [["1.png","twisted-tower"],["2.png","twisted-tower-top"],["4.png","twisted-tower-base"],["1 (2).png","cellular-shell"],["2 (2).png","cellular-plan"],["5.png","cellular-detail"],["1.1.png","tower-wireframe"],["1.3.png","tower-massing"],["2.1.png","tower-variation-wireframe"],["2.5.png","tower-variation"],["3.3.png","tower-context"],["4.1.png","facade-wireframe"],["4.2.png","facade-solid"],["5.4.png","facade-variation"],["3 (3).png","tower-components"],["fdfdfd.png","live-optimisation"],["Homework-1.png","list-patterns"],["Screenshot 2026-08-20 170551.pngxcvbxmn.png","model-render-comparison"],["xfigura-eefdb0a9_2026-Aug-20_150620.jpg","ai-facade"],["xfigura-62a146a3_2026-Aug-20_161010.jpg","ai-context"],["xfigura-803419a0_2026-Aug-20_141747.jpg","ai-dusk"],["xfigura-26d60b2f_2026-Aug-20_161336.jpg","ai-variation"]];
const source = 'project-references/TeachingatAerie';
const destination = 'static-portfolio/assets/projects/aerie-teaching/course';
await mkdir(destination, {recursive:true});
const manifest=[];
for (const [file,slug] of assets) {
  const result=await sharp(`${source}/${file}`).rotate().resize({width:2600,withoutEnlargement:true}).webp({quality:95,effort:3}).toFile(`${destination}/${slug}.webp`);
  manifest.push({source:file,file:`${slug}.webp`,width:result.width,height:result.height});
}
await writeFile(`${destination}/sources.json`, JSON.stringify(manifest,null,2));
console.log(`Prepared ${manifest.length} images without upscaling.`);
