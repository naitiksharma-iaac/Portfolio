# Naitik Simple Portfolio

A JavaScript-only computational architecture portfolio built with React and CSS.

## Edit the site

- `content/site.js` — name, email, location and social links
- `content/resume.js` — résumé content
- `content/projects.js` — all project metadata and project-page blocks
- `public/images/projects/` — project images, GIFs and videos
- `app/globals.css` — colours, type, spacing, layouts and motion

## Run locally

```bash
npm install
npm run dev
```

## Add a project

1. Duplicate a project object in `content/projects.js`.
2. Give it a unique lowercase `slug`, such as `new-project`.
3. Add a matching folder at `public/images/projects/new-project/`.
4. Add image or video paths to the project object, beginning with `/images/projects/new-project/`.
5. Add, remove or reorder the project’s `blocks`. The detail page is created automatically.

No TypeScript is used in this project.
