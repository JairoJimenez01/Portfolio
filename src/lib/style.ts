/**
 * Retardo escalonado para las animaciones de aparición.
 * Devuelve el atributo style que lee la regla CSS de `[data-reveal]`.
 */
export function revealDelay(step: number): string {
  return `--i:${step}`;
}
