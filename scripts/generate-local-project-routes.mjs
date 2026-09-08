import { mkdirSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const projects = fileURLToPath(new URL("../static-portfolio/projects/", import.meta.url));
for (const filename of readdirSync(projects)) {
  if (!filename.endsWith(".html") || filename === "project-template.html") continue;
  const slug = filename.slice(0, -5);
  const route = join(projects, slug);
  mkdirSync(route, { recursive: true });
  writeFileSync(join(route, "index.html"), `<!doctype html><meta charset="utf-8"><meta http-equiv="refresh" content="0; url=../${filename}"><title>Loading…</title><script>location.replace('../${filename}' + location.search + location.hash)</script><a href="../${filename}">Open project</a>`);
}
