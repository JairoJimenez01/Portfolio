import type { es } from './es';

/** Convierte los textos literales en `string`, conservando la estructura. */
type Widen<T> = T extends string ? string : { readonly [K in keyof T]: Widen<T[K]> };

/**
 * Forma de un diccionario de interfaz: la del español con textos libres.
 * Un diccionario con una clave de menos o de más no compila.
 */
export type Dictionary = Widen<typeof es>;

export interface PluralForms {
  readonly one: string;
  readonly other: string;
}
