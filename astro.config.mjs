import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://rostyslav-kozyk-personal-website.rostyk-niko3000.workers.dev/",

  integrations: [mdx(), sitemap()],

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  markdown: {
    shikiConfig: {
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
    },
  },
});