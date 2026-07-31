/* Erişilebilirlik denetimi: metin kontrastı, dokunma hedefi, etiketler, alt metinler. */
import puppeteer from "puppeteer-core";

const URL = process.env.SHOT_URL ?? "http://localhost:4321/";
const CHROME =
  process.env.CHROME_PATH ?? "C:/Program Files/Google/Chrome/Application/chrome.exe";

const browser = await puppeteer.launch({ executablePath: CHROME, headless: "new" });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto(URL, { waitUntil: "networkidle2" });
await page.evaluate(async () => {
  for (let y = 0; y < document.body.scrollHeight; y += 600) {
    window.scrollTo({ top: y, behavior: "instant" });
    await new Promise((r) => setTimeout(r, 40));
  }
  window.scrollTo({ top: 0, behavior: "instant" });
});

const report = await page.evaluate(() => {
  const lum = ([r, g, b]) => {
    const f = (c) => {
      c /= 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  };
  const parse = (s) => (s.match(/[\d.]+/g) ?? []).map(Number);
  const ratio = (a, b) => {
    const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x);
    return (l1 + 0.05) / (l2 + 0.05);
  };

  /** Şeffaf katmanları aşarak gerçek arka planı bul (yaklaşık). */
  const bgOf = (el) => {
    let n = el;
    while (n && n !== document.documentElement) {
      const c = parse(getComputedStyle(n).backgroundColor);
      if (c.length >= 3 && (c[3] === undefined || c[3] > 0.85)) return c.slice(0, 3);
      n = n.parentElement;
    }
    return [8, 9, 11];
  };

  const contrast = [];
  const touch = [];
  const labels = [];
  const alts = [];

  for (const el of document.querySelectorAll("body *")) {
    const cs = getComputedStyle(el);
    if (cs.display === "none" || cs.visibility === "hidden" || cs.opacity === "0") continue;

    // --- metin kontrastı (yalnızca doğrudan metin taşıyan öğeler)
    const direct = [...el.childNodes].some(
      (n) => n.nodeType === 3 && n.textContent.trim().length > 1,
    );
    if (direct) {
      const size = parseFloat(cs.fontSize);
      const weight = Number(cs.fontWeight) || 400;
      const large = size >= 24 || (size >= 18.66 && weight >= 700);
      const need = large ? 3 : 4.5;
      const r = ratio(parse(cs.color).slice(0, 3), bgOf(el));
      if (r < need) {
        contrast.push({
          text: el.textContent.trim().slice(0, 40),
          ratio: +r.toFixed(2),
          need,
          size,
          color: cs.color,
        });
      }
    }

    // --- dokunma hedefi
    if (/^(A|BUTTON|SUMMARY)$/.test(el.tagName) || el.tagName === "INPUT") {
      const rect = el.getBoundingClientRect();
      // sr-only atlama bağlantısı yalnızca odaklanınca görünür; odaklıyken
      // ölçülür (bkz. e2e.mjs "İlk Tab atlama bağlantısını açıyor").
      if (el.classList.contains("sr-only")) continue;
      const inline = cs.display === "inline" || el.closest("p, blockquote, figcaption, address");
      if (rect.width && rect.height && !inline && (rect.height < 40 || rect.width < 24)) {
        touch.push({
          tag: el.tagName,
          text: (el.textContent || el.ariaLabel || "").trim().slice(0, 34),
          w: Math.round(rect.width),
          h: Math.round(rect.height),
        });
      }
    }

    // --- form etiketi
    if (/^(INPUT|SELECT|TEXTAREA)$/.test(el.tagName) && el.type !== "hidden") {
      const hasLabel =
        (el.id && document.querySelector(`label[for="${el.id}"]`)) ||
        el.closest("label") ||
        el.getAttribute("aria-label") ||
        el.getAttribute("aria-labelledby");
      if (!hasLabel) labels.push(el.id || el.name || el.type);
    }

    // --- alt metni
    if (el.tagName === "IMG" && el.getAttribute("alt") === null) alts.push(el.currentSrc || el.src);
  }

  const iconBtns = [...document.querySelectorAll("button, a")].filter(
    (b) => !b.textContent.trim() && !b.getAttribute("aria-label") && b.querySelector("svg"),
  ).length;

  return {
    contrast,
    touch,
    labels,
    alts,
    iconBtns,
    h1: document.querySelectorAll("h1").length,
    lang: document.documentElement.lang,
    title: document.title.length,
    desc: document.querySelector('meta[name="description"]')?.content.length ?? 0,
    lazy: document.querySelectorAll('img[loading="lazy"]').length,
    imgs: document.querySelectorAll("img").length,
  };
});

await browser.close();

const line = (label, arr, fmt = JSON.stringify) =>
  `${arr.length ? "FAIL" : "PASS"}  ${label}${arr.length ? `\n      ${arr.map(fmt).join("\n      ")}` : ""}`;

console.log(line("Metin kontrastı (WCAG AA)", report.contrast, (c) => `${c.ratio}:1 (≥${c.need}) — "${c.text}"`));
console.log(line("Dokunma hedefi ≥ 40px", report.touch, (t) => `${t.tag} ${t.w}×${t.h} — "${t.text}"`));
console.log(line("Form etiketleri", report.labels));
console.log(line("Görsel alt metinleri", report.alts));
console.log(`${report.iconBtns ? "FAIL" : "PASS"}  Etiketsiz ikon butonu: ${report.iconBtns}`);
console.log(`${report.h1 === 1 ? "PASS" : "FAIL"}  Tek <h1>: ${report.h1}`);
console.log(`${report.lang === "tr" ? "PASS" : "FAIL"}  lang="${report.lang}"`);
console.log(`${report.title > 20 && report.title < 70 ? "PASS" : "WARN"}  <title> ${report.title} karakter`);
console.log(`${report.desc > 70 && report.desc < 180 ? "PASS" : "WARN"}  description ${report.desc} karakter`);
console.log(`INFO  ${report.lazy}/${report.imgs} görsel lazy-load`);
