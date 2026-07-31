import band from "../assets/img/tex-band.webp";
import { business } from "../content/site";
import { useParallax } from "../hooks";
import { quickWhatsappUrl } from "../lib/whatsapp";
import Icon from "./Icon";
import Reveal from "./Reveal";

export default function CtaBand() {
  const imgRef = useParallax<HTMLImageElement>(0.07);

  return (
    <section className="relative overflow-hidden border-t border-edge">
      <img
        ref={imgRef}
        src={band}
        width={1800}
        height={800}
        loading="lazy"
        decoding="async"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-[125%] w-full -translate-y-[8%] object-cover brightness-125"
        style={{ translate: "0 var(--py, 0px)" }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-ink via-ink/86 to-ink/30"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber/45 to-transparent"
      />

      <div className="shell relative py-20 lg:py-28">
        <Reveal className="max-w-[46rem]">
          <p className="rule-label">Sonraki adım</p>
          <h2 className="display-lg mt-5">
            Aracınızın bilgilerini gönderin,{" "}
            <span className="text-amber">fiyatı atölyeden gelsin.</span>
          </h2>
          <p className="lede mt-5 max-w-[52ch]">
            Marka, model ve yıl yeterli. Mesajınız hazır gelir; siz sadece gönder'e basarsınız.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href="#fiyat-al" className="btn btn-primary sm:px-7">
              Aracıma Özel Fiyat Al
              <Icon name="arrow-right" size={18} />
            </a>
            <a
              href={quickWhatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              <Icon name="whatsapp" size={18} className="text-wa" />
              Doğrudan WhatsApp
            </a>
            <a
              href={`tel:${business.phoneHref}`}
              className="link-underline num inline-flex items-center gap-2 self-start py-3 text-sm font-semibold text-silver sm:ml-2"
            >
              <Icon name="phone" size={16} className="text-chrome" />
              {business.phoneDisplay}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
