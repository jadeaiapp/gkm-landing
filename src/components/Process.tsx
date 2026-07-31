import { steps } from "../content/site";
import Reveal from "./Reveal";

/** Süreç — burada numaralar gerçekten sıra bildirir, o yüzden numaralandı. */
export default function Process({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <Reveal>
        <p className="rule-label">Nasıl işliyor</p>
      </Reveal>

      <ol className="mt-7">
        {steps.map((s, i) => (
          <Reveal as="li" key={s.n} delay={i}>
            {/* last: değiştiricisi bu <div> için her zaman doğru olurdu — index ile kontrol. */}
            <div className={`relative flex gap-5 ${i < steps.length - 1 ? "pb-9" : ""}`}>
              {/* dikey bağ çizgisi */}
              {i < steps.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute top-11 bottom-1 left-[1.09rem] w-px bg-gradient-to-b from-edge-hi to-edge"
                />
              )}

              <span className="num font-display relative z-[2] grid h-9 w-9 flex-none place-items-center rounded-full border border-edge bg-steel text-[0.78rem] font-bold text-amber">
                {s.n}
              </span>

              <div className="pt-1">
                <h3 className="text-[1.0625rem] leading-snug font-semibold text-white-w">
                  {s.title}
                </h3>
                <p className="mt-1.5 max-w-[46ch] text-[0.9rem] leading-relaxed text-chrome">
                  {s.body}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}
