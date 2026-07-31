/* Görsel kontrol + konsol hatası taraması. Yalnızca geliştirme aracıdır. */
import puppeteer from "puppeteer-core";
import fs from "node:fs/promises";
import path from "node:path";

const URL = process.env.SHOT_URL ?? "http://localhost:4321/";
const OUT = path.resolve(process.env.SHOT_OUT ?? ".shots");
const CHROME =
  process.env.CHROME_PATH ?? "C:/Program Files/Google/Chrome/Application/chrome.exe";

const VIEWS = [
  { name: "mobile", width: 390, height: 844, dsf: 2, mobile: true },
  { name: "mobile-sm", width: 360, height: 740, dsf: 2, mobile: true },
  { name: "tablet", width: 834, height: 1112, dsf: 1, mobile: true },
  { name: "desktop", width: 1440, height: 900, dsf: 1, mobile: false },
  { name: "wide", width: 1920, height: 1080, dsf: 1, mobile: false },
];

const problems = [];

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--hide-scrollbars", "--force-device-scale-factor=1"],
});

await fs.mkdir(OUT, { recursive: true });

for (const v of VIEWS) {
  const page = await browser.newPage();
  page.on("console", (m) => {
    if (["error", "warning"].includes(m.type()))
      problems.push(`[${v.name}] console.${m.type()}: ${m.text()}`);
  });
  page.on("pageerror", (e) => problems.push(`[${v.name}] pageerror: ${e.message}`));
  page.on("requestfailed", (r) => {
    const u = r.url();
    // Harita gömme isteği ağ kısıtlı ortamda başarısız olabilir; bu bir hata değil.
    if (u.includes("google.com/maps")) return;
    problems.push(`[${v.name}] requestfailed: ${u} — ${r.failure()?.errorText}`);
  });

  await page.setViewport({
    width: v.width,
    height: v.height,
    deviceScaleFactor: v.dsf,
    isMobile: v.mobile,
    hasTouch: v.mobile,
  });

  await page.goto(URL, { waitUntil: "networkidle2", timeout: 45000 });

  // Tüm reveal/lazy içeriği tetiklemek için sayfayı baştan sona gez.
  await page.evaluate(async () => {
    const step = Math.round(window.innerHeight * 0.75);
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo({ top: y, behavior: 'instant' });
      await new Promise((r) => setTimeout(r, 90));
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
    await new Promise((r) => setTimeout(r, 500));
  });

  // Yatay taşma kontrolü — mobil için kritik.
  const overflow = await page.evaluate(() => {
    const de = document.documentElement;
    const bad = [];
    if (de.scrollWidth > de.clientWidth + 1) {
      for (const el of document.querySelectorAll("body *")) {
        const r = el.getBoundingClientRect();
        if (r.right > de.clientWidth + 1 || r.left < -1) {
          bad.push(`${el.tagName.toLowerCase()}.${(el.className || "").toString().slice(0, 60)}`);
          if (bad.length > 6) break;
        }
      }
    }
    return { doc: de.scrollWidth, client: de.clientWidth, bad };
  });
  if (overflow.doc > overflow.client + 1) {
    problems.push(
      `[${v.name}] YATAY TAŞMA ${overflow.doc}>${overflow.client}: ${overflow.bad.join(", ")}`,
    );
  }

  await page.screenshot({ path: path.join(OUT, `${v.name}.png`), fullPage: true });

  // İlk ekran ayrıca — CTA katlamanın üstünde mi?
  await page.screenshot({ path: path.join(OUT, `${v.name}-fold.png`), fullPage: false });

  const foldOk = await page.evaluate(() => {
    const cta = document.querySelector('a[href="#fiyat-al"].btn-primary');
    if (!cta) return "CTA bulunamadı";
    const r = cta.getBoundingClientRect();
    return r.bottom <= window.innerHeight ? "ok" : `CTA katlamanın altında (${Math.round(r.bottom)}px)`;
  });
  if (foldOk !== "ok") problems.push(`[${v.name}] ${foldOk}`);

  await page.close();
  console.log(`✓ ${v.name}`);
}

await browser.close();

console.log("\n--- SORUNLAR ---");
console.log(problems.length ? problems.join("\n") : "yok");
