import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("../static-portfolio/", import.meta.url)));
const port = Number(process.env.PORT || 8080);
const mime = { ".css": "text/css", ".gif": "image/gif", ".html": "text/html; charset=utf-8", ".jpg": "image/jpeg", ".js": "text/javascript", ".json": "application/json", ".png": "image/png", ".svg": "image/svg+xml", ".webp": "image/webp", ".mp4": "video/mp4", ".webm": "video/webm", ".woff2": "font/woff2" };

createServer((request, response) => {
  const url = new URL(request.url, `http://${request.headers.host || "localhost"}`);
  let pathname = decodeURIComponent(url.pathname);
  if (pathname === "/") pathname = "/index.html";
  const candidate = resolve(root, `.${normalize(pathname)}`);
  if (!candidate.startsWith(root)) { response.writeHead(403).end(); return; }
  let file = candidate;
  if (!extname(file) && existsSync(`${file}.html`)) file = `${file}.html`;
  if (existsSync(file) && statSync(file).isDirectory()) file = resolve(file, "index.html");
  if (!existsSync(file) && !extname(file) && existsSync(`${file}.html`)) file = `${file}.html`;
  if (!existsSync(file) || !statSync(file).isFile()) { response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" }).end("Not found"); return; }
  const size = statSync(file).size;
  const headers = { "Content-Type": mime[extname(file).toLowerCase()] || "application/octet-stream", "Cache-Control": "no-store", "Accept-Ranges": "bytes" };
  let start = 0, end = size - 1, status = 200;
  if (request.headers.range) {
    const match = /^bytes=(\d*)-(\d*)$/.exec(request.headers.range);
    if (!match || (!match[1] && !match[2])) { response.writeHead(416, { ...headers, "Content-Range": `bytes */${size}` }).end(); return; }
    start = match[1] ? Number(match[1]) : Math.max(0, size - Number(match[2]));
    end = match[1] && match[2] ? Math.min(Number(match[2]), size - 1) : size - 1;
    if (start > end || start >= size) { response.writeHead(416, { ...headers, "Content-Range": `bytes */${size}` }).end(); return; }
    status = 206;
    headers["Content-Range"] = `bytes ${start}-${end}/${size}`;
  }
  headers["Content-Length"] = end - start + 1;
  response.writeHead(status, headers);
  if (request.method === "HEAD") { response.end(); return; }
  createReadStream(file, { start, end }).pipe(response);
}).listen(port, () => console.log(`Portfolio preview: http://localhost:${port}`));
