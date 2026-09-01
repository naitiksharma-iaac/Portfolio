import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { attachProjectMedia } from "../content/projectMedia.js";
import { projects } from "../content/projects.js";

const failures = [];
const requireCondition = (condition, message) => {
  if (!condition) failures.push(message);
};

const requiredViewports = [
  "1440x900",
  "1280x800",
  "1024x768",
  "768x1024",
  "390x844",
  "360x800",
];

const tokenSource = readFileSync("styles/reference-tokens.css", "utf8");
const requiredTokens = [
  ["font", "--reference-font: Arial, Helvetica, sans-serif"],
  ["background", "--reference-page-background: #ffffff"],
  ["text", "--reference-text-color: #111111"],
  ["desktop top padding", "--reference-page-top: 36px"],
  ["desktop side padding", "--reference-page-left: 48px"],
  ["site-name size", "--reference-name-size: 18px"],
  ["index-title size", "--reference-index-title-size: 15px"],
  ["metadata size", "--reference-index-meta-size: 13px"],
  ["reading width", "--reference-reading-width: 620px"],
  ["media width", "--reference-media-width: 960px"],
  ["mobile top padding", "--reference-page-top: 24px"],
  ["mobile side padding", "--reference-page-left: 20px"],
];

requiredTokens.forEach(([label, token]) => requireCondition(tokenSource.includes(token), `Missing ${label} fallback token`));

const homePath = "out/index.html";
requireCondition(existsSync(homePath), "Static homepage is missing; run npm run build first");
const homeHtml = existsSync(homePath) ? readFileSync(homePath, "utf8") : "";

["site-name", "contact-link", "bio-link", "project-title", "project-meta", "project-media"].forEach((ref) => {
  requireCondition(homeHtml.includes(`data-ref=\"${ref}\"`), `Homepage is missing data-ref=${ref}`);
});

["custom-cursor", "Project index", "Selected projects", "All Projects"].forEach((legacyMarker) => {
  requireCondition(!homeHtml.includes(legacyMarker), `Legacy marker leaked into homepage: ${legacyMarker}`);
});

for (const project of projects) {
  const routePath = `out/projects/${project.slug}/index.html`;
  requireCondition(existsSync(routePath), `Missing route for ${project.slug}`);
  if (!existsSync(routePath)) continue;

  const html = readFileSync(routePath, "utf8");
  requireCondition(html.includes("Back to Main"), `${project.slug} is missing Back to Main`);
  requireCondition(html.includes("Credits"), `${project.slug} is missing credits`);

  const media = attachProjectMedia(project).discoveredMedia.all;
  media.forEach((item) => requireCondition(html.includes(item.src), `${project.slug} is missing media ${item.src}`));
}

const walk = (directory) => readdirSync(directory, { withFileTypes: true }).flatMap((entry) => (
  entry.isDirectory() ? walk(path.join(directory, entry.name)) : [path.join(directory, entry.name)]
));
const htmlFiles = walk("out").filter((file) => file.endsWith(".html"));

htmlFiles.forEach((file) => {
  const html = readFileSync(file, "utf8");
  for (const match of html.matchAll(/href="([^"]+)"/g)) {
    const href = match[1];
    if (!href.startsWith("/") || href.startsWith("//") || href.startsWith("/_next/")) continue;
    const clean = href.split(/[?#]/)[0].replace(/^\/+/, "");
    const target = href.split(/[?#]/)[0].endsWith("/")
      ? path.join("out", clean, "index.html")
      : path.join("out", clean);
    requireCondition(existsSync(target), `${file} contains broken internal link ${href}`);
  }
});

if (failures.length) {
  console.error(failures.map((failure) => `- ${failure}`).join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Reference contract passed for ${projects.length} projects.`);
  console.log(`Internal links passed across ${htmlFiles.length} static HTML files.`);
  console.log(`Required viewport matrix: ${requiredViewports.join(", ")}.`);
}
