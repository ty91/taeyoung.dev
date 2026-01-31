import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel/static";
import tailwindcss from "@tailwindcss/vite";
import siteConfig from "./site.config";

export default defineConfig({
  output: "static",
  site: siteConfig.siteUrl,
  adapter: vercel(),
  vite: {
    plugins: [tailwindcss()],
  },
});
