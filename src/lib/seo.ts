export interface PersonInput {
  readonly name: string;
  readonly jobTitle: string;
  readonly url: string;
  readonly sameAs: readonly string[];
  readonly locality?: string;
}

/**
 * Datos estructurados schema.org/Person para que buscadores y portales
 * entiendan quién es la persona de la página. No incluye el correo a propósito.
 */
export function personJsonLd(person: PersonInput): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: person.name,
    jobTitle: person.jobTitle,
    url: person.url,
    sameAs: [...person.sameAs],
    ...(person.locality
      ? { address: { '@type': 'PostalAddress', addressLocality: person.locality } }
      : {}),
  };
}

/**
 * Serializa los datos estructurados para incrustarlos en un <script>.
 * Escapa "<" para que ningún valor pueda cerrar la etiqueta.
 */
export function serializeJsonLd(data: Record<string, unknown>): string {
  return JSON.stringify(data).replaceAll('<', '\\u003c');
}
