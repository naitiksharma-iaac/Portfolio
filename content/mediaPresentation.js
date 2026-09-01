const validDisplays = new Set(["small", "medium", "large", "full", "drawing"]);

const drawingTerms = [
  "analysis",
  "diagram",
  "drawing",
  "dataset",
  "graph",
  "grasshopper",
  "rhino",
  "workflow",
  "radiation",
  "structure",
  "structural",
  "training",
  "typology",
  "parameter",
  "settingout",
  "facade-gradient",
];

const largeTerms = ["hero", "final", "construction", "built", "context", "masterplan"];

export function resolveMediaDisplay(item = {}, fallback = "medium") {
  if (validDisplays.has(item.display)) return item.display;

  const searchable = [
    item.group,
    ...(item.groups || []),
    item.mediaGroup,
    item.filename,
    item.label,
  ].filter(Boolean).join(" ").toLowerCase();

  if (drawingTerms.some((term) => searchable.includes(term))) return "drawing";
  if (largeTerms.some((term) => searchable.includes(term))) return "large";
  return validDisplays.has(fallback) ? fallback : "medium";
}
