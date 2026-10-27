/*
 * Imports relativos con extensión .ts: tools/generate-og.mjs reutiliza este módulo desde Node,
 * que no entiende el alias "@/".
 */
import { LOCALES, type Locale } from '../config/locales.ts';

/** Un texto con una versión por idioma: { "es": "…", "en": "…", "ca": "…" }. */
export type Localized<T = string> = Readonly<Record<Locale, T>>;

/**
 * Tipo de un dato del contenido una vez elegido el idioma: cada texto traducido pasa a ser un
 * texto simple y el resto de la estructura se conserva.
 */
export type Localize<T> =
  T extends Localized<infer V>
    ? V
    : T extends readonly (infer Item)[]
      ? Localize<Item>[]
      : T extends object
        ? { readonly [K in keyof T]: Localize<T[K]> }
        : T;

/** Un objeto es una traducción si sus claves son exactamente los idiomas del sitio. */
export function isLocalized(value: unknown): value is Localized<unknown> {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return false;
  }
  const keys = Object.keys(value);
  return keys.length === LOCALES.length && LOCALES.every((locale) => keys.includes(locale));
}

/**
 * Recorre un dato del contenido y sustituye cada traducción por su versión en `locale`.
 * Los textos sin traducción (nombres propios, tecnologías) se quedan como están.
 */
export function localize<T>(value: T, locale: Locale): Localize<T> {
  return pick(value, locale) as Localize<T>;
}

function pick(value: unknown, locale: Locale): unknown {
  if (isLocalized(value)) {
    return value[locale];
  }
  if (Array.isArray(value)) {
    return value.map((item) => pick(item, locale));
  }
  if (typeof value === 'object' && value !== null) {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, pick(item, locale)]),
    );
  }
  return value;
}
