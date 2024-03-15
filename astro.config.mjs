import markdoc from "@astrojs/markdoc";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import keystatic from "@keystatic/astro";
import compress from "astro-compress";
import { defineConfig } from "astro/config";
import { VitePWA } from "vite-plugin-pwa";
import { manifest } from "./src/utils/manifest";
import { config } from "/src/settings";

import metaTags from "astro-meta-tags";

// https://astro.build/config
export default defineConfig({
  site: `${config.site.base.url}`,
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "viewport"
  },
  integrations: [keystatic(), sitemap({
    filter: page => page !== `${config.site.base.url}/keystatic`
  }), tailwind({
    applyBaseStyles: false
  }), compress(), mdx(), react(), markdoc(), metaTags()],
  vite: {
    plugins: [VitePWA({
      registerType: "autoUpdate",
      manifest,
      workbox: {
        globDirectory: "dist",
        globPatterns: ["**/*.{js,css,svg,png,jpg,jpeg,gif,webp,woff,woff2,ttf,eot,ico}"],
        navigateFallback: null
      }
    })]
  },
  output: "hybrid"
});