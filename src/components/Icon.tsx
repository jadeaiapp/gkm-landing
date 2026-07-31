/* Sitedeki tüm ikonlar — tek dosyada, SVG, currentColor.
   Emoji kullanılmıyor; ikonlar 24×24 ızgarada 1.6 kalınlıkta çizildi. */

export type IconName =
  | "window"
  | "shield"
  | "body"
  | "carbon"
  | "lamp"
  | "roof"
  | "badge"
  | "wrench"
  | "pin"
  | "chat"
  | "car"
  | "camera"
  | "whatsapp"
  | "phone"
  | "instagram"
  | "facebook"
  | "arrow-right"
  | "arrow-up-right"
  | "close"
  | "chevron-down"
  | "chevron-left"
  | "chevron-right"
  | "check"
  | "alert"
  | "star"
  | "map"
  | "clock"
  | "sun"
  | "menu"
  | "expand";

const P: Record<IconName, React.ReactNode> = {
  /* --- hizmetler ------------------------------------------------------- */
  window: (
    <>
      <path d="M3.4 13.2 6 7.4A2 2 0 0 1 7.9 6.2h8.2A2 2 0 0 1 18 7.4l2.6 5.8" />
      <path d="M3.4 13.2h17.2v3.4a1.4 1.4 0 0 1-1.4 1.4H4.8a1.4 1.4 0 0 1-1.4-1.4z" />
      <path d="M12 6.2v7" />
      <path d="M6.6 15.6h2.2M15.2 15.6h2.2" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3.2 5 6v5.6c0 4.2 2.9 7.4 7 9.2 4.1-1.8 7-5 7-9.2V6z" />
      <path d="m9 12 2.1 2.2L15.4 10" />
    </>
  ),
  body: (
    <>
      <path d="M4.2 15.6h15.6M4.2 15.6l1.4-4.6a2 2 0 0 1 1.9-1.4h9a2 2 0 0 1 1.9 1.4l1.4 4.6" />
      <path d="M4.2 15.6v2.2M19.8 15.6v2.2" />
      <path d="M8.4 9.6 9.8 5.4M14.2 5.4l1.4 4.2" />
      <circle cx="7.6" cy="15.6" r="1.5" />
      <circle cx="16.4" cy="15.6" r="1.5" />
    </>
  ),
  carbon: (
    <>
      <rect x="3.4" y="3.4" width="17.2" height="17.2" rx="2.2" />
      <path d="M3.4 9.1h17.2M3.4 14.9h17.2M9.1 3.4v17.2M14.9 3.4v17.2" />
      <path d="m3.4 3.4 5.7 5.7M14.9 14.9l5.7 5.7" />
    </>
  ),
  lamp: (
    <>
      {/* far gövdesi */}
      <path d="M3.4 8.6a1.6 1.6 0 0 1 1.6-1.6h4.2c3.4 0 6.2 2.2 6.2 5s-2.8 5-6.2 5H5a1.6 1.6 0 0 1-1.6-1.6z" />
      <path d="M6.6 9.4v5.2" />
      {/* ışık huzmeleri */}
      <path d="M18.6 9.4h3M18.6 12h3.6M18.6 14.6h3" />
    </>
  ),
  roof: (
    <>
      {/* araç silueti */}
      <path d="M3.4 17.2h17.2" />
      <path d="M4.8 17.2 6 13.4a2 2 0 0 1 1.9-1.4h8.2a2 2 0 0 1 1.9 1.4l1.2 3.8" />
      {/* panoramik cam tavan */}
      <path d="M7.4 12 8.9 7.6A1.6 1.6 0 0 1 10.4 6.5h3.2a1.6 1.6 0 0 1 1.5 1.1L16.6 12z" />
      <path d="M12 6.5V12" />
    </>
  ),

  /* --- neden GKM ------------------------------------------------------- */
  badge: (
    <>
      <path d="M12 3.2 14.4 5l2.9-.2 1 2.7 2.4 1.7-1 2.8 1 2.8-2.4 1.7-1 2.7-2.9-.2L12 20.8 9.6 19l-2.9.2-1-2.7-2.4-1.7 1-2.8-1-2.8 2.4-1.7 1-2.7L9.6 5z" />
      <path d="m9.3 12 1.9 1.9 3.5-3.9" />
    </>
  ),
  wrench: (
    <>
      <path d="M15.2 3.6a5 5 0 0 0-4.6 6.9L3.9 17.2a1.9 1.9 0 0 0 2.7 2.7l6.7-6.7a5 5 0 0 0 6.4-6.5l-2.9 2.9-2.6-.6-.6-2.6z" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21c3.9-4.4 6-7.6 6-10.2a6 6 0 1 0-12 0C6 13.4 8.1 16.6 12 21z" />
      <circle cx="12" cy="10.6" r="2.4" />
    </>
  ),
  chat: (
    <>
      <path d="M20.4 12.4c0 3.8-3.8 6.8-8.4 6.8a10 10 0 0 1-2.6-.3l-4.6 1.6 1.4-3.7a6.4 6.4 0 0 1-2.6-4.9c0-3.8 3.8-6.9 8.4-6.9s8.4 3.1 8.4 6.9z" />
      <path d="M8.6 12.2h.01M12 12.2h.01M15.4 12.2h.01" />
    </>
  ),
  car: (
    <>
      <path d="M4.6 16.4h14.8" />
      <path d="M4.6 16.4 6 11.6a2.2 2.2 0 0 1 2.1-1.6h7.8a2.2 2.2 0 0 1 2.1 1.6l1.4 4.8" />
      <path d="M4.6 16.4v2.2h2.6v-2.2M16.8 16.4v2.2h2.6v-2.2" />
      <path d="M7.4 13.6h9.2" />
    </>
  ),
  camera: (
    <>
      <rect x="3.2" y="6.6" width="17.6" height="13.2" rx="2.4" />
      <path d="M8.6 6.6 10 4.2h4l1.4 2.4" />
      <circle cx="12" cy="13.2" r="3.4" />
    </>
  ),

  /* --- iletişim / arayüz ------------------------------------------------ */
  whatsapp: (
    <path
      fill="currentColor"
      stroke="none"
      d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.86 9.86 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m0 1.67c2.2 0 4.27.86 5.82 2.42a8.19 8.19 0 0 1 2.41 5.82c0 4.54-3.7 8.24-8.24 8.24a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.18 8.18 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24M8.53 7.33c-.16 0-.42.06-.64.3-.22.24-.85.83-.85 2.02s.87 2.35.99 2.51c.12.16 1.68 2.68 4.14 3.65 2.05.81 2.47.65 2.91.61.44-.04 1.43-.58 1.63-1.15.2-.57.2-1.05.14-1.15-.06-.1-.22-.16-.46-.28-.24-.12-1.43-.71-1.65-.79-.22-.08-.38-.12-.54.12-.16.24-.62.79-.76.95-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.53-1.32-.73-1.8-.19-.47-.39-.41-.53-.42h-.46Z"
    />
  ),
  phone: (
    <path d="M6.2 3.6h3l1.5 3.8-1.9 1.4a11.6 11.6 0 0 0 5.4 5.4l1.4-1.9 3.8 1.5v3a1.8 1.8 0 0 1-2 1.8A15.6 15.6 0 0 1 4.4 5.6a1.8 1.8 0 0 1 1.8-2z" />
  ),
  instagram: (
    <>
      <rect x="3.4" y="3.4" width="17.2" height="17.2" rx="4.6" />
      <circle cx="12" cy="12" r="3.9" />
      <circle cx="17.1" cy="6.9" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  facebook: (
    <path d="M14.6 21.4v-7.9h2.7l.5-3.1h-3.2V8.3c0-.9.3-1.7 1.6-1.7h1.7V3.8a20 20 0 0 0-2.5-.2c-2.6 0-4.4 1.6-4.4 4.5v2.3H8v3.1h3v7.9z" />
  ),
  "arrow-right": <path d="M4.6 12h14.8m-5.6-5.6L19.4 12l-5.6 5.6" />,
  "arrow-up-right": <path d="M7 17 17 7M8.4 7H17v8.6" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  "chevron-down": <path d="m6.4 9.4 5.6 5.6 5.6-5.6" />,
  "chevron-left": <path d="M14.6 5.6 8.2 12l6.4 6.4" />,
  "chevron-right": <path d="m9.4 5.6 6.4 6.4-6.4 6.4" />,
  check: <path d="m5 12.6 4.6 4.6L19 6.8" />,
  alert: (
    <>
      <circle cx="12" cy="12" r="8.6" />
      <path d="M12 7.8v4.8M12 16h.01" />
    </>
  ),
  star: (
    <path
      fill="currentColor"
      stroke="none"
      d="m12 3.4 2.6 5.4 5.9.8-4.3 4.1 1 5.9-5.2-2.8-5.2 2.8 1-5.9-4.3-4.1 5.9-.8z"
    />
  ),
  map: (
    <>
      <path d="m3.6 6.6 5.4-2.2 6 2.2 5.4-2.2v13l-5.4 2.2-6-2.2-5.4 2.2z" />
      <path d="M9 4.4v13M15 6.6v13" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.6" />
      <path d="M12 7.4V12l3 1.8" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.6v2.2M12 19.2v2.2M2.6 12h2.2M19.2 12h2.2M5.4 5.4 7 7M17 17l1.6 1.6M18.6 5.4 17 7M7 17l-1.6 1.6" />
    </>
  ),
  menu: <path d="M4 7.5h16M4 12h16M4 16.5h16" />,
  expand: <path d="M9 4.6H4.6V9M15 4.6h4.4V9M9 19.4H4.6V15M15 19.4h4.4V15" />,
};

type Props = {
  name: IconName;
  size?: number;
  className?: string;
  strokeWidth?: number;
};

export default function Icon({ name, size = 22, className, strokeWidth = 1.6 }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {P[name]}
    </svg>
  );
}
