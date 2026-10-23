const VISIBLE_CLASS = 'is-visible';

/**
 * Marca como visibles los elementos [data-reveal] cuando entran en el viewport.
 * El CSS (styles/global.css) se encarga de la transición; aquí solo se añade la clase.
 */
export function initReveal(root: ParentNode = document): void {
  const elements = root.querySelectorAll<HTMLElement>('[data-reveal]');
  if (elements.length === 0) {
    return;
  }

  if (!('IntersectionObserver' in window)) {
    elements.forEach((element) => element.classList.add(VISIBLE_CLASS));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) {
          continue;
        }
        entry.target.classList.add(VISIBLE_CLASS);
        observer.unobserve(entry.target);
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
  );

  elements.forEach((element) => observer.observe(element));
}
