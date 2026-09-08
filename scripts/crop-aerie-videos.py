from pathlib import Path
import subprocess,json
from PIL import Image
FF='C:/ffmpeg/bin/ffmpeg.exe'
PROBE='C:/ffmpeg/bin/ffprobe.exe'
root=Path('static-portfolio/assets/projects/aerie-teaching/motion')
def run(args):subprocess.run([FF,'-y','-v','error']+args,check=True)
def crop(slug,box):
    run(['-i',str(root/(slug+'.mp4')),'-vf','crop='+box,'-c:v','libx264','-preset','fast','-crf','18','-threads','4','-c:a','copy','-movflags','+faststart',str(root/(slug+'-cropped.mp4'))])
crop('aerie-08','1920:1012:0:34')
# The second growth film has multiple embedded aspect ratios. Crop each frame's
# black surround, then centre the uncropped content on a consistent white canvas.
source=root/'aerie-09.mp4'; dest=root/'aerie-09-cropped.mp4'
meta=json.loads(subprocess.check_output([PROBE,'-v','error','-select_streams','v:0','-show_streams','-of','json',str(source)]))['streams'][0]
w,h=meta['width'],meta['height']
reader=subprocess.Popen([FF,'-v','error','-i',str(source),'-f','rawvideo','-pix_fmt','rgb24','-'],stdout=subprocess.PIPE)
writer=subprocess.Popen([FF,'-y','-v','error','-f','rawvideo','-pix_fmt','rgb24','-s','1392x1014','-r',meta['r_frame_rate'],'-i','-','-i',str(source),'-map','0:v:0','-map','1:a?','-c:v','libx264','-preset','fast','-crf','18','-threads','4','-pix_fmt','yuv420p','-c:a','copy','-movflags','+faststart',str(dest)],stdin=subprocess.PIPE)
count=0
while True:
    frame=reader.stdout.read(w*h*3)
    if not frame:break
    if len(frame)!=w*h*3:raise RuntimeError('Incomplete source frame')
    image=Image.frombytes('RGB',(w,h),frame)
    bbox=image.convert('L').point(lambda p:255 if p>32 else 0).getbbox()
    canvas=Image.new('RGB',(1392,1014),'white')
    if bbox:
        left,top,right,bottom=bbox
        # Discard the thin antialiased outline at the embedded view boundary.
        content=image.crop((left+2,top+2,right-2,bottom-2))
        content.thumbnail((1392,1014),Image.Resampling.LANCZOS)
        canvas.paste(content,((1392-content.width)//2,(1014-content.height)//2))
    writer.stdin.write(canvas.tobytes());count+=1
reader.stdout.close();writer.stdin.close()
if reader.wait()!=0 or writer.wait()!=0:raise RuntimeError('Video conversion failed')
print('aerie-09:',count,'frames preserved',flush=True)
crop('aerie-61','1900:970:4:24')
for slug in ['aerie-08','aerie-09','aerie-61']:
    run(['-ss','3','-i',str(root/(slug+'-cropped.mp4')),'-frames:v','1','-vf','scale=in_range=auto:out_range=full,format=yuvj420p','-q:v','2',str(root/(slug+'-cropped.jpg'))])
print('Three cropped videos and posters prepared; originals unchanged.',flush=True)
