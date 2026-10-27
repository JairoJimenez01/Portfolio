import { describe, expect, it } from 'vitest';
import { absoluteUrl, joinBase, localeHomePath, ogImagePath } from '@/lib/urls';

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
    expect(absoluteUrl('https://jairojimenez.dev', '/', '/og/es.png')).toBe(
      'https://jairojimenez.dev/og/es.png',
    );
    expect(absoluteUrl('https://example.github.io', '/Portfolio', '/en/')).toBe(
      'https://example.github.io/Portfolio/en/',
    );
  });
});

describe('localeHomePath', () => {
  it('sirve el idioma por defecto en la raíz y el resto con prefijo', () => {
    expect(localeHomePath('es')).toBe('/');
    expect(localeHomePath('en')).toBe('/en/');
    expect(localeHomePath('ca')).toBe('/ca/');
  });
});

describe('ogImagePath', () => {
  it('apunta a una imagen por idioma', () => {
    expect(ogImagePath('ca')).toBe('/og/ca.png');
  });
});
