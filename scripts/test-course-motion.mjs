import vm from 'node:vm';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const code=readFileSync('static-portfolio/assets/js/course-motion.js','utf8');
function setup(reduced=false) {
 const listeners={},video={muted:true,ended:false,plays:0,pauses:0,addEventListener:(k,v)=>listeners[k]=v,play(){this.plays++;return Promise.resolve();},pause(){this.pauses++;}};
 let observe;
 const toggle={textContent:'',setAttribute(){},addEventListener(k,v){this.click=v;}};
 const document={hidden:false,querySelectorAll:()=>[video],querySelector:()=>toggle,addEventListener(k,v){this[k]=v;}};
 const media={matches:reduced,addEventListener(k,v){this.change=v;}};
 vm.runInNewContext(code,{document,matchMedia:()=>media,IntersectionObserver:class{constructor(fn){observe=fn;}observe(){}}});
 return {video,document,media,toggle,listeners,show:value=>observe([{target:video,isIntersecting:value}])};
}
let env=setup();env.show(true);assert.equal(env.video.plays,1);
env.show(false);assert.equal(env.video.pauses,1);
env.show(true);env.listeners.pause();env.show(true);assert.equal(env.video.plays,2,'manual pause must persist');
env.toggle.click();assert.equal(env.toggle.textContent,'Enable automatic playback');
env.toggle.click();assert.equal(env.video.plays,3);
env.document.hidden=true;env.document.visibilitychange();assert.ok(env.video.pauses>1);
env=setup(true);env.show(true);assert.equal(env.video.plays,0,'reduced motion must suppress autoplay');
env.toggle.click();assert.equal(env.video.plays,1,'explicit opt-in must allow playback');
console.log('Passed playback, offscreen pause, manual pause, global toggle, tab visibility and reduced-motion checks.');
