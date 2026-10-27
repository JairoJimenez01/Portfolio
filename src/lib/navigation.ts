import { LOCALE_INFO, LOCALES, type Dictionary, type Locale } from '@/i18n';
import { joinBase, localeHomePath } from './urls';

export interface NavItem {
  readonly href: string;
  readonly label: string;
}

/**
 * Elementos del menú en el orden en que aparecen las secciones. Las anclas salen del diccionario
 * para que la URL esté en el idioma de la página ("/#experiencia", "/en/#experience").
 */
export function navigationItems(dictionary: Dictionary): NavItem[] {
  const { anchors, sections } = dictionary;
  return [
    { href: `#${anchors.skills}`, label: sections.skills.title },
    { href: `#${anchors.experience}`, label: sections.experience.title },
    { href: `#${anchors.projects}`, label: sections.projects.title },
    { href: `#${anchors.education}`, label: sections.education.title },
    { href: `#${anchors.contact}`, label: sections.contact.title },
  ];
}

export interface LanguageLink {
  readonly locale: Locale;
  /** Nombre del idioma en el propio idioma ("Català"), igual en todas las páginas. */
  readonly name: string;
  readonly href: string;
  readonly current: boolean;
}

/**
 * Enlaces a la portada de cada idioma, para el selector de la cabecera y el del menú móvil.
 * Rutas relativas a `base`: en local llevan a la versión local, no a la publicada.
 */
export function languageLinks(current: Locale, base: string): LanguageLink[] {
  return LOCALES.map((locale) => ({
    locale,
    name: LOCALE_INFO[locale].name,
    href: joinBase(base, localeHomePath(locale)),
    current: locale === current,
  }));
}
