from pathlib import Path
from PIL import Image
import re
p=Path('static-portfolio/projects/arwad-tower-jeddah.html');t=p.read_text(encoding='utf-8')
def figure(name,alt,caption):
 w,h=Image.open(p.parent.parent/f'assets/projects/arwad-tower-jeddah/{name}.webp').size
 return f'\n<figure class="tectonics-figure tectonics-workflow-figure"><a href="../assets/projects/arwad-tower-jeddah/{name}.webp" aria-label="View full-size image: {alt}"><img src="../assets/projects/arwad-tower-jeddah/{name}.webp" alt="{alt}" width="{w}" height="{h}" loading="lazy" data-protected-media></a><figcaption class="tectonics-caption">{caption}</figcaption></figure>\n'
def copy(id,paras):
 global t
 pat=rf'(<section[^>]+id="{id}".*?<div class="tectonics-section-copy">).*?(</div>)'
 t,n=re.subn(pat,lambda m:m[1]+'\n'+''.join('<p>'+v+'</p>\n' for v in paras)+m[2],t,count=1,flags=re.S);assert n==1,id
copy('massing',[
'The computational workflow begins with a catalogue of <strong>eight massing options</strong>. Core placement, commercial-space distribution and parking layouts are varied to generate different configurations. Each option is compared through its programme distribution, built-up area (BUA) and daylight performance on a typical floor.',
'A parametric workflow enables <strong>rapid data extraction and automated comparison</strong> of area efficiency and daylight. The catalogue places massing views, programme diagrams and daylight-factor maps side by side, making the consequences of each geometric decision visible within one comparison.',
'<strong>Option 1 was selected because it achieved the maximum BUA while allowing ample daylight through the atrium.</strong> This establishes the next design problem: how to protect the glazing from harsh sunlight while retaining the benefits of the chosen massing.'
])
# Replace the isolated Option 2 illustration with the complete comparison, ahead of Option 1.
t=re.sub(r'<figure\b(?:(?!</figure>).)*?option-two.webp.*?</figure>','',t,flags=re.S)
start=t.index('<section class="tectonics-section" id="massing"');idx=t.index('<figure',start)
t=t[:idx]+figure('massing-catalogue','Eight massing options with programme distributions and daylight-factor maps','Eight-option catalogue comparing form, area distribution and typical-floor daylight. The highlighted first row is the selected option. Summer Portfolio, p. 11; original programme and daylight-factor legends retained.')+t[idx:]
copy('programme',[
'The building combines commercial activity at its base with flexible offices above. The portfolio describes the <strong>first two floors as commercial space</strong>, while the raised podium accommodates parking and commercial uses. The full-height atrium links the vertical organisation with daylight access into the office volume.',
'The earlier presentation sections below explain the relationship between offices, core, atrium and lower-level uses. Parking studies test basement, ground and first-floor arrangements as part of the design development.'
])
copy('workplace',[
'The office floors are designed for <strong>subletting to different companies</strong>. Adaptable internal partitions allow administrative offices to occupy and subdivide the floor plate, while circulation and service cores provide a stable framework. The planning studies test two-, four- and six-office layouts.',
'A <strong>full-height atrium, open terraces and informal meeting spaces</strong> complement the individual offices. Flexibility therefore operates at two scales: within the rentable units and across the shared spaces that support the building’s working life.'
])
copy('climate',[
'The portfolio’s dry-bulb temperature study highlights summer working-hour temperatures exceeding <strong>45°C</strong>, establishing the need for effective façade shading. The wider site appraisal studies wind, humidity, thermal comfort, direct sun hours and incident radiation, with east and west exposure identified as important design concerns.',
'The site-scale diagrams below establish the environmental context. The design then moves to a more specific test of <strong>radiation on the glass panels, before and after shading devices are added</strong>, shown in the façade study later on this page.'
])
copy('terraces',[
'The form-development sequence starts with the site, raises a podium for parking and commercial uses, and places the office tower above it. The volume is then <strong>pushed inward at the centre on two sides</strong>, creating open spaces and breaking down the mass.',
'The configuration is further refined to open views towards the surrounding city, before shading devices and façade details are introduced. In the developed renderings, the central recess becomes a series of curved planted terraces between the office wings. This links the formal operation to outdoor space, views and the building’s shared workplace programme.'
])
start=t.index('<section class="tectonics-section" id="terraces"');idx=t.index('<figure',start);t=t[:idx]+figure('form-development','Six-stage sequence from site and podium to recessed office volume and shading façade','Site → raised podium and office tower → central recesses → view-oriented configuration → shading devices → detailed envelope. Summer Portfolio, p. 12.')+t[idx:]
copy('facade',[
'With Option 1 established, the façade study evaluates solar radiation on the glass panels for <strong>21 June, 21 March, 23 September and 22 December</strong>. The solar-path diagram marks 09:00, 12:00 and 15:00, while the comparison presents the east, north, west and south corners of the building.',
'The paired views compare <strong>[1] the initial glass-panel exposure</strong> with <strong>[2] the façade after overhangs and vertical louvers are added</strong>. Their shared kWh/m² scale allows the reduction in incident radiation to be read across orientations. The portfolio describes this as reducing heat gain; it does not report a percentage saving or a whole-building cooling-energy calculation.',
'The shading concept is inspired by <strong>phyllotaxis</strong>. Overlapping, angled elements cast shadows onto neighbouring surfaces, reducing direct exposure. Parametric control of shading geometry and sun-tracking methods connect this biological reference to the solar study; the source does not describe a mechanically moving façade.',
'The detailed rendering translates the concept into folded, perforated panels alternating with glazed strips. The envelope’s pattern and depth follow the same design objective: retain a useful, daylit office configuration while moderating the solar exposure of its glazing.'
])
start=t.index('<section class="tectonics-section" id="facade"');idx=t.index('<figure',start);t=t[:idx]+figure('facade-radiation','Solar paths and paired unshaded and shaded radiation studies for all four building corners','[1] Initial glass-panel radiation; [2] after adding shading devices. East, north, west and south corners share the original kWh/m² colour scale. Seasonal solar paths appear at left. Summer Portfolio, p. 12.')+t[idx:]
t=t.replace('Arwad Tower explores how a commercial office building near Jeddah Airport can balance rentable space, daylight and protection from intense sun. The design connects the organisation of the podium and office floors with an atrium, open terraces and a shading envelope, treating workplace planning and environmental response as parts of the same architectural problem.','Arwad Tower is a commercial office proposal near Jeddah Airport, designed for companies to sublet flexible office space. The design proceeds from a parametric comparison of eight massing options to the selection of an area-efficient, daylit atrium configuration, then develops a phyllotaxis-inspired shading façade in response to solar radiation. A commercial base, full-height atrium, open terraces and informal meeting spaces support the workplace above.')
t=t.replace('Arwad Tower connects computational option-making to practical workplace and environmental questions. Its design method moves between the scale of the site, the floor plate and the façade module, so that area, access, daylight and shading can inform a shared architectural direction.','The project’s central contribution is a linked decision process: generate and compare massing options, select a configuration for area and daylight, then evaluate shading on its glazing. Computation supports both the comparison of architectural alternatives and the development of the selected envelope, connecting commercial flexibility with environmental design.')
p.write_text(t,encoding='utf-8')
print('Updated case study from portfolio pages 11–12.')
