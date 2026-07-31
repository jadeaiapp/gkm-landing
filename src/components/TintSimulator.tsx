import { useId, useState } from "react";
import tintView from "../assets/img/tint-view.webp";
import { tintLevels } from "../content/site";
import { useQuote } from "../lib/quote-store";
import Icon from "./Icon";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

/** Görsel örtünün koyuluğu. Fiziksel oran (1 − VLT) hafifçe yumuşatıldı;
 *  gerçek sürüşte göz karanlığa uyum sağladığı için birebir oran fazla koyu görünür. */
const veil = (vlt: number) => ((100 - vlt) / 100) * 0.86;

export default function TintSimulator() {
  const [idx, setIdx] = useState(3); // varsayılan: %20
  const { askFor, setTint } = useQuote();
  const sliderId = useId();

  const level = tintLevels[idx];

  return (
    <section id="ton-secici" className="band border-t border-edge">
      <div className="shell">
        <SectionHead
          label="Ton seçici"
          title={
            <>
              Hangi ton? <span className="text-amber">Önce görün</span>, sonra karar verin.
            </>
          }
          lead="Cam filminde en çok sorulan soru tonun ne kadar koyu olacağı. Sürücü koltuğundan dışarısının farklı ışık geçirgenliği (VLT) değerlerinde nasıl göründüğünü aşağıdan deneyin."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-12 lg:gap-10">
          {/* ------------------------------------------------- Gösterim */}
          <Reveal className="lg:col-span-7">
            <figure className="surface overflow-hidden">
              <div className="relative">
                <img
                  src={tintView}
                  width={1440}
                  height={900}
                  loading="lazy"
                  decoding="async"
                  alt="Sürücü koltuğundan ön camdan görünen yol"
                  className="aspect-[16/10] w-full object-cover transition-[filter] duration-500 ease-out"
                  style={{
                    filter: `saturate(${1 - idx * 0.075}) contrast(${1 + idx * 0.02})`,
                  }}
                />

                {/* Film örtüsü — VLT değerine göre koyulaşır */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 transition-opacity duration-500 ease-out"
                  style={{
                    opacity: veil(level.vlt),
                    background:
                      "linear-gradient(180deg, #0A1017 0%, #0C1219 55%, #090C10 100%)",
                  }}
                />

                {/* Camın üst bandındaki hafif yansıma */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-white/[0.07] to-transparent"
                />

                <div className="pointer-events-none absolute top-4 left-4 flex items-center gap-2 rounded-md border border-white/10 bg-ink/70 px-2.5 py-1.5 text-[0.7rem] font-medium tracking-wide text-silver backdrop-blur-md">
                  <Icon name="sun" size={13} className="text-amber" />
                  Temsilî gösterim
                </div>

                <div className="pointer-events-none absolute right-4 bottom-4 rounded-lg border border-white/10 bg-ink/75 px-3.5 py-2 backdrop-blur-md">
                  <span className="num font-display text-2xl leading-none font-extrabold text-amber">
                    {level.label}
                  </span>
                  <span className="ml-1.5 text-[0.68rem] font-semibold tracking-[0.16em] text-chrome uppercase">
                    VLT
                  </span>
                </div>
              </div>
            </figure>
          </Reveal>

          {/* -------------------------------------------------- Kontrol */}
          <Reveal delay={1} className="lg:col-span-5">
            <div className="surface flex h-full flex-col p-6 lg:p-7">
              <label
                htmlFor={sliderId}
                className="text-[0.68rem] font-semibold tracking-[0.18em] text-chrome uppercase"
              >
                Işık geçirgenliği
              </label>

              <p className="num font-display mt-3 text-5xl leading-none font-extrabold text-white-w">
                {level.label}
              </p>
              <p className="mt-3 min-h-[3rem] text-[0.95rem] leading-relaxed text-silver">
                {level.desc}
              </p>

              <input
                id={sliderId}
                type="range"
                min={0}
                max={tintLevels.length - 1}
                step={1}
                value={idx}
                onChange={(e) => setIdx(Number(e.target.value))}
                aria-valuetext={`${level.label} ışık geçirgenliği — ${level.desc}`}
                className="tint-range mt-6 w-full"
              />

              <div className="mt-3 flex justify-between gap-1">
                {tintLevels.map((t, i) => (
                  <button
                    key={t.vlt}
                    type="button"
                    onClick={() => setIdx(i)}
                    aria-pressed={i === idx}
                    className={`num min-h-11 flex-1 rounded-md px-1 text-[0.8rem] font-semibold transition-colors ${
                      i === idx ? "bg-amber/12 text-amber" : "text-chrome hover:text-silver"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => {
                  setTint(level.label);
                  askFor("Oto cam filmi");
                }}
                className="btn btn-primary mt-7 w-full"
              >
                {level.label} ton için fiyat sor
                <Icon name="arrow-right" size={18} />
              </button>

              <p className="mt-5 flex items-start gap-2.5 border-t border-edge pt-5 text-[0.8rem] leading-relaxed text-chrome">
                <Icon name="alert" size={15} className="mt-0.5 flex-none" />
                Gösterim temsilîdir; ekran ve ortam ışığına göre değişir. Ön cam ve yan camlara
                uygulanacak ton, aracınıza ve yürürlükteki mevzuata göre GKM ile birlikte belirlenir.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
