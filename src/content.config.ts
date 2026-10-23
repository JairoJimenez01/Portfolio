import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { defineCollection } from 'astro:content';

/**
 * Contrato de los datos del portfolio.
 * Cada colección es una carpeta en src/content con un fichero JSON por entrada.
 * Si un fichero no cumple el esquema, el build falla con un mensaje que señala el campo.
 */

/** Fecha con precisión de mes ("2023-01") o solo año ("2019"). */
const yearMonth = z.string().regex(/^\d{4}(-(0[1-9]|1[0-2]))?$/, 'Usa el formato AAAA o AAAA-MM');

/** Intervalo temporal. `end: null` significa "hasta la actualidad". */
const period = z.object({
  start: yearMonth,
  end: yearMonth.nullable(),
});

const url = z.url();
const text = z.string().trim().min(1);
const order = z.number().int().nonnegative();

const profile = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/profile' }),
  schema: z.object({
    name: text,
    /** Puesto. Encabeza la presentación y se declara en los datos estructurados (schema.org/Person). */
    role: text,
    /** Tecnologías que acompañan al puesto sobre el nombre, p. ej. ["PHP", "Python", "IA"]. */
    keywords: z.array(text).max(4),
    /** Frase de presentación. Admite **negritas**, que se resaltan en el color de acento. */
    lead: text,
    location: text,
    email: z.email(),
    links: z.object({
      linkedin: url,
      malt: url,
      /** Repositorio de esta web, enlazado desde el pie. */
      repository: url.optional(),
    }),
    photo: z.object({
      alt: text,
    }),
    cv: z.object({
      /** Ruta dentro de public/, p. ej. "cv.pdf". */
      file: text,
      label: text,
    }),
    contact: z.object({
      title: text,
      text,
    }),
    languages: z.array(z.object({ name: text, level: text })),
    seo: z.object({
      title: text,
      description: text.max(160, 'Las descripciones largas se truncan en los buscadores'),
    }),
  }),
});

const skills = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/skills' }),
  schema: z.object({
    category: text,
    order,
    items: z.array(text).min(1),
  }),
});

const experience = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/experience' }),
  schema: z.object({
    company: text,
    role: text,
    period,
    location: text,
    /** Una frase que resume el puesto; es lo que se ve sin desplegar. */
    summary: text,
    /** Logros medibles, no tareas. Se muestran al desplegar y admiten **negritas**. */
    highlights: z.array(text).min(1),
    stack: z.array(text),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/projects' }),
  schema: z.object({
    name: text,
    description: text,
    /** Web del producto o repositorio. Sin él, la fila se muestra sin enlace. */
    url: url.optional(),
    stack: z.array(text),
    order,
  }),
});

const education = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/education' }),
  schema: z.object({
    title: text,
    institution: text,
    period,
    kind: z.enum(['degree', 'certification', 'course']),
    order,
  }),
});

export const collections = { profile, skills, experience, projects, education };
