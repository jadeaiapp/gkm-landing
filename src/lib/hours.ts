import { business } from "../content/site";

export type OpenState = {
  open: boolean;
  /** Kısa açıklama: "20.00'ye kadar açık" / "Yarın 09.00'da açılıyor" */
  detail: string;
};

const DAYS = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

const pretty = (hhmm: string) => hhmm.replace(":", ".");

/**
 * İşletmenin şu anda açık olup olmadığını, ziyaretçinin saat diliminden
 * bağımsız olarak İstanbul saatine göre hesaplar.
 *
 * Yalnızca Google'da yayınlanan haftalık saatleri baz alır; resmî tatiller
 * hesaba katılmaz — bu yüzden arayüzde "yayınlanan saatlere göre" notu var.
 */
export function getOpenState(now = new Date()): OpenState {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Istanbul",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(now);

  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const dayIndex = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  // 24:00 bazı ortamlarda gece yarısı için dönebiliyor.
  const minutes = (Number(get("hour")) % 24) * 60 + Number(get("minute"));

  const today = business.hours.schedule.find((s) => s.day === dayIndex);

  if (today) {
    const open = toMinutes(today.open);
    const close = toMinutes(today.close);

    if (minutes >= open && minutes < close) {
      return { open: true, detail: `${pretty(today.close)}'ye kadar açık` };
    }
    if (minutes < open) {
      return { open: false, detail: `Bugün ${pretty(today.open)}'da açılıyor` };
    }
  }

  // Kapalı — sıradaki açık günü bul.
  for (let i = 1; i <= 7; i++) {
    const next = business.hours.schedule.find((s) => s.day === (dayIndex + i) % 7);
    if (!next) continue;
    const label = i === 1 ? "Yarın" : DAYS[next.day];
    return { open: false, detail: `${label} ${pretty(next.open)}'da açılıyor` };
  }

  return { open: false, detail: "Çalışma saatleri dışında" };
}
