import { describe, expect, it } from 'vitest';
import { DEFAULT_LOCALE, getDictionary, LOCALE_INFO, LOCALES, plural } from '@/i18n';

/** Rutas de todas las hojas de un diccionario: "nav.brand", "sections.skills.title"… */
function keyPaths(value: unknown, prefix = ''): string[] {
  if (typeof value !== 'object' || value === null) {
    return [prefix];
  }
  return Object.entries(value).flatMap(([key, child]) =>
    keyPaths(child, prefix ? `${prefix}.${key}` : key),
  );
}

describe('diccionarios', () => {
  const reference = keyPaths(getDictionary(DEFAULT_LOCALE)).sort();

  it.each(LOCALES)('el de "%s" tiene exactamente las mismas claves que el español', (locale) => {
    expect(keyPaths(getDictionary(locale)).sort()).toEqual(reference);
  });

  it.each(LOCALES)('el de "%s" no deja ningún texto vacío', (locale) => {
    const texts = keyPaths(getDictionary(locale)).map((path) =>
      path
        .split('.')
        .reduce<unknown>(
          (node, key) => (node as Record<string, unknown>)[key],
          getDictionary(locale),
        ),
    );
    expect(texts.every((text) => typeof text === 'string' && text.trim().length > 0)).toBe(true);
  });

  it.each(LOCALES)('las anclas de "%s" son seguras para una URL y no se repiten', (locale) => {
    const anchors = Object.values(getDictionary(locale).anchors);
    expect(anchors.every((anchor) => /^[a-z]+(-[a-z]+)*$/.test(anchor))).toBe(true);
    expect(new Set(anchors).size).toBe(anchors.length);
  });

  it('cada idioma declara su nombre y sus etiquetas regionales', () => {
    for (const locale of LOCALES) {
      expect(LOCALE_INFO[locale].ogLocale).toMatch(new RegExp(`^${locale}_[A-Z]{2}$`));
      expect(LOCALE_INFO[locale].tag).toMatch(new RegExp(`^${locale}-[A-Z]{2}$`));
    }
  });
});

describe('plural', () => {
  const forms = { one: 'posición', other: 'posiciones' };

  it('usa el singular para 1 y el plural para el resto', () => {
    expect(plural(1, forms)).toBe('1 posición');
    expect(plural(0, forms)).toBe('0 posiciones');
    expect(plural(3, forms)).toBe('3 posiciones');
  });
});
