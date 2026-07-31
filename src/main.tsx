import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/index.css";

/**
 * Canonical adres, sayfanın yayınlandığı gerçek adresten türetilir.
 * Böylece hem GitHub Pages alt dizininde hem özel alan adında doğru çalışır;
 * derleme sırasında adres bilmeye gerek kalmaz.
 */
const canonical = document.createElement("link");
canonical.rel = "canonical";
canonical.href = location.origin + location.pathname;
document.head.appendChild(canonical);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
