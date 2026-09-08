from pathlib import Path
import zipfile,xml.etree.ElementTree as ET,posixpath
root=Path('project-references/Biopol-3Dprinting_Workshop')
out=Path('tmp/biopol-evidence');out.mkdir(exist_ok=True)
with zipfile.ZipFile(root/'Biopol Workshop.pptx') as z:
 for i in [3,8,10,13,14,15,18,24,26,28,29,30,31,32,39,40,41,42,43,44,46,47,48,49,51,52,53,54,55,56,57,58,59]:
  name=f'ppt/slides/_rels/slide{i}.xml.rels'
  if name not in z.namelist():continue
  for rel in ET.fromstring(z.read(name)):
   target=rel.attrib.get('Target','')
   if '/media/' not in target:continue
   entry=posixpath.normpath(posixpath.join('ppt/slides',target))
   if entry not in z.namelist():continue
   if Path(entry).suffix.lower() not in ['.png','.jpg','.jpeg']:continue
   dest=out/f'slide-{i:02}-{Path(entry).name}'
   dest.write_bytes(z.read(entry))
   print(dest.name)
