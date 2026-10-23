import Lenis from 'lenis';

/**
 * Scroll con inercia. No sustituye el scroll nativo: lo interpola.
 * Con "reducir movimiento" activo en el sistema se deja el scroll nativo
 * y nos ahorramos el bucle de animación.
 */
export function initSmoothScroll(): Lenis | null {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return null;
  }
  return new Lenis({
    autoRaf: true,
    anchors: true,
    lerp: 0.1,
  });
}
