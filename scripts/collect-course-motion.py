from pathlib import Path
import zipfile, hashlib, json
roots={'biopol':'Biopol-3Dprinting_Workshop','aerie':'TeachingatAerie'}
out=Path('tmp/course-motion');out.mkdir(parents=True,exist_ok=True)
result=[]
for group,folder in roots.items():
    root=Path('project-references')/folder
    seen={}
    candidates=[(str(p),p.read_bytes(),p.suffix.lower()) for p in sorted(root.rglob('*')) if p.suffix.lower() in ['.gif','.mp4','.webm','.mov','.m4v','.avi']]
    for deck in sorted(root.rglob('*.pptx')):
        with zipfile.ZipFile(deck) as archive:
            for name in archive.namelist():
                if name.startswith('ppt/media/') and Path(name).suffix.lower() in ['.gif','.mp4','.webm','.mov','.m4v','.avi']:
                    candidates.append((str(deck)+'!'+name,archive.read(name),Path(name).suffix.lower()))
    for source,data,extension in candidates:
        digest=hashlib.sha256(data).hexdigest()
        if digest in seen:
            seen[digest]['sources'].append(source)
            continue
        slug=f'{group}-{len(seen)+1:02}'
        dest=out/(slug+extension);dest.write_bytes(data)
        item={'group':group,'slug':slug,'input':dest.as_posix(),'sources':[source],'sha256':digest}
        seen[digest]=item;result.append(item)
json.dump(result,(out/'inventory.json').open('w'),indent=2)
for item in result:print(item['slug'],item['input'],item['sources'])
