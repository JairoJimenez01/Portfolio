export interface Ordered {
  readonly order: number;
}

export interface Dated {
  readonly period: { readonly start: string };
}

/** Orden explícito ascendente, para colecciones donde el autor decide la posición. */
export function byOrder(a: Ordered, b: Ordered): number {
  return a.order - b.order;
}

/**
 * Más reciente primero. Las fechas "AAAA-MM" se comparan como texto
 * porque el formato es ordenable lexicográficamente.
 */
export function byStartDesc(a: Dated, b: Dated): number {
  return b.period.start.localeCompare(a.period.start);
}
