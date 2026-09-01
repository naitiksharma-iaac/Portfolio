# Portfolio V2 project migration checklist

Verified against the 16 project records exported by `content/projects.js` on 1 September 2026.

| Project | Route | Content migrated | Media migrated | Credits migrated | External links checked | Status |
|---|---|---:|---|---:|---|---|
| Hilton Hotel, Kathmandu | `/projects/hilton-hotel-nepal/` | Yes — 3 introduction paragraphs, 21 blocks | No media files present; source folder retained | Yes | Studio Symbiosis: 200 | Complete with existing content |
| Arwad Tower, Jeddah | `/projects/arwad-tower-jeddah/` | Yes — 2 introduction paragraphs, 21 blocks | No media files present; source folder retained | Yes | N/A | Complete with existing content |
| The Crown | `/projects/the-crown-sector-111/` | Yes — 2 introduction paragraphs, 25 blocks | No media files present; source folder retained | Yes | Studio Symbiosis: 200 | Complete with existing content |
| The Edition | `/projects/the-edition-sector-66/` | Yes — 2 introduction paragraphs, 25 blocks | No media files present; source folder retained | Yes | Studio Symbiosis: 200 | Complete with existing content |
| The Dunes | `/projects/the-dunes-udaipur/` | Yes — 2 introduction paragraphs, 26 blocks | Yes — 13 images and manifest captions/credits | Yes | Supplementary documentation: 200 | Complete |
| Origami Tree | `/projects/origami-tree/` | Yes — 2 introduction paragraphs, 41 blocks | No media files present; source folder retained | Yes | N/A | Complete with existing content |
| Circular Hub | `/projects/circular-hub/` | Yes — 2 introduction paragraphs, 27 blocks | Yes — 1 image and manifest caption/credit | Yes | Instagram project post: 200 | Complete |
| BioPol 3D Printing | `/projects/biopol-3d-printing/` | Yes — 2 introduction paragraphs, 23 blocks | No media files present; source folder retained | Yes | N/A | Complete with existing content |
| Configurable Topologies | `/projects/configurable-topologies/` | Yes — 2 introduction paragraphs, 26 blocks | Yes — 9 images and manifest captions/credits | Yes | IAAC: 200 | Complete |
| Machine Learning for Kerf-Bending | `/projects/machine-learning-kerf-bending/` | Yes — 2 introduction paragraphs, 40 blocks | No media files present; source folder retained | Yes | N/A | Complete with existing content |
| Post Digital Temples | `/projects/post-digital-temples/` | Yes — 2 introduction paragraphs, 38 blocks | No media files present; source folder retained | Yes | N/A | Complete with existing content |
| Charge Pavilion | `/projects/charge-pavilion/` | Yes — 2 introduction paragraphs, 35 blocks | Yes — 6 images and manifest captions/credits | Yes | IAAC: 200 | Complete |
| Above & Inbetween | `/projects/above-and-inbetween/` | Yes — 2 introduction paragraphs, 45 blocks | No media files present; source folder retained | Yes | N/A | Complete with existing content |
| Rhizome | `/projects/rhizome-space-habitat/` | Yes — 2 introduction paragraphs, 44 blocks | Yes — 6 images and manifest captions/credits | Yes | IAAC: 200 | Complete |
| Environmental Studies | `/projects/environmental-studies-sydney/` | Yes — 2 introduction paragraphs, 60 blocks | No media files present; source folder retained | Yes | N/A | Complete with existing content |
| Structural Studies | `/projects/structural-studies-dharavi/` | Yes — 2 introduction paragraphs, 42 blocks | No media files present; source folder retained | Yes | N/A | Complete with existing content |

## Verification notes

- The project order is explicitly encoded in `content/projects.js` and is not generated alphabetically or by category.
- Existing slugs are unchanged, so all 16 established project routes remain compatible.
- Titles, years (including intentionally absent years), studios/offices/institutions, descriptions, content sequence, roles, teams, faculty/guides, credits, captions, source manifests, and external links remain in the repository data.
- The archived repository contains 41 project images across five projects and no tracked project GIF or video binaries. V2 renders every available project image without cropping; empty media folders remain available for future originals and are never replaced by placeholders.
- All eight project external links returned HTTP 200 during verification. Contact/teaching links also returned HTTP 200 except LinkedIn, which returned its automated-client status 999 and remains unchanged.
