import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";

const supportedImages = new Set([".jpg", ".jpeg", ".png", ".webp"]);
const supportedGifs = new Set([".gif"]);
const supportedVideos = new Set([".mp4", ".webm"]);

function humaniseFilename(filename) {
  return path.basename(filename, path.extname(filename)).replace(/[-_]+/g, " ");
}

function groupsFromFilename(filename) {
  const name = path.basename(filename, path.extname(filename)).toLowerCase();
  const primary = name.split(/[-_\s]+/)[0];
  const descriptivePrefix = name.replace(/[-_\s]+\d+$/, "");
  return [...new Set([primary, descriptivePrefix])];
}

function normaliseRelativePath(value = "") {
  return value.replaceAll("\\", "/").replace(/^\/+/, "");
}

function readManifest(diskRoot) {
  const manifestPath = path.join(diskRoot, "source-manifest.json");
  if (!existsSync(manifestPath)) return [];

  try {
    const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
    return Array.isArray(manifest) ? manifest : manifest.assets || [];
  } catch {
    return [];
  }
}

function readMediaLocation({ diskRoot, publicRoot, relativeFolder, extensions, mediaType, origin, title, manifest }) {
  const diskFolder = path.join(diskRoot, ...relativeFolder.split("/"));
  if (!existsSync(diskFolder)) return [];

  return readdirSync(diskFolder, { withFileTypes: true })
    .filter((entry) => entry.isFile() && extensions.has(path.extname(entry.name).toLowerCase()))
    .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }))
    .map((entry) => {
      const relativeFile = normaliseRelativePath(`${relativeFolder}/${entry.name}`);
      const sourceRecord = manifest.find((item) => normaliseRelativePath(item.file) === relativeFile);

      return {
        src: `/${normaliseRelativePath(`${publicRoot}/${relativeFile}`)}`,
        alt: sourceRecord?.alt || sourceRecord?.description || `${title} - ${humaniseFilename(entry.name)}`,
        caption: sourceRecord?.caption || sourceRecord?.description || null,
        credit: sourceRecord?.credit || null,
        source: sourceRecord?.source || null,
        sourcePage: sourceRecord?.sourcePage || null,
        display: sourceRecord?.display || null,
        watermark: sourceRecord?.watermark,
        filename: entry.name,
        relativeFile,
        logicalKey: path.basename(entry.name, path.extname(entry.name)).toLowerCase(),
        group: groupsFromFilename(entry.name)[0],
        groups: groupsFromFilename(entry.name),
        mediaType,
        origin,
      };
    });
}

export function discoverMediaCollection(publicRoot, title = "Portfolio media") {
  const normalisedRoot = normaliseRelativePath(publicRoot);
  const diskRoot = path.join(process.cwd(), "public", ...normalisedRoot.split("/"));
  const manifest = readManifest(diskRoot);
  const locations = [
    { relativeFolder: "images/reference", extensions: supportedImages, mediaType: "image", origin: "reference" },
    { relativeFolder: "gifs/reference", extensions: supportedGifs, mediaType: "gif", origin: "reference" },
    { relativeFolder: "video/reference", extensions: supportedVideos, mediaType: "video", origin: "reference" },
    { relativeFolder: "images", extensions: supportedImages, mediaType: "image", origin: "legacy" },
    { relativeFolder: "gifs", extensions: supportedGifs, mediaType: "gif", origin: "legacy" },
    { relativeFolder: "video", extensions: supportedVideos, mediaType: "video", origin: "legacy" },
    { relativeFolder: "images/user", extensions: supportedImages, mediaType: "image", origin: "user" },
    { relativeFolder: "gifs/user", extensions: supportedGifs, mediaType: "gif", origin: "user" },
    { relativeFolder: "video/user", extensions: supportedVideos, mediaType: "video", origin: "user" },
  ];

  const mediaByLogicalKey = new Map();
  locations.flatMap((location) => readMediaLocation({
    diskRoot,
    publicRoot: normalisedRoot,
    title,
    manifest,
    ...location,
  })).forEach((item) => mediaByLogicalKey.set(item.logicalKey, item));

  const all = [...mediaByLogicalKey.values()].sort((a, b) =>
    a.filename.localeCompare(b.filename, undefined, { numeric: true }),
  );
  const images = all.filter((item) => item.mediaType === "image");
  const gifs = all.filter((item) => item.mediaType === "gif");
  const videos = all.filter((item) => item.mediaType === "video");
  const groups = { all, gifs, videos };

  all.forEach((item) => {
    item.groups.forEach((group) => {
      groups[group] = [...(groups[group] || []), item];
    });
  });

  return { images, gifs, videos, all, groups, manifest };
}

export function discoverProjectMedia(project) {
  return discoverMediaCollection(`projects/${project.slug}`, project.title);
}

export function attachProjectMedia(project) {
  const discoveredMedia = discoverProjectMedia(project);
  const excludedHeroGroups = new Set(project.excludeFromHeroGroups || []);
  const isEligibleHero = (item) =>
    item.mediaType !== "video" && !item.groups.some((group) => excludedHeroGroups.has(group));
  const firstEligibleInGroup = (group) => discoveredMedia.groups[group]?.find(isEligibleHero);
  const preferredHero =
    firstEligibleInGroup("hero") ||
    firstEligibleInGroup("final") ||
    firstEligibleInGroup("result") ||
    discoveredMedia.images.find(isEligibleHero) ||
    discoveredMedia.gifs.find(isEligibleHero);

  return {
    ...project,
    discoveredMedia,
    thumbnail: project.thumbnail || preferredHero?.src || null,
    thumbnailType: project.thumbnailType || preferredHero?.mediaType || "image",
    heroMedia: project.heroMedia || preferredHero?.src || null,
    heroMediaType: project.heroMediaType || preferredHero?.mediaType || "image",
  };
}

export function getProjectsWithMedia(projects) {
  return projects.map(attachProjectMedia);
}
