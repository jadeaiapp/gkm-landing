import { useCallback, useEffect, useRef } from "react";
import type { Shot } from "../content/gallery";
import { useBodyLock } from "../hooks";
import Icon from "./Icon";

type Props = {
  shots: Shot[];
  index: number;
  onClose: () => void;
  onIndex: (i: number) => void;
};

export default function Lightbox({ shots, index, onClose, onIndex }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const shot = shots[index];

  useBodyLock(true);

  const step = useCallback(
    (dir: 1 | -1) => onIndex((index + dir + shots.length) % shots.length),
    [index, shots.length, onIndex],
  );

  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return onClose();
      if (e.key === "ArrowRight") return step(1);
      if (e.key === "ArrowLeft") return step(-1);
      if (e.key !== "Tab") return;

      // Odak tuzağı — sekme, pencerenin dışına çıkmasın.
      const focusables = dialogRef.current?.querySelectorAll<HTMLElement>("button, [href]");
      if (!focusables?.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, step]);

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Uygulama görseli ${index + 1} / ${shots.length}: ${shot.caption}`}
      className="fixed inset-0 z-[60] flex flex-col bg-ink/94 backdrop-blur-md"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="flex items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
        <p className="num text-sm font-medium text-chrome">
          {String(index + 1).padStart(2, "0")}{" "}
          <span className="text-edge-hi">/</span> {String(shots.length).padStart(2, "0")}
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Görseli kapat"
          className="grid h-11 w-11 place-items-center rounded-lg border border-edge bg-white/[0.04] text-white-w transition-colors hover:border-edge-hi"
        >
          <Icon name="close" size={20} />
        </button>
      </div>

      <div
        className="flex min-h-0 flex-1 items-center justify-center px-3 pb-2 sm:px-6"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <figure className="flex max-h-full flex-col items-center">
          <img
            key={shot.full}
            src={shot.full}
            alt={shot.alt}
            width={1200}
            height={900}
            className="rise max-h-[68vh] w-auto rounded-lg object-contain shadow-2xl"
          />
          <figcaption className="mt-4 text-center">
            <span className="rounded border border-edge px-2 py-1 text-[0.66rem] font-semibold tracking-[0.16em] text-amber uppercase">
              {shot.tag}
            </span>
            <p className="mt-3 text-sm text-silver">{shot.caption}</p>
            <p className="mt-1 text-[0.75rem] text-chrome">Konsept görsel · telifsiz stok</p>
          </figcaption>
        </figure>
      </div>

      <div className="flex items-center justify-center gap-3 px-4 pt-1 pb-[max(1rem,env(safe-area-inset-bottom))]">
        <button
          type="button"
          onClick={() => step(-1)}
          aria-label="Önceki görsel"
          className="grid h-12 w-12 place-items-center rounded-lg border border-edge bg-white/[0.04] text-white-w transition-colors hover:border-edge-hi"
        >
          <Icon name="chevron-left" size={20} />
        </button>
        <button
          type="button"
          onClick={() => step(1)}
          aria-label="Sonraki görsel"
          className="grid h-12 w-12 place-items-center rounded-lg border border-edge bg-white/[0.04] text-white-w transition-colors hover:border-edge-hi"
        >
          <Icon name="chevron-right" size={20} />
        </button>
      </div>
    </div>
  );
}
