# RESEARCH.md — Kaynak ve doğrulama dökümü

Bu dosya, sitede kullanılan **her bilginin nereden geldiğini** ve hangi
bilgilerin **doğrulanamadığını** açıkça listeler.

Araştırma tarihi: **31 Temmuz 2026**
Yöntem: açık web araması + işletme rehberleri + işletmenin kendi sosyal medya
hesapları. Yalnızca herkese açık kaynaklar kullanıldı.

**Temel kural:** birden fazla kaynakta çelişen veya tek kaynakta geçip teyit
edilemeyen hiçbir bilgi sitede kesin gibi sunulmadı. Bu tür alanlar
`src/content/site.ts` içinde `verified: false` ile işaretlendi ve sayfada
**gösterilmiyor**.

---

## 1. Sitede kullanılan — doğrulanmış bilgiler

| Bilgi | Sitedeki değer | Kaynak(lar) | Güven |
|---|---|---|---|
| İşletme adı | GKM Oto Cam Filmi ve Araç Kaplama | Facebook sayfası, firmadan.com, yenifirma.com.tr, cekici.biz, superrehber.net | Yüksek — tüm kaynaklarda aynı |
| Telefon / WhatsApp | 0535 965 41 21 (+90 535 965 41 21) | Yandex Haritalar, cekici.biz, firmadan.com, haritane.com | Yüksek — 4+ bağımsız kaynakta aynı |
| Açık adres | Altayçeşme Mah., Adalı Sk. No: 10, 34843 Maltepe / İstanbul | cekici.biz (Google yer kaydı verisiyle), yenifirma.com.tr, Yandex Haritalar | Orta-yüksek — ⚠ bkz. §3.1 |
| Koordinat | 40.9277959, 29.1318242 | cekici.biz üzerinden Google yer kaydı | Yüksek |
| Google Haritalar kaydı | [Yer kaydı bağlantısı](https://www.google.com/maps/place/GKM+OTO+CAM+FILMI+VE+ARA%C3%87+KAPLAMA/data=!4m7!3m6!1s0x14cac6a4693d1c57:0x631cfbf425078232!8m2!3d40.9277959!4d29.1318242!16s%2Fg%2F11b7p_3k0m) | Google place ID: `/g/11b7p_3k0m` | Yüksek |
| Instagram | [@gkmcamfilmiarackaplama](https://www.instagram.com/gkmcamfilmiarackaplama/) | Instagram | Yüksek |
| Facebook | [GkmOtoCamFilmi](https://www.facebook.com/GkmOtoCamFilmi/) | Facebook | Yüksek |
| Instagram takipçi sayısı | "6.700+" (Temmuz 2026 itibarıyla) | Instagram profili | Orta — bkz. §1.1 |
| Film markası | "Solar Gard premium bayii" | İşletmenin **kendi** Instagram biyografisi | Bkz. §1.2 |

### 1.1 Takipçi sayısı neden "6.700+" yazıldı

Aynı araştırma oturumunda profil iki kez okundu ve **6.759** ile **6.904**
değerleri görüldü (Instagram sayıları önbellek nedeniyle dalgalanır). Kesin bir
rakam yazmak yerine her iki okumada da doğru olan **"6.700+"** ifadesi ve
**tarih notu** kullanıldı.

### 1.2 Solar Gard bayilik iddiası hakkında

Instagram hesabının profil adı şudur:

> "GKM Cam filmi ve Arac kaplama **&Solargard preımum bayii**"

Bu, **işletmenin kendi kamuya açık beyanıdır** — bağımsız bir doğrulama değildir.
Solar Gard Türkiye'nin bayi listesi üzerinden teyit **denendi fakat sayfaya
erişilemedi** (`solargardturkiye.com/bayilik-hakkinda/` → HTTP 404).

Bu nedenle sitede iddia **kaynağıyla birlikte** sunuluyor; "yetkili servis"
gibi daha güçlü bir ifade kullanılmadı. İlgili metin:

> "GKM, kendi Instagram hesabında Solar Gard premium bayii olduğunu belirtiyor."

`src/content/site.ts` → `business.brand.note`

---

## 2. Hizmet listesi

Sitedeki altı hizmetin tamamı işletme kayıtlarından ve Instagram biyografisinden
alındı:

| Hizmet | Kaynak |
|---|---|
| Oto cam filmi | haritane.com hizmet listesi + Instagram biyografisi |
| Şeffaf kaput filmi / PPF | haritane.com ("Şeffaf Kaput Filmi") + Instagram ("ŞEFFAF KAPLAMA") |
| Komple araç kaplama | haritane.com ("Komple Araç Kaplama") + Instagram ("ARAÇ KAPLAMA", "FOLYO KAPLAMA") |
| Carbon kaplama | haritane.com ("Carbon Kaplama") |
| Far & stop kaplama | haritane.com ("Far-Stop Kaplama") |
| Cam tavan kaplama | haritane.com ("Cam Tavan Kaplama") |

**Bilinçli olarak eklenmedi:** *seramik kaplama*. Brief'te olası hizmetler
arasında geçiyor, ancak GKM'nin hiçbir kaynağında bulunamadı.

---

## 3. Doğrulanamayan bilgiler — sitede GÖSTERİLMİYOR

Bu alanlar `src/content/site.ts` içinde duruyor ve `verified: false`.
İşletmeden teyit alındığında `true` yapmanız yeterli; ilgili bölüm otomatik
görünür hale gelir.

### 3.1 ⚠ Adres — sokak adı çelişkisi

İki farklı sokak adı bulundu:

| Adres | Kaynaklar |
|---|---|
| **Altayçeşme, Adalı Sokağı No: 10** | cekici.biz (Google yer kaydı verisiyle), yenifirma.com.tr, Yandex Haritalar |
| Altayçeşme, Uçar Sokak No: 27 / No: 29 | haritane.com, firmadan.com, moovitapp.com, turkeyturism.com |

**Karar:** Google'ın kendi yer kaydındaki değer (**Adalı Sk. No: 10**)
kullanıldı; koordinat da bu kayıttan alındı. Adalı ve Uçar sokakları
Altayçeşme'de birbirine yakın olduğundan işletmenin köşede olması veya taşınmış
olması muhtemel. **Satış görüşmesinde mutlaka teyit edin.**

### 3.2 ⚠ Google puanı ve yorum sayısı — GÖSTERİLMİYOR

Rehber sitelerinde birbiriyle çelişen değerler bulundu:

| Değer | Kaynak |
|---|---|
| 4,9 / 5 — 346 oy | firmadan.com |
| 4,0 / 5 — 21 oy | haritane.com |
| 5,0 / 5 — 1 yorum | Yandex Haritalar |
| %98 tavsiye — 26 değerlendirme | Facebook |

Google Haritalar'ın kendi sayfasından gerçek puan **okunamadı** (sayfa
JavaScript ile yükleniyor). Rehber sitelerinin puanları çoğunlukla kendi iç
oylamalarıdır, Google verisi değildir.

**Karar:** hiçbir puan sitede yayınlanmadı. Yorumlar bölümü, ziyaretçiyi
puanların gerçek kaynağına (Google, Instagram, Facebook) yönlendiriyor.

`site.ts` → `business.googleRating.verified = false`

### 3.3 ⚠ Çalışma saatleri — GÖSTERİLMİYOR

| Bilgi | Kaynak |
|---|---|
| Pazartesi–Cuma 09.00–20.00 | haritane.com |
| 09.00'da açılıyor (kapanış belirtilmemiş) | Yandex Haritalar |
| Cumartesi / Pazar | **Hiçbir kaynakta yok** |

Hafta sonu bilgisi bulunamadığı ve kapanış saati tek kaynakta geçtiği için
bölüm gizlendi. Teyit sonrası `site.ts` → `business.hours.verified = true`.

### 3.4 ⚠ Müşteri yorumları — UYDURULMADI

Yazar adı, metin ve platform birlikte doğrulanabilen **güncel** hiçbir müşteri
yorumu bulunamadı.

- Rehber sitelerindeki yorumlar isimsiz ve tarihsiz.
- TechTurkey forumunda GKM'yi öven gerçek kullanıcı gönderileri var, fakat
  arşiv sayfaları erişime kapalı (HTTP 503) ve gönderiler **çok eski** —
  içlerinde "150 TL" gibi bugün yanıltıcı olacak fiyatlar geçiyor.

**Karar:** brief'teki kurala uyularak sahte yorum yazılmadı. Yorumlar bölümü
şu notla yayınlandı:

> "Gerçek müşteri değerlendirmeleri işletme onayı sonrasında eklenecektir."

Gerçek yorumlar geldiğinde `site.ts` → `testimonials` dizisine
`{ name, text, source, rating }` biçiminde eklenir; bölüm otomatik olarak
kayan yorum şeridine dönüşür (kod hazır).

### 3.5 Diğer doğrulanamayanlar

| Bilgi | Durum |
|---|---|
| E-posta `gkmnkrdnz@hotmail.com` | Tek kaynak (firmadan.com). Gizlendi. |
| İşletme sahibi "Gökmen Karadeniz" | Birkaç rehberde geçiyor, resmî kaynak yok. **Kullanılmadı.** |
| Kaç yıldır faaliyette | Bulunamadı. **Kullanılmadı.** |
| Garanti süresi | Bulunamadı. **Kullanılmadı.** |
| Fiyat aralıkları | Bulunamadı. Site zaten fiyat vermiyor, talebe yönlendiriyor. |
| GKM'ye ait logo / marka görseli | Erişilebilir bir dosya bulunamadı. Tipografik "GKM" logo kullanıldı. |

---

## 4. Görseller — kaynak ve lisans

> **Sitedeki hiçbir fotoğraf GKM'ye ait değildir.** Tamamı telifsiz
> (royalty-free) stok görseldir ve sayfada **"Konsept görsel"** olarak
> etiketlenmiştir. Footer'da ve galeri altında da bu not tekrarlanır.

Neden GKM'nin kendi fotoğrafları kullanılmadı:

- Instagram ve Facebook, medya dosyalarına programatik erişimi engelliyor.
- İşletmenin fotoğraflarını izinsiz kopyalayıp depoya eklemek telif açısından
  uygun değil — brief'teki kurala uyuldu.
- Dış sitelere hotlink yapılmadı; tüm görseller depoya yerel olarak indirildi.

### 4.1 Pexels (Pexels License — ticari kullanım serbest, atıf zorunlu değil)

| Dosya | Pexels ID | İçerik |
|---|---|---|
| `hero-panel`, `hero-panel-sm`, `og-gkm.jpg` | 20051465 | Spor araca şeffaf koruma filmi seren iki teknisyen |
| `tint-view` | 37832994 | Sürücü koltuğundan ön cam görünümü (ton seçici) |
| `g-film` | 31154212 | Yan cama cam filmi uygulaması |
| `g-ppf-hood` | 20051468 | Kaputa PPF uygulaması |
| `g-wrap-blue` | 10162528 | Mavi folyo ile renk değişimi |
| `g-squeegee` | 17641807 | Rakle ile hava alma |
| `g-heat` | 10126666 | Isı tabancasıyla form verme |
| `g-ppf-lay` | 20051464 | Gövdeye koruma filmi serimi |
| `g-clear` | 6025950 | Arka panel şeffaf koruma |
| `g-tinted` | 20036216 | Filmli yan cam detayı |
| `g-result` | 14313347 | Camları filmli koyu renk araç |
| `g-roll` | 14999240 | Atölyede folyo hazırlığı |
| `tex-band` | 26691322 | Koyu renk Mercedes sedan (son CTA bandı) |

Kaynak adresi biçimi: `https://www.pexels.com/photo/<id>/`

### 4.2 Unsplash (Unsplash License — ticari kullanım serbest, atıf zorunlu değil)

| Dosya | Unsplash ID | İçerik |
|---|---|---|
| `tex-grille` | `CVShJySkJZQ` | Koyu renk aracın ön ızgara / kaput detayı |

Kaynak adresi biçimi: `https://unsplash.com/photos/<id>`

### 4.3 Yeniden üretme

Tüm görseller `scripts/fetch-assets.mjs` ile indirilip kırpılır ve WebP'ye
çevrilir:

```bash
npm run assets:img
```

**Not:** Değerlendirme sırasında bazı adaylar bilinçli olarak elendi. Stok
ajans üslubunda açıklaması olan bazı Unsplash görselleri (ör. `-BILxrZ0qQ8`,
`e8H69FTnU9E`) indirilemedi; bunların **Unsplash+ (ücretli)** içerik olma
ihtimali yüksek olduğu için kullanılmadılar.

---

## 5. Ton seçici hakkında dürüstlük notu

Sayfadaki ton seçici, **temsilî bir gösterimdir** ve arayüzde açıkça öyle
etiketlenmiştir ("Temsilî gösterim"). Bir stok fotoğrafın üzerine ışık
geçirgenliği oranına göre karartma uygulayarak farklı VLT değerlerinin sürücü
görüşünü nasıl etkilediğini yaklaşık olarak anlatır.

- GKM'nin gerçek bir uygulamasının öncesi/sonrası **değildir**.
- Aynı araca ait doğrulanabilir bir öncesi/sonrası fotoğraf çifti
  bulunamadığı için brief'teki kurala uyularak **sahte karşılaştırma
  üretilmedi**; onun yerine bu gösterim ve animasyonlu uygulama galerisi
  kullanıldı.
- Mevzuata dair hiçbir iddia yapılmadı; metin, uygulanacak tonun araca ve
  yürürlükteki mevzuata göre GKM ile birlikte belirleneceğini söylüyor.

---

## 6. Sayfada yer alan yasal not

Footer'da, brief'te istendiği şekilde şu ifade yer alır:

> "Bu sayfa GKM için hazırlanmış bağımsız bir konsept çalışmadır. GKM'nin resmî
> web sitesi değildir."

---

## 7. Kaynak bağlantıları

- Instagram — https://www.instagram.com/gkmcamfilmiarackaplama/
- Facebook — https://www.facebook.com/GkmOtoCamFilmi/
- Google Haritalar yer kaydı — [bağlantı](https://www.google.com/maps/place/GKM+OTO+CAM+FILMI+VE+ARA%C3%87+KAPLAMA/data=!4m7!3m6!1s0x14cac6a4693d1c57:0x631cfbf425078232!8m2!3d40.9277959!4d29.1318242!16s%2Fg%2F11b7p_3k0m)
- Yandex Haritalar — https://yandex.com.tr/harita/org/gkm_oto_cam_filmi/1158132806/
- cekici.biz — https://cekici.biz/istanbul/maltepe/arac-bakim-ve-onarimi/gkm-oto-cam-filmi-ve-arac-kaplama
- haritane.com — https://haritane.com/gkm-oto-cam-filmi-ve-arac-kaplama-detay4943906/
- yenifirma.com.tr — https://yenifirma.com.tr/firma/gkm-oto-cam-filmi-ve-ara-kaplama
- firmadan.com — https://firmadan.com/firma/474857/gkm-oto-cam-filmi-ve-arac-kaplama/
- Moovit durak sayfası — https://moovitapp.com/index/tr/toplu_ta%C5%9F%C4%B1ma-GKM_oto_cam_film_ve_ara%C3%A7_kaplama-Istanbul-site_39974799-1563

---

## 8. Satış görüşmesinden önce teyit edilecekler

1. **Sokak adı ve kapı numarası** — Adalı Sk. No: 10 mu, Uçar Sk. mı?
2. **Google puanı ve yorum sayısı** — gerçek değer nedir?
3. **Çalışma saatleri** — hafta içi ve hafta sonu.
4. **Solar Gard bayilik** — resmî bayi belgesi var mı?
5. **Müşteri yorumları** — sitede yayınlanmasına onay ve gerçek metinler.
6. **Uygulama fotoğrafları** — stok görseller yerine kullanılmak üzere kendi
   fotoğrafları (kullanım izniyle).
7. **Logo** — vektörel bir logo dosyası var mı?
8. **WhatsApp numarası** — 0535 965 41 21 hâlâ aktif ve WhatsApp'a kayıtlı mı?
