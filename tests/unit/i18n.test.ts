import { describe, expect, it } from 'vitest';
import { DEFAULT_LOCALE, getDictionary, plural } from '@/i18n';

describe('getDictionary', () => {
  it('devuelve el diccionario del idioma por defecto', () => {
    expect(getDictionary().locale).toBe(DEFAULT_LOCALE);
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
