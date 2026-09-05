import sharp from 'sharp';
const out='static-portfolio/assets/projects/hilton-hotel-nepal';
for(const [name,file] of [['hero','2.jpg'],['template','IMG20240611144648.jpg'],['mould','IMG20240706160536.jpg'],['assembly','IMG20240707222713.jpg'],['installation','IMG20240624150119.jpg'],['built-facade','IMG20240712183453.jpg']]) await sharp('project-references/HiltonKathmandu/'+file).resize({width:1600,withoutEnlargement:true}).webp({quality:88}).toFile(`${out}/${name}.webp`);
for(const n of ['support-system','support-sequence','section-planes','band-sections','component-labels','cnc-framework','elevation'])await sharp(`tmp/hilton-${n}.png`).webp({quality:94}).toFile(`${out}/${n}.webp`);
