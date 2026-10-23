import { describe, expect, it } from 'vitest';
import { byOrder, byStartDesc } from '@/lib/sort';

describe('byOrder', () => {
  it('ordena de menor a mayor', () => {
    const items = [{ order: 3 }, { order: 1 }, { order: 2 }];
    expect(items.sort(byOrder).map((item) => item.order)).toEqual([1, 2, 3]);
  });
});

describe('byStartDesc', () => {
  it('pone primero la fecha más reciente', () => {
    const items = [
      { period: { start: '2019-09' } },
      { period: { start: '2023-03' } },
      { period: { start: '2021-01' } },
    ];
    expect(items.sort(byStartDesc).map((item) => item.period.start)).toEqual([
      '2023-03',
      '2021-01',
      '2019-09',
    ]);
  });
});
