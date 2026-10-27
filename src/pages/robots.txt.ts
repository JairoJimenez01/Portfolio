import type { APIRoute } from 'astro';
import { absoluteUrl } from '@/lib/urls';

/**
 * robots.txt generado en el build, para que la URL del sitemap salga de la configuración
 * de Astro y no haya que recordar cambiarla si cambia el dominio.
 */
export const GET: APIRoute = ({ site }) => {
  const sitemap = absoluteUrl(
    site ?? 'http://localhost:4321',
    import.meta.env.BASE_URL,
    '/sitemap-index.xml',
  );
  const body = ['User-agent: *', 'Allow: /', '', `Sitemap: ${sitemap}`, ''].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
