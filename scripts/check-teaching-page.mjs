import { readFileSync } from 'node:fs';
const html=readFileSync('static-portfolio/teaching.html','utf8');
const refs=[...html.matchAll(/(?:src|href)="([^"]+)"/g)].map(m=>m[1]).filter(u=>!u.startsWith('http')&&!u.startsWith('#'));
const failures=[];
for(const ref of new Set(refs)) {
 const response=await fetch('http://localhost:8081/'+ref);
 if(!response.ok) failures.push([ref,response.status]);
}
for(const ref of [...html.matchAll(/href="#([^"]+)"/g)].map(m=>m[1])) if(!html.includes('id="'+ref+'"')) failures.push(['anchor',ref]);
const manifest=JSON.parse(readFileSync('static-portfolio/assets/projects/aerie-teaching/course/sources.json','utf8'));
console.log(JSON.stringify({references:new Set(refs).size,images:(html.match(/<img /g)||[]).length,sections:(html.match(/<section /g)||[]).length,failures},null,2));
if(failures.length)process.exitCode=1;
