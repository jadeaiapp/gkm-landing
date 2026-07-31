/* Etkileşim testleri: form doğrulaması, WhatsApp bağlantısı, ton seçici,
   hizmet kartı → form aktarımı, lightbox ve mobil menü. */
import puppeteer from "puppeteer-core";

const URL = process.env.SHOT_URL ?? "http://localhost:4321/";
const CHROME =
  process.env.CHROME_PATH ?? "C:/Program Files/Google/Chrome/Application/chrome.exe";

const results = [];
const check = (name, ok, detail = "") =>
  results.push(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? ` — ${detail}` : ""}`);

const browser = await puppeteer.launch({ executablePath: CHROME, headless: "new" });
const page = await browser.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
page.on("console", (m) => m.type() === "error" && errors.push(m.text()));

await page.setViewport({ width: 1440, height: 900 });
await page.goto(URL, { waitUntil: "networkidle2" });

/* --- 1. Boş form gönderimi hata göstermeli, yönlendirme yapmamalı ---------- */
await page.click('#fiyat-al button[type="submit"]');
await new Promise((r) => setTimeout(r, 250));
const errCount = await page.$$eval('[role="alert"]', (n) => n.length);
check("Boş form 5 hata gösteriyor", errCount === 5, `${errCount} hata`);

const focusedId = await page.evaluate(() => document.activeElement?.id);
check("Odak ilk hatalı alana taşındı", focusedId === "marka", `odak: ${focusedId}`);

/* --- 2. Geçersiz telefon reddedilmeli ------------------------------------- */
await page.type("#marka", "Renault");
await page.type("#model", "Clio");
await page.select("#yil", "2023");
await page.select("#hizmet", "Oto cam filmi");
await page.type("#telefon", "1234");
await page.click("#not");
await new Promise((r) => setTimeout(r, 200));
const phoneErr = await page.$eval("#telefon-hata", (n) => n.textContent?.trim()).catch(() => null);
check("Geçersiz telefon yakalandı", Boolean(phoneErr), phoneErr ?? "hata yok");

/* --- 3. Telefon biçimlendirme --------------------------------------------- */
await page.$eval("#telefon", (el) => {
  el.value = "";
});
await page.focus("#telefon");
await page.type("#telefon", "05321234567");
const formatted = await page.$eval("#telefon", (el) => el.value);
check("Telefon biçimlendi", formatted === "0532 123 45 67", formatted);

/* --- 4. Geçerli gönderim doğru wa.me bağlantısını üretmeli ---------------- */
await page.evaluate(() => {
  window.__opened = null;
  window.open = (u) => {
    window.__opened = u;
    return null;
  };
});
await page.click('#fiyat-al button[type="submit"]');
await new Promise((r) => setTimeout(r, 350));

const opened = await page.evaluate(() => window.__opened);
const decoded = opened ? decodeURIComponent(opened) : "";
check("WhatsApp bağlantısı açıldı", Boolean(opened));
check(
  "Numara doğru (905359654121)",
  opened?.startsWith("https://wa.me/905359654121?text="),
  opened?.slice(0, 46),
);
check("Mesajda araç bilgisi var", decoded.includes("2023 model Renault Clio"));
check("Mesajda hizmet var", decoded.includes("oto cam filmi"));
check("Mesajda telefon var", decoded.includes("0532 123 45 67"));

const successVisible = await page.$eval("#fiyat-al", (n) =>
  n.textContent?.includes("WhatsApp'a yönlendirildiniz"),
);
check("Başarı ekranı gösterildi", Boolean(successVisible));

/* --- 5. Hizmet kartı → forma aktarım -------------------------------------- */
await page.reload({ waitUntil: "networkidle2" });
await page.evaluate(() => {
  const btns = [...document.querySelectorAll("#hizmetler button")];
  btns.find((b) => b.textContent?.includes("Bu hizmet için fiyat sor"))?.click();
});
await new Promise((r) => setTimeout(r, 900));
const preselected = await page.$eval("#hizmet", (el) => el.value);
check("Hizmet kartı formu önseçti", preselected === "Oto cam filmi", preselected);

/* --- 6. Ton seçici → forma aktarım ---------------------------------------- */
await page.reload({ waitUntil: "networkidle2" });
await page.evaluate(() => {
  document.getElementById("ton-secici")?.scrollIntoView({ behavior: "instant" });
});
await new Promise((r) => setTimeout(r, 300));
await page.evaluate(() => {
  const b = [...document.querySelectorAll("#ton-secici button")].find((x) =>
    x.textContent?.trim().startsWith("%5"),
  );
  b?.click();
});
await new Promise((r) => setTimeout(r, 200));
await page.evaluate(() => {
  [...document.querySelectorAll("#ton-secici button")]
    .find((x) => x.textContent?.includes("ton için fiyat sor"))
    ?.click();
});
await new Promise((r) => setTimeout(r, 900));
const tintChip = await page.$eval("#fiyat-al", (n) => n.textContent ?? "");
check("Ton seçimi forma taşındı", tintChip.includes("Ton seçicide"), "");

/* --- 7. Lightbox: aç, ilerle, Esc ile kapat ------------------------------- */
await page.reload({ waitUntil: "networkidle2" });
await page.evaluate(() => document.querySelector("#uygulamalar button")?.click());
await new Promise((r) => setTimeout(r, 300));
check("Lightbox açıldı", Boolean(await page.$('[role="dialog"]')));
await page.keyboard.press("ArrowRight");
await new Promise((r) => setTimeout(r, 200));
const counter = await page.$eval('[role="dialog"] .num', (n) => n.textContent?.trim());
check("Ok tuşu ilerletti", counter?.startsWith("02"), counter);
await page.keyboard.press("Escape");
await new Promise((r) => setTimeout(r, 250));
check("Esc kapattı", !(await page.$('[role="dialog"]')));

/* --- 8. Mobil menü -------------------------------------------------------- */
await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
await page.reload({ waitUntil: "networkidle2" });
await page.click('button[aria-controls="mobil-menu"]');
await new Promise((r) => setTimeout(r, 250));
check(
  "Mobil menü açıldı",
  await page.$eval("#mobil-menu", (n) => !n.hidden),
);
await page.keyboard.press("Escape");
await new Promise((r) => setTimeout(r, 250));
check(
  "Mobil menü Esc ile kapandı",
  await page.$eval("#mobil-menu", (n) => n.hidden),
);

/* --- 9. Mobil sabit çubuk ------------------------------------------------- */
await page.evaluate(() => window.scrollTo({ top: 1400, behavior: "instant" }));
await new Promise((r) => setTimeout(r, 500));
const mobileBar = await page.evaluate(() => {
  // Sabit alt çubuk: ekranın altına yapışık, telefon + WhatsApp bağlantısı taşır.
  const bar = document.querySelector("div.fixed.bottom-0");
  if (!bar) return { ok: false, why: "çubuk yok" };
  const r = bar.getBoundingClientRect();
  return {
    ok: r.bottom <= window.innerHeight + 2 && r.top < window.innerHeight,
    tel: Boolean(bar.querySelector('a[href^="tel:"]')),
    wa: Boolean(bar.querySelector('a[href^="https://wa.me/"]')),
    top: Math.round(r.top),
  };
});
check("Mobil sabit çubuk göründü", mobileBar.ok, `top: ${mobileBar.top}`);
check("Sabit çubukta ara + WhatsApp var", mobileBar.tel && mobileBar.wa);

/* --- 10. tel: ve wa.me bağlantıları --------------------------------------- */
const links = await page.$$eval("a[href]", (as) => as.map((a) => a.getAttribute("href")));
check(
  "tel: bağlantısı var",
  links.some((h) => h === "tel:+905359654121"),
);
check(
  "wa.me bağlantısı var",
  links.some((h) => h?.startsWith("https://wa.me/905359654121")),
);
check(
  "Kırık/boş bağlantı yok",
  !links.some((h) => !h || h === "#" || h === "javascript:void(0)"),
);

/* --- 11. prefers-reduced-motion: hareket kapalı, içerik görünür ----------- */
await page.setViewport({ width: 1440, height: 900, isMobile: false, hasTouch: false });
await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
await page.reload({ waitUntil: "networkidle2" });
await page.evaluate(() => window.scrollTo({ top: 2200, behavior: "instant" }));
await new Promise((r) => setTimeout(r, 500));

const rm = await page.evaluate(() => {
  const el = document.querySelector(".reveal");
  const marquee = document.querySelector(".marquee");
  const cs = el ? getComputedStyle(el) : null;
  const hidden = [...document.querySelectorAll(".reveal")].filter(
    (n) => Number(getComputedStyle(n).opacity) < 0.9 && n.getBoundingClientRect().height > 0,
  ).length;
  return {
    dur: cs?.transitionDuration,
    hidden,
    marqueeAnim: marquee ? getComputedStyle(marquee).animationName : "yok",
  };
});
check("Azaltılmış hareket: geçişler kapalı", parseFloat(rm.dur) < 0.01, rm.dur);
check("Azaltılmış hareket: tüm içerik görünür", rm.hidden === 0, `${rm.hidden} gizli öğe`);

/* --- 12. Klavye ile gezinme ---------------------------------------------- */
await page.emulateMediaFeatures([]);
await page.reload({ waitUntil: "networkidle2" });
await page.keyboard.press("Tab");
const skip = await page.evaluate(() => {
  const a = document.activeElement;
  const r = a.getBoundingClientRect();
  return { text: a.textContent?.trim(), h: Math.round(r.height), w: Math.round(r.width) };
});
check(
  "İlk Tab atlama bağlantısını açıyor",
  skip.text === "Fiyat formuna geç" && skip.h >= 40,
  `${skip.text} ${skip.w}×${skip.h}`,
);

/* --- 13. Demo modu: arama motoru koruması ---------------------------------- */
await page.setViewport({ width: 1440, height: 900, isMobile: false, hasTouch: false });
await page.goto(URL, { waitUntil: "domcontentloaded" });

const seo = await page.evaluate(() => ({
  robots: document.querySelector('meta[name="robots"]')?.content ?? "",
  title: document.title,
  desc: document.querySelector('meta[name="description"]')?.content ?? "",
  ogTitle: document.querySelector('meta[property="og:title"]')?.content ?? "",
  ogDesc: document.querySelector('meta[property="og:description"]')?.content ?? "",
  ogSite: document.querySelector('meta[property="og:site_name"]')?.content ?? "",
  twDesc: document.querySelector('meta[name="twitter:description"]')?.content ?? "",
  ld: [...document.querySelectorAll('script[type="application/ld+json"]')].map((n) => n.textContent),
  canonical: document.querySelector('link[rel="canonical"]')?.href ?? "",
}));

check("robots: noindex", seo.robots.includes("noindex"), seo.robots);
check("robots: nofollow", seo.robots.includes("nofollow"));
check("robots: noarchive + nosnippet", seo.robots.includes("noarchive") && seo.robots.includes("nosnippet"));
check("Başlık konsept olduğunu söylüyor", /konsept/i.test(seo.title), seo.title);
check("Açıklama konsept olduğunu söylüyor", /konsept/i.test(seo.desc));
check("OG başlığı konsept", /konsept/i.test(seo.ogTitle), seo.ogTitle);
check("OG açıklaması 'resmî ... değildir' diyor", /resmî web sitesi değildir/i.test(seo.ogDesc));
check("OG site adı resmî izlenimi vermiyor", /konsept|değildir/i.test(seo.ogSite), seo.ogSite);
check("Twitter açıklaması konsept", /değildir/i.test(seo.twDesc));
check("İşletme JSON-LD yayında değil", seo.ld.length === 0, `${seo.ld.length} adet ld+json`);
check(
  "Canonical kendi adresini gösteriyor",
  seo.canonical.startsWith(new globalThis.URL(URL).origin) &&
    !/gkm\.(com|com\.tr)/i.test(seo.canonical),
  seo.canonical,
);

/* --- 14. Konsept şeridi ---------------------------------------------------- */
const barTop = await page.evaluate(() => {
  const p = [...document.querySelectorAll("header p")].find((n) =>
    n.textContent?.includes("Bağımsız konsept çalışma"),
  );
  if (!p) return null;
  const r = p.getBoundingClientRect();
  const cs = getComputedStyle(p);
  return { h: Math.round(r.height), top: Math.round(r.top), color: cs.color, size: cs.fontSize };
});
check("Konsept şeridi sayfa başında görünür", Boolean(barTop && barTop.h > 10), JSON.stringify(barTop));
check("Şerit navigasyondan önce (en üstte)", Boolean(barTop && barTop.top < 40), `top: ${barTop?.top}`);

await page.evaluate(() => window.scrollTo({ top: 1200, behavior: "instant" }));
await new Promise((r) => setTimeout(r, 800));
const afterScroll = await page.evaluate(() => {
  const chip = [...document.querySelectorAll("header span")].find(
    (n) => n.textContent?.trim() === "Konsept",
  );
  const bar = [...document.querySelectorAll("header p")].find((n) =>
    n.textContent?.includes("Bağımsız konsept çalışma"),
  );
  return {
    chip: Boolean(chip),
    chipLabel: chip?.getAttribute("aria-label") ?? "",
    barHeight: bar ? Math.round(bar.getBoundingClientRect().height) : -1,
  };
});
check("Kaydırınca konsept rozeti kalıyor", afterScroll.chip, `rozet: ${afterScroll.chip}`);
check(
  "Rozet tam metni ekran okuyucuya veriyor",
  /resmî web sitesi değildir/i.test(afterScroll.chipLabel),
  afterScroll.chipLabel,
);

/* --- 15. Dış bağlantı hedefleri -------------------------------------------- */
const targets = await page.evaluate(() => {
  const hrefs = [...document.querySelectorAll("a[href]")].map((a) => a.href);
  const uniq = [...new Set(hrefs)];
  return {
    maps: uniq.filter((h) => h.includes("maps.app.goo.gl")).length,
    ig: uniq.filter((h) => h.includes("instagram.com/gkmcamfilmiarackaplama")).length,
    fb: uniq.filter((h) => h.includes("facebook.com/GkmOtoCamFilmi")).length,
    // Yeni sekmede açılan her bağlantıda rel güvenliği olmalı
    unsafeBlank: [...document.querySelectorAll('a[target="_blank"]')].filter(
      (a) => !(a.rel || "").includes("noopener"),
    ).length,
    // Sayfa içi çapaların hedefi gerçekten var mı?
    deadAnchors: [...document.querySelectorAll('a[href^="#"]')]
      .map((a) => a.getAttribute("href"))
      .filter((h) => h && h !== "#" && !document.querySelector(h)),
  };
});
check("Google Maps bağlantısı var", targets.maps > 0, `${targets.maps} adet`);
check("Instagram bağlantısı var", targets.ig > 0, `${targets.ig} adet`);
check("Facebook bağlantısı var", targets.fb > 0, `${targets.fb} adet`);
check("Tüm _blank bağlantılarda noopener var", targets.unsafeBlank === 0, `${targets.unsafeBlank} eksik`);
check(
  "Ölü sayfa içi çapa yok",
  targets.deadAnchors.length === 0,
  targets.deadAnchors.join(", "),
);

/* --- 16. Konsept uyarısı sayfanın kalıcı parçaları içinde ------------------ */
const notices = await page.evaluate(() => {
  const t = document.body.innerText;
  return {
    footer: /resmî web sitesi değildir/i.test(document.querySelector("footer")?.innerText ?? ""),
    stock: /telifsiz stok görsellerdir/i.test(t),
    conceptCaption: [...document.querySelectorAll("figcaption")].some((n) =>
      /konsept görsel/i.test(n.textContent ?? ""),
    ),
  };
});
check("Footer konsept uyarısı duruyor", notices.footer);
check("Stok görsel notu duruyor", notices.stock);
check("'Konsept görsel' etiketi duruyor", notices.conceptCaption);

await browser.close();

console.log(results.join("\n"));
if (errors.length) console.log("\nKONSOL HATALARI:\n" + errors.join("\n"));
const failed = results.filter((r) => r.startsWith("FAIL"));
console.log(`\n${results.length - failed.length}/${results.length} geçti`);
process.exit(failed.length || errors.length ? 1 : 0);
