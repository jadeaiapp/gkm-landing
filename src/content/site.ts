/* ==========================================================================
   GKM — TEK MERKEZ İÇERİK DOSYASI
   --------------------------------------------------------------------------
   Sitedeki tüm işletme bilgisi, metin ve hizmet listesi burada durur.
   Bir bilgiyi değiştirmek için başka hiçbir dosyaya dokunmanız gerekmez.

   `verified: false` işaretli alanlar KESİN olarak doğrulanamadı ve sitede
   GÖSTERİLMEZ. Teyit aldıktan sonra `verified: true` yapın; ilgili bölüm
   otomatik olarak görünür hale gelir.

   Kaynaklar ve doğrulama notları için: RESEARCH.md
   ========================================================================== */

/* -------------------------------------------------------------- Demo modu

   Bu site GKM'ye satış görüşmesinde gösterilmek üzere hazırlanmış bağımsız bir
   konsept çalışmadır; GKM'nin resmî sitesi DEĞİLDİR.

   `enabled: true` iken:
     • Sayfanın en üstünde konsept şeridi görünür
     • Arama motorları için noindex/nofollow uygulanır (index.html)
     • İşletme JSON-LD verisi yayında değildir (docs/schema-localbusiness.json)

   GKM projeyi onaylayıp resmî yayına geçilirse `enabled: false` yapın ve
   README'deki "Resmî yayın modu" adımlarını izleyin.                        */

export const demoMode = {
  enabled: true,
  /** Şeritte ve mobil rozette görünen tam metin. */
  notice: "Bağımsız konsept çalışma — GKM'nin resmî web sitesi değildir.",
  /** Sayfa kaydırıldığında navigasyonda kalan kısa etiket. */
  noticeShort: "Konsept",
} as const;

/* ---------------------------------------------------------------- İşletme */

export const business = {
  name: "GKM Oto Cam Filmi ve Araç Kaplama",
  shortName: "GKM",
  tagline: "Oto cam filmi · PPF boya koruma · Araç kaplama",

  /** WhatsApp ve tel: bağlantılarının tek kaynağı. Uluslararası format, yalnızca rakam. */
  whatsapp: "905359654121",
  /** Ekranda görünen telefon. */
  phoneDisplay: "0535 965 41 21",
  /** tel: bağlantısı. */
  phoneHref: "+905359654121",

  address: {
    line1: "Altayçeşme Mah., Adalı Sk. No: 10",
    line2: "34843 Maltepe / İstanbul",
    district: "Altayçeşme, Maltepe",
    city: "İstanbul",
  },

  geo: { lat: 40.9277959, lng: 29.1318242 },

  /** Google işletme kaydının kısa bağlantısı. */
  maps: "https://maps.app.goo.gl/SHLDCGDUXv7UgfHC9",

  social: {
    instagram: "https://www.instagram.com/gkmcamfilmiarackaplama/",
    instagramHandle: "@gkmcamfilmiarackaplama",
    facebook: "https://www.facebook.com/GkmOtoCamFilmi/",
  },

  /** İşletmenin Instagram biyografisinde kendi belirttiği bayilik. */
  brand: {
    name: "Solar Gard",
    claim: "Solar Gard premium bayii",
    note: "İşletmenin kendi Instagram hesabında belirttiği bayilik bilgisidir.",
  },

  /**
   * Google işletme kaydındaki bilgilerin okunduğu tarih.
   * Puan, değerlendirme sayısı ve çalışma saatleri zamanla değişir; bu yüzden
   * sayfada bu tarihle birlikte gösterilirler.
   */
  verifiedOn: "31 Temmuz 2026",

  /** Google işletme kaydından okundu. */
  googleRating: {
    verified: true,
    score: "4,8",
    /** schema.org için nokta ayraçlı hâli. */
    scoreValue: "4.8",
    count: 493,
  },

  /**
   * Google işletme kaydındaki çalışma saatleri (31 Temmuz 2026).
   * `lines` ekranda görünen hâli; `schedule` "şu anda açık" rozetini besler.
   * Gün numaraları JS standardı: 0 = Pazar.
   */
  hours: {
    verified: true,
    lines: [
      { day: "Pazartesi – Cumartesi", value: "09.00 – 20.00" },
      { day: "Pazar", value: "13.00 – 20.00" },
    ],
    schedule: [
      { day: 0, open: "13:00", close: "20:00" },
      { day: 1, open: "09:00", close: "20:00" },
      { day: 2, open: "09:00", close: "20:00" },
      { day: 3, open: "09:00", close: "20:00" },
      { day: 4, open: "09:00", close: "20:00" },
      { day: 5, open: "09:00", close: "20:00" },
      { day: 6, open: "09:00", close: "20:00" },
    ],
  },

  /* --- Teyit bekleyen alan (sitede gizli) --------------------------------- */

  /** Tek kaynakta geçiyor (firmadan.com), resmî bir sayfadan doğrulanamadı. */
  email: { verified: false, value: "gkmnkrdnz@hotmail.com" },
} as const;

