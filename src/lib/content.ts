import { getCollection, getEntry, type CollectionEntry } from 'astro:content';
import { DEFAULT_LOCALE } from '@/i18n';
import { byOrder, byStartDesc } from './sort';

export type Profile = CollectionEntry<'profile'>['data'];
export type SkillGroup = CollectionEntry<'skills'>['data'];
export type Experience = CollectionEntry<'experience'>['data'];
export type Project = CollectionEntry<'projects'>['data'];
export type Education = CollectionEntry<'education'>['data'];

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
 * Las secciones reciben estos datos ya ordenados y no saben de dónde vienen.
 */
export async function getPortfolioData(): Promise<PortfolioData> {
  const profileEntry = await getEntry('profile', DEFAULT_LOCALE);
  if (!profileEntry) {
    throw new Error(`Falta el perfil "${DEFAULT_LOCALE}.json" en src/content/profile`);
  }

  const [skills, experience, projects, education] = await Promise.all([
    getCollection('skills'),
    getCollection('experience'),
    getCollection('projects'),
    getCollection('education'),
  ]);

  return {
    profile: profileEntry.data,
    skills: skills.map(dataOf).sort(byOrder),
    experience: experience.map(dataOf).sort(byStartDesc),
    projects: projects.map(dataOf).sort(byOrder),
    education: education.map(dataOf).sort(byOrder),
  };
}
