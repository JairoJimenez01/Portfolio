/**
 * Une la base de despliegue con una ruta sin duplicar barras.
 * joinBase('/Portfolio/', '/cv.pdf') → '/Portfolio/cv.pdf'
 */
export function joinBase(base: string, path: string): string {
  const trimmedBase = base.replace(/\/+$/, '');
  const trimmedPath = path.replace(/^\/+/, '');
  return `${trimmedBase}/${trimmedPath}`;
}

/** Ruta interna respetando el `base` configurado en astro.config.ts. */
export function withBase(path: string): string {
  return joinBase(import.meta.env.BASE_URL, path);
}

/** URL absoluta para metadatos (Open Graph, canónica, JSON-LD). */
export function absoluteUrl(site: URL | string, base: string, path: string): string {
  return new URL(joinBase(base, path), site).toString();
}
