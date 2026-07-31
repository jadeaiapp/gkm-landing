import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  /**
   * Göreli temel yol.
   *
   * GitHub Pages projeyi `https://<kullanici>.github.io/<repo>/` altında
   * yayınlar. `"./"` sayesinde tüm JS/CSS/görsel yolları göreli üretilir ve
   * hem alt dizinde hem kök alan adında hem de `file://` ile açıldığında
   * çalışır. Ayrıca tek sayfa olduğu ve router kullanılmadığı için sayfa
   * yenilendiğinde 404 route hatası oluşmaz.
   */
  base: "./",
  plugins: [react(), tailwindcss()],
  build: {
    target: "es2020",
    cssMinify: "lightningcss",
    assetsInlineLimit: 2048,
    reportCompressedSize: true,
  },
});
