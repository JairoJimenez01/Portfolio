/**
 * Dirección pública del sitio: la única fuente de verdad para Astro (URLs absolutas, sitemap,
 * robots.txt), para los tests de navegador y para la imagen de previsualización de enlaces.
 *
 * Con dominio propio, GitHub Pages sirve el repositorio en la raíz, de ahí que la base sea "/".
 * Si algún día vuelve a servirse en https://<usuario>.github.io/<repo>/, la base pasa a "/<repo>/".
 */
export const SITE_URL = 'https://jairojimenez.dev';
export const BASE_PATH = '/';
