import sharp from 'sharp';
import {readdir} from 'node:fs/promises';
const dir=process.argv[2] || 'project-references/Jeddah';
const names=(await readdir(dir)).filter(n=>/\.(png|jpe?g)$/i.test(n));
const layers=[];
for(const [i,name] of names.entries()){
 const m=await sharp(`${dir}/${name}`).metadata();
 console.log(name,m.width,m.height);
 const thumb=await sharp(`${dir}/${name}`).flatten({background:'white'}).resize(360,220,{fit:'contain',background:'white'}).png().toBuffer();
 const label=Buffer.from(`<svg width="360" height="30"><rect width="360" height="30" fill="white"/><text x="8" y="21" font-size="17">${name}</text></svg>`);
 layers.push({input:thumb,left:i%4*360,top:Math.floor(i/4)*250},{input:label,left:i%4*360,top:Math.floor(i/4)*250+220});
}
await sharp({create:{width:1440,height:Math.ceil(names.length/4)*250,channels:3,background:'white'}}).composite(layers).jpeg({quality:90}).toFile(process.argv[3] || 'tmp/jeddah-fresh-contact.jpg');
