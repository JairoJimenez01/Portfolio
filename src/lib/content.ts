import { getCollection, getEntry, type CollectionEntry } from 'astro:content';
import type { Locale } from '@/i18n';
import { localize, type Localize } from './localize';
import { byOrder, byStartDesc } from './sort';

/** El perfil es un único fichero: src/content/profile/main.json. */
const PROFILE_ID = 'main';

/** Datos tal y como los reciben las secciones: ya en el idioma de la página. */
export type Profile = Localize<CollectionEntry<'profile'>['data']>;
export type SkillGroup = Localize<CollectionEntry<'skills'>['data']>;
export type Experience = Localize<CollectionEntry<'experience'>['data']>;
export type Project = Localize<CollectionEntry<'projects'>['data']>;
export type Education = Localize<CollectionEntry<'education'>['data']>;

export interface PortfolioData {
  readonly profile: Profile;
  readonly skills: readonly SkillGroup[];
  readonly experience: readonly Experience[];
  readonly projects: readonly Project[];
  readonly education: readonly Education[];
}

const dataOf = <T extends { data: unknown }>(entry: T): T['data'] => entry.data;

/**
 * Único punto de acceso a las colecciones de contenido.
 * Ordena las entradas y elige el idioma: las secciones reciben textos simples y no saben
 * de dónde vienen ni que existen otras traducciones.
 */
export async function getPortfolioData(locale: Locale): Promise<PortfolioData> {
  const profileEntry = await getEntry('profile', PROFILE_ID);
  if (!profileEntry) {
    throw new Error(`Falta el perfil "${PROFILE_ID}.json" en src/content/profile`);
  }

  const [skills, experience, projects, education] = await Promise.all([
    getCollection('skills'),
    getCollection('experience'),
    getCollection('projects'),
    getCollection('education'),
  ]);

  return localize(
    {
      profile: profileEntry.data,
      skills: skills.map(dataOf).sort(byOrder),
      experience: experience.map(dataOf).sort(byStartDesc),
      projects: projects.map(dataOf).sort(byOrder),
      education: education.map(dataOf).sort(byOrder),
    },
    locale,
  );
}
