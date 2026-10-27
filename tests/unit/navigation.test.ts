import { describe, expect, it } from 'vitest';
import { getDictionary, LOCALES } from '@/i18n';
import { languageLinks, navigationItems } from '@/lib/navigation';

describe('languageLinks', () => {
  it('enlaza la portada de cada idioma con su nombre propio y marca el actual', () => {
    expect(languageLinks('en', '/')).toEqual([
      { locale: 'es', name: 'Español', href: '/', current: false },
      { locale: 'en', name: 'English', href: '/en/', current: true },
      { locale: 'ca', name: 'Català', href: '/ca/', current: false },
    ]);
  });

  it('respeta la base de despliegue', () => {
    expect(languageLinks('es', '/Portfolio/').map((link) => link.href)).toEqual([
      '/Portfolio/',
      '/Portfolio/en/',
      '/Portfolio/ca/',
    ]);
  });
});

describe.each(LOCALES)('navigationItems (%s)', (locale) => {
  const dictionary = getDictionary(locale);
  const items = navigationItems(dictionary);

  it('genera un enlace por sección con las anclas del idioma, en el orden de la página', () => {
    const { anchors } = dictionary;
    expect(items.map((item) => item.href)).toEqual(
      [
        anchors.skills,
        anchors.experience,
        anchors.projects,
        anchors.education,
        anchors.contact,
      ].map((anchor) => `#${anchor}`),
    );
  });

  it('usa los títulos de sección como etiquetas', () => {
    expect(items.map((item) => item.label)).toContain(dictionary.sections.skills.title);
  });
});
