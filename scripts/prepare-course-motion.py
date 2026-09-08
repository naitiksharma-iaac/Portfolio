from pathlib import Path
import json, subprocess, concurrent.futures, zipfile, xml.etree.ElementTree as ET, posixpath
root=Path('tmp/course-motion')
items=json.loads((root/'inventory.json').read_text())
ffmpeg='C:/ffmpeg/bin/ffmpeg.exe'; ffprobe='C:/ffmpeg/bin/ffprobe.exe'
def run(args):return subprocess.check_output(args,stderr=subprocess.PIPE)
def prepare(item):
    probe=json.loads(run([ffprobe,'-v','error','-show_streams','-show_format','-of','json',item['input']]))
    video=next(s for s in probe['streams'] if s['codec_type']=='video')
    duration=float(probe['format'].get('duration',video.get('duration',0)) or 0)
    item.update(width=video['width'],height=video['height'],duration=duration,audio=any(s['codec_type']=='audio' for s in probe['streams']))
    dest=Path('static-portfolio/assets/projects')/('biopol-3d-printing' if item['group']=='biopol' else 'aerie-teaching')/'motion'
    dest.mkdir(parents=True,exist_ok=True)
    output=dest/(item['slug']+'.mp4')
    args=[ffmpeg,'-y','-v','error','-i',item['input'],'-map','0:v:0','-map','0:a?']
    gif=item['input'].endswith('.gif')
    large=Path(item['input']).stat().st_size>20_000_000
    if video['codec_name']=='h264' and video.get('pix_fmt')=='yuv420p' and not large:args+=['-c:v','copy']
    else:
        filters="scale=w='min(1920,iw)':h=-2,pad=ceil(iw/2)*2:ceil(ih/2)*2"
        if gif:filters+=",fps=30,tpad=stop_mode=clone:stop_duration=30"
        args+=['-vf',filters,'-c:v','libx264','-preset','fast','-crf','18','-pix_fmt','yuv420p','-threads','2']
        if gif:args+=['-t',str(max(duration,.1))]
    args+=['-c:a','aac','-b:a','160k','-movflags','+faststart',str(output)]
    if not output.exists() or gif or large:run(args)
    poster=dest/(item['slug']+'.jpg')
    if not poster.exists():run([ffmpeg,'-y','-v','error','-ss',str(min(duration*.3,3)),'-i',str(output),'-frames:v','1','-vf','scale=in_range=auto:out_range=full,format=yuvj420p','-q:v','2',str(poster)])
    # Very sparse GIFs may have no seekable frame at the chosen timestamp.
    if not poster.exists():run([ffmpeg,'-y','-v','error','-i',str(output),'-frames:v','1','-vf','scale=in_range=auto:out_range=full,format=yuvj420p','-q:v','2',str(poster)])
    # Keep an original GIF available, while the inline MP4 permits pause and efficient playback.
    if item['input'].endswith('.gif'):
        original=dest/(item['slug']+'.gif');original.write_bytes(Path(item['input']).read_bytes())
        item['originalGif']=original.name
    item['file']=output.name;item['poster']=poster.name
    item['contexts']=[]
    for source in item['sources']:
        if '!' not in source:continue
        deck,media=source.split('!')
        with zipfile.ZipFile(deck) as z:
            for relname in z.namelist():
                if not relname.startswith('ppt/slides/_rels/'):continue
                if any(posixpath.normpath(posixpath.join('ppt/slides',r.attrib.get('Target','')))==media for r in ET.fromstring(z.read(relname))):
                    slide=relname.replace('/_rels','').removesuffix('.rels')
                    text=[t.text for t in ET.fromstring(z.read(slide)).iter() if t.tag.endswith('}t') and t.text]
                    item['contexts'].append({'deck':Path(deck).name,'slide':slide,'text':' '.join(text)})
    print(item['slug'],video['width'],video['height'],round(duration,1),flush=True)
    return item
with concurrent.futures.ThreadPoolExecutor(max_workers=2) as pool:results=list(pool.map(prepare,items))
(root/'prepared.json').write_text(json.dumps(results,indent=2))
for group in ['biopol','aerie']:
    dest=Path('static-portfolio/assets/projects')/('biopol-3d-printing' if group=='biopol' else 'aerie-teaching')/'motion'
    (dest/'sources.json').write_text(json.dumps([i for i in results if i['group']==group],indent=2))
