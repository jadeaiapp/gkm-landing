import { business } from "../content/site";
import { quickWhatsappUrl } from "../lib/whatsapp";
import Icon, { type IconName } from "./Icon";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

const { address, geo } = business;

const MAP_SRC = `https://www.google.com/maps?q=${geo.lat},${geo.lng}&hl=tr&z=16&output=embed`;

type Row = { icon: IconName; label: string; value: string; href?: string; external?: boolean };

const ROWS: Row[] = [
  {
    icon: "pin",
    label: "Adres",
    value: `${address.line1}, ${address.line2}`,
    href: business.maps,
    external: true,
  },
  { icon: "phone", label: "Telefon", value: business.phoneDisplay, href: `tel:${business.phoneHref}` },
  {
    icon: "whatsapp",
    label: "WhatsApp",
    value: business.phoneDisplay,
    href: quickWhatsappUrl(),
    external: true,
  },
  {
    icon: "instagram",
    label: "Instagram",
    value: business.social.instagramHandle,
    href: business.social.instagram,
    external: true,
  },
  {
    icon: "facebook",
    label: "Facebook",
    value: "GKM Oto Cam Filmi ve Araç Kaplama",
    href: business.social.facebook,
    external: true,
  },
];

export default function ContactMap() {
  return (
    <section id="iletisim" className="band border-t border-edge bg-ink-2">
      <div className="shell">
        <SectionHead
          label="İletişim"
          title={
            <>
              Altayçeşme'de, <span className="text-amber">haritada işaretli</span>
            </>
          }
          lead="Uygulamadan önce atölyeyi görmek isterseniz adres aşağıda. Yol tarifi için harita bağlantısını kullanabilirsiniz."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-12 lg:gap-8">
          {/* --------------------------------------------------- Bilgiler */}
          <Reveal className="lg:col-span-5">
            <div className="surface h-full p-6 lg:p-7">
              <ul className="divide-y divide-edge">
                {ROWS.map((r, i) => {
                  // first:/last: değiştiricileri <li> üzerinde çalışır; iç öğede
                  // her satıra uygulanıp dolguyu sıfırlardı.
                  const pad = `py-4 ${i === 0 ? "pt-0" : ""} ${
                    i === ROWS.length - 1 ? "pb-0" : ""
                  }`;
                  const inner = (
                    <>
                      <span className="grid h-10 w-10 flex-none place-items-center rounded-lg border border-edge bg-ink/50 text-amber transition-colors group-hover:border-edge-hi">
                        <Icon name={r.icon} size={18} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[0.66rem] font-semibold tracking-[0.18em] text-chrome uppercase">
                          {r.label}
                        </span>
                        <span className="mt-1 block text-[0.95rem] leading-snug font-medium break-words text-white-w">
                          {r.value}
                        </span>
                      </span>
                      {r.href && (
                        <Icon
                          name="arrow-up-right"
                          size={16}
                          className="mt-1 flex-none text-chrome transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      )}
                    </>
                  );

                  return (
                    <li key={r.label}>
                      {r.href ? (
                        <a
                          href={r.href}
                          {...(r.external
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                          className={`group flex items-start gap-4 ${pad}`}
                        >
                          {inner}
                        </a>
                      ) : (
                        <div className={`flex items-start gap-4 ${pad}`}>{inner}</div>
                      )}
                    </li>
                  );
                })}
              </ul>

              {/* Çalışma saatleri yalnızca teyit edildiğinde görünür. */}
              {business.hours.verified && (
                <div className="mt-6 border-t border-edge pt-6">
                  <p className="flex items-center gap-2 text-[0.66rem] font-semibold tracking-[0.18em] text-chrome uppercase">
                    <Icon name="clock" size={14} className="text-amber" />
                    Çalışma saatleri
                  </p>
                  <dl className="mt-3 space-y-1.5">
                    {business.hours.lines.map((h) => (
                      <div key={h.day} className="flex justify-between gap-4 text-[0.9rem]">
                        <dt className="text-chrome">{h.day}</dt>
                        <dd className="num font-medium text-silver">{h.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}

              <div className="mt-6 flex flex-col gap-3 border-t border-edge pt-6">
                <a
                  href={quickWhatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  <Icon name="whatsapp" size={18} />
                  WhatsApp'tan yaz
                </a>
                <a href={`tel:${business.phoneHref}`} className="btn btn-ghost">
                  <Icon name="phone" size={18} />
                  {business.phoneDisplay} — Ara
                </a>
              </div>
            </div>
          </Reveal>

          {/* ------------------------------------------------------ Harita */}
          <Reveal delay={1} className="lg:col-span-7">
            <div className="surface h-full overflow-hidden">
              <iframe
                src={MAP_SRC}
                title={`${business.name} — Google Haritalar konumu`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[22rem] w-full border-0 lg:h-full lg:min-h-[26rem]"
              />
            </div>
            <p className="mt-3 flex items-start gap-2 text-[0.8rem] text-chrome">
              <Icon name="map" size={15} className="mt-0.5 flex-none" />
              Harita yüklenmezse{" "}
              <a
                href={business.maps}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline font-medium text-amber"
              >
                Google Haritalar'da açın
              </a>
              .
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
