/**
 * Idiomas del sitio: la única lista de la que salen las rutas, los diccionarios, el esquema del
 * contenido, el sitemap y las imágenes de previsualización. Añadir un idioma empieza aquí; a
 * partir de ahí, TypeScript y el esquema del contenido señalan todo lo que falta traducir.
 *
 * Sin imports a propósito: lo leen también astro.config.ts y las herramientas de tools/ con Node.
 */
export const LOCALES = ['es', 'en', 'ca'] as const;

export type Locale = (typeof LOCALES)[number];

/** El idioma por defecto se sirve en la raíz ("/"); el resto, con prefijo ("/en/", "/ca/"). */
export const DEFAULT_LOCALE: Locale = 'es';

export interface LocaleInfo {
  /** Nombre del idioma en el propio idioma, como se muestra en el selector. */
  readonly name: string;
  /** Etiqueta regional para Open Graph ("es_ES"). */
  readonly ogLocale: string;
  /** Etiqueta BCP 47 para el sitemap ("es-ES"). */
  readonly tag: string;
}

export const LOCALE_INFO: Readonly<Record<Locale, LocaleInfo>> = {
  es: { name: 'Español', ogLocale: 'es_ES', tag: 'es-ES' },
  en: { name: 'English', ogLocale: 'en_US', tag: 'en-US' },
  ca: { name: 'Català', ogLocale: 'ca_ES', tag: 'ca-ES' },
};

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (LOCALES as readonly string[]).includes(value);
}
