import { es } from './es';

/**
 * Punto de acceso a los textos de interfaz.
 * Un único idioma por ahora: añadir otro es crear su fichero y registrarlo en `dictionaries`.
 */
const dictionaries = { es } as const;

export type Locale = keyof typeof dictionaries;
export type Dictionary = (typeof dictionaries)[Locale];
export interface PluralForms {
  readonly one: string;
  readonly other: string;
}

export const DEFAULT_LOCALE: Locale = 'es';

export function getDictionary(locale: Locale = DEFAULT_LOCALE): Dictionary {
  return dictionaries[locale];
}

/** "1 posición", "3 posiciones". */
export function plural(count: number, forms: PluralForms): string {
  return `${count} ${count === 1 ? forms.one : forms.other}`;
}
