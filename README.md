# GKM — Oto Cam Filmi ve Araç Kaplama · Konsept Landing Page

Maltepe Altayçeşme'deki **GKM Oto Cam Filmi ve Araç Kaplama** için hazırlanmış,
tek sayfalık, tamamen çalışan, dönüşüm odaklı bir landing page.

> ⚠ **Bağımsız konsept çalışma — GKM'nin resmî web sitesi değildir.**
> Satış görüşmesinde gösterilmek üzere hazırlanmıştır. Site şu anda **demo
> modunda** yayınlanıyor: arama motorlarına kapalı, işletme yapılandırılmış
> verisi devre dışı ve sayfanın en üstünde kalıcı bir konsept şeridi var.
> Kullanılan bilgilerin kaynakları [`RESEARCH.md`](./RESEARCH.md) dosyasında.

Sayfanın tek işi var: ziyaretçiyi **araç bilgilerini bırakıp WhatsApp'tan fiyat
istemeye** yönlendirmek.

**🔗 Canlı demo: https://jadeaiapp.github.io/gkm-landing/**

---

## Hızlı başlangıç

```bash
npm install
npm run dev          # http://localhost:5173

npm run build        # production derleme → dist/
npm run preview      # derlenmiş çıktıyı yerelde aç → http://localhost:4321
```

Node.js 20+ gerekir.

---

## Sık yapılacak değişiklikler

### WhatsApp / telefon numarasını değiştirme

Tek yer: **`src/content/site.ts`**

```ts
export const business = {
  whatsapp: "905359654121",       // wa.me bağlantısı — sadece rakam, ülke kodu dahil
  phoneDisplay: "0535 965 41 21", // ekranda görünen
  phoneHref: "+905359654121",     // tel: bağlantısı
  ...
}
```

Bu üç alan sayfadaki **tüm** WhatsApp butonlarını, telefon bağlantılarını,
formun ürettiği mesajı ve mobil sabit çubuğu besler.

### Diğer içerikler

Aynı dosya sitenin tek içerik merkezidir:

| Ne | Nerede |
|---|---|
| Adres, koordinat, harita bağlantısı | `business.address`, `business.geo`, `business.maps` |
| Instagram / Facebook | `business.social` |
| Hizmet kartları | `services` |
| "Neden GKM?" maddeleri | `advantages` |
| Süreç adımları | `steps` |
| Sık sorulanlar | `faq` |
| Müşteri yorumları | `testimonials` |
| Google puanı ve yorum sayısı | `business.googleRating` |
| Çalışma saatleri | `business.hours` |
| Ton seçici değerleri | `tintLevels` |
| Menü | `nav` |
| Yasal notlar | `disclaimer`, `imageNote` |

Galeri görselleri: `src/content/gallery.ts`

### Puan, saatler ve yorumlar

Bunların tamamı GKM'nin Google işletme kaydından doğrulandı (31 Temmuz 2026) ve
sayfada yayında:

```ts
googleRating: { verified: true, score: "4,8", count: 493 },
hours:        { verified: true, lines: [...], schedule: [...] },
```

`hours.schedule` ayrıca iletişim bölümündeki **"Şu anda açık / kapalı"** rozetini
besler; hesaplama İstanbul saatine göre yapılır (`src/lib/hours.ts`).

Yorumlar `testimonials` dizisinde durur. Yeni yorum eklemek için:

```ts
{
  name: "Mert K.",          // soyadı baş harfe indirin
  text: "…",                // uzunsa kısaltın, anlamı değiştirmeyin
  tag: "Cam filmi",         // kartta görünen hizmet etiketi
  source: "Google",
  date: "Haziran 2026",     // göreli değil, mutlak tarih
  rating: 5,
}
```

Dizi boşaltılırsa bölüm otomatik olarak "yorumlar işletme onayı sonrasında
eklenecektir" notuna ve kanal bağlantılarına döner — kod her iki durumu da
destekler.

Bir bilgiyi doğrulayamazsanız `verified: false` yapın; ilgili bölüm sayfadan
tamamen kalkar.

---

## Yayın modları

Proje iki modda çalışacak şekilde kurgulandı. Aralarındaki geçiş birkaç dosyayla
sınırlıdır; tasarım ve içerik aynı kalır.

### 🟡 Demo modu — şu an aktif

Site GKM'ye sunulmaya hazır, ama internette **resmî GKM sitesi gibi
davranmıyor**:

