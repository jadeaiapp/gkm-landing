import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

type QuoteStore = {
  /** Formda seçili hizmetin etiketi. */
  service: string;
  setService: (v: string) => void;
  /** Ton seçiciden gelen değer, örn. "%20". Boşsa mesaja eklenmez. */
  tint: string;
  setTint: (v: string) => void;
  /** Hizmeti seçip forma kaydırır — hizmet kartlarındaki "Fiyat sor" için. */
  askFor: (service: string) => void;
};

const Ctx = createContext<QuoteStore | null>(null);

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [service, setService] = useState("");
  const [tint, setTint] = useState("");

  const askFor = useCallback((next: string) => {
    setService(next);
    const el = document.getElementById("fiyat-al");
    if (!el) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    // Kaydırma bittikten sonra ilk alana odaklan (klavye kullanıcısı için).
    window.setTimeout(
      () => document.getElementById("marka")?.focus({ preventScroll: true }),
      reduced ? 0 : 700,
    );
  }, []);

  const value = useMemo(
    () => ({ service, setService, tint, setTint, askFor }),
    [service, tint, askFor],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useQuote(): QuoteStore {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useQuote, QuoteProvider içinde kullanılmalı");
  return ctx;
}
