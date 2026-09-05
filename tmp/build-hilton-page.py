from pathlib import Path
from PIL import Image
from html import escape
root=Path('static-portfolio');asset=root/'assets/projects/hilton-hotel-nepal'
def fig(n,alt,cap,cls='tectonics-figure tectonics-workflow-figure',eager=False):
 w,h=Image.open(asset/(n+'.webp')).size
 return f'<figure class="{cls}"><a href="../assets/projects/hilton-hotel-nepal/{n}.webp" aria-label="View full-size image: {escape(alt)}"><img src="../assets/projects/hilton-hotel-nepal/{n}.webp" alt="{escape(alt)}" width="{w}" height="{h}" {"fetchpriority=high" if eager else "loading=lazy"} data-protected-media></a><figcaption class="tectonics-caption">{cap}</figcaption></figure>'
def sec(id,title,sub,paras,media):
 return f'<section class="tectonics-section" id="{id}">\n<div class="tectonics-section-heading"><h2>{title}</h2><p>{sub}</p></div>\n<div class="tectonics-section-copy">'+''.join('<p>'+v+'</p>\n' for v in paras)+'</div>\n'+media+'\n</section>'
s='''<!doctype html>
<html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="Hilton Kathmandu: Naitik Sharma’s façade rationalisation and shop-drawing work at Studio Symbiosis, from curved GFRC bands to CNC mould frameworks and installation.">
<title>Hilton Hotel, Kathmandu — Naitik Sharma</title>
<link rel="stylesheet" href="../assets/css/style.css"><link rel="stylesheet" href="../assets/css/tectonics-of-stock-assemblies.css"><link rel="stylesheet" href="../assets/css/hilton-hotel-nepal.css">
<script src="../assets/js/site.js" defer></script></head>
<body class="hilton-page"><a class="skip-link" href="#project">Skip to project</a>
<header class="site-header"><a class="site-name" href="../index.html">Naitik Sharma</a><a class="site-contact" href="../contact.html">Contact</a><a class="site-bio" href="../bio.html">Bio</a><a class="site-cv" href="../cv/">CV</a></header>
<main class="tectonics-case-study" id="project">
<div class="tectonics-top"><div class="tectonics-title-block"><p class="tectonics-kicker">Professional Project · 2023–2024</p><h1>Hilton Hotel,<br>Kathmandu</h1><p class="tectonics-descriptor">From curved façade geometry to fabrication-ready components.</p>
'''+fig('hero','Coordinated Hilton façade model showing curved bands and the curtain wall','Façade coordination model with the scissor bands articulated across the building. Studio Symbiosis project material.','tectonics-hero',True)
s+='</div><aside class="tectonics-metadata" aria-label="Project information"><dl>'
for k,v in [('Project','Hilton Hotel, Kathmandu'),('Type','Professional work · Hotel'),('Location','Kathmandu, Nepal'),('Office','Studio Symbiosis'),('Year','2023–2024'),('My contribution','Façade rationalisation<br>Shop drawing production'),('Team','Amit Gupta, Britta Knobbel and Naitik Sharma'),('Material system','GFRC bands · Mild-steel framing · Curtain wall')]:s+=f'<div><dt>{k}</dt><dd>{v}</dd></div>\n'
s+='''</dl></aside></div>
<p class="tectonics-intro">The Hilton façade is defined by curved GFRC scissor bands that cross and separate along a glazed curtain wall. My work at Studio Symbiosis focused on façade rationalisation and shop drawing production: translating this continuous geometry into labelled components, coordinated support details and mould-making information that could be used for fabrication and installation.</p>
<nav class="hilton-contents" aria-label="Case study sections"><a href="#geometry">Geometry</a><a href="#supports">Supports</a><a href="#sections">Sectioning</a><a href="#fabrication">Fabrication</a><a href="#installation">Installation</a></nav>
'''
s+=sec('geometry','01 / A Continuous Façade','Resolving the scissor-band geometry',[
'The architectural expression depends on bands that read as continuous curves across straight and curved regions of the elevation. Their changing depth and direction produce a family of related components, with repeated conditions on typical floors and distinct geometries at the entrance and all-day dining level.',
'Rationalisation makes this geometry buildable. The elevation drawing gives individual pieces an address within the larger façade, coordinating band profiles and component labels with floor levels. This establishes a link between the overall architectural surface and the pieces used to make it.'
],fig('elevation','Front elevation with colour-coded façade bands and individual component labels','Front-elevation drawing showing band segmentation, component identifiers and floor levels. Rendered from the original elevation PDF.'))
s+=sec('supports','02 / Supporting the Bands','From the mullion to the GFRC surface',[
'The portfolio documents a support sequence: <strong>cleats installed on the mullions, brackets installed in the cleats, and mild-steel pipe framing supporting the bracket arrangement</strong>. The GFRC bands are then installed on this steel framework.',
'The portfolio states that the mullions were structurally reinforced to support the dead load of the bands. Coordinating the geometry with this support system is therefore part of the façade workflow: the visible surface and the structure behind it must be resolved together.'
],'<div class="tectonics-media-grid">'+fig('support-system','GFRC band geometry coordinated with the curtain wall','GFRC bands and their relationship to the curtain wall. Portfolio, p. 4.','tectonics-figure')+fig('support-sequence','Three successive coordination views showing cleats, brackets and steel pipes','Cleat → bracket → mild-steel pipe coordination. Portfolio, p. 4.','tectonics-figure')+'</div>')
s+=sec('sections','03 / Sectioning the Curved Surface','A shared geometric basis for shop drawings',[
'<strong>Multiple perpendicular section planes</strong> are distributed along the curved surface of the typical-floor scissor bands. These planes provide a repeatable way to extract profiles from a changing three-dimensional form and divide the bands into sizes suitable for transport and installation.',
'The extracted sections guide the shop drawings and the relationship between neighbouring pieces. Their purpose is to maintain geometric continuity across component boundaries, so the assembled pieces follow the intended curve.'
],fig('section-planes','Perpendicular cutting planes and extracted sections along the scissor bands','From cutting planes to section profiles for shop drawings. Portfolio, p. 5.','tectonics-figure tectonics-workflow-figure hilton-source-diagram')+fig('band-sections','Plan and sectional views of a typical-floor façade band','Typical-floor band sections in relation to the curtain-wall geometry. Portfolio, p. 5.','tectonics-figure tectonics-workflow-figure hilton-source-diagram'))
s+=sec('components','04 / Transportable Components','Handling the entrance and dining-level cantilevers',[
'The entrance-lobby and all-day dining bands include <strong>cantilevers extending over 3 metres</strong>. The portfolio describes subdividing these bands into smaller sections to facilitate manual handling.',
'Each piece receives a unique label in the fabrication drawings, accompanied by isometric assembly diagrams. This creates a traceable connection between the drawing, the fabricated piece and its location in the assembly.'
],fig('component-labels','Labelled subdivisions of a curved cantilevering band','Component subdivision and labels used to communicate the assembly. Portfolio, p. 5.','tectonics-figure tectonics-workflow-figure hilton-source-diagram')+fig('template','Full-scale profile pieces laid out on the hotel terrace','Physical profile pieces laid out on site, showing the scale of the fabrication geometry. Original project photograph.'))
s+=sec('fabrication','05 / CNC and Mould Frameworks','From flat sheets to a three-dimensional form',[
'The fabrication workflow sections the bands in two directions at <strong>150 mm spacing</strong>. The resulting profiles are nested onto <strong>8 × 4 ft MDF sheets, 8 mm thick</strong>, preparing flat cutting information for CNC fabrication.',
'<strong>Interlocking grooves</strong> allow the cut sections to assemble into an aligned framework. This framework supports GRC/FRP mould preparation, translating the digital surface into a physical form through a series of repeatable two-dimensional cuts.',
'Typical-floor moulds are reused, while the remaining scissor bands require unique fabrication. The workflow therefore accommodates both repetition and variation within the same façade system.'
],fig('cnc-framework','MDF nesting, CNC-cut profiles and interlocking mould framework','Nesting → cut profiles → interlocking framework. Portfolio, p. 5.','tectonics-figure tectonics-workflow-figure hilton-source-diagram')+'<div class="tectonics-media-grid">'+fig('mould','Curved mould under preparation with a timber framework','Mould preparation documented on site. Original project photograph.','tectonics-figure')+fig('assembly','Large mould assembly laid out in the fabrication area','Assembled formwork showing the physical scale of a band component. Original project photograph.','tectonics-figure')+'</div>')
s+=sec('installation','06 / From Fabrication to Installation','Reading the component system on site',[
'The site photographs record the transition from individual pieces and moulds to the installed façade. At the curved edges, the support arrangement and segmented construction become visible before the bands read as a continuous architectural surface.',
'This closes the workflow described in the portfolio: the same band geometry is carried through section extraction, component identification, mould preparation and installation. The role of the computational model is to keep those stages coordinated.'
],fig('installation','Curved façade edge during installation with the support structure exposed','Installation at the curved façade edge. Original project photograph.')+fig('built-facade','Installed white GFRC scissor bands across the Hilton curtain wall','The installed bands read as continuous curves across the glazing. Original project photograph.'))
s+='''<section class="tectonics-reflection"><h2>Reflection</h2><p>The project demonstrates how computational design supports technical delivery. Section planes, component labels and CNC cutting information turn a complex surface into a coordinated set of instructions. My contribution focused on preserving the façade geometry while making it practical to draw, fabricate, handle and assemble.</p></section>
<section class="hilton-credits"><h2>Credits</h2><p>Architectural project: Studio Symbiosis.</p><p>Team listed in the portfolio: Amit Gupta, Britta Knobbel and Naitik Sharma.</p><p>My contribution: façade rationalisation and shop drawing production.</p><p>Drawings, models and site photographs: supplied project documentation. Narrative based on Summer Portfolio — Naitik, pp. 3–6.</p></section>
<nav class="tectonics-back" aria-label="Project navigation"><a href="../index.html">Back to Main</a></nav>
</main></body></html>'''
(root/'projects/hilton-hotel-nepal.html').write_text(s,encoding='utf-8')
