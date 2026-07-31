import { faq } from "../content/site";
import Icon from "./Icon";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

export default function Faq() {
  return (
    <section id="sorular" className="band border-t border-edge">
      <div className="shell">
        <SectionHead
          label="Sık sorulanlar"
          title={
            <>
              Fiyat, süre ve <span className="text-amber">karar verirken takılan yerler</span>
            </>
          }
          lead="Atölyeye gelmeden önce en çok sorulan sorular. Cevabı burada bulamadığınız her şey için WhatsApp'tan yazabilirsiniz."
        />

        <div className="mt-12 max-w-[54rem]">
          {faq.map((item, i) => (
            <Reveal key={item.q} delay={i % 3}>
              <details className="group border-b border-edge first:border-t">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 text-left [&::-webkit-details-marker]:hidden">
                  <h3 className="text-[1.0625rem] leading-snug font-semibold text-white-w transition-colors group-hover:text-amber sm:text-lg">
                    {item.q}
                  </h3>
                  <span className="grid h-8 w-8 flex-none place-items-center rounded-md border border-edge text-chrome transition-[transform,border-color,color] duration-300 group-open:rotate-180 group-open:border-amber/40 group-open:text-amber">
                    <Icon name="chevron-down" size={16} />
                  </span>
                </summary>
                <p className="max-w-[68ch] pr-12 pb-6 text-[0.95rem] leading-relaxed text-chrome">
                  {item.a}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