| Ne | Nerede | Durum |
|---|---|---|
| Konsept şeridi (sayfa başı, kapatılamaz) | `src/content/site.ts` → `demoMode.enabled` | açık |
| `noindex, nofollow, noarchive, nosnippet, noimageindex` | `index.html` | açık |
| İşletme JSON-LD (AutoRepair / AggregateRating / saatler) | `docs/schema-localbusiness.json` | **yayında değil** |
| Sayfa başlığı | "GKM için Hazırlanmış Landing Page Konsepti" | konsept |
| OG / Twitter kartı | "resmî web sitesi değildir" + görselde **KONSEPT ÇALIŞMA** rozeti | konsept |
| Footer uyarısı ve "Konsept görsel" etiketleri | bileşenler | açık |
| Görseller | telifsiz stok (Pexels / Unsplash) | konsept |

**robots.txt hakkında önemli not.** `public/robots.txt` mevcut ve tüm botları
engelliyor, ancak GitHub Pages projeyi bir **alt dizinde** yayınladığı için
(`/gkm-landing/`) tarayıcılar bu dosyayı okumaz — robots.txt yalnızca alan adı
kökünden (`https://jadeaiapp.github.io/robots.txt`) okunur ve orası bu depoya
ait değil.

Bu bir eksiklik değil: **`noindex` meta etiketi robots.txt'ten daha güçlü bir
engeldir.** robots.txt yalnızca *taramayı* engeller; engellenen bir adres başka
bir yerden bağlantı alırsa yine de indekslenebilir. `noindex` ise indekslemeyi
doğrudan yasaklar. Dosya, niyeti belgelemek ve site ileride özel bir alan adının
köküne taşınırsa hazır olsun diye depoda tutuluyor.

### 🟢 Resmî yayın modu — GKM onayından sonra

GKM projeyi kabul ederse sırasıyla:

**İçerik ve hukuk**

1. GKM'den **yazılı içerik ve görsel kullanım onayı** alın.
2. Stok görselleri **GKM'nin kendi uygulama fotoğraflarıyla** değiştirin
   (bkz. "Görselleri yenileme") ve "Konsept görsel" etiketlerini kaldırın.
3. **Logo ve marka renklerini** netleştirin; tipografik "GKM" logosunu değiştirin.
4. **KVKK / gizlilik metni** ekleyin. Form şu anda sunucuya veri göndermiyor,
   ancak analytics eklendiğinde aydınlatma metni ve gerekiyorsa çerez bildirimi
   zorunlu hâle gelir.
5. Google puanı, değerlendirme sayısı ve çalışma saatlerini **yeniden doğrulayın**;
   `business.verifiedOn` tarihini güncelleyin.

**Teknik**

6. `src/content/site.ts` → `demoMode.enabled = false` — konsept şeridi ve rozet kalkar.
7. `index.html` → robots etiketlerini `index, follow` yapın (googlebot / bingbot
   satırlarını silin veya güncelleyin).
8. `docs/schema-localbusiness.json` içeriğini `index.html` içinde bir
   `<script type="application/ld+json">` etiketine taşıyın; `url` alanını
   doldurun, puan ve saatleri güncel değerlerle yazın.
9. Footer'daki konsept cümlesini (`disclaimer`) ve stok görsel notunu
   (`imageNote`) kaldırın veya güncelleyin.
10. **Alan adını bağlayın** (Settings → Pages → Custom domain) ve `.env` içindeki
    `VITE_SITE_URL` değerini yeni adrese çevirin.
11. `public/robots.txt` içeriğini `Allow: /` olacak şekilde güncelleyin — alan
    adı kökünde artık gerçekten okunacaktır.
12. **Google Search Console** ve **analytics / dönüşüm takibi** kurun; WhatsApp
    tıklamaları ve form gönderimleri hedef olarak işaretlenmeli.
13. `npm run test:all` çalıştırın. `test:content` demo modu kontrollerinde
    başarısız olacaktır — bu beklenen davranıştır; kontrolleri resmî moda göre
    güncelleyin.

---

## GitHub Pages

Site **yayında**: https://jadeaiapp.github.io/gkm-landing/

Yayın tamamen otomatik. `main` dalına yaptığınız her push sonrası
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) çalışır, projeyi
derler ve Pages'e dağıtır (~40 saniye).

```bash
git add .
git commit -m "değişiklik"
git push          # gerisi otomatik
```

Yayın durumunu **Actions** sekmesinden ya da terminalden izleyebilirsiniz:

```bash
gh run watch
```

### Kurulum bir kez yapıldı

Aşağıdakiler tamamlandı, tekrar yapmanız gerekmiyor:

