/**
 * Punto de entrada del JavaScript del navegador.
 * Cada módulo busca sus elementos por atributos data-* y no hace nada si no existen.
 * Cada uno arranca aislado: si uno falla, los demás siguen funcionando.
 */
import type Lenis from 'lenis';
import { initCopyButtons } from './copy';
import { initDotTwinkle } from './dot-twinkle';
import { initExpandables } from './expandable';
import { initHeroGlow } from './hero-glow';
import { initMenu } from './menu';
import { initReveal } from './reveal';
import { initSmoothScroll } from './smooth-scroll';

function safely(feature: string, init: () => void): boolean {
  try {
    init();
    return true;
  } catch (error) {
    console.error(`No se pudo iniciar: ${feature}`, error);
    return false;
  }
}

const root = document.documentElement;

// Primero lo que decide si el contenido se ve. Si las animaciones de aparición no arrancan,
// se retira la clase .js para que nada quede oculto (ver el script en línea de Base.astro).
if (safely('animaciones de aparición', initReveal)) {
  root.classList.add('js-ready');
} else {
  root.classList.remove('js');
}

let lenis: Lenis | null = null;
safely('scroll con inercia', () => {
  lenis = initSmoothScroll();
});
safely('bloques desplegables', () => initExpandables());
safely('menú', () =>
  initMenu({
    onOpen: () => lenis?.stop(),
    onClose: () => lenis?.start(),
  }),
);
safely('brillo de la presentación', initHeroGlow);
safely('parpadeo del fondo de puntos', initDotTwinkle);
safely('copiar al portapapeles', initCopyButtons);
