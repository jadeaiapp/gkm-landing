import type { ReactNode } from "react";
import Reveal from "./Reveal";

type Props = {
  /** Ölçü cetveli etiketi — bölümün ne olduğunu tek kelimeyle söyler. */
  label: string;
  title: ReactNode;
  lead?: ReactNode;
  /** Başlık ve açıklamayı yan yana kur (geniş ekranda). */
  split?: boolean;
};

export default function SectionHead({ label, title, lead, split = true }: Props) {
  return (
    <header className={split ? "grid gap-7 lg:grid-cols-12 lg:gap-10" : ""}>
      <div className={split ? "lg:col-span-7" : ""}>
        <Reveal>
          <p className="rule-label">{label}</p>
        </Reveal>
        <Reveal delay={1}>
          <h2 className="display-lg mt-5 max-w-[19ch]">{title}</h2>
        </Reveal>
      </div>

      {lead && (
        <Reveal delay={2} className={split ? "lg:col-span-5 lg:self-end" : "mt-5"}>
          <p className="lede max-w-[46ch]">{lead}</p>
        </Reveal>
      )}
    </header>
  );
}
