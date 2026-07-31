/**
 * Görsel varlık hattı — indir, kırp, WebP'ye çevir.
 *
 * Tüm kaynaklar telifsiz (royalty-free) stok görsellerdir ve depoya yerel
 * olarak kopyalanır; sitede hiçbir dış adrese hotlink yapılmaz.
 * Kaynak ve lisans dökümü için RESEARCH.md dosyasına bakın.
 *
 * Çalıştırma:  node scripts/fetch-assets.mjs
 */
import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

const OUT = path.resolve("src/assets/img");
const TMP = path.resolve(".asset-cache");

const px = (id, w) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;
const un = (slug, w) => `https://unsplash.com/photos/${slug}/download?w=${w}`;

/** @type {{key:string,url:string,variants:{name:string,w:number,h:number,q?:number,pos?:string}[]}[]} */
const ASSETS = [
  {
    key: "hero",
    url: px(20051465, 2400),
    variants: [
      { name: "hero-panel", w: 1280, h: 960, q: 72, pos: "attention" },
      { name: "hero-panel-sm", w: 840, h: 700, q: 68, pos: "attention" },
    ],
  },
  { key: "tint", url: px(37832994, 2000), variants: [{ name: "tint-view", w: 1440, h: 900, q: 76 }] },

  // Galeri — uygulama kareleri
  { key: "g-film", url: px(31154212, 1600), variants: [{ name: "g-film", w: 1200, h: 900, q: 74 }, { name: "g-film-t", w: 640, h: 480, q: 70 }] },
  { key: "g-ppf-hood", url: px(20051468, 1600), variants: [{ name: "g-ppf-hood", w: 1200, h: 900, q: 74 }, { name: "g-ppf-hood-t", w: 640, h: 480, q: 70 }] },
  { key: "g-wrap-blue", url: px(10162528, 1600), variants: [{ name: "g-wrap-blue", w: 1200, h: 900, q: 74 }, { name: "g-wrap-blue-t", w: 640, h: 480, q: 70 }] },
  { key: "g-squeegee", url: px(17641807, 1600), variants: [{ name: "g-squeegee", w: 1200, h: 900, q: 74 }, { name: "g-squeegee-t", w: 640, h: 480, q: 70 }] },
  { key: "g-heat", url: px(10126666, 1600), variants: [{ name: "g-heat", w: 1200, h: 900, q: 74 }, { name: "g-heat-t", w: 640, h: 480, q: 70 }] },
  { key: "g-ppf-lay", url: px(20051464, 1600), variants: [{ name: "g-ppf-lay", w: 1200, h: 900, q: 74 }, { name: "g-ppf-lay-t", w: 640, h: 480, q: 70 }] },
  { key: "g-clear", url: px(6025950, 1600), variants: [{ name: "g-clear", w: 1200, h: 900, q: 74 }, { name: "g-clear-t", w: 640, h: 480, q: 70 }] },
  { key: "g-tinted", url: px(20036216, 1600), variants: [{ name: "g-tinted", w: 1200, h: 900, q: 74 }, { name: "g-tinted-t", w: 640, h: 480, q: 70 }] },
  { key: "g-result", url: px(14313347, 1600), variants: [{ name: "g-result", w: 1200, h: 900, q: 74 }, { name: "g-result-t", w: 640, h: 480, q: 70 }] },
  { key: "g-roll", url: px(14999240, 1600), variants: [{ name: "g-roll", w: 1200, h: 900, q: 74 }, { name: "g-roll-t", w: 640, h: 480, q: 70 }] },

  // Doku / atmosfer
  { key: "grille", url: un("CVShJySkJZQ", 1600), variants: [{ name: "tex-grille", w: 1100, h: 1100, q: 72 }] },
  { key: "band", url: px(26691322, 2200), variants: [{ name: "tex-band", w: 1800, h: 800, q: 68, pos: "attention" }] },
];

async function download(url, dest) {
  try {
    const st = await fs.stat(dest);
    if (st.size > 4096) return dest;
  } catch {
    /* yok, indir */
  }
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 4096) throw new Error(`çok küçük yanıt (${buf.length} B): ${url}`);
  await fs.writeFile(dest, buf);
  return dest;
}

