import { describe, expect, it } from 'vitest';
import { personJsonLd, serializeJsonLd } from '@/lib/seo';

describe('serializeJsonLd', () => {
  it('escapa "<" para que el contenido no pueda cerrar la etiqueta script', () => {
    expect(serializeJsonLd({ name: '</script><b>' })).toBe('{"name":"\\u003c/script>\\u003cb>"}');
  });
});

describe('personJsonLd', () => {
  it('genera un Person de schema.org con los enlaces de perfil', () => {
    const result = personJsonLd({
      name: 'Nombre Apellido',
      jobTitle: 'Backend developer',
      url: 'https://ejemplo.dev/',
      sameAs: ['https://github.com/ejemplo'],
      locality: 'Barcelona',
    });
    expect(result).toEqual({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Nombre Apellido',
      jobTitle: 'Backend developer',
      url: 'https://ejemplo.dev/',
      sameAs: ['https://github.com/ejemplo'],
      address: { '@type': 'PostalAddress', addressLocality: 'Barcelona' },
    });
  });

  it('omite la dirección cuando no hay localidad', () => {
    const result = personJsonLd({ name: 'N', jobTitle: 'J', url: 'https://e.dev/', sameAs: [] });
    expect(result).not.toHaveProperty('address');
  });
});
