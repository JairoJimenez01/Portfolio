import { describe, expect, it } from 'vitest';
import { getDictionary } from '@/i18n';
import { navigationItems, SECTION_IDS } from '@/lib/navigation';

describe('navigationItems', () => {
  it('genera un enlace por sección, en el orden de la página', () => {
    const items = navigationItems(getDictionary());
    expect(items.map((item) => item.href)).toEqual(
      Object.values(SECTION_IDS).map((id) => `#${id}`),
    );
  });

  it('usa los títulos del diccionario como etiquetas', () => {
    const { sections } = getDictionary();
    const labels = navigationItems(getDictionary()).map((item) => item.label);
    expect(labels).toContain(sections.skills.title);
    expect(labels).toContain(sections.contact.title);
  });
});
