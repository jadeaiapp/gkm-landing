import { business } from "../content/site";
import { useScrolled } from "../hooks";
import { quickWhatsappUrl } from "../lib/whatsapp";
import Icon from "./Icon";

/**
 * Mobilde ekranın altındaki sabit iletişim çubuğu.
 * Sayfa gövdesine `pad-mobile-bar` payı verildiği için içeriği örtmez.
 * Hero'daki ana CTA görünürken gizli kalır ki iki CTA üst üste binmesin.
 */
export default function MobileBar() {
  const show = useScrolled(520);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-edge bg-ink/92 backdrop-blur-xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="flex items-stretch gap-2 px-3 py-2.5">
        <a
          href={`tel:${business.phoneHref}`}
          className="btn btn-ghost min-h-12 flex-none px-4"
          aria-label={`${business.phoneDisplay} numarasını ara`}
        >
          <Icon name="phone" size={19} />
          <span className="text-sm">Ara</span>
        </a>
        <a
          href={quickWhatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary min-h-12 flex-1 px-4 text-[0.9rem]"
        >
          <Icon name="whatsapp" size={19} />
          WhatsApp'tan Fiyat Al
        </a>
      </div>
    </div>
  );
}
