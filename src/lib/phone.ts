/** Türkiye cep telefonu numaraları için basit biçimlendirme ve doğrulama. */

/** Kullanıcı yazarken numarayı "0532 123 45 67" biçimine getirir. */
export function formatPhone(raw: string): string {
  let d = raw.replace(/\D/g, "");
  if (d.startsWith("90")) d = d.slice(2);
  if (!d.startsWith("0")) d = `0${d}`;
  d = d.slice(0, 11);

  const [, a, b, c, e] = /^(\d{0,4})(\d{0,3})(\d{0,2})(\d{0,2})$/.exec(d) ?? [];
  return [a, b, c, e].filter(Boolean).join(" ");
}

/** Geçerli bir Türkiye cep numarası mı? (0 5XX XXX XX XX) */
export function isValidPhone(raw: string): boolean {
  const d = raw.replace(/\D/g, "");
  return /^05\d{9}$/.test(d);
}
