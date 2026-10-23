import { describe, expect, it } from 'vitest';
import { experienceSummary } from '@/lib/summary';

const labels = { position: { one: 'posición', other: 'posiciones' }, present: 'hoy' };

describe('experienceSummary', () => {
  it('cuenta posiciones y va del primer año hasta hoy si hay una en curso', () => {
    const periods = [
      { start: '2023-03', end: null },
      { start: '2021-01', end: '2023-02' },
      { start: '2019-09', end: '2020-12' },
    ];
    expect(experienceSummary(periods, labels)).toBe('3 posiciones · 2019 → hoy');
  });

  it('usa el último año de fin cuando ninguna está en curso', () => {
    const periods = [
      { start: '2019-09', end: '2020-12' },
      { start: '2021-01', end: '2022-06' },
    ];
    expect(experienceSummary(periods, labels)).toBe('2 posiciones · 2019 → 2022');
  });

  it('usa el singular con una sola posición', () => {
    expect(experienceSummary([{ start: '2024', end: null }], labels)).toBe(
      '1 posición · 2024 → hoy',
    );
  });

  it('devuelve vacío sin posiciones', () => {
    expect(experienceSummary([], labels)).toBe('');
  });
});
