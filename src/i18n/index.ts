import type { Locale } from '@/config/locales';
import { ca } from './ca';
import { en } from './en';
import { es } from './es';
import type { Dictionary, PluralForms } from './types';

export { DEFAULT_LOCALE, LOCALE_INFO, LOCALES, isLocale, type Locale } from '@/config/locales';
export type { Dictionary, PluralForms } from './types';

/**
 * Punto de acceso a los textos de interfaz. `satisfies` obliga a registrar un diccionario por
 * cada idioma de config/locales.ts: si se añade un idioma y falta aquí, no compila.
 */
const dictionaries = { es, en, ca } satisfies Record<Locale, Dictionary>;

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

/** "1 posición", "3 posiciones". */
export function plural(count: number, forms: PluralForms): string {
  return `${count} ${count === 1 ? forms.one : forms.other}`;
}
