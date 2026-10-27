import { DEFAULT_LOCALE, type Locale } from '../config/locales.ts';

/**
 * Une la base de despliegue con una ruta sin duplicar barras.
 * joinBase('/Portfolio/', '/cv.pdf') → '/Portfolio/cv.pdf'
 */
export function joinBase(base: string, path: string): string {
  const trimmedBase = base.replace(/\/+$/, '');
  const trimmedPath = path.replace(/^\/+/, '');
  return `${trimmedBase}/${trimmedPath}`;
}

/** Ruta interna respetando el `base` configurado en astro.config.ts. */
export function withBase(path: string): string {
  return joinBase(import.meta.env.BASE_URL, path);
}

/** URL absoluta para metadatos (Open Graph, canónica, JSON-LD). */
export function absoluteUrl(site: URL | string, base: string, path: string): string {
  return new URL(joinBase(base, path), site).toString();
}

/**
 * Portada de cada idioma, relativa a la base: el idioma por defecto en la raíz y el resto con
 * prefijo. Es la misma regla con la que pages/[...locale].astro genera las rutas.
 */
export function localeHomePath(locale: Locale): string {
  return locale === DEFAULT_LOCALE ? '/' : `/${locale}/`;
}

/** Imagen de previsualización de cada idioma, generada por tools/generate-og.mjs. */
export function ogImagePath(locale: Locale): string {
  return `/og/${locale}.png`;
}
