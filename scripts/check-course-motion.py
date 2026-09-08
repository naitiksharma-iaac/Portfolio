from pathlib import Path
from html.parser import HTMLParser
from urllib.request import Request,urlopen
from urllib.parse import urljoin
import json,subprocess,concurrent.futures
class Page(HTMLParser):
    def __init__(self):super().__init__();self.urls=[];self.ids=[];self.anchors=[];self.media=[];self.videos=0
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if 'id' in a:self.ids.append(a['id'])
        if 'data-motion-id' in a:self.media.append(a['data-motion-id'])
        if tag=='video':self.videos+=1
        for key in ['src','href','poster']:
            value=a.get(key,'')
            if value.startswith('#'):self.anchors.append(value[1:])
            elif value and not value.startswith(('http','data:')):self.urls.append(value)
errors=[]
items=json.loads(Path('tmp/course-motion/prepared.json').read_text())
placements=json.loads(Path('tmp/course-motion/placements.json').read_text())
moved={x['slug'] for x in placements}
routes=[('biopol','projects/biopol-3d-printing.html'),('aerie','teaching.html'),('tectonics-of-stock-assemblies','projects/tectonics-of-stock-assemblies.html'),('hilton-hotel-nepal','projects/hilton-hotel-nepal.html'),('post-digital-temples','projects/post-digital-temples.html'),('home','index.html'),('robots','projects/working-with-robots.html')]
for group,route in routes:
    url='http://localhost:8081/'+route
    html=urlopen(url).read().decode();page=Page();page.feed(html)
    if group=='biopol':expected={x['slug'] for x in items if x['group']==group}
    elif group=='aerie':expected={x['slug'] for x in items if x['group']==group}-moved-{'aerie-12'}-{f'aerie-{n}' for n in range(29,58)}
    elif group=='home':expected=set()
    elif group=='robots':expected={'aerie-13','aerie-24','aerie-25','aerie-28','biopol-01','biopol-08','biopol-09','biopol-10'}
    else:expected={x['slug'] for x in placements if x['project']==group}
    if set(page.media)!=expected:errors.append([group,'inventory mismatch'])
    if len(page.media)!=len(set(page.media)):errors.append([group,'duplicate media'])
    if set(page.anchors)-set(page.ids):errors.append([group,'broken anchors'])
    for ref in set(page.urls):
        try:
            response=urlopen(Request(urljoin(url,ref),method='HEAD'))
            if ref.endswith('.mp4') and response.headers['Content-Type']!='video/mp4':errors.append([ref,'wrong MIME'])
        except Exception as error:errors.append([ref,str(error)])
    print(group,'unique media:',len(page.media),'video players:',page.videos,'assets checked:',len(set(page.urls)))
def check(item):
    if item['slug'] in ['aerie-59','aerie-60']:return
    placement=next((x for x in placements if x['slug']==item['slug']),None)
    folder=placement['project'] if placement else ('biopol-3d-printing' if item['group']=='biopol' else 'aerie-teaching')
    filename=placement['destination']+'.mp4' if placement else item['file']
    if item['slug'] in ['aerie-08','aerie-09','aerie-61']:filename=item['slug']+'-cropped.mp4'
    file=Path('static-portfolio/assets/projects')/folder/'motion'/filename
    result=subprocess.run(['C:/ffmpeg/bin/ffmpeg.exe','-v','error','-threads','2','-i',str(file),'-f','null','-'],capture_output=True)
    if result.returncode or result.stderr:errors.append([item['slug'],result.stderr.decode(errors='replace')[:250]])
    meta=json.loads(subprocess.check_output(['C:/ffmpeg/bin/ffprobe.exe','-v','error','-show_entries','format=duration','-of','json',str(file)]))
    if abs(float(meta['format']['duration'])-item['duration'])>max(.3,item['duration']*.05):errors.append([item['slug'],'duration changed'])
    url='http://localhost:8081/assets/projects/'+folder+'/motion/'+filename
    response=urlopen(Request(url,headers={'Range':'bytes=0-31'}))
    if response.status!=206 or len(response.read())!=32:errors.append([item['slug'],'range request failed'])
with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool:list(pool.map(check,items))
print(json.dumps({'media_records':len(items),'errors':errors},indent=2))
if errors:raise SystemExit(1)
