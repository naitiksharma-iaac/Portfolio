# Naitik Sharma static portfolio

This is the active framework-free portfolio prototype. It uses only ordinary HTML, one shared CSS file, and a small optional vanilla JavaScript file for lightweight media drag/context-menu deterrence.

There is no build step, package manager, Node runtime, framework, SPA router, template engine, or generated HTML.

## Current proof scope

- `index.html`: four-project asymmetric spatial homepage proof
- `projects/charge-pavilion.html`: first spatial project-page proof
- `bio.html`, `contact.html`, and `404.html`: working supporting pages
- `project-template.html`: a reusable hand-editable copy of the Charge Pavilion structure

Only Charge Pavilion has been migrated as a project-detail page in this proof stage. The other project records and all original content/media remain preserved in the repository and its legacy archives.

## Deploy

Copy everything inside `static-portfolio/` directly into Hostinger `public_html/`. The site can also be opened locally by opening `index.html`; no server is required.

## Add a project manually

1. Duplicate `project-template.html` or `projects/charge-pavilion.html`.
2. Save the copy as `projects/new-project.html`.
3. Replace the text and image references directly in the HTML.
4. Add a project composition and link directly in `index.html`.
5. Use a project-specific homepage layout class in `assets/css/style.css`; do not normalise every project into the same card or row.
