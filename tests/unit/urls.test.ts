import { describe, expect, it } from 'vitest';
import { absoluteUrl, joinBase } from '@/lib/urls';

describe('joinBase', () => {
  it('une base y ruta con una sola barra, vengan como vengan', () => {
    expect(joinBase('/Portfolio/', '/cv.pdf')).toBe('/Portfolio/cv.pdf');
    expect(joinBase('/Portfolio', 'cv.pdf')).toBe('/Portfolio/cv.pdf');
    expect(joinBase('/', '/cv.pdf')).toBe('/cv.pdf');
    expect(joinBase('', 'cv.pdf')).toBe('/cv.pdf');
  });

  it('respeta la ruta raíz', () => {
    expect(joinBase('/Portfolio/', '/')).toBe('/Portfolio/');
  });
});

describe('absoluteUrl', () => {
  it('construye la URL pública a partir del sitio y la base', () => {
    expect(absoluteUrl('https://jairojimenez01.github.io', '/Portfolio', '/og.png')).toBe(
      'https://jairojimenez01.github.io/Portfolio/og.png',
    );
  });
});
