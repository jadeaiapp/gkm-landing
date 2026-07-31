import { useEffect, useRef, useState, type FormEvent } from "react";
import { business, services } from "../content/site";
import { formatPhone, isValidPhone } from "../lib/phone";
import { useQuote } from "../lib/quote-store";
import { buildQuoteMessage, whatsappUrl } from "../lib/whatsapp";
import Icon from "./Icon";

const YEARS = Array.from({ length: 33 }, (_, i) => String(new Date().getFullYear() + 1 - i));

const BRANDS = [
  "Audi", "BMW", "Citroën", "Dacia", "Fiat", "Ford", "Honda", "Hyundai", "Jeep",
  "Kia", "Mercedes-Benz", "MG", "Nissan", "Opel", "Peugeot", "Renault", "Seat",
  "Škoda", "Tesla", "Togg", "Toyota", "Volkswagen", "Volvo",
];

type Fields = "brand" | "model" | "year" | "service" | "phone";
type Errors = Partial<Record<Fields, string>>;

export default function QuoteForm({ className = "" }: { className?: string }) {
  const { service, setService, tint, setTint } = useQuote();

  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");

  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<Fields, boolean>>>({});
  const [sent, setSent] = useState<string | null>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  // Hizmet kartından veya ton seçiciden gelen seçim hatayı temizlesin.
  useEffect(() => {
    if (service) setErrors((e) => ({ ...e, service: undefined }));
  }, [service]);

  const validate = (): Errors => {
    const e: Errors = {};
    if (!brand.trim()) e.brand = "Aracınızın markasını yazın.";
    if (!model.trim()) e.model = "Aracınızın modelini yazın.";
    if (!year) e.year = "Model yılını seçin.";
    if (!service) e.service = "Hangi hizmeti istediğinizi seçin.";
    if (!phone.trim()) e.phone = "Size dönebilmemiz için telefon numaranızı yazın.";
    else if (!isValidPhone(phone)) e.phone = "Numara 0 ile başlayan 11 haneli bir cep numarası olmalı.";
    return e;
  };

  /** Alandan çıkınca tek tek doğrula — hata en yakın yerde görünsün. */
  const blur = (f: Fields) => {
    setTouched((t) => ({ ...t, [f]: true }));
    setErrors((prev) => ({ ...prev, [f]: validate()[f] }));
  };

  const onSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    const found = validate();
    setErrors(found);
    setTouched({ brand: true, model: true, year: true, service: true, phone: true });

    const first = (Object.keys(found) as Fields[])[0];
    if (first) {
      document.getElementById(FIELD_ID[first])?.focus();
      return;
    }

    const url = whatsappUrl(
      buildQuoteMessage({ brand, model, year, service, phone, note, tint }),
    );
    setSent(url);
    window.open(url, "_blank", "noopener,noreferrer");
    window.setTimeout(() => statusRef.current?.focus(), 60);
  };

  const reset = () => {
    setSent(null);
    setBrand("");
    setModel("");
    setYear("");
    setPhone("");
    setNote("");
    setService("");
    setTint("");
    setErrors({});
    setTouched({});
  };

  const err = (f: Fields) => (touched[f] ? errors[f] : undefined);

  /* ----------------------------------------------------- Gönderildi ekranı */
  if (sent) {
    return (
      <div className={className}>
        <div
          ref={statusRef}
          tabIndex={-1}
          role="status"
          className="surface flex h-full flex-col items-start justify-center p-7 outline-none lg:p-9"
        >
          <span className="grid h-12 w-12 place-items-center rounded-full border border-wa/30 bg-wa/10 text-wa">
            <Icon name="check" size={24} />
          </span>

          <h3 className="display-md mt-5">WhatsApp'a yönlendirildiniz</h3>
          <p className="mt-3 max-w-[46ch] text-[0.95rem] leading-relaxed text-silver">
            Mesajınız hazır olarak açıldı. Yeni sekme açılmadıysa aşağıdaki butondan devam
            edebilirsiniz — bilgileriniz mesajın içine yazılmış durumda.
          </p>

          <div className="mt-7 flex w-full flex-col gap-3 sm:flex-row">
            <a
              href={sent}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-wa flex-1"
            >
              <Icon name="whatsapp" size={19} />
              WhatsApp'ta aç
            </a>
            <button type="button" onClick={reset} className="btn btn-ghost flex-1">
              Yeni talep oluştur
            </button>
          </div>

          <p className="mt-6 flex items-start gap-2.5 border-t border-edge pt-5 text-[0.8rem] leading-relaxed text-chrome">
            <Icon name="phone" size={15} className="mt-0.5 flex-none" />
            Yazmak yerine konuşmayı tercih ederseniz:{" "}
            <a
              href={`tel:${business.phoneHref}`}
              className="link-underline font-medium text-amber"
            >
              {business.phoneDisplay}
            </a>
          </p>
        </div>
      </div>
    );
  }

  /* ------------------------------------------------------------------ Form */
  return (
    <div className={className}>
      <form
        noValidate
        onSubmit={onSubmit}
        className="surface p-6 sm:p-7 lg:p-8"
        aria-labelledby="form-basligi"
      >
        <h3 id="form-basligi" className="display-md">
          Aracınıza özel fiyat
        </h3>
        <p className="mt-2.5 text-[0.9rem] leading-relaxed text-chrome">
          Altı alan, bir dakika. Gönder'e bastığınızda bilgileriniz hazır bir WhatsApp mesajına
          dönüşür.
        </p>

        <div className="mt-7 grid gap-4 sm:grid-cols-2">
          <Field
            id="marka"
            label="Araç markası"
            error={err("brand")}
            required
          >
            <input
              id="marka"
              name="marka"
              list="marka-listesi"
              className="field"
              autoComplete="off"
              placeholder="Örn. Renault"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              onBlur={() => blur("brand")}
              aria-invalid={Boolean(err("brand"))}
              aria-describedby={err("brand") ? "marka-hata" : undefined}
              required
            />
            <datalist id="marka-listesi">
              {BRANDS.map((b) => (
                <option key={b} value={b} />
              ))}
            </datalist>
          </Field>

          <Field id="model" label="Araç modeli" error={err("model")} required>
            <input
              id="model"
              name="model"
              className="field"
              autoComplete="off"
              placeholder="Örn. Clio"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              onBlur={() => blur("model")}
              aria-invalid={Boolean(err("model"))}
              aria-describedby={err("model") ? "model-hata" : undefined}
              required
            />
          </Field>

          <Field id="yil" label="Model yılı" error={err("year")} required>
            <select
              id="yil"
              name="yil"
              className="field"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              onBlur={() => blur("year")}
              aria-invalid={Boolean(err("year"))}
              aria-describedby={err("year") ? "yil-hata" : undefined}
              required
            >
              <option value="">Seçin</option>
              {YEARS.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </Field>

          <Field id="hizmet" label="İstenen hizmet" error={err("service")} required>
            <select
              id="hizmet"
              name="hizmet"
              className="field"
              value={service}
              onChange={(e) => setService(e.target.value)}
              onBlur={() => blur("service")}
              aria-invalid={Boolean(err("service"))}
              aria-describedby={err("service") ? "hizmet-hata" : undefined}
              required
            >
              <option value="">Seçin</option>
              {services.map((s) => (
                <option key={s.id} value={s.label}>
                  {s.title}
                </option>
              ))}
              <option value="Birden fazla / emin değilim">Birden fazla / emin değilim</option>
            </select>
          </Field>

          <Field
            id="telefon"
            label="Telefon numaranız"
            error={err("phone")}
            required
            className="sm:col-span-2"
          >
            <input
              id="telefon"
              name="telefon"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              className="field"
              placeholder="0532 123 45 67"
              value={phone}
              onChange={(e) => setPhone(formatPhone(e.target.value))}
              onBlur={() => blur("phone")}
              aria-invalid={Boolean(err("phone"))}
              aria-describedby={err("phone") ? "telefon-hata" : "telefon-yardim"}
              required
            />
            {!err("phone") && (
              <p id="telefon-yardim" className="mt-1.5 text-[0.78rem] text-chrome">
                GKM size bu numaradan dönüş yapar.
              </p>
            )}
          </Field>

          <Field id="not" label="Ek not" optional className="sm:col-span-2">
            <textarea
              id="not"
              name="not"
              rows={3}
              className="field resize-y"
              placeholder="Örn. sadece yan camlar, ya da kaput + far bölgesi"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              maxLength={400}
            />
          </Field>
        </div>

        {tint && (
          <p className="mt-4 flex items-center gap-2.5 rounded-lg border border-amber/22 bg-amber/8 px-3.5 py-2.5 text-[0.85rem] text-silver">
            <Icon name="sun" size={16} className="flex-none text-amber" />
            Ton seçicide <strong className="font-semibold text-white-w">{tint}</strong> seçtiniz —
            mesaja eklenecek.
            <button
              type="button"
              onClick={() => setTint("")}
              className="ml-auto flex-none rounded p-1 text-chrome hover:text-white-w"
              aria-label="Ton seçimini kaldır"
            >
              <Icon name="close" size={14} />
            </button>
          </p>
        )}

        <button type="submit" className="btn btn-primary mt-6 w-full">
          <Icon name="whatsapp" size={19} />
          WhatsApp'tan Fiyat İste
        </button>

        <p className="mt-5 flex items-start gap-2.5 border-t border-edge pt-5 text-[0.78rem] leading-relaxed text-chrome">
          <Icon name="shield" size={15} className="mt-0.5 flex-none" />
          Form hiçbir sunucuya veri göndermez. Yazdıklarınız yalnızca tarayıcınızda bir WhatsApp
          mesajına dönüştürülür.
        </p>
      </form>
    </div>
  );
}

/* -------------------------------------------------------------- Alan sarmalayıcı */

const FIELD_ID: Record<Fields, string> = {
  brand: "marka",
  model: "model",
  year: "yil",
  service: "hizmet",
  phone: "telefon",
};

function Field({
  id,
  label,
  error,
  required,
  optional,
  className = "",
  children,
}: {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  optional?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="field-label">
        {label}
        {required && (
          <span className="ml-1 text-amber" aria-hidden="true">
            *
          </span>
        )}
        {optional && <span className="ml-1.5 font-normal text-chrome">(isteğe bağlı)</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-hata`} className="field-error" role="alert">
          <Icon name="alert" size={14} className="flex-none" />
          {error}
        </p>
      )}
    </div>
  );
}