/* ---------------------------------------------------------------- Hizmet */

export type Service = {
  id: string;
  /** Forma taşınan etiket. */
  label: string;
  title: string;
  lead: string;
  points: string[];
  icon: string;
};

export const services: Service[] = [
  {
    id: "cam-filmi",
    label: "Oto cam filmi",
    title: "Oto Cam Filmi",
    lead: "Güneşi, ısıyı ve içerideki mahremiyeti tek uygulamada kontrol altına alın.",
    points: ["Aracınıza uygun ton seçimi", "Isı ve parlama kontrolü", "Kenar bitişi ustalıkla kesilir"],
    icon: "window",
  },
  {
    id: "ppf",
    label: "PPF / şeffaf kaput koruma",
    title: "PPF · Şeffaf Kaput Koruma",
    lead: "Taş çiziklerini boyanız değil, filmin kendisi karşılasın.",
    points: ["Şeffaf koruma filmi", "Kaput, tampon, far bölgeleri", "Boyanın orijinali korunur"],
    icon: "shield",
  },
  {
    id: "komple-kaplama",
    label: "Komple araç kaplama",
    title: "Komple Araç Kaplama",
    lead: "Boyaya dokunmadan aracın rengini ve karakterini baştan kurun.",
    points: ["Renk değişimi ve folyo", "Mat, parlak veya saten", "İstendiğinde geri sökülebilir"],
    icon: "body",
  },
  {
    id: "carbon",
    label: "Carbon kaplama",
    title: "Carbon Kaplama",
    lead: "Ayna, spoiler, tavan ve iç detaylarda karbon dokusu.",
    points: ["Parça bazlı uygulama", "Ayna kapağı, ızgara, difüzör", "Dokulu carbon folyo"],
    icon: "carbon",
  },
  {
    id: "far-stop",
    label: "Far ve stop kaplama",
    title: "Far & Stop Kaplama",
    lead: "Aydınlatma gruplarına ölçülü bir ton, araca bütünlük kazandırır.",
    points: ["Far ve stop filmi", "Ton yoğunluğu birlikte seçilir", "Temiz kenar bitişi"],
    icon: "lamp",
  },
  {
    id: "cam-tavan",
    label: "Cam tavan kaplama",
    title: "Cam Tavan Kaplama",
    lead: "Panoramik tavandan gelen ısıyı kabine girmeden kesin.",
    points: ["Panoramik cam tavan", "Yaz aylarında ısı konforu", "Kabin içi parlama azalır"],
    icon: "roof",
  },
];

/* --------------------------------------------------- Neden GKM (doğrulanan) */

export const advantages = [
  {
    title: "493 değerlendirmede 4,8 puan",
    body: "Puanı biz yazmadık; Google'da yorum bırakan 493 müşteri yazdı. Yorumların tamamını kaynağından okuyabilirsiniz.",
    icon: "star",
  },
  {
    title: "Solar Gard premium bayii",
    body: "GKM, kendi Instagram hesabında Solar Gard premium bayii olduğunu belirtiyor. Film markası ve serisi, aracınıza göre birlikte seçilir.",
    icon: "badge",
  },
  {
    title: "Cam, kaput ve gövde — tek atölye",
    body: "Cam filmi, şeffaf koruma filmi, komple kaplama, carbon ve far-stop uygulamaları aynı yerde yapılır. Aracınız atölyeden atölyeye dolaşmaz.",
    icon: "wrench",
  },
  {
    title: "Altayçeşme'de sabit adres",
    body: "Maltepe Altayçeşme'de açık adresi ve harita kaydı olan bir atölye. Uygulama öncesi gelip işi yerinde görebilirsiniz.",
    icon: "pin",
  },
  {
    title: "WhatsApp'tan doğrudan fiyat",
    body: "Aracınızın marka, model ve yılını gönderin; fiyat ve süre bilgisi WhatsApp üzerinden doğrudan atölyeden gelsin.",
    icon: "chat",
  },
  {
    title: "Araca özel çözüm",
    body: "Her araç aynı değil. Cam ölçüsü, cam tipi ve kullanım alışkanlığınıza göre ton ve film tipi ayrı ayrı konuşulur.",
    icon: "car",
  },
  {
    title: "Uygulamalar açık hesapta",
    body: "Yapılan işler Instagram hesabında düzenli olarak paylaşılıyor. Karar vermeden önce gerçek işleri inceleyebilirsiniz.",
    icon: "camera",
  },
];

/* ----------------------------------------------------------------- Süreç */

