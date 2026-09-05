from pathlib import Path
from html import escape
from PIL import Image
root=Path('static-portfolio'); assets=root/'assets/projects/arwad-tower-jeddah'
def fig(name,alt,caption,cls='tectonics-figure tectonics-workflow-figure',eager=False):
 w,h=Image.open(assets/(name+'.webp')).size
 return f'<figure class="{cls}"><a href="../assets/projects/arwad-tower-jeddah/{name}.webp" aria-label="View full-size image: {escape(alt)}"><img src="../assets/projects/arwad-tower-jeddah/{name}.webp" alt="{escape(alt)}" width="{w}" height="{h}" {"fetchpriority=high" if eager else "loading=lazy"} data-protected-media></a><figcaption class="tectonics-caption">{caption}</figcaption></figure>'
def section(n,title,sub,paras,media=''):
 return f'<section class="tectonics-section" id="{n}"><div class="tectonics-section-heading"><h2>{title}</h2><p>{sub}</p></div><div class="tectonics-section-copy">'+''.join(f'<p>{p}</p>' for p in paras)+f'</div>{media}</section>'
header='''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="Arwad Tower, Jeddah: a Studio Symbiosis office proposal connecting parametric massing, flexible workplaces, planted terraces and environmental façade design.">
<title>Arwad Tower, Jeddah — Naitik Sharma</title>
<link rel="stylesheet" href="../assets/css/style.css"><link rel="stylesheet" href="../assets/css/tectonics-of-stock-assemblies.css"><link rel="stylesheet" href="../assets/css/arwad-tower-jeddah.css">
<script src="../assets/js/site.js" defer></script>
</head><body class="jeddah-page">
<a class="skip-link" href="#project">Skip to project</a>
<header class="site-header"><a class="site-name" href="../index.html">Naitik Sharma</a><a class="site-contact" href="../contact.html">Contact</a><a class="site-bio" href="../bio.html">Bio</a><a class="site-cv" href="../cv/">CV</a></header>
<main class="tectonics-case-study" id="project">
<div class="tectonics-top"><div class="tectonics-title-block"><p class="tectonics-kicker">Professional Project · 2023–2024</p><h1>Arwad Tower,<br>Jeddah</h1><p class="tectonics-descriptor">Parametric massing and environmental façade development for a contemporary workplace.</p>'''
header+=fig('hero','Arwad Tower proposal with planted terraces recessed between two office wings','The proposed office building: a planted central recess framed by a repeated system of angled façade panels. Architectural visualisation.','tectonics-hero',True)
header+='</div><aside class="tectonics-metadata" aria-label="Project information"><dl>'
for k,v in [('Project','Arwad Tower'),('Type','Commercial office · Design proposal'),('Location','Jeddah, Saudi Arabia'),('Office','Studio Symbiosis'),('Year','2023–2024'),('Design focus','Parametric massing<br>Space planning<br>Environmental studies<br>Façade design'),('Team','Amit Gupta, Britta Knobbel, Fulvio Wirz, Manuele Gaino, Naitik Sharma')]:header+=f'<div><dt>{k}</dt><dd>{v}</dd></div>'
header+='''</dl></aside></div>
<p class="tectonics-intro">Arwad Tower explores how a commercial office building near Jeddah Airport can balance rentable space, daylight and protection from intense sun. The design connects the organisation of the podium and office floors with an atrium, open terraces and a shading envelope, treating workplace planning and environmental response as parts of the same architectural problem.</p>
<nav class="jeddah-contents" aria-label="Case study sections"><a href="#context">Site</a><a href="#climate">Climate</a><a href="#massing">Massing</a><a href="#workplace">Workplace</a><a href="#facade">Façade</a><a href="#proposal">Proposal</a></nav>
'''
parts=[header]
parts.append(section('context','01 / Site and Urban Context','An office address in northern Jeddah',[
'The site appraisal situates the project within the expanding urban area around the airport. It maps major roads, local access and nearby destinations, then examines how the surrounding district has changed over time. These studies establish both the building’s visibility from passing traffic and its relationship to the immediate street network.',
'The presentation also looks to desert rock formations and the projecting timber screens of Jeddah’s old city. These references introduce two architectural interests: a building form shaped by recesses and projections, and an envelope that mediates between interior space and the climate.'
],fig('site-access','Site map showing local traffic routes around the office plot','Local access and direction of travel around the site. Presentation, p. 17.')))
parts.append(section('climate','02 / Climate as a Design Input','Reading sun exposure before shaping the envelope',[
'The environmental appraisal studies wind direction, humidity, thermal comfort, direct sun hours and incident radiation. Its sun study identifies the east and west orientations as important sources of direct exposure. This makes the depth and orientation of the envelope a design concern from the beginning.',
'Direct sun hours describe the duration of exposure; incident radiation describes the solar energy reaching a surface. Reading the two together helps locate exposed edges and compare the effect of surrounding building volumes. The diagrams show the study conditions rather than a measured energy-saving result.'
],fig('sun-hours','Direct sun hours mapped across the site, with the original hours colour scale','Direct sun exposure in plan and three dimensions; the original legend is retained. Presentation, p. 22.')+fig('incident-radiation','Incident solar radiation across the site and surrounding building volumes','Incident radiation study including the neighbouring building volumes. Presentation, p. 23.')))
parts.append(section('envelope','03 / Defining the Buildable Volume','Plot occupation, setbacks and urban alignment',[
'Before comparing tower forms, the study establishes the allowable envelope through plot occupation, setback zones and floor-area constraints. A separate alignment study relates the volume to the surrounding streets and identifies the underground allowance.',
'These constraints form the starting geometry for the massing exercise. The podium, parking and office volume must work together within the site rather than being resolved as independent objects.'
],fig('urban-envelope','Three diagrams showing plot occupation, setbacks and the building envelope','From the plot to the permissible building volume. Presentation, p. 24.')+fig('urban-alignments','Urban alignment axes and underground footprint around the site','Context alignments and the underground allowance. Presentation, p. 25.')))
parts.append(section('massing','04 / A Parametric Option Space','Comparing organisation, area and daylight',[
'The massing catalogue varies core placement, commercial space, parking, tower form and atrium configuration. Built-up area and daylight provide a way to compare these alternatives: increasing floor area also changes the depth of the workplace and the space available for light to enter.',
'Options 1 and 2 illustrate different arrangements of the same programme. The colour-coded diagrams distinguish parking, offices, commercial space, building services, core and atrium. The existing project record identifies Option 1 as the selected direction, combining a high built-up area with daylight penetration through the atrium.'
],fig('option-one','Four views of Option 1 showing the office wings, core and atrium','Option 1: the programme distributed around an internal atrium. Presentation, p. 38.')+fig('option-two','Four views of Option 2 showing an alternative tower configuration','Option 2: an alternative arrangement within the same site and programme. Presentation, p. 44.')))
parts.append(section('programme','05 / Programme in Section','Connecting the podium, offices and atrium',[
'The sectional studies reveal how the office floors sit above the lower-level programme and how the atrium relates to the core. Reading the scheme in section makes the vertical distribution of space visible alongside the plan organisation.',
'Parking is studied across basement, ground and first-floor levels, with sections examining its relationship to the building above. These drawings document a planning study; they are not presented as completed construction.'
],fig('programme-section','Option 1 sectional views and plans coloured by programme','Option 1 in section and plan: offices, core, atrium and lower-level uses. Presentation, p. 39.')+fig('parking-section','Sections showing the parking levels beneath the office volume','Parking and the vertical organisation of the lower levels. Presentation, p. 35.')))
parts.append(section('workplace','06 / A Flexible Workplace','One floor plate, several tenancy arrangements',[
'The office floor is organised around circulation, service cores and voids. This gives the floor a stable support structure while allowing the rentable areas to be subdivided. The presentation tests two-, four- and six-office layouts within that framework.',
'The wider workplace brief includes open workspaces, meeting rooms and informal meeting areas. Together with the atrium and terraces, these shared settings extend the workplace beyond the individual office unit.'
],fig('office-plan','Typical office plan with two office areas flanking the central circulation and voids','Typical floor organisation: office space, circulation and core. Presentation, p. 41.')+fig('office-variants','Two-, four- and six-office layout studies on a common floor plate','Alternative tenancy arrangements within the same floor plate. Presentation, p. 42.')))
parts.append(section('terraces','07 / Opening the Building','A planted recess within the office volume',[
'The developed visualisations give the central recess a strong spatial identity. Curved terrace edges step between the two office wings, with planting tracing each level. The opening breaks down the scale of the street elevation and exposes a sequence of outdoor spaces within the larger volume.',
'The terraces bring a different rhythm to the building: horizontal planted edges sit against the repeated vertical façade modules. Their depth also introduces areas of shade along the recessed frontage.'
],fig('terraces','Close view of curved planted terraces within the central recess','Planted terraces articulate the central opening. Architectural visualisation.')+fig('front-view','Front view of the office wings framing the curved terraces','The relationship between the office wings and the recessed terrace frontage. Architectural visualisation.')))
parts.append(section('facade','08 / Façade and Self-Shading','A repeated module with depth and orientation',[
'The façade concept draws on phyllotaxis: the arrangement of overlapping elements becomes a reference for a system in which one surface can shade its neighbour. The project notes connect element orientation, overhangs and vertical shading to exposure across different parts of the building.',
'The detailed rendering shows this idea as angled, perforated panels beside glazed strips. Repetition gives the envelope continuity, while the folds create depth and changing shadows. The study links architectural expression to a shading strategy; numerical reductions in cooling demand have not been established in the available project material.'
],fig('facade-detail','Angled perforated façade panels alternating with narrow glazed strips','Façade detail: folded panels, perforation and glazing form a repeated shading module. Architectural visualisation.')))
parts.append(section('proposal','09 / The Architectural Proposal','Form, landscape and envelope read together',[
'The proposal brings the studies together as a commercial building with a distinct urban presence. The office wings establish its overall volume, the planted recess introduces shared outdoor space, and the folded envelope gives the exterior a consistent scale and texture.',
'Daylight and evening views show how the same geometry reads under different lighting conditions. These images represent the design proposal and its intended atmosphere.'
],fig('street-view','Street-level perspective of the proposed tower and landscaped approach','The proposal in its landscaped setting. Architectural visualisation.')+fig('night-view','Evening visualisation of Arwad Tower with illuminated terraces','Evening view of the central terraces and façade. Architectural visualisation.')))
parts.append('''<section class="tectonics-reflection"><h2>Reflection</h2><p>Arwad Tower connects computational option-making to practical workplace and environmental questions. Its design method moves between the scale of the site, the floor plate and the façade module, so that area, access, daylight and shading can inform a shared architectural direction.</p></section>
<section class="jeddah-credits"><h2>Project Credits</h2><p>Architectural project and visualisations: Studio Symbiosis.</p><p>Team: Amit Gupta, Britta Knobbel, Fulvio Wirz, Manuele Gaino and Naitik Sharma.</p></section>
<nav class="tectonics-back" aria-label="Project navigation"><a href="../index.html">Back to Main</a></nav>
</main></body></html>''')
(root/'projects/arwad-tower-jeddah.html').write_text('\n'.join(parts),encoding='utf-8')
p=root/'index.html';text=p.read_text(encoding='utf-8');text=text.replace('<script src="assets/js/site.js" defer></script>','<link rel="stylesheet" href="assets/css/arwad-tower-jeddah.css">\n  <script src="assets/js/site.js" defer></script>'); text=text.replace('tectonics-index-stage"','tectonics-index-stage jeddah-index-stage"');text=text.replace('tectonics-index-canvas"','tectonics-index-canvas jeddah-index-canvas"')
w,h=Image.open(assets/'home.webp').size
entry=f'''      <article class="home-entry" aria-labelledby="jeddah-title">
        <div class="home-entry-meta jeddah-home-meta"><h2 id="jeddah-title"><a href="projects/arwad-tower-jeddah.html">Arwad Tower, Jeddah</a></h2><p>Studio Symbiosis</p><p>2023–2024</p></div>
        <a class="home-preview jeddah-home-hero" href="projects/arwad-tower-jeddah.html" aria-label="View Arwad Tower, Jeddah"><img src="assets/projects/arwad-tower-jeddah/home.webp" alt="Arwad Tower with planted terraces and an angled shading façade" width="{w}" height="{h}" loading="lazy" draggable="false" data-protected-media></a>
      </article>

'''
text=text.replace('      <article class="home-entry" aria-labelledby="configurable-title">',entry+'      <article class="home-entry" aria-labelledby="configurable-title">');p.write_text(text,encoding='utf-8')
