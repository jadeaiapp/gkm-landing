import { business } from "../content/site";

export type QuoteInput = {
  brand: string;
  model: string;
  year: string;
  service: string;
  phone: string;
  note?: string;
  tint?: string;
};

/** Form verisinden okunabilir bir WhatsApp mesajı üretir. */
export function buildQuoteMessage(v: QuoteInput): string {
  const parts = [
    `Merhaba ${business.shortName}, ${v.year} model ${v.brand} ${v.model} aracım için ` +
      `${v.service.toLocaleLowerCase("tr-TR")} hakkında fiyat ve bilgi almak istiyorum.`,
    `Telefon: ${v.phone}`,
  ];

  if (v.tint) parts.push(`Düşündüğüm ton: ${v.tint}`);
  if (v.note?.trim()) parts.push(`Not: ${v.note.trim()}`);

  return parts.join("\n");
}

/** wa.me bağlantısı. Numara tek merkezden — content/site.ts → business.whatsapp */
export function whatsappUrl(message: string): string {
  return `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`;
}

/** Formu doldurmadan yazılan kısa mesajlar için. */
export function quickWhatsappUrl(context?: string): string {
  const base = `Merhaba ${business.shortName}, aracım için fiyat ve bilgi almak istiyorum.`;
  return whatsappUrl(context ? `${base}\nİlgilendiğim hizmet: ${context}` : base);
}
