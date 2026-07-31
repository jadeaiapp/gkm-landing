import { useState } from "react";
import { gallery } from "../content/gallery";
import { business, imageNote } from "../content/site";
import Icon from "./Icon";
import Lightbox from "./Lightbox";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

export default function Gallery() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="uygulamalar" className="band border-t border-edge bg-ink-2">
      <div className="shell">
        <SectionHead
          label="Uygulamalar"
          title={
            <>
              İşin nasıl yapıldığı, <span className="text-amber">sonucu kadar önemli</span>
            </>
          }
          lead={
            <>
              Aşağıdaki kareler cam filmi, şeffaf koruma ve folyo kaplama uygulamalarının nasıl
              yürüdüğünü gösterir. GKM'nin kendi işlerini{" "}
              <a
                href={business.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline font-medium text-amber"
              >
                Instagram hesabından
              </a>{" "}
              inceleyebilirsiniz.
            </>
          }
        />

        {/* Sabit satır yüksekliği: geniş ve normal kartlar aynı hizada biter. */}
        <ul className="mt-14 grid auto-rows-[11rem] grid-cols-2 gap-3 sm:auto-rows-[14rem] sm:gap-4 lg:auto-rows-[15rem] lg:grid-cols-4">
          {gallery.map((shot, i) => (
            <Reveal
              as="li"
              key={shot.full}
              delay={i % 4}
              className={shot.wide ? "col-span-2" : ""}
            >
              <button
                type="button"
                onClick={() => setOpen(i)}
                className="group sweep relative block h-full w-full overflow-hidden rounded-xl border border-edge bg-graphite text-left transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-edge-hi"
              >
                <img
                  src={shot.thumb}
                  width={640}
                  height={480}
                  loading="lazy"
                  decoding="async"
                  alt={shot.alt}
                  className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                />

                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent opacity-80"
                />

                <span className="absolute inset-x-0 bottom-0 z-[2] flex items-end justify-between gap-2 p-3.5 sm:p-4">
                  <span>
                    <span className="block text-[0.62rem] font-semibold tracking-[0.16em] text-amber uppercase">
                      {shot.tag}
                    </span>
                    <span className="mt-1 block text-[0.82rem] leading-snug font-medium text-white-w sm:text-sm">
                      {shot.caption}
                    </span>
                  </span>
                  <span className="grid h-8 w-8 flex-none place-items-center rounded-md border border-white/12 bg-ink/70 text-white-w opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                    <Icon name="expand" size={15} />
                  </span>
                </span>

                <span className="sr-only">Büyüt</span>
              </button>
            </Reveal>
          ))}
        </ul>

        <Reveal>
          <p className="mt-8 flex items-start gap-2.5 text-sm text-chrome">
            <Icon name="camera" size={16} className="mt-0.5 flex-none" />
            {imageNote}
          </p>
        </Reveal>
      </div>

      {open !== null && (
        <Lightbox
          shots={gallery}
          index={open}
          onIndex={setOpen}
          onClose={() => setOpen(null)}
        />
      )}
    </section>
  );
}
