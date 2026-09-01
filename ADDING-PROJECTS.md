# Maintaining project case studies

Every project uses the same page template. You edit data and media; you do not create a separate React page for each project.

## Where project text lives

- `content/projects.js` — Hilton, Circular Hub, Arwad Tower, BioPol, Configurable Topologies, plus the final project order
- `content/newProfessionalProjects.js` — The Crown, The Edition and The Dunes
- `content/archiveProjects.js` — the remaining eight academic projects

Find a project by its unique `slug`, then edit its title, year, role, credits, links, introduction and `content` blocks.

## Where project media lives

Each case study uses this simple structure:

```text
public/projects/project-slug/
├── images/
│   ├── user/
│   └── reference/
├── gifs/
│   ├── user/
│   └── reference/
├── video/
│   ├── user/
│   └── reference/
└── source-manifest.json
```

Put your own JPG, JPEG, PNG or WebP files in `images/user/`, GIFs in `gifs/user/`, and MP4 or WebM files in `video/user/`.

The `reference/` folders contain media retrieved from approved public sources. `source-manifest.json` records where each external asset came from. Keep that file with those assets.

Your `user/` file wins when it has the same filename as a reference file. For example, `images/user/hero-01.jpg` replaces `images/reference/hero-01.jpg` automatically.

## Media filenames

The first word in a filename sends it to the matching page chapter:

```text
hero-01.jpg
form-01.jpg
form-02.jpg
diagram-01.png
grasshopper-01.png
construction-01.jpg
final-01.jpg
animation-01.gif
process-01.mp4
```

Use two-digit numbers so media stays in order. Compound groups also work: `facade-gradient-01.jpg` belongs to both `facade` and `facade-gradient`.

## Editing chapters

Chapters are objects inside a project's `content` array and appear in the same order:

```js
{ type: "sectionTitle", number: "01", title: "Form Development" },

{
  type: "text",
  heading: "Chapter heading",
  paragraphs: ["Paragraph one.", "Paragraph two."],
},

{
  type: "mediaGroup",
  groups: ["form"],
  fallbackGroups: ["process"],
  layout: "three-column",
  label: "FORM DEVELOPMENT",
  placeholderCount: 3,
}
```

Available media layouts are `full`, `two-column`, `three-column`, `gallery` and `asymmetric`. The renderer also supports text/image splits, quotes, research questions, workflow steps, data grids, individual images, galleries, GIFs, MP4 video and YouTube.

Individual figures and media groups can also set an editorial display size:

```js
display: "small"   // compact figure
display: "medium"  // normal project figure
display: "large"   // construction image or large visual
display: "full"    // reserved for high-resolution media
display: "drawing" // technical drawing or analytical diagram
```

Images keep their natural pixel dimensions and never overflow their parent. The filename system automatically treats common diagram, analysis, Grasshopper, dataset and drawing groups as `drawing`, while hero, final and construction groups receive a larger editorial width.

Optional subtle ownership marking is supported per figure or media group with `watermark: true`. It is disabled by default.

## Adding a new project

1. Create `public/projects/your-project-slug/`.
2. Inside it, create `images/user/`, `gifs/user/` and `video/user/`, then add your media.
3. Duplicate a complete project object in the most suitable content file.
4. Change its title and give it a unique lowercase, hyphenated `slug`.
5. Add supported tags that truthfully describe the project.
6. Edit only the metadata you know; optional empty fields are not displayed.
7. Build the page narrative by arranging content blocks in the `content` array.
8. Set `featured: true` only if the project should appear on the curated homepage. Keep approximately four to six featured projects.
9. Add the slug and either `professional` or `academic` to `projectOrder` near the bottom of `content/projects.js`.
10. Run `npm run build` and confirm `out/projects/your-project-slug/index.html` exists.
11. Upload the new contents of `out` to Hostinger as described in `DEPLOYMENT.md`.

Here is a compact project object using the same fields as the live site:

```js
{
  id: "your-project-slug",
  slug: "your-project-slug",
  title: "Project title",
  subtitle: "A short project subtitle",
  year: "2026",
  location: "City, Country",
  type: "Academic Work",
  projectType: "Research Project",
  classification: "Academic",
  role: "Your role",
  organisation: "Organisation name",
  collaborators: [],
  guides: [],
  software: ["Rhino", "Grasshopper"],
  methods: ["Parametric Design"],
  tags: ["Academic", "Computational Design", "Research"],
  keywords: ["Parametric", "Material Systems"],
  indexFocus: "Parametric Design / Material Systems",
  shortDescription: "One factual sentence describing the project.",
  introduction: [
    "A concise overview paragraph.",
    "A second paragraph explaining your contribution and method.",
  ],
  thumbnail: null,
  thumbnailType: "image",
  thumbnailAlt: "Describe the project thumbnail",
  heroMedia: null,
  heroMediaType: "image",
  heroAlt: "Describe the project hero image",
  featured: false,
  placeholder: false,
  visualVariant: "field",
  content: [
    { type: "sectionTitle", number: "01", title: "Premise" },
    {
      type: "text",
      heading: "Project premise",
      paragraphs: ["Write the first project paragraph here."],
    },
    {
      type: "mediaGroup",
      groups: ["process"],
      layout: "gallery",
      display: "drawing",
      label: "PROCESS",
      placeholderCount: 2,
    },
  ],
}
```

Then add its order entry:

```js
{ slug: "your-project-slug", category: "academic" },
```

Project numbers and filter counts are calculated automatically from `projectOrder`. The catalogue filters read the category, tags and keywords, so you do not need to edit the filter component when adding a project.
