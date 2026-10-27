/**
 * Textos de la interfaz en español. Este diccionario define la forma que deben tener los demás
 * (ver types.ts). Los datos del portfolio (experiencia, proyectos…) no van aquí: viven en src/content.
 */
export const es = {
  nav: {
    brand: 'Portfolio',
    sectionsLabel: 'Secciones',
    menuLabel: 'Menú principal',
    languageLabel: 'Idioma',
    open: 'Menú',
    close: 'Cerrar',
    skipToContent: 'Saltar al contenido',
  },
  /** Anclas de cada sección en la URL ("/#experiencia"). Solo letras ASCII y guiones. */
  anchors: {
    skills: 'habilidades',
    experience: 'experiencia',
    projects: 'proyectos',
    education: 'educacion',
    contact: 'contacto',
  },
  hero: {
    talk: 'Hablemos',
    downloadCv: 'Descargar CV',
  },
  sections: {
    skills: {
      title: 'Habilidades',
      meta: 'Lo que uso a diario',
      more: 'más',
      less: 'Ver menos',
    },
    experience: {
      title: 'Experiencia',
      position: { one: 'posición', other: 'posiciones' },
      present: 'hoy',
      showHighlights: 'Ver logros',
      hideHighlights: 'Ocultar logros',
    },
    projects: { title: 'Proyectos', meta: 'Productos y código abierto' },
    education: { title: 'Educación', meta: 'Formación y certificaciones', languages: 'Idiomas' },
    contact: { title: 'Contacto', eyebrow: 'Contacto' },
  },
  period: {
    present: 'Actualidad',
  },
  contact: {
    copyEmail: 'Copiar el correo al portapapeles',
    copied: 'Copiado al portapapeles',
    copyFallback: 'Selecciona y copia el correo',
  },
  footer: {
    builtWith: 'Hecho con Astro',
    source: 'Código fuente',
  },
} as const;
