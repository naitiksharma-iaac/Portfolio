import { chromium } from './browser/node_modules/playwright/index.mjs';
import { writeFile } from 'node:fs/promises';
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const results=[];
for(const width of [1440,390]){
 const page=await browser.newPage({viewport:{width,height:1000},deviceScaleFactor:1});
 const failures=[];page.on('pageerror',e=>failures.push(e.message));page.on('response',r=>{if(r.status()>=400)failures.push(`${r.status()} ${r.url()}`)});
 for(const [name,url] of [['home','http://localhost:8080/'],['hilton','http://localhost:8080/projects/hilton-hotel-nepal.html']]){
  await page.goto(url);await page.locator('img').evaluateAll(async imgs=>{for(const i of imgs){i.loading='eager'}await Promise.all(imgs.map(i=>i.decode().catch(()=>{})))});
  results.push({width,name,failures:[...failures],...await page.evaluate(()=>({title:document.title,overflow:document.documentElement.scrollWidth>innerWidth,broken:[...document.images].filter(i=>!i.naturalWidth).map(i=>i.src),projects:document.querySelectorAll('.home-entry').length,sections:document.querySelectorAll('section').length}))});
  await page.screenshot({path:`tmp/jeddah-review/${name}-${width}.png`,fullPage:true});
 }
 await page.close();
}
await browser.close();console.log(JSON.stringify(results,null,2));await writeFile('tmp/jeddah-review/browser-results.json',JSON.stringify(results,null,2));
