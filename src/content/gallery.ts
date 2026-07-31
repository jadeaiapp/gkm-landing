/* Galeri — telifsiz stok görseller (Pexels). Kaynaklar: RESEARCH.md
   Tüm dosyalar depoya yereldir; hiçbir dış adrese hotlink yapılmaz. */

import film from "../assets/img/g-film.webp";
import filmT from "../assets/img/g-film-t.webp";
import ppfHood from "../assets/img/g-ppf-hood.webp";
import ppfHoodT from "../assets/img/g-ppf-hood-t.webp";
import wrapBlue from "../assets/img/g-wrap-blue.webp";
import wrapBlueT from "../assets/img/g-wrap-blue-t.webp";
import squeegee from "../assets/img/g-squeegee.webp";
import squeegeeT from "../assets/img/g-squeegee-t.webp";
import heat from "../assets/img/g-heat.webp";
import heatT from "../assets/img/g-heat-t.webp";
import ppfLay from "../assets/img/g-ppf-lay.webp";
import ppfLayT from "../assets/img/g-ppf-lay-t.webp";
import clear from "../assets/img/g-clear.webp";
import clearT from "../assets/img/g-clear-t.webp";
import tinted from "../assets/img/g-tinted.webp";
import tintedT from "../assets/img/g-tinted-t.webp";
import result from "../assets/img/g-result.webp";
import resultT from "../assets/img/g-result-t.webp";
import roll from "../assets/img/g-roll.webp";
import rollT from "../assets/img/g-roll-t.webp";

export type Shot = {
  full: string;
  thumb: string;
  alt: string;
  caption: string;
  tag: string;
  /** Bento düzeninde geniş yer kaplasın mı? */
  wide?: boolean;
};

export const gallery: Shot[] = [
  {
    full: film,
    thumb: filmT,
    tag: "Cam filmi",
    caption: "Yan cama film uygulaması",
    alt: "Bir usta, aracın yan camına cam filmi uyguluyor",
    wide: true,
  },
  {
    full: ppfHood,
    thumb: ppfHoodT,
    tag: "PPF",
    caption: "Kaputa şeffaf koruma filmi",
    alt: "Teknisyen, spor bir aracın kaputuna şeffaf boya koruma filmi seriyor",
  },
  {
    full: wrapBlue,
    thumb: wrapBlueT,
    tag: "Renk değişimi",
    caption: "Folyo ile renk değişimi",
    alt: "Beyaz bir aracın kaputuna mavi folyo kaplama uygulanıyor",
  },
  {
    full: squeegee,
    thumb: squeegeeT,
    tag: "Uygulama",
    caption: "Rakle ile hava alma",
    alt: "Koyu renk bir yüzeydeki folyonun altındaki hava rakleyle alınıyor",
  },
  {
    full: heat,
    thumb: heatT,
    tag: "Uygulama",
    caption: "Isı tabancasıyla form verme",
    alt: "Isı tabancası kullanılarak folyo, kaput yüzeyine oturtuluyor",
  },
  {
    full: ppfLay,
    thumb: ppfLayT,
    tag: "PPF",
    caption: "Gövdeye koruma filmi serimi",
    alt: "İki teknisyen aracın gövdesine büyük bir şeffaf koruma filmi seriyor",
    wide: true,
  },
  {
    full: clear,
    thumb: clearT,
    tag: "Şeffaf koruma",
    caption: "Arka panel ve stop bölgesi",
    alt: "Aracın arka panelinde şeffaf koruma filmi uygulaması",
  },
  {
    full: tinted,
    thumb: tintedT,
    tag: "Sonuç",
    caption: "Film sonrası yan cam görünümü",
    alt: "Cam filmi uygulanmış siyah bir aracın yan cam detayı",
  },
  {
    full: result,
    thumb: resultT,
    tag: "Sonuç",
    caption: "Tamamlanmış araç",
    alt: "Camları filmli, koyu renk spor bir aracın yan görünümü",
  },
  {
    full: roll,
    thumb: rollT,
    tag: "Atölye",
    caption: "Folyo hazırlığı",
    alt: "Atölyede folyo rulosu taşıyan bir usta",
  },
];
