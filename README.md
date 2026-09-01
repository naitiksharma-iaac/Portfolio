# Naitik Sharma portfolio

A static Next.js portfolio built entirely with JavaScript and JSX. Portfolio V2 uses the restrained Maria Yablonina reference hierarchy with Naitik Sharma's existing projects, text, media, credits, routes, and identity. The project case studies are data-driven, media is stored locally, and `npm run build` creates an upload-ready Hostinger website in `out/`.

Portfolio V1 is preserved at safety commit `4058e4acdebc19851fc3a6ca42c74e3e0330cf4e`, on branch `archive/portfolio-before-yablonina-rebuild`, and in `legacy/portfolio-v1/`.

## Main editing files

- `content/projects.js` — five established projects, final 16-project order, and category assignment
- `content/newProfessionalProjects.js` — The Crown, The Edition and The Dunes
- `content/archiveProjects.js` — eight academic and earlier case studies
- `content/projectMedia.js` — automatic image, GIF and MP4 discovery
- `content/resume.js` — résumé content
- `content/teaching.js` — Aerie Academy teaching feature
- `content/site.js` — name, biography, email and social links
- `public/projects/` — media folders for all 16 projects
- `public/experience/aerie-academy/` — teaching media
- `app/globals.css` — global typography, colours, spacing and responsive design
- `components/ProjectContentRenderer.jsx` — reusable case-study block renderer
- `styles/reference-tokens.css` — locked reference typography and geometry tokens
- `reference-audit/` — reference specification and project migration checklist
- `legacy/portfolio-v1/` — frozen V1 source snapshot; do not edit for V2

## Work locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run test:reference
```

Upload everything inside `out/` to Hostinger `public_html`.

See `ADDING-PROJECTS.md` for editing projects and media. See `DEPLOYMENT.md` for the exact Hostinger process.
