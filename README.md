# GKM — Oto Cam Filmi ve Araç Kaplama · Konsept Landing Page

Maltepe Altayçeşme'deki **GKM Oto Cam Filmi ve Araç Kaplama** için hazırlanmış,
tek sayfalık, tamamen çalışan, dönüşüm odaklı bir landing page.

> Bu sayfa GKM için hazırlanmış **bağımsız bir konsept çalışmadır**. GKM'nin
> resmî web sitesi değildir. Kullanılan bilgilerin kaynakları ve doğrulanamayan
> alanlar [`RESEARCH.md`](./RESEARCH.md) dosyasında listelenmiştir.

Sayfanın tek işi var: ziyaretçiyi **araç bilgilerini bırakıp WhatsApp'tan fiyat
istemeye** yönlendirmek.

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

## GitHub Pages'e yayınlama

Depoda hazır bir GitHub Actions iş akışı var:
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)
`main` dalına yapılan her push sonrası site otomatik derlenip yayınlanır.

### Adım adım

**1. Depoyu oluşturun ve kodu gönderin**

```bash
git init
git add .
git commit -m "GKM konsept landing page"
git branch -M main
git remote add origin https://github.com/KULLANICI-ADINIZ/gkm-landing.git
git push -u origin main
```

**2. GitHub Pages'i açın**

GitHub'da depo → **Settings** → sol menüden **Pages** →
**Build and deployment** → **Source** alanını **GitHub Actions** yapın.

> ⚠ "Deploy from a branch" **seçmeyin**. Bu proje derleme gerektiriyor;
> kaynak dosyalar doğrudan yayınlanamaz.

**3. İlk yayını bekleyin**

**Actions** sekmesinde "GitHub Pages'e yayınla" iş akışı çalışır (~1 dk).
Yeşile döndüğünde site yayında.

**4. Canlı adres**

```
https://KULLANICI-ADINIZ.github.io/DEPO-ADI/
```

Örnek: `https://canakyildiz.github.io/gkm-landing/`

Kullanıcı/organizasyon sayfası (`KULLANICI-ADINIZ.github.io` adlı depo)
kullanırsanız adres `https://KULLANICI-ADINIZ.github.io/` olur. Her iki durum
da desteklenir.

**5. (Önerilir) Sosyal medya önizlemesi**

`.env` dosyasındaki adresi canlı adresinizle değiştirin:

```env
VITE_SITE_URL=https://KULLANICI-ADINIZ.github.io/gkm-landing/
```

Bu değer Open Graph etiketlerinde kullanılır — WhatsApp, Facebook, X ve
LinkedIn'de bağlantı paylaşıldığında önizleme görseli görünür. Varsayılan `./`
değeri de çalışır, ancak mutlak adres her platformda daha güvenilirdir.

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
│  ├─ favicon.svg                 Ton skalası logosu
│  └─ og-gkm.jpg                  Sosyal medya önizleme görseli (1200×630)
├─ scripts/
│  ├─ fetch-assets.mjs            Görselleri indir → kırp → WebP
│  ├─ fetch-fonts.mjs             Google Fonts woff2 → yerel
│  ├─ e2e.mjs                     Etkileşim testleri (24 kontrol)
│  ├─ a11y.mjs                    Erişilebilirlik denetimi
│  └─ shots.mjs                   Çoklu cihaz ekran görüntüsü + konsol taraması
├─ src/
│  ├─ content/site.ts             ★ TÜM içerik ve işletme bilgisi
│  ├─ content/gallery.ts          Galeri görselleri ve açıklamaları
│  ├─ components/                 Bölüm bileşenleri
│  ├─ hooks/index.ts              Scroll, reveal, sayaç, parallaks, odak kilidi
│  ├─ lib/                        WhatsApp mesajı, telefon/saat biçimi, form durumu
│  └─ styles/index.css            Tasarım sistemi (tokenlar + bileşen katmanı)
├─ RESEARCH.md                    ★ Kaynaklar ve doğrulama dökümü
└─ index.html                     SEO, Open Graph, JSON-LD
```

---

## Kalite kontrolleri

```bash
npm run build && npm run preview   # önce derleyip önizlemeyi başlatın
npm run test:e2e                   # form, WhatsApp, lightbox, mobil menü
npm run test:a11y                  # kontrast, dokunma hedefi, etiketler
npm run test:shots                 # 5 cihazda ekran görüntüsü + konsol hataları
```

Testler yerel Chrome'u kullanır (`puppeteer-core`). Farklı bir yol için:
`CHROME_PATH="..." npm run test:e2e`

Son çalıştırmada:

- **24/24** etkileşim testi geçti
- Konsol hatası **yok**, kırık bağlantı **yok**
- Metin kontrastı: WCAG **AA** — tüm metinler geçti
- Dokunma hedefleri ≥ 44 px
- 360 / 390 / 834 / 1440 / 1920 px'te **yatay taşma yok**
- İlk CTA mobilde kaydırmadan görünür

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
