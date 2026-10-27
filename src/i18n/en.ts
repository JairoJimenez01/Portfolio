import type { Dictionary } from './types';

/** Interface strings in English. */
export const en: Dictionary = {
  nav: {
    brand: 'Portfolio',
    sectionsLabel: 'Sections',
    menuLabel: 'Main menu',
    languageLabel: 'Language',
    open: 'Menu',
    close: 'Close',
    skipToContent: 'Skip to content',
  },
  anchors: {
    skills: 'skills',
    experience: 'experience',
    projects: 'projects',
    education: 'education',
    contact: 'contact',
  },
  hero: {
    talk: "Let's talk",
    downloadCv: 'Download CV',
  },
  sections: {
    skills: {
      title: 'Skills',
      meta: 'What I use every day',
      more: 'more',
      less: 'Show less',
    },
    experience: {
      title: 'Experience',
      position: { one: 'position', other: 'positions' },
      present: 'present',
      showHighlights: 'Show highlights',
      hideHighlights: 'Hide highlights',
    },
    projects: { title: 'Projects', meta: 'Products and open source' },
    education: { title: 'Education', meta: 'Degrees and certifications', languages: 'Languages' },
    contact: { title: 'Contact', eyebrow: 'Contact' },
  },
  period: {
    present: 'Present',
  },
  contact: {
    copyEmail: 'Copy the email address to the clipboard',
    copied: 'Copied to the clipboard',
    copyFallback: 'Select and copy the address',
  },
  footer: {
    builtWith: 'Built with Astro',
    source: 'Source code',
  },
};
