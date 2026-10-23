import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

/**
 * Despliegue en GitHub Pages: el sitio se sirve en https://<usuario>.github.io/<repositorio>/.
 * `site` se usa para URLs absolutas (sitemap, Open Graph, canónica) y `base` para las rutas internas.
 */
const SITE = 'https://jairojimenez01.github.io';
const BASE = '/Portfolio';

/** Subconjuntos de caracteres necesarios para español y catalán (acentos, ñ, ç, l·l). */
const SUBSETS: [string, ...string[]] = ['latin', 'latin-ext'];

export default defineConfig({
  site: SITE,
  base: BASE,
  integrations: [sitemap()],
  // Las fuentes se descargan en el build y se sirven desde el propio dominio:
  // ningún visitante hace peticiones a Google Fonts.
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Sora',
      cssVariable: '--font-sora',
      weights: [600, 800],
      styles: ['normal'],
      subsets: SUBSETS,
      fallbacks: ['Segoe UI', 'system-ui', 'sans-serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'DM Sans',
      cssVariable: '--font-dm-sans',
      weights: [400, 500, 700],
      styles: ['normal'],
      subsets: SUBSETS,
      fallbacks: ['Segoe UI', 'system-ui', 'sans-serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'IBM Plex Mono',
      cssVariable: '--font-plex-mono',
      weights: [400, 500],
      styles: ['normal'],
      subsets: SUBSETS,
      fallbacks: ['ui-monospace', 'Cascadia Mono', 'Consolas', 'monospace'],
    },
  ],
});