export const steps = [
  {
    n: "01",
    title: "Aracınızı ve hizmeti seçin",
    body: "Marka, model, yıl ve istediğiniz uygulamayı formda işaretleyin. Bir dakikadan kısa sürer.",
  },
  {
    n: "02",
    title: "WhatsApp mesajı hazır gelsin",
    body: "Form, bilgilerinizi düzenli bir mesaja çevirir. Gönder'e bastığınızda WhatsApp açılır — hiçbir şey yazmanız gerekmez.",
  },
  {
    n: "03",
    title: "GKM size fiyat ve süre yazsın",
    body: "Atölye, aracınıza uygun film/folyo seçeneklerini, fiyatı ve işin ne kadar süreceğini iletir.",
  },
  {
    n: "04",
    title: "Randevunuzu planlayın",
    body: "Uygun günü belirleyip aracınızı Altayçeşme'deki atölyeye bırakın.",
  },
];

/* ------------------------------------------------------- Sık sorulanlar */

export const faq = [
  {
    q: "Fiyat neye göre değişiyor?",
    a: "Aracın cam ölçüleri, seçilen film serisi ve uygulanacak bölge fiyatı belirler. Bu yüzden sabit bir liste yerine aracınıza özel fiyat veriliyor. Marka, model ve yılı gönderdiğinizde net rakamı WhatsApp'tan alırsınız.",
  },
  {
    q: "Hangi ton uygulanmalı?",
    a: "Ton, aracın cam yapısına, kullanım alışkanlığınıza ve yürürlükteki mevzuata göre birlikte belirlenir. Sayfadaki ton seçici, farklı ışık geçirgenliği değerlerinin sürücü görüşünü nasıl etkilediğini temsilî olarak gösterir.",
  },
  {
    q: "PPF ile cam filmi aynı şey mi?",
    a: "Hayır. Cam filmi camlara uygulanır; ısı, parlama ve mahremiyet içindir. PPF (şeffaf koruma filmi) boyalı yüzeye uygulanır ve taş çiziklerine karşı boyayı korur. İkisi birlikte de yapılabilir.",
  },
  {
    q: "Kaplama boyaya zarar verir mi?",
    a: "Folyo kaplama boyanın üzerine uygulanır ve amacı boyayı örtmektir; orijinal boya altında kalır. Aracın boya durumu uygulama öncesi atölyede değerlendirilir.",
  },
  {
    q: "İşlem ne kadar sürer?",
    a: "Süre, uygulamanın kapsamına göre değişir. Net süreyi, aracınızın bilgilerini gönderdiğinizde GKM iletir.",
  },
];

/* ------------------------------------------------------- Müşteri yorumları

   Tamamı GKM'nin Google işletme sayfasındaki GERÇEK yorumlardır (31 Temmuz
   2026'da okundu). Hiçbiri uydurulmadı, hiçbirinin anlamı değiştirilmedi.

   Uygulanan kurallar:
   • Uzun yorumlar kısaltıldı; yalnızca temsilî bölüm alındı (…) ile belirtildi.
   • Soyadları baş harfe indirildi.
   • Tarihler, Google'ın göreli etiketlerinden ("6 ay önce") mutlak aya
     çevrildi; böylece sayfa zamanla yanlış görünmez.
   • Kaynak platform her kartta yazılı.                                      */