- Depo oluşturuldu ve `main` dalına gönderildi
- **Settings → Pages → Source** = **GitHub Actions** olarak ayarlandı
  ("Deploy from a branch" **değil** — proje derleme gerektiriyor)
- `.env` içindeki `VITE_SITE_URL` canlı adrese ayarlandı; sosyal medya
  önizlemesi (WhatsApp, Facebook, X, LinkedIn) doğru çalışıyor

### Depoyu taşırsanız

Başka bir hesaba/isme taşırsanız `.env` dosyasındaki adresi güncelleyip
yeniden push edin:

```env
VITE_SITE_URL=https://YENI-KULLANICI.github.io/YENI-DEPO/
```

Asset yolları göreli olduğu için kod tarafında başka bir değişiklik gerekmez —
yalnızca Open Graph etiketleri bu değeri kullanır.

### Alt dizin ve yenileme sorunları neden yok

- `vite.config.ts` içinde `base: "./"` — tüm JS/CSS/görsel yolları **göreli**
  üretilir, alt dizinde de kök alan adında da bozulmaz.
- Sayfa **tek sayfadır ve router kullanmaz**; tüm gezinme aynı belge içinde
  `#bağlantı` ile yapılır. Yenilemede 404 route hatası oluşmaz.
- `public/.nojekyll` dosyası GitHub'ın Jekyll işlemesini kapatır — böylece alt
  çizgiyle başlayan dosyalar atlanmaz.
- Canonical adres, yayınlandığı gerçek adresten çalışma anında üretilir
  (`src/main.tsx`); derleme sırasında adres bilmeye gerek yoktur.

### Özel alan adı

Alan adınızı **Settings → Pages → Custom domain** alanına yazın, ardından
`.env` içindeki `VITE_SITE_URL` değerini güncelleyin.

---

## Teknik kararlar

| Alan | Seçim | Gerekçe |
|---|---|---|
| Derleyici | Vite 8 | Hızlı derleme, `base: "./"` ile alt dizin güvenli çıktı |
| Arayüz | React 19 + TypeScript | Bileşen ayrımı ve tip güvenliği |
| Stil | Tailwind CSS 4 + `@theme` tokenları | Tek kaynaklı tasarım sistemi |
| Animasyon | **Kütüphane yok** — CSS + IntersectionObserver | Sayfa hızını düşürmemek için; GSAP/Framer ~40–60 kB ek yük getirirdi |
| İkonlar | Elle çizilmiş SVG seti (`src/components/Icon.tsx`) | Emoji yok, ikon paketi yükü yok |
| Fontlar | Archivo + Inter, **kendi sunucumuzda** (woff2, değişken) | Üçüncü taraf isteği yok; `latin` + `latin-ext` alt kümeleriyle Türkçe karakterler tam |
| Form | Backend yok — WhatsApp derin bağlantısı | GitHub Pages statiktir; veri hiçbir sunucuya gitmez |
| Harita | Anahtarsız Google Maps `output=embed` + `loading="lazy"` | API anahtarı gerektirmez, ilk yüklemeyi yavaşlatmaz |

### Neden CSS animasyon, kütüphane değil

Sayfadaki tüm hareket — hero giriş dizisi, scroll ile açılma, metal parlaması,
sayaç, kayan şerit, parallaks, lightbox — `src/styles/index.css` ve
`src/hooks/index.ts` içindeki ~200 satırla yapılıyor. Toplam JS ~265 kB
(gzip **~79 kB**); bunun büyük kısmı React'in kendisi.

`prefers-reduced-motion: reduce` tercih eden kullanıcılarda tüm animasyonlar,
parallaks ve kayan şerit devre dışı kalır.

---

## Proje yapısı

