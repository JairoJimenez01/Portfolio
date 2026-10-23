import { describe, expect, it } from 'vitest';
import { formatPeriod, isCurrent, yearOf } from '@/lib/dates';

const labels = { present: 'Actualidad' };

describe('yearOf', () => {
  it('extrae el año de "AAAA-MM" y de "AAAA"', () => {
    expect(yearOf('2023-03')).toBe(2023);
    expect(yearOf('2019')).toBe(2019);
  });

  it('rechaza valores que no empiezan por un año', () => {
    expect(() => yearOf('marzo')).toThrow(RangeError);
    expect(() => yearOf('')).toThrow(RangeError);
  });
});

describe('formatPeriod', () => {
  it('usa la etiqueta de presente cuando no hay fin', () => {
    expect(formatPeriod({ start: '2023-03', end: null }, labels)).toBe('2023 — Actualidad');
  });

  it('muestra año de inicio y de fin', () => {
    expect(formatPeriod({ start: '2021-01', end: '2023-02' }, labels)).toBe('2021 — 2023');
  });

  it('muestra un solo año cuando empieza y acaba en el mismo', () => {
    expect(formatPeriod({ start: '2024-05', end: '2024-05' }, labels)).toBe('2024');
  });
});

describe('isCurrent', () => {
  it('es verdadero solo cuando el fin es null', () => {
    expect(isCurrent({ start: '2023', end: null })).toBe(true);
    expect(isCurrent({ start: '2023', end: '2024' })).toBe(false);
  });
});
