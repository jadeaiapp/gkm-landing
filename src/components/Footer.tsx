import { business, disclaimer, imageNote, nav } from "../content/site";
import Icon from "./Icon";

export default function Footer() {
  return (
    <footer className="pad-mobile-bar border-t border-edge bg-ink">
      <div className="shell py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* -------------------------------------------------- Kimlik */}
          <div className="lg:col-span-5">
            <p className="font-display text-2xl leading-none font-extrabold tracking-[0.16em] text-white-w">
              GKM
            </p>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-chrome">
              {business.name}
              <br />
              {business.tagline}
            </p>

            <div className="mt-6 flex gap-2.5">
              <a
                href={business.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram'da GKM"
                className="grid h-11 w-11 place-items-center rounded-lg border border-edge bg-white/[0.03] text-silver transition-colors hover:border-edge-hi hover:text-amber"
              >
                <Icon name="instagram" size={19} />
              </a>
              <a
                href={business.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook'ta GKM"
                className="grid h-11 w-11 place-items-center rounded-lg border border-edge bg-white/[0.03] text-silver transition-colors hover:border-edge-hi hover:text-amber"
              >
                <Icon name="facebook" size={19} />
              </a>
              <a
                href={business.maps}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Google Haritalar'da konum"
                className="grid h-11 w-11 place-items-center rounded-lg border border-edge bg-white/[0.03] text-silver transition-colors hover:border-edge-hi hover:text-amber"
              >
                <Icon name="map" size={19} />
              </a>
            </div>
          </div>

          {/* ------------------------------------------------- Bağlantı */}
          <nav aria-label="Alt menü" className="lg:col-span-3">
            <p className="text-[0.66rem] font-semibold tracking-[0.18em] text-chrome uppercase">
              Sayfa
            </p>
            <ul className="mt-4 space-y-2.5">
              {nav.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="link-underline text-[0.95rem] text-silver hover:text-white-w"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#fiyat-al"
                  className="link-underline text-[0.95rem] font-semibold text-amber"
                >
                  Aracıma özel fiyat al
                </a>
              </li>
            </ul>
          </nav>

          {/* -------------------------------------------------- İletişim */}
          <div className="lg:col-span-4">
            <p className="text-[0.66rem] font-semibold tracking-[0.18em] text-chrome uppercase">
              İletişim
            </p>
            <address className="mt-4 space-y-3 text-[0.95rem] not-italic">
              <a
                href={business.maps}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2.5 text-silver hover:text-white-w"
              >
                <Icon name="pin" size={17} className="mt-0.5 flex-none text-chrome" />
                <span>
                  {business.address.line1}
                  <br />
                  {business.address.line2}
                </span>
              </a>
              <a
                href={`tel:${business.phoneHref}`}
                className="num flex items-center gap-2.5 text-silver hover:text-white-w"
              >
                <Icon name="phone" size={17} className="flex-none text-chrome" />
                {business.phoneDisplay}
              </a>
            </address>
          </div>
        </div>

        {/* ------------------------------------------------------- Notlar */}
        <div className="mt-12 border-t border-edge pt-7">
          <p className="flex items-start gap-2.5 text-[0.82rem] leading-relaxed text-silver">
            <Icon name="alert" size={15} className="mt-0.5 flex-none text-amber" />
            {disclaimer}
          </p>
          <p className="mt-2.5 flex items-start gap-2.5 text-[0.82rem] leading-relaxed text-chrome">
            <Icon name="camera" size={15} className="mt-0.5 flex-none" />
            {imageNote}
          </p>
          <p className="mt-6 text-[0.78rem] text-chrome">
            © {new Date().getFullYear()} — Konsept çalışma. Tüm marka adları ilgili sahiplerine
            aittir.
          </p>
        </div>
      </div>
    </footer>
  );
}