```
gkm-landing/
├─ .github/workflows/deploy.yml   GitHub Pages otomatik yayın
├─ public/
│  ├─ .nojekyll                   GitHub Pages için gerekli
│  ├─ robots.txt                  Demo modu — tüm botlara kapalı (alt dizin notu)
│  ├─ favicon.svg                 Ton skalası logosu
│  └─ og-gkm.jpg                  Sosyal medya kartı — KONSEPT ÇALIŞMA rozetli
├─ docs/
│  └─ schema-localbusiness.json   ★ Demo modunda KAPALI işletme JSON-LD verisi
├─ scripts/
│  ├─ fetch-assets.mjs            Görselleri indir → kırp → WebP + OG kartı
│  ├─ fetch-fonts.mjs             Google Fonts woff2 → yerel
│  ├─ content-check.mjs           site.ts ↔ RESEARCH.md tutarlılığı, demo modu
│  ├─ e2e.mjs                     Etkileşim + SEO + bağlantı testleri (48 kontrol)
│  ├─ a11y.mjs                    Erişilebilirlik denetimi
│  ├─ shots.mjs                   7 cihazda ekran görüntüsü + konsol taraması
│  └─ serve-subpath.mjs           GitHub Pages alt dizin benzetimi
├─ src/
│  ├─ content/site.ts             ★ TÜM içerik ve işletme bilgisi
│  ├─ content/gallery.ts          Galeri görselleri ve açıklamaları
│  ├─ components/                 Bölüm bileşenleri (ConceptBar = konsept şeridi)
│  ├─ hooks/index.ts              Scroll, reveal, sayaç, parallaks, odak kilidi
│  ├─ lib/                        WhatsApp mesajı, telefon/saat biçimi, form durumu
│  └─ styles/index.css            Tasarım sistemi (tokenlar + bileşen katmanı)
├─ RESEARCH.md                    ★ Kaynaklar ve doğrulama dökümü
└─ index.html                     SEO, Open Graph, JSON-LD
```

---

## Kalite kontrolleri

GitHub Pages'in alt dizin davranışını birebir taklit eden yerel sunucuyla
çalıştırın — asıl doğrulama budur:

```bash
npm run build
npm run serve:subpath              # http://localhost:4400/gkm-landing/

SHOT_URL="http://localhost:4400/gkm-landing/" npm run test:all
```

Tek tek:

```bash
npm run test:content   # site.ts ↔ RESEARCH.md tutarlılığı + demo modu kontrolleri
npm run test:e2e       # form, WhatsApp, lightbox, mobil menü, SEO, bağlantılar
npm run test:a11y      # kontrast, dokunma hedefi, etiketler
npm run test:shots     # 7 cihazda ekran görüntüsü + konsol/taşma taraması
```

Testler yerel Chrome'u kullanır (`puppeteer-core`). Farklı bir yol için:
`CHROME_PATH="..." npm run test:e2e`

Son çalıştırmada (canlı GitHub Pages adresine karşı):

- **32/32** içerik tutarlılık kontrolü
- **48/48** etkileşim testi — form akışı, WhatsApp mesajı, konsept şeridi,
  noindex, JSON-LD yokluğu, dış bağlantı hedefleri, ölü çapa taraması
- Erişilebilirlik **10/10** — WCAG AA kontrast, ≥ 44 px dokunma hedefleri
- 360 / 390 / 430 / 768 / 1024 / 1440 / 1920 px'te **yatay taşma yok**,
  konsol hatası **yok**
- İlk CTA her mobil genişlikte kaydırmadan görünür

---

## Görselleri yenileme

```bash
npm run assets:img     # stok görselleri indir, kırp, WebP'ye çevir, OG kartını üret
npm run assets:fonts   # Archivo + Inter woff2 dosyalarını tazele
```

Sayfadaki fotoğrafların tamamı telifsiz stok görseldir ve "Konsept görsel"
olarak etiketlenmiştir — ayrıntı için `RESEARCH.md` §4.

GKM kendi fotoğraflarını verdiğinde: dosyaları `src/assets/img/` altına koyup
`src/content/gallery.ts` içindeki `import` satırlarını değiştirin, ardından
"Konsept görsel" etiketlerini kaldırın:

- `src/components/Hero.tsx` → `figcaption`
- `src/components/Gallery.tsx` → alt bilgi notu
- `src/components/Lightbox.tsx` → alt yazı
- `src/content/site.ts` → `imageNote`

---

## Sayfa akışı

1. **Hero** — ne yapılıyor, nerede, ne kadar sürede fiyat alınır
2. **Hizmetler** — altı doğrulanmış uygulama; her kart formu önseçer
3. **Ton seçici** — VLT değerinin sürücü görüşüne etkisi (temsilî)
4. **Uygulamalar** — lightbox'lı galeri
5. **Neden GKM?** — yalnızca doğrulanabilir maddeler
6. **Yorumlar** — 4,8 puan özeti + 12 gerçek Google yorumu (uydurma yok)
7. **Sık sorulanlar** — fiyat, süre, PPF/cam filmi farkı
8. **Fiyat al** — dört adımlık süreç + akıllı form
9. **İletişim** — adres, harita, telefon, sosyal medya
10. **Son CTA** ve **footer**

Her yol tek bir yere çıkar: **WhatsApp'tan fiyat talebi.**
