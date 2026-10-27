import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { defineCollection } from 'astro:content';
import type { Locale } from './config/locales';

/**
 * Contrato de los datos del portfolio.
 * Cada colección es una carpeta en src/content con un fichero JSON por entrada.
 * Si un fichero no cumple el esquema, el build falla con un mensaje que señala el campo.
 *
 * Idiomas: cada entrada vive en un único fichero con los datos comunes (fechas, URLs, orden)
 * escritos una vez y los textos traducibles como { "es": "…", "en": "…", "ca": "…" }.
 * - `localized`: el texto debe estar en todos los idiomas (resúmenes, logros, descripciones).
 * - `translatable`: admite un texto único si es igual en todos (nombres, tecnologías) o su
 *   versión por idioma si cambia ("Microservicios" / "Microservices" / "Microserveis").
 * lib/content.ts resuelve el idioma antes de entregar los datos a las secciones.
 */

const text = z.string().trim().min(1);

function localized<S extends z.ZodType>(schema: S) {
  // `satisfies` obliga a declarar todos los idiomas de config/locales.ts.
  return z.strictObject({ es: schema, en: schema, ca: schema } satisfies Record<Locale, S>);
}

function translatable<S extends z.ZodType>(schema: S) {
  return z.union([schema, localized(schema)]);
}

const localizedText = localized(text);
const translatableText = translatable(text);

/** Fecha con precisión de mes ("2023-01") o solo año ("2019"). */
const yearMonth = z.string().regex(/^\d{4}(-(0[1-9]|1[0-2]))?$/, 'Usa el formato AAAA o AAAA-MM');

/** Intervalo temporal. `end: null` significa "hasta la actualidad". */
const period = z.object({
  start: yearMonth,
  end: yearMonth.nullable(),
});

const url = z.url();
const order = z.number().int().nonnegative();

/** El perfil es un único fichero: src/content/profile/main.json (ver lib/content.ts). */
const profile = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/profile' }),
  schema: z.object({
    name: text,
    /** Puesto. Encabeza la presentación y se declara en los datos estructurados (schema.org/Person). */
    role: translatableText,
    /** Tecnologías que acompañan al puesto sobre el nombre, p. ej. ["PHP", "Python", "IA"]. */
    keywords: z.array(translatableText).max(4),
    /** Frase de presentación. Admite **negritas**, que se resaltan en el color de acento. */
    lead: localizedText,
    location: translatableText,
    email: z.email(),
    links: z.object({
      linkedin: url,
      malt: url,
      /** Repositorio de esta web, enlazado desde el pie. */
      repository: url.optional(),
    }),
    photo: z.object({
      alt: localizedText,
    }),
    cv: z.object({
      /** Ruta dentro de public/. Admite un fichero por idioma si algún día hay CV traducido. */
      file: translatableText,
    }),
    contact: z.object({
      title: localizedText,
      text: localizedText,
    }),
    languages: z.array(z.object({ name: translatableText, level: translatableText })),
    seo: z.object({
      title: translatableText,
      description: localized(
        text.max(160, 'Las descripciones largas se truncan en los buscadores'),
      ),
    }),
  }),
});

const skills = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/skills' }),
  schema: z.object({
    category: translatableText,
    order,
    items: z.array(translatableText).min(1),
  }),
});

const experience = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/experience' }),
  schema: z.object({
    company: text,
    role: translatableText,
    period,
    location: translatableText,
    /** Una frase que resume el puesto; es lo que se ve sin desplegar. */
    summary: localizedText,
    /** Logros medibles, no tareas. Se muestran al desplegar y admiten **negritas**. */
    highlights: z.array(localizedText).min(1),
    stack: z.array(translatableText),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/projects' }),
  schema: z.object({
    name: translatableText,
    description: localizedText,
    /** Web del producto o repositorio. Sin él, la fila se muestra sin enlace. */
    url: url.optional(),
    stack: z.array(translatableText),
    order,
  }),
});

const education = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/education' }),
  schema: z.object({
    title: localizedText,
    institution: translatableText,
    period,
    kind: z.enum(['degree', 'certification', 'course']),
    order,
  }),
});

export const collections = { profile, skills, experience, projects, education };
