/**
 * Google Fonts'tan woff2 dosyalarını indirip yerel olarak barındırır.
 * Böylece sayfa üçüncü taraf isteği yapmaz; GitHub Pages'te de offline çalışır.
 *
 * Çalıştırma:  node scripts/fetch-fonts.mjs
 */
import fs from "node:fs/promises";
import path from "node:path";

const OUT = path.resolve("src/assets/fonts");
const CSS_OUT = path.resolve("src/styles/fonts.css");

// Değişken (variable) eksenleriyle iste — tek dosya, tüm ağırlıklar.
const FAMILIES = [
  { q: "Archivo:wght@400..800", local: "archivo" },
  { q: "Inter:wght@400..700", local: "inter" },
];

// Modern woff2 + unicode-range çıktısı almak için güncel bir UA gerekiyor.
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36";

const KEEP = new Set(["latin", "latin-ext"]);

async function run() {
  await fs.mkdir(OUT, { recursive: true });
  let out = "/* Otomatik üretildi: node scripts/fetch-fonts.mjs — elle düzenlemeyin. */\n";

  for (const fam of FAMILIES) {
    const url = `https://fonts.googleapis.com/css2?family=${fam.q}&display=swap`;
    const css = await (await fetch(url, { headers: { "User-Agent": UA } })).text();

    // Her @font-face bloğunu, üstündeki /* subset */ yorumuyla birlikte yakala.
    const blocks = [...css.matchAll(/\/\*\s*([\w[\]-]+)\s*\*\/\s*(@font-face\s*\{[^}]+\})/g)];
    let n = 0;
    for (const [, subset, block] of blocks) {
      if (!KEEP.has(subset)) continue;
      const srcUrl = block.match(/url\((https:\/\/[^)]+\.woff2)\)/)?.[1];
      if (!srcUrl) continue;

      const file = `${fam.local}-${subset}.woff2`;
      const buf = Buffer.from(await (await fetch(srcUrl)).arrayBuffer());
      await fs.writeFile(path.join(OUT, file), buf);

      out +=
        "\n" +
        block
          .replace(/url\(https:\/\/[^)]+\.woff2\)/, `url("../assets/fonts/${file}")`)
          .replace(/^@font-face\s*\{/, "@font-face {")
          .replace(/;\s*/g, ";\n  ")
          .replace(/\{\s*/, " {\n  ")
          .replace(/\s*}$/, "\n}") +
        "\n";
      n++;
      console.log(`• ${file}  ${(buf.length / 1024).toFixed(1)} KB`);
    }
    if (!n) throw new Error(`${fam.q} için woff2 bulunamadı`);
  }

  await fs.writeFile(CSS_OUT, out, "utf8");
  console.log(`\n→ ${CSS_OUT}`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
