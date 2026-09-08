import {readFile,writeFile,mkdir,copyFile} from 'node:fs/promises';
const root='static-portfolio/assets/projects';
const records=JSON.parse(await readFile(root+'/aerie-teaching/motion/sources.json','utf8'));
const mapping={
 13:['robotic-drawing','physical-drawing'],14:['hilton-hotel-nepal','band-control'],15:['hilton-hotel-nepal','facade-continuity'],16:['hilton-hotel-nepal','surface-control'],
 17:['post-digital-temples','temple-profile'],18:['post-digital-temples','stepped-plan'],19:['post-digital-temples','plan-variation'],20:['post-digital-temples','temple-elevation'],21:['post-digital-temples','design-family'],22:['post-digital-temples','learned-form'],
 23:['tectonics-of-stock-assemblies','physical-assembly'],24:['robotic-drawing','robot-simulation'],25:['robotic-drawing','drawing-toolpath'],26:['tectonics-of-stock-assemblies','assembly-logic'],27:['tectonics-of-stock-assemblies','material-assembly'],28:['tectonics-of-stock-assemblies','robotic-timber-milling']
};
const placements=[];
for(const [number,[project,name]] of Object.entries(mapping)){
 const item=records.find(x=>x.slug==='aerie-'+number.padStart(2,'0'));
 const target=root+'/'+project+'/motion';
 await mkdir(target,{recursive:true});
 for(const ext of ['mp4','jpg',...(item.originalGif?['gif']:[])])await copyFile(root+'/aerie-teaching/motion/'+item.slug+'.'+ext,target+'/'+name+'.'+ext);
 placements.push({...item,project,destination:name,route:project==='robotic-drawing'?'projects/working-with-robots.html#drawing':'projects/'+project+'.html'});
}
await writeFile('tmp/course-motion/placements.json',JSON.stringify(placements,null,2));
for(const project of new Set(placements.map(x=>x.project)))await writeFile(root+'/'+project+'/motion/sources.json',JSON.stringify(placements.filter(x=>x.project===project),null,2));
console.log('Copied 16 project sequences to their own asset collections. Original source files preserved.');
