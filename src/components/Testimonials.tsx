import { business, testimonials, testimonialsNote } from "../content/site";
import { useCountUp } from "../hooks";
import Icon from "./Icon";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

/** GKM'nin yorumlarının bulunduğu, herkese açık kanallar. */
const CHANNELS = [
  {
    icon: "map",
    name: "Google İşletme",
    detail: `${business.googleRating.count} değerlendirme · ${business.googleRating.score} puan`,
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
    <span className="flex gap-0.5 text-amber" aria-label={`${n} üzerinden ${n} yıldız`}>
      {Array.from({ length: n }, (_, i) => (
        <Icon key={i} name="star" size={14} />
      ))}
    </span>
  );
}

export default function Testimonials() {
  const reviews = useCountUp(business.googleRating.count);
  const hasReviews = testimonials.length > 0;
  const track = hasReviews ? [...testimonials, ...testimonials] : [];

  return (
    <section id="yorumlar" className="band border-t border-edge bg-ink-2">
      <div className="shell">
        <SectionHead
          label="Yorumlar"
          title={
            <>
              Puanı biz vermedik.{" "}
              <span className="text-amber">{business.googleRating.count} kişi verdi.</span>
            </>
          }
          lead="Aşağıdaki yorumların tamamı GKM'nin Google işletme sayfasından alınmıştır. Uzun olanlar kısaltıldı, soyadlar baş harfe indirildi; hiçbirinin anlamı değiştirilmedi."
        />

        {/* --------------------------------------------- Puan özeti */}
        <Reveal>
          <div className="surface mt-12 flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:gap-9 lg:p-8">
            <div className="flex items-center gap-5">
              <p
                className="num font-display text-6xl leading-none font-extrabold text-white-w"
                aria-hidden="true"
              >
                {business.googleRating.score}
              </p>
              <div>
                <Stars />
                <p className="mt-2 text-[0.82rem] text-chrome">
                  <span ref={reviews.ref} className="num font-semibold text-silver">
                    {reviews.value.toLocaleString("tr-TR")}
                  </span>{" "}
                  Google değerlendirmesi
                </p>
                <span className="sr-only">
                  Google puanı: {business.googleRating.score} / 5, {business.googleRating.count}{" "}
                  değerlendirme.
                </span>
              </div>
            </div>

            <div className="hidden h-14 w-px flex-none bg-edge sm:block" />

            <p className="flex-1 text-[0.9rem] leading-relaxed text-chrome">
              Bu sayfa bağımsız bir konsept çalışma olduğu için puan ve yorumlar
              kaynağından okunacak şekilde bağlandı — hiçbiri burada üretilmedi.
            </p>

            <a
              href={business.maps}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost flex-none"
            >
              Tümünü Google'da oku
              <Icon name="arrow-up-right" size={17} className="text-chrome" />
            </a>
          </div>
        </Reveal>
      </div>

      {/* --------------------------------------------- Yorum şeridi */}
      {hasReviews ? (
        <>
          <div className="marquee-wrap fade-x mt-4 overflow-hidden py-4">
            <ul className="marquee" style={{ "--dur": "88s" } as React.CSSProperties}>
              {track.map((t, i) => (
                <li key={`${t.name}-${i}`} className="w-[19.5rem] flex-none sm:w-[23rem]">
                  <figure className="surface flex h-full flex-col p-6">
                    <div className="flex items-center justify-between gap-3">
                      <Stars n={t.rating} />
                      {t.tag && (
                        <span className="rounded border border-edge px-2 py-0.5 text-[0.6rem] font-semibold tracking-[0.12em] text-chrome uppercase">
                          {t.tag}
                        </span>
                      )}
                    </div>

                    <blockquote className="mt-4 flex-1 text-[0.92rem] leading-relaxed text-silver">
                      “{t.text}”
                    </blockquote>

                    <figcaption className="mt-5 flex items-center justify-between gap-3 border-t border-edge pt-4">
                      <span className="text-sm font-semibold text-white-w">{t.name}</span>
                      <span className="text-[0.7rem] font-medium tracking-wide text-chrome">
                        {t.source} · {t.date}
                      </span>
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </div>

          <div className="shell">
            <Reveal>
              <p className="flex items-start gap-2.5 text-sm text-chrome">
                <Icon name="alert" size={16} className="mt-0.5 flex-none" />
                Yorumlar 31 Temmuz 2026'da Google işletme sayfasından alındı. Tarihler, Google'ın
                göreli etiketlerinden ("6 ay önce") mutlak aya çevrildi.
              </p>
            </Reveal>
          </div>
        </>
      ) : (
        /* Yorum dizisi boşaltılırsa güvenli geri dönüş. */
        <div className="shell mt-4">
          <Reveal>
            <div className="surface flex items-center gap-5 p-6">
              <span className="grid h-12 w-12 flex-none place-items-center rounded-lg border border-amber/25 bg-amber/8 text-amber">
                <Icon name="alert" size={22} />
              </span>
              <p className="text-[1.0625rem] font-semibold text-white-w">{testimonialsNote}</p>
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
                      <Icon name="arrow-up-right" size={14} className="text-chrome" />
                    </span>
                    <span className="mt-1 block text-[0.82rem] leading-snug text-chrome">
                      {c.detail}
                    </span>
                  </span>
                </a>
              </Reveal>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
