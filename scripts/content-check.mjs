/**
 * İçerik doğruluk kontrolü.
 *
 * Sitede yayınlanan her işletme bilgisinin RESEARCH.md'de belgelenmiş olduğunu
 * ve demo modunun tutarlı kaldığını doğrular. Bilgi güncellendiğinde bu betik,
 * RESEARCH.md'yi güncellemeyi unutursanız uyarır.
 *
 * Çalıştırma:  npm run test:content
 */
import fs from "node:fs";
import path from "node:path";

const read = (p) => fs.readFileSync(path.resolve(p), "utf8");

const site = read("src/content/site.ts");
const research = read("RESEARCH.md");
const html = read("index.html");
const robots = read("public/robots.txt");
const schema = read("docs/schema-localbusiness.json");

/** HTML yorumlarını çıkarır — açıklama metinlerini gerçek etiket sanmamak için. */
const stripComments = (h) => h.replace(/<!--[\s\S]*?-->/g, "");
/** site.ts içinde iki işaret arasındaki bloğu döndürür. */
const block = (from, to) => site.split(from)[1]?.split(to)[0] ?? "";

const results = [];
const check = (name, ok, detail = "") =>
  results.push({ ok, line: `${ok ? "PASS" : "FAIL"}  ${name}${detail ? ` — ${detail}` : ""}` });

/** site.ts içinden bir string alanın değerini çeker. */
const val = (key) => site.match(new RegExp(`${key}:\\s*"([^"]+)"`))?.[1] ?? null;
/** site.ts içinden bir sayı alanının değerini çeker. */
const num = (key) => site.match(new RegExp(`${key}:\\s*(\\d+)`))?.[1] ?? null;

/* ------------------------------------------- 1. Yayınlanan bilgi = belgelenen */

const facts = [
  ["Telefon", val("phoneDisplay"), research],
  ["WhatsApp numarası", val("whatsapp"), `${research}${site}`],
  ["Adres (sokak)", "Adalı Sokağı No: 10", research],
  ["Posta kodu", "34843", research],
  ["Google puanı", val("score"), research],
  ["Değerlendirme sayısı", num("count"), research],
  ["Harita bağlantısı", val("maps"), research],
  ["Instagram", val("instagram"), research],
  ["Facebook", val("facebook"), research],
  ["Doğrulama tarihi", val("verifiedOn"), research],
];

for (const [name, value, haystack] of facts) {
  if (!value) {
    check(`${name} site.ts'te bulundu`, false, "alan okunamadı");
    continue;
  }
  check(`${name} RESEARCH.md'de belgeli`, haystack.includes(value), value);
}

/* -------------------------------------------------- 2. Çalışma saatleri tutarlı */

const weekday = site.match(/day:\s*"Pazartesi – Cumartesi",\s*value:\s*"([^"]+)"/)?.[1];
const sunday = site.match(/day:\s*"Pazar",\s*value:\s*"([^"]+)"/)?.[1];
check("Hafta içi–Cumartesi saati belgeli", research.includes("09.00–20.00"), weekday ?? "?");
check("Pazar saati belgeli", research.includes("13.00–20.00"), sunday ?? "?");
check(
  "Görünen saatler makine listesiyle uyumlu",
  weekday === "09.00 – 20.00" &&
    sunday === "13.00 – 20.00" &&
    /\{ day: 0, open: "13:00", close: "20:00" \}/.test(site) &&
    /\{ day: 6, open: "09:00", close: "20:00" \}/.test(site),
);

/* ------------------------------------------------------- 3. Hizmetler belgeli */

const services = [...block("export const services", "export const advantages").matchAll(/title: "([^"]+)"/g)].map(
  (m) => m[1],
);
check("Altı hizmet tanımlı", services.length === 6, services.join(" · "));
check(
  "Seramik kaplama iddia edilmiyor",
  !/seramik/i.test(site.split("export const advantages")[0]),
);

/* --------------------------------------------------------- 4. Yorumlar gerçek */

const reviewCount = (site.match(/source: "Google"/g) ?? []).length;
check("Yorumlar Google kaynaklı ve sayısı belgeli", reviewCount === 12, `${reviewCount} yorum`);
const names = [...block("export const testimonials", "/** Yorum listesi").matchAll(/name: "([^"]+)"/g)].map(
  (m) => m[1],
);
check(
  "Yorum adları kısaltılmış (soyadı tam değil)",
  names.every((n) => /^[^ ]+ [A-ZÇĞİÖŞÜ]\.$|^[A-Z0-9]+$/.test(n)),
  names.join(", "),
);
for (const n of names) {
  if (!research.includes(n)) check(`Yorum "${n}" RESEARCH.md'de listeli`, false);
}

/* ------------------------------------------ 5. Solar Gard iddiası kaynak notlu */

check(
  "Solar Gard iddiası kaynağıyla sunuluyor",
  /kendi Instagram hesabında belirttiği/.test(site) &&
    /kendi.*Instagram biyografisi|kamuya açık beyanıdır/.test(research),
);
check("'Yetkili servis' iddiası yok", !/yetkili servis/i.test(site));

/* -------------------------------------- 6. Stok görseller konsept olarak işaretli */

check("Stok görsel notu içerikte", /telifsiz stok görsellerdir/.test(site));
check("Galeri/hero 'Konsept görsel' etiketi", fs.existsSync("src/components/Gallery.tsx"));
check("Konsept uyarısı footer metninde", /resmî web sitesi değildir/.test(site));

/* --------------------------------------------------------- 7. Demo modu tutarlı */

const demoOn = /enabled:\s*true/.test(site.split("export const business")[0]);
check("demoMode açık", demoOn);
check("robots meta noindex", /name="robots"[^>]*noindex/.test(html));
check("robots meta nofollow", /name="robots"[^>]*nofollow/.test(html));
check("robots.txt tüm botları engelliyor", /User-agent:\s*\*\s*\nDisallow:\s*\//.test(robots));
check(
  "index.html'de işletme JSON-LD yok",
  !/<script[^>]*application\/ld\+json/i.test(stripComments(html)),
);
check("Schema yedeği docs/ altında duruyor", /"@type": "AutoRepair"/.test(schema));
check(
  "Schema yedeği build çıktısına girmiyor",
  !fs.existsSync("dist/schema-localbusiness.json") &&
    !fs.existsSync("public/schema-localbusiness.json"),
);
check("Başlık konsept olduğunu söylüyor", /<title>[^<]*Konsept/i.test(html));

/* ------------------------------------------------- 8. Doğrulanmamış alan gizli */

check(
  "E-posta doğrulanmamış olarak işaretli",
  /email:\s*\{\s*verified:\s*false/.test(site),
);
const componentSource = fs
  .readdirSync("src/components")
  .map((f) => read(path.join("src/components", f)))
  .join("");
check("Doğrulanmamış e-posta hiçbir bileşende kullanılmıyor", !/business\.email/.test(componentSource));

/* ----------------------------------------------------------------- Sonuç */

console.log(results.map((r) => r.line).join("\n"));
const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} geçti`);
process.exit(failed.length ? 1 : 0);
