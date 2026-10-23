/**
 * Brillo del fondo de puntos que sigue al puntero.
 * El script solo escribe dos variables CSS con la posición; el dibujo lo hace el CSS
 * (components/sections/Hero.astro), que no sabe de dónde salen los valores.
 */
export function initHeroGlow(): void {
  const glow = document.querySelector<HTMLElement>('[data-hero-glow]');
  const surface = glow?.parentElement;
  if (!glow || !surface) {
    return;
  }

  surface.addEventListener(
    'pointermove',
    (event) => {
      const rect = surface.getBoundingClientRect();
      glow.style.setProperty('--mx', `${event.clientX - rect.left}px`);
      glow.style.setProperty('--my', `${event.clientY - rect.top}px`);
    },
    { passive: true },
  );
}
