import { business, testimonials, testimonialsNote } from "../content/site";
import { useCountUp } from "../hooks";
import Icon from "./Icon";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

/** GKM'nin yorumlarının gerçekte bulunduğu, herkese açık kanallar. */
const CHANNELS = [
  {
    icon: "map",
    name: "Google İşletme",
    detail: "Harita kaydı ve müşteri yorumları",
    href: business.maps,
  },
  {
    icon: "instagram",
    name: "Instagram",
    detail: `${business.social.instagramHandle} · uygulama paylaşımları`,
    href: business.social.instagram,
  },
  {
    icon: "facebook",
    name: "Facebook",
    detail: "İşletme sayfası ve fotoğraf albümleri",
    href: business.social.facebook,
  },
] as const;

function Stars({ n = 5 }: { n?: number }) {
  return (
    <span className="flex gap-0.5 text-amber" aria-label={`${n} yıldız`}>
      {Array.from({ length: n }, (_, i) => (
        <Icon key={i} name="star" size={14} />
      ))}
    </span>
  );
}

export default function Testimonials() {
  const followers = useCountUp(6700);
  const hasReviews = testimonials.length > 0;
  const track = hasReviews ? [...testimonials, ...testimonials] : [];

  return (
    <section id="yorumlar" className="band border-t border-edge bg-ink-2">
      <div className="shell">
        <SectionHead
          label="Yorumlar"
          title={
            <>
              Yorumları biz yazmadık.{" "}
              <span className="text-amber">Kaynağından okuyun.</span>
            </>
          }
          lead="Bu sayfa bağımsız bir konsept çalışma olduğu için, doğrulayamadığımız hiçbir müşteri yorumu veya puan burada yayınlanmadı. GKM hakkındaki gerçek değerlendirmelere aşağıdaki kanallardan doğrudan ulaşabilirsiniz."
        />
      </div>

      {hasReviews ? (
        <div className="marquee-wrap fade-x mt-14 overflow-hidden">
          <ul className="marquee" style={{ "--dur": "52s" } as React.CSSProperties}>
            {track.map((t, i) => (
              <li key={`${t.name}-${i}`} className="w-[19rem] flex-none sm:w-[23rem]">
                <figure className="surface flex h-full flex-col p-6">
                  {t.rating && <Stars n={t.rating} />}
                  <blockquote className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-silver">
                    “{t.text}”
                  </blockquote>
                  <figcaption className="mt-5 flex items-center justify-between gap-3 border-t border-edge pt-4">
                    <span className="text-sm font-semibold text-white-w">{t.name}</span>
                    <span className="text-[0.7rem] font-medium tracking-wide text-chrome">
                      {t.source}
                    </span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="shell mt-12">
          <Reveal>
            <div className="surface flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:gap-7 lg:p-8">
              <span className="grid h-12 w-12 flex-none place-items-center rounded-lg border border-amber/25 bg-amber/8 text-amber">
                <Icon name="alert" size={22} />
              </span>
              <div>
                <p className="text-[1.0625rem] font-semibold text-white-w">{testimonialsNote}</p>
                <p className="mt-2 max-w-[70ch] text-[0.9rem] leading-relaxed text-chrome">
                  Rehber sitelerinde birbiriyle çelişen puanlar bulundu (4,9 · 4,0 · 5,0) ve hiçbiri
                  kaynağından teyit edilemedi. Sahte yorum veya puan yazmak yerine bu alan boş
                  bırakıldı; işletme onayı geldiğinde gerçek yorumlar buraya eklenecek.
                </p>
              </div>
            </div>
          </Reveal>

          <ul className="mt-4 grid gap-4 sm:grid-cols-3">
            {CHANNELS.map((c, i) => (
              <Reveal as="li" key={c.name} delay={i}>
                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="surface sweep group flex h-full items-start gap-4 p-5 transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-edge-hi"
                >
                  <span className="relative z-[2] grid h-10 w-10 flex-none place-items-center rounded-lg border border-edge bg-ink/60 text-amber">
                    <Icon name={c.icon} size={19} />
                  </span>
                  <span className="relative z-[2] min-w-0">
                    <span className="flex items-center gap-1.5 text-[0.95rem] font-semibold text-white-w">
                      {c.name}
                      <Icon
                        name="arrow-up-right"
                        size={14}
                        className="text-chrome transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </span>
                    <span className="mt-1 block text-[0.82rem] leading-snug text-chrome">
                      {c.detail}
                    </span>
                  </span>
                </a>
              </Reveal>
            ))}
          </ul>

          {/* Doğrulanabilen tek sayısal gösterge */}
          <Reveal delay={1}>
            <p className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm text-chrome">
              <span
                ref={followers.ref}
                className="num font-display text-3xl leading-none font-extrabold text-white-w"
              >
                {followers.value.toLocaleString("tr-TR")}+
              </span>
              <span>
                Instagram takipçisi —{" "}
                <a
                  href={business.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline font-medium text-amber"
                >
                  {business.social.instagramHandle}
                </a>{" "}
                · Temmuz 2026 itibarıyla
              </span>
            </p>
          </Reveal>
        </div>
      )}
    </section>
  );
}
