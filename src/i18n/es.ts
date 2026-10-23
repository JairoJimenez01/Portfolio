/**
 * Textos de la interfaz en español.
 * Los datos del portfolio (experiencia, proyectos, etc.) no van aquí: viven en src/content.
 */
export const es = {
  locale: 'es',
  ogLocale: 'es_ES',
  nav: {
    brand: 'Portfolio',
    sectionsLabel: 'Secciones',
    menuLabel: 'Menú principal',
    open: 'Menú',
    close: 'Cerrar',
    skipToContent: 'Saltar al contenido',
  },
  hero: {
    talk: 'Hablemos',
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
