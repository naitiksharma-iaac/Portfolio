# Naitik Sharma portfolio

The active portfolio is the framework-free implementation in [`static-portfolio/`](static-portfolio/README.md). It consists only of hand-authored HTML, one shared CSS file, optional vanilla JavaScript, local images, and an Apache `.htaccess` file for Hostinger.

No build, npm command, Node runtime, framework, SPA router, or template engine is required to run or deploy it.

## Active files

- `static-portfolio/index.html` — asymmetric spatial homepage proof
- `static-portfolio/projects/charge-pavilion.html` — first project-page proof
- `static-portfolio/bio.html` and `contact.html`
- `static-portfolio/assets/css/style.css`
- `static-portfolio/assets/js/site.js`
- `static-portfolio/assets/images/projects/`

## Preserved implementations

- Original Portfolio V1: `legacy/portfolio-v1/` and branch `archive/portfolio-before-yablonina-rebuild`
- React/Next Portfolio V2: `legacy/portfolio-v2-next/` and branch `archive/portfolio-v2-next-before-static-rebuild`
- All 16 project records, long-form content, credits, source manifests, and original media remain in `content/` and `public/` and in the archive commits.
- Reference records remain in `reference-audit/`.

The root React/Next source is retained for recovery and content reference. It is not the active deployable website.

## Deploy

Copy everything inside `static-portfolio/` directly into Hostinger `public_html/`. See `DEPLOYMENT.md`.
