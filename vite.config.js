import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import sitemap from 'vite-plugin-sitemap'
import seoPages from './src/data/seo-pages.json'

// Haal alle dynamische slugs uit het JSON bestand
const dynamicRoutes = seoPages.map(page => `/${page.slug}`);

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    sitemap({
      hostname: 'https://www.vollegym.nl',
      dynamicRoutes: dynamicRoutes,
      // We behouden ook de statische routes
      outDir: 'dist'
    })
  ],
})
