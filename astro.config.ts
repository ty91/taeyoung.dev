import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import siteConfig from "./site.config";

export default defineConfig({
  output: "static",
  site: siteConfig.siteUrl,
  vite: {
    plugins: [tailwindcss()],
  },
});
