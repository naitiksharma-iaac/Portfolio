# Naitik Sharma static portfolio

This is the active framework-free portfolio. It uses only ordinary HTML, one shared CSS file, and a small optional vanilla JavaScript file for lightweight media drag/context-menu deterrence.

There is no build step, package manager, Node runtime, framework, SPA router, template engine, or generated HTML.

## Current scope

- `index.html`: compact Maria-style spatial index featuring the five projects with verified local media
- `projects/`: 16 independent, physical, hand-editable project HTML pages
- `bio.html`, `contact.html`, and `404.html`: working supporting pages
- `project-template.html`: a reusable hand-editable example with labelled title, metadata, introduction, image, text, and credits sections

Five project records have local source media in this repository and use it: The Dunes, Circular Hub, Configurable Topologies, Charge Pavilion, and Rhizome. The other eleven pages retain their verified text, metadata, and credits but are intentionally withheld from the visual homepage until original media is supplied.

## Deploy

Copy everything inside `static-portfolio/` directly into Hostinger `public_html/`. The site can also be opened locally by opening `index.html`; no server is required.

## Add a project manually

1. Duplicate an existing file in `projects/`, or copy `project-template.html` there and change its path prefix from the root-relative example.
2. Save the copy as `projects/new-project.html`.
3. Replace the text and image references directly in the HTML.
4. Add a project composition and link directly in `index.html`.
5. Use a project-specific homepage layout class in `assets/css/style.css`; do not normalise every project into the same card or row.
