import grille from "../assets/img/tex-grille.webp";
import { advantages, business } from "../content/site";
import { useParallax } from "../hooks";
import Icon, { type IconName } from "./Icon";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

export default function WhyGkm() {
  const imgRef = useParallax<HTMLImageElement>(0.055);

  return (
    <section id="neden-gkm" className="band border-t border-edge">
      <div className="shell">
        <SectionHead
          label="Neden GKM?"
          title={
            <>
              Doğrulanabilir olanı yazdık,{" "}
              <span className="text-amber">gerisini atölye anlatsın</span>
            </>
          }
          lead="Aşağıdaki maddelerin tamamı GKM'nin herkese açık kayıtlarından ve kendi sosyal medya hesabından doğrulanabilir. Kaynağı belirsiz hiçbir iddia bu sayfada yer almıyor."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* --------------------------------------------------- Görsel */}
          <Reveal className="lg:col-span-4">
            <figure className="sticky top-28">
              <div className="chamfer noise relative overflow-hidden rounded-xl border border-edge bg-graphite">
                <img
                  ref={imgRef}
                  src={grille}
                  width={1100}
                  height={1100}
                  loading="lazy"
                  decoding="async"
                  alt="Koyu renk bir aracın parlak ön ızgara ve kaput detayı"
                  className="aspect-square w-full scale-110 object-cover"
                  style={{ translate: "0 var(--py, 0px)" }}
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent"
                />
              </div>

              <figcaption className="mt-4 flex items-start gap-2.5 text-[0.8rem] leading-relaxed text-chrome">
                <Icon name="badge" size={15} className="mt-0.5 flex-none text-amber" />
                <span>
                  <strong className="font-semibold text-silver">{business.brand.claim}.</strong>{" "}
                  {business.brand.note}
                </span>
              </figcaption>
            </figure>
          </Reveal>

          {/* ------------------------------------------------- Maddeler */}
          <div className="lg:col-span-8">
            <ul className="divide-y divide-edge border-y border-edge">
              {advantages.map((a, i) => (
                <Reveal as="li" key={a.title} delay={i % 3}>
                  <div className="group relative flex gap-5 py-6 transition-colors sm:gap-7 sm:py-7">
                    {/* ölçü çentiği */}
                    <span
                      aria-hidden="true"
                      className="absolute top-0 left-0 h-2.5 w-px bg-amber/0 transition-colors duration-300 group-hover:bg-amber/70"
                    />
                    <span className="grid h-11 w-11 flex-none place-items-center rounded-lg border border-edge bg-steel text-amber transition-colors duration-300 group-hover:border-edge-hi">
                      <Icon name={a.icon as IconName} size={20} />
                    </span>
                    <div>
                      <h3 className="text-[1.0625rem] leading-snug font-semibold text-white-w sm:text-lg">
                        {a.title}
                      </h3>
                      <p className="mt-2 max-w-[62ch] text-[0.95rem] leading-relaxed text-chrome">
                        {a.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