async function run() {
  await fs.mkdir(OUT, { recursive: true });
  await fs.mkdir(TMP, { recursive: true });

  for (const a of ASSETS) {
    const src = path.join(TMP, `${a.key}.jpg`);
    process.stdout.write(`• ${a.key} … `);
    await download(a.url, src);
    for (const v of a.variants) {
      await sharp(src)
        .resize(v.w, v.h, { fit: "cover", position: v.pos ?? "centre" })
        .webp({ quality: v.q ?? 74, effort: 6 })
        .toFile(path.join(OUT, `${v.name}.webp`));
    }
    console.log(`${a.variants.length} varyant`);
  }

  // ---- Open Graph kartı (1200×630) ----
  const ogBase = await sharp(path.join(TMP, "hero.jpg"))
    .resize(1200, 630, { fit: "cover" })
    .modulate({ brightness: 0.44, saturation: 0.62 })
    .toBuffer();

  const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
    <defs>
      <linearGradient id="s" x1="0" y1="0" x2="0.7" y2="1">
        <stop offset="0" stop-color="#08090B" stop-opacity="0.94"/>
        <stop offset="0.55" stop-color="#08090B" stop-opacity="0.74"/>
        <stop offset="1" stop-color="#08090B" stop-opacity="0.92"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#s)"/>
    <text x="72" y="132" font-family="Segoe UI, Arial, sans-serif" font-size="27"
          font-weight="700" letter-spacing="8" fill="#E8A33D">GKM</text>
    <text x="72" y="178" font-family="Segoe UI, Arial, sans-serif" font-size="20"
          letter-spacing="3.2" fill="#9AA4B2">ALTAYÇEŞME · MALTEPE · İSTANBUL</text>
    <rect x="72" y="212" width="112" height="2" fill="#E8A33D"/>
    <text x="72" y="304" font-family="Segoe UI, Arial, sans-serif" font-size="70"
          font-weight="700" fill="#F5F7FA">Camına film.</text>
    <text x="72" y="380" font-family="Segoe UI, Arial, sans-serif" font-size="70"
          font-weight="700" fill="#F5F7FA">Kaputuna koruma.</text>
    <text x="72" y="456" font-family="Segoe UI, Arial, sans-serif" font-size="70"
          font-weight="700" fill="#E8A33D">Gövdesine yeni bir renk.</text>
    <text x="72" y="516" font-family="Segoe UI, Arial, sans-serif" font-size="25"
          fill="#C9CED6">Oto cam filmi · PPF boya koruma · Araç kaplama</text>
    <text x="72" y="558" font-family="Segoe UI, Arial, sans-serif" font-size="25"
          font-weight="700" fill="#E8A33D">★ 4,8</text>
    <text x="146" y="558" font-family="Segoe UI, Arial, sans-serif" font-size="25"
          fill="#C9CED6">· 493 Google değerlendirmesi</text>

    <!-- Konsept uyarısı — paylaşımda resmî site izlenimi vermemeli -->
    <rect x="828" y="56" width="300" height="46" rx="23"
          fill="#17120A" stroke="#E8A33D" stroke-opacity="0.55" stroke-width="1.5"/>
    <text x="978" y="86" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif"
          font-size="18" font-weight="700" letter-spacing="2.4" fill="#E8A33D">KONSEPT ÇALIŞMA</text>
    <text x="72" y="598" font-family="Segoe UI, Arial, sans-serif" font-size="20"
          fill="#9AA4B2">Bağımsız konsept çalışma — GKM'nin resmî web sitesi değildir.</text>
  </svg>`;

  await sharp(ogBase)
    .composite([{ input: Buffer.from(ogSvg), top: 0, left: 0 }])
    .jpeg({ quality: 84 })
    .toFile(path.resolve("public/og-gkm.jpg"));
  console.log("• og-gkm.jpg");

  console.log(`\nBitti → ${OUT}`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