export type Testimonial = {
  name: string;
  text: string;
  source: string;
  date: string;
  rating: number;
  /** Kartta gösterilen hizmet etiketi. */
  tag?: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Safa A.",
    text: "Astra K 2015 model aracıma tüm camlar için 2 numara cam filmi yaptırdım. İlk birkaç gün su kabarcıkları oluyor ama sonrasında tamamen geçti. Şu anda kusursuz, ellerinize sağlık, işçilik güzel.",
    tag: "Cam filmi",
    source: "Google",
    date: "Haziran 2026",
    rating: 5,
  },
  {
    name: "Nail Ü.",
    text: "MG marka aracıma cam filmi ve PPF koruma yaptırdım. Firma sahibi Gökmen Bey sağolsun çok yardımcı oldu; gerek işçilik gerek müşteri yaklaşımı çok iyi.",
    tag: "Cam filmi + PPF",
    source: "Google",
    date: "Haziran 2026",
    rating: 5,
  },
  {
    name: "Buğra A.",
    text: "Mini Countryman aracım için cam filmi yaptırdım. Daha önce yaptırdığım yerden memnun kalmamıştım. Hem söküm yapılması hem de işçilik kusursuzdu.",
    tag: "Cam filmi",
    source: "Google",
    date: "Nisan 2026",
    rating: 5,
  },
  {
    name: "Yağız A.",
    text: "Arabama hem cam filmi hem de çerçevelikleri piano black kaplattım; işçilik çok güzel ve özenli yaptılar. Google üzerinde niye bu kadar yüksek puanlı olduğunu işlem bittikten sonra anladım.",
    tag: "Cam filmi + kaplama",
    source: "Google",
    date: "Mart 2026",
    rating: 5,
  },
  {
    name: "Ali G.",
    text: "İşçilikten tavsiyelere, malzeme kalitesinden bilgilendirmeye kadar her aşama kusursuzdu. Ön iki cam filmi için beklediğimden çok daha iyi bir sonuç aldım.",
    tag: "Cam filmi",
    source: "Google",
    date: "Ocak 2026",
    rating: 5,
  },
  {
    name: "ER3N",
    text: "Gökmen Bey'in ellerine sağlık. 15 gün önce stopları kaplattırdım, bugün de arka spoileri. Güvenilir, temiz işçilik.",
    tag: "Far & stop kaplama",
    source: "Google",
    date: "Ocak 2026",
    rating: 5,
  },
  {
    name: "Yavuz D.",
    text: "Aracımın camına cam filmi ve tüm aracıma ultra parlak şeffaf folyo kaplatmak için geldim. Buraya getirdiğim üçüncü arabam. İşçilik temiz, ekip işine hâkim ve kullanılan malzeme kaliteli.",
    tag: "Cam filmi + şeffaf kaplama",
    source: "Google",
    date: "Aralık 2025",
    rating: 5,
  },
  {
    name: "Zafer E.",
    text: "Yaklaşık 20 gün önce aracıma komple şeffaf kaplama yaptırdım, biraz kurumasını bekledim. İşçilik çok iyi, teşekkür ederim.",
    tag: "Komple şeffaf kaplama",
    source: "Google",
    date: "Kasım 2025",
    rating: 5,
  },
  {
    name: "Oğuzhan S.",
    text: "Ön cam dahil tüm camlara Solar Gard film yaptırdım. Kaliteli malzeme, düzgün esnaflık, iyi işçilik hepsi Gökmen Usta'da. Ucuz markasız filmlere senelerce boşa para vermişiz.",
    tag: "Cam filmi",
    source: "Google",
    date: "Ekim 2025",
    rating: 5,
  },
  {
    name: "Ahmet U.",
    text: "Aracıma komple PPF kaplama ve cam filmi yaptırdım. Titiz çalışmalarından dolayı çok teşekkür ederim; kaplandığı gerçekten belli olmuyor, gayet memnun kaldım.",
    tag: "Komple PPF",
    source: "Google",
    date: "Ağustos 2025",
    rating: 5,
  },
  {
    name: "Can K.",
    text: "İki aracıma da Solar Gard CX Magnum IR cam filmi yaptırdım, 12 ve 20 numara. Yan güneşlerde camı kapattığım an suratımdaki haşlanma hissi anında geçiyor. Zerre baloncuk ve dalgalanma yok.",
    tag: "Cam filmi",
    source: "Google",
    date: "2025",
    rating: 5,
  },
  {
    name: "İsa Ü.",
    text: "10 yılı aşkın cam filminde tek adresim. Cam bitimindeki üstü sıfıra sıfır yapabilen tek yer diyebilirim. Kalite asla tesadüf değildir.",
    tag: "Cam filmi",
    source: "Google",
    date: "2024",
    rating: 5,
  },
];

/** Yorum listesi boşsa gösterilecek not (bkz. Testimonials bileşeni). */
export const testimonialsNote =
  "Gerçek müşteri değerlendirmeleri işletme onayı sonrasında eklenecektir.";

/* ------------------------------------------------------------ Ton seçici */

export const tintLevels = [
  { vlt: 70, label: "%70", desc: "Neredeyse şeffaf. Işığın çoğu geçer." },
  { vlt: 50, label: "%50", desc: "Hafif ton. Gündüz görüşü büyük ölçüde korunur." },
  { vlt: 35, label: "%35", desc: "Dengeli ton. Parlama belirgin biçimde azalır." },
  { vlt: 20, label: "%20", desc: "Koyu ton. Dışarıdan içerisi zor seçilir." },
  { vlt: 5, label: "%5", desc: "En koyu ton. Gece görüşü belirgin biçimde düşer." },
];

/* ------------------------------------------------------------- Navigasyon */

export const nav = [
  { href: "#hizmetler", label: "Hizmetler" },
  { href: "#uygulamalar", label: "Uygulamalar" },
  { href: "#neden-gkm", label: "Neden GKM?" },
  { href: "#yorumlar", label: "Yorumlar" },
  { href: "#iletisim", label: "İletişim" },
];

/* ----------------------------------------------------------------- Yasal */

export const disclaimer =
  "Bu sayfa GKM için hazırlanmış bağımsız bir konsept çalışmadır. GKM'nin resmî web sitesi değildir.";

export const imageNote =
  "Sayfadaki fotoğraflar telifsiz stok görsellerdir ve konsept amaçlıdır; GKM'nin kendi uygulamalarına ait değildir.";
