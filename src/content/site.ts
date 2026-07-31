/* ==========================================================================
   GKM — TEK MERKEZ İÇERİK DOSYASI
   --------------------------------------------------------------------------
   Sitedeki tüm işletme bilgisi, metin ve hizmet listesi burada durur.
   Bir bilgiyi değiştirmek için başka hiçbir dosyaya dokunmanız gerekmez.

   `verified: false` işaretli alanlar internette KESİN olarak doğrulanamadı ve
   sitede GÖSTERİLMEZ. İşletmeden teyit aldıktan sonra `verified: true` yapın;
   ilgili bölüm otomatik olarak görünür hale gelir.

   Kaynaklar ve doğrulama notları için: RESEARCH.md
   ========================================================================== */

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

  maps:
    "https://www.google.com/maps/place/GKM+OTO+CAM+FILMI+VE+ARA%C3%87+KAPLAMA/data=!4m7!3m6!1s0x14cac6a4693d1c57:0x631cfbf425078232!8m2!3d40.9277959!4d29.1318242!16s%2Fg%2F11b7p_3k0m",

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

  /* --- Teyit bekleyen alanlar (sitede gizli) ------------------------------ */

  /** Kaynaklar çelişiyor: 4,9/346 · 4,0/21 · 5,0/1. Doğrulanana kadar gösterilmiyor. */
  googleRating: {
    verified: false,
    score: "4,9",
    count: 346,
  },

  /** haritane.com: Pzt–Cum 09.00–20.00 · Yandex: 09.00 açılış. Hafta sonu bilinmiyor. */
  hours: {
    verified: false,
    lines: [
      { day: "Pazartesi – Cuma", value: "09.00 – 20.00" },
      { day: "Cumartesi", value: "Teyit bekleniyor" },
      { day: "Pazar", value: "Teyit bekleniyor" },
    ],
  },

  /** Tek kaynakta geçiyor, resmî bir sayfadan doğrulanamadı. */
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
   İnternette; yorum metni, yazar adı ve platformu birlikte doğrulanabilen
   güncel bir müşteri yorumu bulunamadı. Rehber sitelerindeki puanlar birbiriyle
   çelişiyor (4,9/346 · 4,0/21 · 5,0/1) ve kaynakları teyit edilemedi.
   Bu yüzden yorum uydurulmadı; bölüm teyit notuyla yayınlanıyor.
   İşletmeden onay geldiğinde aşağıdaki diziye gerçek yorumları ekleyin. */

export type Testimonial = { name: string; text: string; source: string; rating?: number };

export const testimonials: Testimonial[] = [];

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
