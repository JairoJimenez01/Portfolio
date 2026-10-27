import type { Dictionary } from './types';

/** Textos de la interfície en català. */
export const ca: Dictionary = {
  nav: {
    brand: 'Portfolio',
    sectionsLabel: 'Seccions',
    menuLabel: 'Menú principal',
    languageLabel: 'Idioma',
    open: 'Menú',
    close: 'Tanca',
    skipToContent: 'Salta al contingut',
  },
  anchors: {
    skills: 'habilitats',
    experience: 'experiencia',
    projects: 'projectes',
    education: 'formacio',
    contact: 'contacte',
  },
  hero: {
    talk: 'Parlem',
    downloadCv: 'Descarrega el CV',
  },
  sections: {
    skills: {
      title: 'Habilitats',
      meta: 'El que faig servir cada dia',
      more: 'més',
      less: "Mostra'n menys",
    },
    experience: {
      title: 'Experiència',
      position: { one: 'posició', other: 'posicions' },
      present: 'avui',
      showHighlights: 'Mostra els assoliments',
      hideHighlights: 'Amaga els assoliments',
    },
    projects: { title: 'Projectes', meta: 'Productes i codi obert' },
    education: { title: 'Formació', meta: 'Estudis i certificacions', languages: 'Idiomes' },
    contact: { title: 'Contacte', eyebrow: 'Contacte' },
  },
  period: {
    present: 'Actualitat',
  },
  contact: {
    copyEmail: 'Copia el correu al porta-retalls',
    copied: 'Copiat al porta-retalls',
    copyFallback: 'Selecciona i copia el correu',
  },
  footer: {
    builtWith: 'Fet amb Astro',
    source: 'Codi font',
  },
};
