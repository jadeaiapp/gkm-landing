import heroPanel from "../assets/img/hero-panel.webp";
import heroPanelSm from "../assets/img/hero-panel-sm.webp";
import { business } from "../content/site";
import Icon from "./Icon";

/** Hero altındaki "ölçü cetveli" — doğrulanmış üç güven bilgisi, çentiklerle. */
const MARKS = [
  {
    icon: "star",
    label: "Google puanı",
    value: `${business.googleRating.score} · ${business.googleRating.count} değerlendirme`,
    href: business.maps,
  },
  { icon: "badge", label: "Film markası", value: business.brand.claim },
  { icon: "pin", label: "Konum", value: "Altayçeşme, Maltepe", href: business.maps },
] as const;

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-24 pb-4 lg:pt-32">
      {/* Ortam ışığı — tek, ölçülü, kaymayan bir sıcak kaynak */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -left-40 h-[34rem] w-[34rem] rounded-full opacity-[0.16] blur-[110px]"
        style={{ background: "radial-gradient(circle, #E8A33D 0%, transparent 68%)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 -right-32 h-[28rem] w-[28rem] rounded-full opacity-[0.09] blur-[100px]"
        style={{ background: "radial-gradient(circle, #6E8CB0 0%, transparent 70%)" }}
      />

      <div className="shell relative">
        {/* --------------------------------------------- Başlık: sayfanın tezi */}
        <p className="rule-label rise" style={{ "--i": 0 } as React.CSSProperties}>
          Altayçeşme · Maltepe · İstanbul
        </p>

        <h1 className="display-xl mt-6 max-w-[16ch] lg:max-w-none">
          <span className="mask-line is-in" style={{ "--i": 1 } as React.CSSProperties}>
            <span>Camına film.</span>
          </span>
          <span className="mask-line is-in" style={{ "--i": 2 } as React.CSSProperties}>
            <span>Kaputuna koruma.</span>
          </span>
          <span className="mask-line is-in" style={{ "--i": 3 } as React.CSSProperties}>
            <span className="text-amber">Gövdesine yeni bir renk.</span>
          </span>
        </h1>

        {/* ------------------------------------------ Alt satır: söz + görsel */}
        <div className="mt-11 grid gap-10 lg:mt-14 lg:grid-cols-12 lg:items-center lg:gap-12">
          <div className="lg:col-span-6">
            <p className="lede rise max-w-[46ch]" style={{ "--i": 6 } as React.CSSProperties}>
              Maltepe Altayçeşme'de oto cam filmi, PPF şeffaf boya koruma ve komple araç
              kaplama. Aracınızın marka ve modelini gönderin, fiyatı WhatsApp'tan
              doğrudan atölyeden alın.
            </p>

            <div
              className="rise mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
              style={{ "--i": 7 } as React.CSSProperties}
            >
              <a href="#fiyat-al" className="btn btn-primary sm:px-7">
                Aracıma Özel Fiyat Al
                <Icon name="arrow-right" size={18} />
              </a>
              <a href="#uygulamalar" className="btn btn-ghost">
                Uygulamaları İncele
                <Icon name="chevron-down" size={17} className="text-chrome" />
              </a>
            </div>
          </div>

          <figure
            className="rise lg:col-span-6"
            style={{ "--i": 5 } as React.CSSProperties}
          >
            <div className="chamfer noise relative overflow-hidden rounded-xl border border-edge bg-graphite">
              <picture>
                <source media="(min-width: 768px)" srcSet={heroPanel} />
                <img
                  src={heroPanelSm}
                  width={840}
                  height={700}
                  alt="Atölyede bir spor aracın ön bölümüne şeffaf boya koruma filmi seren iki teknisyen"
                  fetchPriority="high"
                  decoding="async"
                  className="slow-zoom aspect-[5/4] w-full object-cover sm:aspect-[16/10] lg:aspect-[4/3]"
                />
              </picture>

              {/* Görselin altını koyulaştırıp etiketi okunur kılan geçiş */}
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-ink/85 to-transparent"
              />

              {/* Sinematik film çizgisi — görselin üzerinden bir kez geçer */}
              <div
                aria-hidden="true"
                className="film-line absolute inset-x-0 top-[42%] h-px bg-gradient-to-r from-amber/0 via-amber/70 to-amber/0"
              />

              <figcaption className="absolute bottom-4 left-4 flex items-center gap-2 rounded-md border border-white/10 bg-ink/70 px-2.5 py-1.5 text-[0.7rem] font-medium tracking-wide text-silver backdrop-blur-md">
                <Icon name="camera" size={13} className="text-chrome" />
                Konsept görsel
              </figcaption>
            </div>
          </figure>
        </div>

        {/* ------------------------------------------ Ölçü cetveli şeridi */}
        <div className="rise mt-14 lg:mt-20" style={{ "--i": 9 } as React.CSSProperties}>
          <div className="hairline" />
          <dl className="grid grid-cols-1 sm:grid-cols-3">
            {MARKS.map((m) => (
              <div key={m.label} className="group relative pt-5 pb-1 sm:pr-6">
                <span aria-hidden="true" className="absolute top-0 left-0 h-2.5 w-px bg-amber/70" />
                <dt className="flex items-center gap-2 text-[0.68rem] font-semibold tracking-[0.18em] text-chrome uppercase">
                  <Icon name={m.icon} size={14} className="text-amber" />
                  {m.label}
                </dt>
                <dd className="mt-1.5 flex items-center gap-1.5 text-[0.95rem] font-medium text-silver transition-colors group-hover:text-white-w">
                  {m.value}
                  {"href" in m && m.href && (
                    <Icon
                      name="arrow-up-right"
                      size={13}
                      className="flex-none text-chrome transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  )}
                </dd>

                {/* Hücrenin tamamı tıklanabilir — dokunma hedefi büyük kalsın. */}
                {"href" in m && m.href && (
                  <a
                    href={m.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${m.label}: ${m.value} — Google Haritalar'da aç`}
                    className="absolute inset-0 rounded-md sm:right-6"
                  />
                )}
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
