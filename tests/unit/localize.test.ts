import { describe, expect, it } from 'vitest';
import { isLocalized, localize } from '@/lib/localize';

const greeting = { es: 'Hola', en: 'Hello', ca: 'Hola' };

describe('isLocalized', () => {
  it('reconoce un objeto con exactamente los idiomas del sitio', () => {
    expect(isLocalized(greeting)).toBe(true);
  });

  it('no confunde con traducciones otros objetos de solo texto', () => {
    expect(isLocalized({ linkedin: 'a', malt: 'b', repository: 'c' })).toBe(false);
    expect(isLocalized({ es: 'Hola', en: 'Hello' })).toBe(false);
    expect(isLocalized({ ...greeting, fr: 'Salut' })).toBe(false);
  });

  it('no trata como traducción listas, textos ni nulos', () => {
    expect(isLocalized(['es', 'en', 'ca'])).toBe(false);
    expect(isLocalized('Hola')).toBe(false);
    expect(isLocalized(null)).toBe(false);
  });
});

describe('localize', () => {
  it('elige la versión del idioma pedido', () => {
    expect(localize(greeting, 'en')).toBe('Hello');
  });

  it('deja intactos los textos sin traducción, números y nulos', () => {
    expect(localize('PHP', 'ca')).toBe('PHP');
    expect(localize({ order: 2, end: null }, 'en')).toEqual({ order: 2, end: null });
  });

  it('recorre listas que mezclan textos simples y traducidos', () => {
    const items = ['PHP', { es: 'Microservicios', en: 'Microservices', ca: 'Microserveis' }];
    expect(localize(items, 'ca')).toEqual(['PHP', 'Microserveis']);
  });

  it('recorre objetos anidados sin tocar los que no son traducciones', () => {
    const entry = {
      title: greeting,
      period: { start: '2021-10', end: '2026-02' },
      highlights: [greeting],
    };
    expect(localize(entry, 'en')).toEqual({
      title: 'Hello',
      period: { start: '2021-10', end: '2026-02' },
      highlights: ['Hello'],
    });
  });
});
