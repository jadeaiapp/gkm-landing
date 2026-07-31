import { demoMode } from "../content/site";

/**
 * Sayfanın en üstündeki konsept bilgilendirme şeridi.
 *
 * Kapatılamaz. Sayfa kaydırıldığında şerit daralır ve yerini navigasyondaki
 * küçük "Konsept" rozetine bırakır (bkz. Nav.tsx) — böylece uyarı hiçbir zaman
 * tamamen kaybolmaz, ama sabit başlık gereksiz yer kaplamaz.
 *
 * Resmî yayına geçerken: content/site.ts → demoMode.enabled = false
 */
export default function ConceptBar({ collapsed }: { collapsed: boolean }) {
  if (!demoMode.enabled) return null;

  return (
    <div
      // grid-rows 1fr→0fr, içerik yüksekliği bilinmeden yumuşak daralma sağlar
      className={`grid overflow-hidden border-b transition-[grid-template-rows,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        collapsed ? "grid-rows-[0fr] border-transparent" : "grid-rows-[1fr] border-amber/20"
      }`}
      style={{ backgroundColor: "#17120a" }}
    >
      <div className="min-h-0">
        {/* Nokta satır içinde duruyor; metin iki satıra düştüğünde ondan kopmuyor. */}
        <p className="shell py-2 text-center text-[0.66rem] leading-snug font-medium tracking-[0.04em] text-balance text-silver sm:text-[0.72rem] sm:tracking-[0.06em]">
          <span
            aria-hidden="true"
            className="mr-2 inline-block h-1.5 w-1.5 translate-y-[-1px] rounded-full bg-amber align-middle shadow-[0_0_8px_2px_rgba(232,163,61,0.35)]"
          />
          Bağımsız konsept çalışma —{" "}
          <strong className="font-semibold text-amber">GKM'nin resmî web sitesi değildir.</strong>
        </p>
      </div>
    </div>
  );
}
