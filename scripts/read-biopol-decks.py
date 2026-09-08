from pathlib import Path
import zipfile,xml.etree.ElementTree as ET,re,sys
root=Path(sys.argv[1] if len(sys.argv)>1 else 'project-references/Biopol-3Dprinting_Workshop')
for path in sorted(root.glob('*.pptx')):
 if len(sys.argv)>2 and path.name not in sys.argv[2:]:continue
 print('\nDECK:',path.name)
 with zipfile.ZipFile(path) as z:
  for name in sorted([n for n in z.namelist() if re.fullmatch(r'ppt/slides/slide\d+\.xml',n)],key=lambda n:int(re.search(r'(\d+)\.xml',n)[1])):
   el=ET.fromstring(z.read(name)); texts=[t.text for t in el.iter() if t.tag.endswith('}t') and t.text]
   print('\n'+name+'\n'+'\n'.join(texts))
