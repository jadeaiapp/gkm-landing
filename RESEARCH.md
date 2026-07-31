# RESEARCH.md — Kaynak ve doğrulama dökümü

Bu dosya, sitede kullanılan **her bilginin nereden geldiğini** ve varsa hangi
bilgilerin **doğrulanamadığını** açıkça listeler.

- **Açık web araştırması:** 31 Temmuz 2026 — arama, işletme rehberleri, işletmenin
  kendi sosyal medya hesapları.
- **Google işletme kaydından birinci el doğrulama:** 31 Temmuz 2026 — puan, yorum
  sayısı, yorum metinleri, çalışma saatleri, adres ve harita bağlantısı proje
  sahibi tarafından GKM'nin Google işletme sayfasından okunup iletildi.

**Temel kural:** doğrulanamayan hiçbir bilgi sitede kesin gibi sunulmadı. Bu tür
alanlar `src/content/site.ts` içinde `verified: false` ile işaretlenir ve sayfada
**gösterilmez**.

---

## 1. Sitede kullanılan — doğrulanmış bilgiler

| Bilgi | Sitedeki değer | Kaynak | Güven |
|---|---|---|---|
| İşletme adı | GKM Oto Cam Filmi ve Araç Kaplama | Google işletme kaydı + Facebook + rehberler | Yüksek |
| Telefon / WhatsApp | 0535 965 41 21 | Google işletme kaydı + 4 bağımsız rehber | Yüksek |
| Açık adres | Altayçeşme, Adalı Sokağı No: 10, 34843 Maltepe / İstanbul | **Google işletme kaydı** (bkz. §2.1) | Yüksek |
| Koordinat | 40.9277959, 29.1318242 | Google yer kaydı (place ID `/g/11b7p_3k0m`) | Yüksek |
| Harita bağlantısı | https://maps.app.goo.gl/SHLDCGDUXv7UgfHC9 | Google işletme kaydı — aynı place ID'ye çözülüyor | Yüksek |
| **Google puanı** | **4,8** | Google işletme kaydı | Yüksek |
| **Değerlendirme sayısı** | **493** | Google işletme kaydı | Yüksek |
| **Çalışma saatleri** | Pzt–Cmt 09.00–20.00 · Pazar 13.00–20.00 | Google işletme kaydı | Yüksek |
| Müşteri yorumları | 12 gerçek yorum | Google işletme sayfası (bkz. §3) | Yüksek |
| Instagram | [@gkmcamfilmiarackaplama](https://www.instagram.com/gkmcamfilmiarackaplama/) | Instagram | Yüksek |
| Facebook | [GkmOtoCamFilmi](https://www.facebook.com/GkmOtoCamFilmi/) | Facebook | Yüksek |
| Film markası | "Solar Gard premium bayii" | İşletmenin **kendi** Instagram biyografisi | Bkz. §2.2 |

### 2.1 Adres — daha önceki çelişki çözüldü

İlk araştırmada iki farklı sokak adı çıkmıştı:

| Adres | Kaynaklar |
|---|---|
| **Altayçeşme, Adalı Sokağı No: 10** ✅ | Google işletme kaydı, Yandex Haritalar, cekici.biz, yenifirma.com.tr |
| Altayçeşme, Uçar Sokak No: 27 / 29 ❌ | haritane.com, firmadan.com, moovitapp.com, turkeyturism.com |

Google işletme kaydından doğrulandı: doğru adres **Adalı Sokağı No: 10**.
Bazı üçüncü taraf rehberlerdeki "Uçar Sokak" kaydı eski veya hatalı.

### 2.2 Solar Gard bayilik iddiası hakkında

Instagram hesabının profil adı şudur:

> "GKM Cam filmi ve Arac kaplama **&Solargard preımum bayii**"

Bu, **işletmenin kendi kamuya açık beyanıdır** — bağımsız bir doğrulama değildir.
Solar Gard Türkiye bayi listesi üzerinden teyit denendi fakat sayfaya erişilemedi
(`solargardturkiye.com/bayilik-hakkinda/` → HTTP 404).

Bu nedenle sitede iddia **kaynağıyla birlikte** sunuluyor; "yetkili servis" gibi
daha güçlü bir ifade kullanılmadı:

> "GKM, kendi Instagram hesabında Solar Gard premium bayii olduğunu belirtiyor."

`src/content/site.ts` → `business.brand.note`

Not: Birden fazla Google yorumu da Solar Gard filmi kullanıldığını doğruluyor
(Oğuzhan S., Can K., Fatih Y.), ama bu ürün kullanımını gösterir — resmî bayilik
belgesini değil.

---

## 3. Müşteri yorumları

Sitede **12 gerçek Google yorumu** yayınlanıyor. Kaynak: GKM'nin Google işletme
sayfası, 31 Temmuz 2026'da okundu.

**Uygulanan kurallar:**

| Kural | Nasıl uygulandı |
|---|---|
| Yorum uydurma | Hiçbiri uydurulmadı; tamamı Google'dan alındı. |
| Anlamı değiştirme | Cümleler yeniden yazılmadı; yalnızca kısaltıldı. |
| Uzun yorumları kopyalama | Uzun yorumlardan temsilî bölüm alındı, gerisi atıldı. |
| Kullanıcı adını kısalt | Soyadlar baş harfe indirildi: "Safa Akyürek" → "Safa A." |
| Platformu belirt | Her kartta "Google · <tarih>" yazıyor. |
| Yazım | Yalnızca açık yazım/noktalama düzeltmesi yapıldı (ör. "twlefonda" → "telefonda" geçen yorum zaten alınmadı). |

**Tarihler:** Google göreli etiket gösteriyor ("6 ay önce"). Statik bir sayfada bu
zamanla yanlış görünür, bu yüzden 31 Temmuz 2026 referans alınarak mutlak aya
çevrildi (ör. "6 ay önce" → "Ocak 2026"). Bu dönüşüm Google'ın kendi yuvarlaması
kadar hassastır. Sayfada bu not açıkça yazılıdır.

**Yayınlanan yorumlar** (`src/content/site.ts` → `testimonials`):

| Görünen ad | Tarih | Konu |
|---|---|---|
| Safa A. | Haziran 2026 | Cam filmi (Astra K, 2 numara) |
| Nail Ü. | Haziran 2026 | Cam filmi + PPF (MG) |
| Buğra A. | Nisan 2026 | Cam filmi + söküm (Mini Countryman) |
| Yağız A. | Mart 2026 | Cam filmi + piano black kaplama |
| Ali G. | Ocak 2026 | Cam filmi, bilgilendirme |
| ER3N | Ocak 2026 | Far/stop + spoiler kaplama |
| Yavuz D. | Aralık 2025 | Cam filmi + ultra parlak şeffaf folyo |
| Zafer E. | Kasım 2025 | Komple şeffaf kaplama |
| Oğuzhan S. | Ekim 2025 | Solar Gard film, ön cam dahil |
| Ahmet U. | Ağustos 2025 | Komple PPF + cam filmi |
| Can K. | 2025 | Solar Gard CX Magnum IR, 12 ve 20 numara |
| İsa Ü. | 2024 | 10 yıllık müşteri, cam bitiş işçiliği |

"ER3N" zaten kullanıcının kendi seçtiği takma addır; olduğu gibi bırakıldı.

**Bilinçli olarak alınmayan yorumlar:** ev/ofis camı uygulaması anlatan yorum
(Brandon K.) — sayfa yalnızca oto hizmetlerini anlattığı için konu dışı; ayrıca
çok uzun olup kısaltılınca anlamı zayıflayan birkaç yorum.

---

## 4. Hizmet listesi

Sitedeki altı hizmetin tamamı işletme kayıtlarından ve Instagram biyografisinden
alındı; Google yorumları da bunları destekliyor.

| Hizmet | Kaynak | Yorumla destekleniyor mu? |
|---|---|---|
| Oto cam filmi | haritane.com + Instagram bio | ✅ çok sayıda |
| Şeffaf kaput filmi / PPF | haritane.com + Instagram bio | ✅ Nail Ü., Ahmet U., Zafer E. |
| Komple araç kaplama | haritane.com + Instagram bio | ✅ Yavuz D., Mehmet S. |
| Carbon kaplama | haritane.com | — |
| Far & stop kaplama | haritane.com | ✅ ER3N |
| Cam tavan kaplama | haritane.com | — |

**Bilinçli olarak eklenmedi:** *seramik kaplama*. Brief'te olası hizmetler
arasında geçiyor, ancak GKM'nin hiçbir kaynağında bulunamadı.

---

## 5. Hâlâ doğrulanamayanlar — sitede GÖSTERİLMİYOR

| Bilgi | Durum |
|---|---|
| E-posta `gkmnkrdnz@hotmail.com` | Tek kaynak (firmadan.com). `verified: false` — gizli. |
| İşletme sahibi "Gökmen Karadeniz" | Yorumlarda "Gökmen Bey/Usta" çok geçiyor, ancak soyadı resmî bir kaynaktan doğrulanamadı. Sayfada **isim kullanılmadı**. |
| Kaç yıldır faaliyette | Bir yorum "10 yılı aşkın" diyor ama bu müşterinin kendi süresi. **Kullanılmadı.** |
| Garanti süresi | Bulunamadı. **Kullanılmadı.** |
| Fiyat aralıkları | Bulunamadı. Site zaten fiyat vermiyor, talebe yönlendiriyor. |
| GKM'ye ait logo dosyası | Erişilebilir bir dosya bulunamadı. Tipografik "GKM" logo kullanıldı. |
| Ekip üyeleri (Turgay, Ahmet) | Yorumlarda geçiyor; sayfada **kullanılmadı**. |

Not: Rehber sitelerindeki eski puanlar (4,9/346 · 4,0/21 · 5,0/1) artık geçersiz —
gerçek değer Google'dan doğrulandı: **4,8 / 493**.

---

## 6. Görseller — kaynak ve lisans

> **Sitedeki hiçbir fotoğraf GKM'ye ait değildir.** Tamamı telifsiz
> (royalty-free) stok görseldir ve sayfada **"Konsept görsel"** olarak
> etiketlenmiştir. Footer'da ve galeri altında da bu not tekrarlanır.

Neden GKM'nin kendi fotoğrafları kullanılmadı:

- Instagram ve Facebook, medya dosyalarına programatik erişimi engelliyor.
- İşletmenin fotoğraflarını izinsiz kopyalayıp depoya eklemek telif açısından
  uygun değil.
- Dış sitelere hotlink yapılmadı; tüm görseller depoya yerel olarak indirildi.

**GKM'nin Google sayfasında ve Instagram'ında müşterilerin paylaştığı çok sayıda
gerçek uygulama fotoğrafı var. Satış görüşmesinde bunların kullanım izni
istenirse sayfa belirgin şekilde güçlenir** — değiştirme adımları README'de.

### 6.1 Pexels (Pexels License — ticari kullanım serbest, atıf zorunlu değil)

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

### 6.2 Unsplash (Unsplash License — ticari kullanım serbest, atıf zorunlu değil)

| Dosya | Unsplash ID | İçerik |
|---|---|---|
| `tex-grille` | `CVShJySkJZQ` | Koyu renk aracın ön ızgara / kaput detayı |

Kaynak adresi biçimi: `https://unsplash.com/photos/<id>`

### 6.3 Yeniden üretme

```bash
npm run assets:img
```

**Not:** Stok ajans üslubunda açıklaması olan bazı Unsplash görselleri
(ör. `-BILxrZ0qQ8`, `e8H69FTnU9E`) indirilemedi; bunların **Unsplash+ (ücretli)**
içerik olma ihtimali yüksek olduğu için kullanılmadılar.

---

## 7. Ton seçici hakkında dürüstlük notu

Sayfadaki ton seçici, **temsilî bir gösterimdir** ve arayüzde açıkça öyle
etiketlenmiştir ("Temsilî gösterim"). Bir stok fotoğrafın üzerine ışık
geçirgenliği oranına göre karartma uygulayarak farklı VLT değerlerinin sürücü
görüşünü nasıl etkilediğini yaklaşık olarak anlatır.

- GKM'nin gerçek bir uygulamasının öncesi/sonrası **değildir**.
- Aynı araca ait doğrulanabilir bir öncesi/sonrası fotoğraf çifti bulunamadığı
  için **sahte karşılaştırma üretilmedi**; onun yerine bu gösterim ve animasyonlu
  uygulama galerisi kullanıldı.
- Mevzuata dair hiçbir iddia yapılmadı; metin, uygulanacak tonun araca ve
  yürürlükteki mevzuata göre GKM ile birlikte belirleneceğini söylüyor.

---

## 8. "Şu anda açık" rozeti

İletişim bölümündeki açık/kapalı rozeti, Google'da yayınlanan haftalık saatlerden
**İstanbul saatine göre** hesaplanır (`src/lib/hours.ts`). Ziyaretçinin saat
diliminden etkilenmez.

Resmî tatiller hesaba katılmaz — bu yüzden rozetin altında "Yayınlanan saatlere
göre; resmî tatillerde değişebilir" notu yer alır.

---

## 9. Sayfada yer alan yasal not

Footer'da şu ifade yer alır:

> "Bu sayfa GKM için hazırlanmış bağımsız bir konsept çalışmadır. GKM'nin resmî
> web sitesi değildir."

---

## 10. Kaynak bağlantıları

- **Google işletme kaydı** — https://maps.app.goo.gl/SHLDCGDUXv7UgfHC9
- Instagram — https://www.instagram.com/gkmcamfilmiarackaplama/
- Facebook — https://www.facebook.com/GkmOtoCamFilmi/
- Yandex Haritalar — https://yandex.com.tr/harita/org/gkm_oto_cam_filmi/1158132806/
- cekici.biz — https://cekici.biz/istanbul/maltepe/arac-bakim-ve-onarimi/gkm-oto-cam-filmi-ve-arac-kaplama
- haritane.com — https://haritane.com/gkm-oto-cam-filmi-ve-arac-kaplama-detay4943906/
- yenifirma.com.tr — https://yenifirma.com.tr/firma/gkm-oto-cam-filmi-ve-ara-kaplama
- firmadan.com — https://firmadan.com/firma/474857/gkm-oto-cam-filmi-ve-arac-kaplama/

---

## 11. Satış görüşmesinden önce teyit edilecekler

Doğrulama sonrası kalan liste kısaldı:

1. **Yorumların sayfada yayınlanmasına onay** — yorumlar kamuya açık olsa da
   işletmenin haberi olması doğru olur.
2. **Solar Gard bayilik belgesi** — resmî belge varsa "premium bayii" ifadesi
   kaynak notu olmadan kullanılabilir.
3. **Uygulama fotoğrafları** — stok görsellerin yerine GKM'nin kendi fotoğrafları
   (kullanım izniyle). En büyük iyileştirme bu olur.
4. **Logo** — vektörel bir logo dosyası var mı?
5. **Garanti süresi** — film/PPF için verilen garanti nedir? Sayfaya güçlü bir
   madde olarak eklenebilir.
6. **Kaç yıldır faaliyette** — "X yıldır Maltepe'de" güçlü bir güven unsuru.
7. **Ekip** — "Gökmen Usta ve ekibi" gibi bir ifade kullanılsın mı?
8. **Resmî tatil kapanışları** — açık/kapalı rozeti tatilleri bilmiyor.
