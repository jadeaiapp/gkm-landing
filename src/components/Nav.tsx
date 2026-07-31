import { useEffect, useState } from "react";
import { business, nav } from "../content/site";
import { useActiveSection, useBodyLock, useScrolled } from "../hooks";
import Icon from "./Icon";

const SECTION_IDS = nav.map((n) => n.href);

export default function Nav() {
  const scrolled = useScrolled(28);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);

  useBodyLock(open);

  // Esc menüyü kapatsın; masaüstüne geçişte açık kalmasın.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const mq = matchMedia("(min-width: 1024px)");
    const onResize = () => mq.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onResize);
    };
  }, [open]);

  return (
    <>
      <a
        href="#fiyat-al"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[70] focus:rounded-lg focus:bg-amber focus:px-4 focus:py-2.5 focus:font-semibold focus:text-ink"
      >
        Fiyat formuna geç
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
          scrolled || open
            ? "border-b border-edge bg-ink/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="shell flex items-center justify-between gap-4 py-3.5 lg:py-4">
          <a
            href="#top"
            className="group flex items-baseline gap-2.5 py-3"
            aria-label={`${business.name} — sayfa başı`}
          >
            <span className="font-display text-[1.35rem] leading-none font-extrabold tracking-[0.18em] text-white-w">
              GKM
            </span>
            <span className="hidden text-[0.6rem] leading-none font-semibold tracking-[0.22em] text-chrome uppercase sm:block">
              Cam Filmi · Kaplama
            </span>
          </a>

          <nav aria-label="Ana menü" className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                aria-current={active === item.href ? "true" : undefined}
                className={`rounded-lg px-3 py-3 text-sm font-medium transition-colors ${
                  active === item.href
                    ? "text-amber"
                    : "text-silver hover:text-white-w"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a href="#fiyat-al" className="btn btn-primary hidden min-h-11 px-5 text-sm sm:inline-flex">
              Fiyat Al
              <Icon name="arrow-right" size={17} />
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobil-menu"
              aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
              className="grid h-11 w-11 place-items-center rounded-lg border border-edge bg-white/[0.03] text-white-w transition-colors hover:border-edge-hi lg:hidden"
            >
              <Icon name={open ? "close" : "menu"} size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobil menü */}
      <div
        id="mobil-menu"
        hidden={!open}
        className="fixed inset-0 z-40 lg:hidden"
        onClick={(e) => {
          if (e.target === e.currentTarget) setOpen(false);
        }}
      >
        <div className="absolute inset-0 bg-ink/70 backdrop-blur-sm" />
        <nav
          aria-label="Mobil menü"
          className="relative mt-[4.25rem] border-b border-edge bg-graphite px-5 pt-3 pb-6 shadow-2xl"
        >
          <ul className="divide-y divide-edge">
            {nav.map((item, i) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rise flex items-center justify-between py-3.5 text-base font-medium text-white-w"
                  style={{ "--i": i } as React.CSSProperties}
                >
                  {item.label}
                  <Icon name="chevron-right" size={17} className="text-chrome" />
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#fiyat-al"
            onClick={() => setOpen(false)}
            className="btn btn-primary mt-5 w-full"
          >
            Aracıma Özel Fiyat Al
            <Icon name="arrow-right" size={18} />
          </a>

          <a
            href={`tel:${business.phoneHref}`}
            className="btn btn-ghost mt-2.5 w-full"
            onClick={() => setOpen(false)}
          >
            <Icon name="phone" size={18} />
            {business.phoneDisplay}
          </a>
        </nav>
      </div>
    </>
  );
}
