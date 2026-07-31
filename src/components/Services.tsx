import { services } from "../content/site";
import { useQuote } from "../lib/quote-store";
import Icon, { type IconName } from "./Icon";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

export default function Services() {
  const { askFor } = useQuote();

  return (
    <section id="hizmetler" className="band border-t border-edge bg-ink-2">
      <div className="shell">
        <SectionHead
          label="Hizmetler"
          title={
            <>
              Camdan gövdeye,{" "}
              <span className="text-amber">altı ayrı uygulama</span>
            </>
          }
          lead="Aracın hangi yüzeyine dokunulacağı işi baştan belirler. Aşağıdaki uygulamalar GKM'nin işletme kayıtlarında ve kendi sosyal medya hesabında listelediği hizmetlerdir."
        />

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal as="li" key={s.id} delay={i % 3}>
              <article className="surface sweep flex h-full flex-col p-6 transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-edge-hi lg:p-7">
                <div className="relative z-[2] flex items-start justify-between gap-4">
                  <span className="grid h-11 w-11 place-items-center rounded-lg border border-edge bg-ink/60 text-amber">
                    <Icon name={s.icon as IconName} size={21} />
                  </span>
                </div>

                <h3 className="display-md relative z-[2] mt-5">{s.title}</h3>
                <p className="relative z-[2] mt-2.5 text-[0.95rem] leading-relaxed text-chrome">
                  {s.lead}
                </p>

                <ul className="relative z-[2] mt-5 space-y-2 border-t border-edge pt-5">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-sm text-silver">
                      <Icon name="check" size={15} className="mt-1 flex-none text-amber" />
                      {p}
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => askFor(s.label)}
                  className="link-underline relative z-[2] mt-auto inline-flex items-center gap-2 self-start pt-7 text-sm font-semibold text-amber"
                >
                  Bu hizmet için fiyat sor
                  <Icon name="arrow-right" size={16} />
                </button>
              </article>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={1}>
          <p className="mt-8 flex items-start gap-2.5 text-sm text-chrome">
            <Icon name="alert" size={16} className="mt-0.5 flex-none text-chrome" />
            Listede olmayan bir uygulama mı arıyorsunuz? Aracınızın bilgileriyle birlikte yazın,
            GKM yapılabilirliğini değerlendirsin.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
