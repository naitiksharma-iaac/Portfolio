import sharp from 'sharp';
import {mkdir,readFile} from 'node:fs/promises';
const source='project-references/Jeddah';
const target='static-portfolio/assets/projects/arwad-tower-jeddah/fresh';
await mkdir(target,{recursive:true});
const files={hero:'Image_18.png',highway:'Image 10.png',facade:'Image 12.png',front:'Image_19.png',street:'Image_21.png',night:'A_1.png',terraces:'Q_2.png',alternate:'002_3.png',development:'a1.jpg',sunpath:'1_1.jpg',phyllotaxis:'Aloe_polyphylla_Spiralis_aloe.jpg'};
for(let i=1;i<=4;i++){files[`unshaded-${i}`]=`1.${i}.jpg`;files[`shaded-${i}`]=`2.${i}.jpg`;}
for(let i=0;i<8;i++)files[`massing-${i+1}`]=i===0?'2.png':`2_${i}.png`;
const dimensions={};
for(const [name,file] of Object.entries(files)){
 const info=await sharp(`${source}/${file}`).flatten({background:'white'}).resize({width:3200,withoutEnlargement:true}).webp({lossless:true}).toFile(`${target}/${name}.webp`);
 dimensions[name]=info;
}
const path='static-portfolio/projects/arwad-tower-jeddah.html';
const original=await readFile(path,'utf8'); let html=original;
const base='../assets/projects/arwad-tower-jeddah/fresh/';
const replacements={'hero-highres':'hero','highway-view':'highway','facade-detail-highres':'facade','front-view':'front','street-view':'street','night-view':'night','terraces':'terraces','option-two-render':'alternate'};
for(const [old,name] of Object.entries(replacements))html=html.replaceAll(`../assets/projects/arwad-tower-jeddah/${old}.webp`,`${base}${name}.webp`);
function figure(name,caption){const d=dimensions[name];return `<figure class="tectonics-figure fresh-source"><a href="${base}${name}.webp" target="_blank" rel="noopener"><img src="${base}${name}.webp" width="${d.width}" height="${d.height}" alt="${caption}" loading="lazy" data-protected-media></a><figcaption class="tectonics-caption">${caption}</figcaption></figure>`;}
function replaceFigure(asset,replacement){html=html.replace(new RegExp('<figure\\b[^>]*>(?:(?!<figure\\b)[\\s\\S])*?'+asset+'\\.webp[\\s\\S]*?</figure>'),replacement);}
replaceFigure('massing-catalogue',`<div class="fresh-study-grid">${Array.from({length:8},(_,i)=>figure(`massing-${i+1}`,`Massing option ${i+1}: office wings, atrium and service volumes within the site.`)).join('')}</div>`);
replaceFigure('form-development',figure('development','Site development: the initial building volume in its surrounding urban context.'));
replaceFigure('facade-radiation',figure('sunpath','Sun-path study around the proposed tower.')+`<div class="fresh-study-grid">${['East','North','West','South'].map((corner,i)=>figure(`unshaded-${i+1}`,`${corner} corner — baseline glazing, before shading.`)+figure(`shaded-${i+1}`,`${corner} corner — with the proposed shading elements.`)).join('')}</div><p class="fresh-study-note">Read each pair on the same radiation scale: blue indicates lower incident solar energy and red indicates higher exposure. These are façade radiation simulations, not humidity maps or measured cooling-energy savings.</p>`+figure('phyllotaxis','Spiral aloe: overlapping leaves provide the geometric reference for the self-shading façade.'));
html=html.replace('arwad-tower-jeddah.css?v=20260907-radiation-study','arwad-tower-jeddah.css?v=fresh-sources-2');
html=html.replace('towerâ€™s','tower’s').replaceAll('Jeddahâ€™s','Jeddah’s').replaceAll('glazingâ€”especially','glazing—especially').replaceAll('sunâ€”before','sun—before').replaceAll('faÃ§ade','façade');
console.log('*** Begin Patch\n*** Update File: '+path+'\n@@\n'+original.trimEnd().split('\n').map(l=>'-'+l.replace(/\r$/,'')).join('\n')+'\n'+html.trimEnd().split('\n').map(l=>'+'+l.replace(/\r$/,'')).join('\n')+'\n*** End Patch');
