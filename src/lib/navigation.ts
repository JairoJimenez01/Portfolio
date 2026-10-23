import type { Dictionary } from '@/i18n';

/** Identificadores de las secciones: los usan las anclas del menú y los `id` de cada banda. */
export const SECTION_IDS = {
  skills: 'habilidades',
  experience: 'experiencia',
  projects: 'proyectos',
  education: 'educacion',
  contact: 'contacto',
} as const;

export interface NavItem {
  readonly href: string;
  readonly label: string;
}

/** Elementos del menú en el orden en que aparecen las secciones. */
export function navigationItems(dictionary: Dictionary): NavItem[] {
  const { sections } = dictionary;
  return [
    { href: `#${SECTION_IDS.skills}`, label: sections.skills.title },
    { href: `#${SECTION_IDS.experience}`, label: sections.experience.title },
    { href: `#${SECTION_IDS.projects}`, label: sections.projects.title },
    { href: `#${SECTION_IDS.education}`, label: sections.education.title },
    { href: `#${SECTION_IDS.contact}`, label: sections.contact.title },
  ];
}
