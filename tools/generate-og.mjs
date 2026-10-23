/**
 * Genera la imagen de previsualización de enlaces (Open Graph), 1200×630, en public/og.png.
 * Toma nombre, puesto y descripción de src/content/profile/es.json y la renderiza con Chromium.
 *
 *   npm run og
 */
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { chromium } from '@playwright/test';

const PROFILE = resolve('src/content/profile/es.json');
const OUTPUT = resolve('public/og.png');
const SITE_LABEL = 'jairojimenez01.github.io/Portfolio';

const profile = JSON.parse(await readFile(PROFILE, 'utf8'));
const escape = (text) => text.replace(/[&<>"']/g, (char) => `&#${char.charCodeAt(0)};`);

const html = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Sora:wght@800&family=DM+Sans:wght@500&family=IBM+Plex+Mono&display=swap">
<style>
  body { margin: 0; width: 1200px; height: 630px; background: #121016; color: #f4f2f7; font-family: 'DM Sans', sans-serif; position: relative; overflow: hidden; }
  .glow { position: absolute; inset: 0; background: radial-gradient(700px 400px at 20% 0%, rgba(91,61,245,.5), transparent 60%); }
  .dots { position: absolute; inset: 0; background-image: radial-gradient(circle, rgba(244,242,247,.12) 1.4px, transparent 2px); background-size: 28px 28px; }
  .content { position: relative; padding: 88px 96px; display: flex; flex-direction: column; height: 100%; box-sizing: border-box; }
  .eyebrow { font-family: 'IBM Plex Mono', monospace; font-size: 24px; letter-spacing: .14em; text-transform: uppercase; color: #b7a8ff; }
  .name { font-family: 'Sora', sans-serif; font-size: 112px; font-weight: 800; line-height: .95; letter-spacing: -.04em; text-transform: uppercase; margin-top: 24px; }
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
await page.setContent(html, { waitUntil: 'networkidle' });
// Expresión evaluada dentro del navegador: espera a que las fuentes web estén cargadas.
await page.evaluate('document.fonts.ready');
await page.screenshot({ path: OUTPUT, type: 'png' });
await browser.close();

console.info(`Imagen Open Graph generada: ${OUTPUT}`);
