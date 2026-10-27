/**
 * Genera las imágenes de previsualización de enlaces (Open Graph), 1200×630, una por idioma,
 * en public/og/<idioma>.png. Toma nombre, puesto y descripción de src/content/profile/main.json
 * y las renderiza con Chromium.
 *
 *   npm run og
 */
import { mkdir, readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { chromium } from '@playwright/test';
// Node 24 importa TypeScript sin compilar: idiomas, dirección y traducciones tienen una sola fuente.
import { LOCALES } from '../src/config/locales.ts';
import { BASE_PATH, SITE_URL } from '../src/config/site.ts';
import { localize } from '../src/lib/localize.ts';
import { ogImagePath } from '../src/lib/urls.ts';

const PROFILE = resolve('src/content/profile/main.json');
/** Dirección tal y como se lee en la imagen: dominio y, si la hay, ruta base sin barra final. */
const SITE_LABEL = new URL(SITE_URL).host + BASE_PATH.replace(/\/$/, '');

const rawProfile = JSON.parse(await readFile(PROFILE, 'utf8'));
const escape = (text) => text.replace(/[&<>"']/g, (char) => `&#${char.charCodeAt(0)};`);

const render = (profile, locale) => `<!doctype html>
<html lang="${locale}">
<head>
<meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Sora:wght@800&family=DM+Sans:wght@500&family=IBM+Plex+Mono&display=swap">
<style>
  body { margin: 0; width: 1200px; height: 630px; background: #121016; color: #f4f2f7; font-family: 'DM Sans', sans-serif; position: relative; overflow: hidden; }
  .glow { position: absolute; inset: 0; background: radial-gradient(700px 400px at 20% 0%, rgba(91,61,245,.5), transparent 60%); }
  .dots { position: absolute; inset: 0; background-image: radial-gradient(circle, rgba(244,242,247,.12) 1.4px, transparent 2px); background-size: 28px 28px; }
  .content { position: relative; padding: 72px 96px; display: flex; flex-direction: column; height: 100%; box-sizing: border-box; }
  .eyebrow { font-family: 'IBM Plex Mono', monospace; font-size: 24px; letter-spacing: .14em; text-transform: uppercase; color: #b7a8ff; }
  .name { font-family: 'Sora', sans-serif; font-size: 100px; font-weight: 800; line-height: 1.05; letter-spacing: -.04em; text-transform: uppercase; margin-top: 24px; }
  .description { font-size: 30px; font-weight: 500; color: #a9a4b5; max-width: 820px; margin-top: 32px; line-height: 1.4; }
  .site { margin-top: auto; font-family: 'IBM Plex Mono', monospace; font-size: 22px; color: #a9a4b5; }
</style>
</head>
<body>
  <div class="glow"></div>
  <div class="dots"></div>
  <div class="content">
    <div class="eyebrow">${escape([profile.role, ...profile.keywords].join(' · '))}</div>
    <div class="name">${escape(profile.name)}</div>
    <div class="description">${escape(profile.seo.description)}</div>
    <div class="site">${escape(SITE_LABEL)}</div>
  </div>
</body>
</html>`;

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1200, height: 630 },
  deviceScaleFactor: 1,
});
for (const locale of LOCALES) {
  const output = resolve('public', ogImagePath(locale).replace(/^\//, ''));
  await mkdir(dirname(output), { recursive: true });
  await page.setContent(render(localize(rawProfile, locale), locale), { waitUntil: 'networkidle' });
  // Expresión evaluada dentro del navegador: espera a que las fuentes web estén cargadas.
  await page.evaluate('document.fonts.ready');
  await page.screenshot({ path: output, type: 'png' });
  console.info(`Imagen Open Graph generada: ${output}`);
}
await browser.close();
