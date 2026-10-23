/**
 * Punto de corte entre móvil y escritorio.
 * Las hojas de estilo lo repiten como `@media (max-width: 860px)` porque CSS no puede
 * importar valores de TypeScript; si cambia, hay que buscar "860px" en src/.
 */
export const MOBILE_MEDIA_QUERY = '(max-width: 860px)';
