export const projects = [
  {
    slug: "continuum-canopy",
    title: "Continuum Canopy",
    kicker: "Sample project 01",
    year: "2026",
    type: "Research pavilion",
    classification: "Research",
    role: "Computational designer",
    collaborators: ["Sample collaborator"],
    guides: ["Sample guide / mentor"],
    organisation: "Independent study",
    software: ["Rhino", "Grasshopper", "Kangaroo"],
    tags: ["Form finding", "Timber", "Fabrication"],
    shortDescription:
      "A lightweight canopy study that translates force flows into a buildable family of differentiated timber elements.",
    thumbnail: null,
    animatedThumbnail: null,
    hero: null,
    visualTheme: "cobalt",
    featured: true,
    blocks: [
      {
        type: "text",
        eyebrow: "Premise",
        heading: "From continuous field to discrete assembly",
        paragraphs: [
          "This is placeholder project copy. Use this section to introduce the design question, its context and the ambition of the work in two or three focused paragraphs.",
          "The project-page system keeps this writing in one data file. The page layout, typography and spacing update automatically when you edit or reorder these blocks.",
        ],
      },
      {
        type: "image",
        src: null,
        alt: "Replace with a hero process image",
        label: "IMAGE PLACEHOLDER / HERO PROCESS",
        caption: "Add an image path such as /images/projects/continuum-canopy/process-01.jpg",
        aspect: "landscape",
        theme: "cobalt",
      },
      {
        type: "metrics",
        items: [
          { value: "48", label: "Unique elements" },
          { value: "03", label: "Prototype cycles" },
          { value: "1:5", label: "Final model" },
        ],
      },
      {
        type: "text",
        eyebrow: "Method",
        heading: "A feedback loop between geometry and making",
        paragraphs: [
          "Describe how the computational model was structured, what data informed it and how physical tests changed the design. Specific decisions are more compelling than a list of software.",
        ],
      },
      {
        type: "gallery",
        columns: 2,
        images: [
          {
            src: null,
            label: "GRASSHOPPER SCREENSHOT",
            alt: "Replace with a Grasshopper definition screenshot",
            caption: "Parametric workflow / sample caption",
          },
          {
            src: null,
            label: "FABRICATION PHOTOGRAPH",
            alt: "Replace with a fabrication photograph",
            caption: "Assembly test / sample caption",
          },
        ],
      },
      {
        type: "quote",
        text: "Use a short line here to state the project’s central finding or most important outcome.",
      },
    ],
  },
  {
    slug: "material-intelligence",
    title: "Material Intelligence",
    kicker: "Sample project 02",
    year: "2025",
    type: "Academic research",
    classification: "Academic",
    role: "Designer / researcher",
    collaborators: ["Sample team"],
    guides: ["Sample studio lead"],
    organisation: "Architecture programme",
    software: ["Rhino", "Grasshopper", "Python"],
    tags: ["Material systems", "Simulation", "Robotics"],
    shortDescription:
      "A fabrication-led investigation into how material behaviour can become an active input to architectural geometry.",
    thumbnail: null,
    animatedThumbnail: null,
    hero: null,
    visualTheme: "ember",
    featured: true,
    blocks: [
      {
        type: "text",
        eyebrow: "Research question",
        heading: "What if material tolerance drives the model?",
        paragraphs: [
          "This sample page demonstrates a second project using the same renderer. Replace every sentence, image path and metadata field without touching the components.",
        ],
      },
      {
        type: "image",
        src: null,
        alt: "Replace with a material system photograph",
        label: "MATERIAL STUDY / PLACEHOLDER",
        caption: "Large images can be photographs, diagrams, renders or animated GIFs.",
        aspect: "wide",
        theme: "ember",
      },
      {
        type: "text",
        eyebrow: "Development",
        heading: "Prototype, measure, recalibrate",
        paragraphs: [
          "Use sequential content blocks to tell the project as a process rather than a gallery of finished images. You can duplicate, remove or reorder blocks freely.",
        ],
      },
      {
        type: "video",
        src: null,
        poster: null,
        label: "VIDEO / GIF PLACEHOLDER",
        caption: "Reference a local MP4, WebM or GIF from this project’s media folder.",
      },
    ],
  },
  {
    slug: "adaptive-assemblies",
    title: "Adaptive Assemblies",
    kicker: "Sample project 03",
    year: "2024",
    type: "Professional study",
    classification: "Professional",
    role: "Architectural designer",
    collaborators: [],
    guides: [],
    organisation: "Sample practice",
    software: ["Rhino", "Grasshopper", "Revit"],
    tags: ["Façade", "Optimisation", "Documentation"],
    shortDescription:
      "A repeatable façade workflow balancing solar response, visual identity and rationalised construction logic.",
    thumbnail: null,
    animatedThumbnail: null,
    hero: null,
    visualTheme: "moss",
    featured: true,
    blocks: [
      {
        type: "text",
        eyebrow: "System",
        heading: "Variation with a construction logic",
        paragraphs: [
          "This professional-project placeholder shows how practice information, collaborators and software sit alongside the visual narrative.",
        ],
      },
      {
        type: "gallery",
        columns: 3,
        images: [
          { src: null, label: "DIAGRAM 01", alt: "Replace with diagram one", caption: "Input field" },
          { src: null, label: "RHINO VIEW", alt: "Replace with Rhino screenshot", caption: "System geometry" },
          { src: null, label: "DETAIL", alt: "Replace with detail image", caption: "Assembly logic" },
        ],
      },
    ],
  },
];

export function getProject(slug) {
  return projects.find((project) => project.slug === slug);
}
