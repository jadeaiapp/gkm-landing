/**
 * GitHub Pages benzetimi: dist/ çıktısını bir ALT DİZİN altında yayınlar.
 * Amaç, `base: "./"` ile üretilen göreli yolların gerçekten bozulmadığını
 * doğrulamak. Varsayılan adres: http://localhost:4400/gkm-landing/
 */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve("dist");
const PREFIX = process.env.SUBPATH ?? "/gkm-landing";
const PORT = Number(process.env.PORT ?? 4400);

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".json": "application/json",
};

http
  .createServer((req, res) => {
    const url = decodeURIComponent((req.url ?? "/").split("?")[0]);

    if (!url.startsWith(PREFIX)) {
      res.writeHead(404).end("alt dizin dışı");
      return;
    }

    let rel = url.slice(PREFIX.length) || "/";
    if (rel.endsWith("/")) rel += "index.html";

    const file = path.join(ROOT, rel);
    if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
      res.writeHead(404).end("bulunamadı: " + rel);
      return;
    }

    const body = fs.readFileSync(file);
    res.writeHead(200, {
      "content-type": TYPES[path.extname(file)] ?? "application/octet-stream",
      "content-length": body.length,
      "cache-control": "no-store",
    });
    res.end(body);
  })
  .listen(PORT, () => console.log(`http://localhost:${PORT}${PREFIX}/`));
