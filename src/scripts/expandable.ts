/**
 * Bloques desplegables genéricos. Estructura esperada:
 *
 *   <div data-expandable>
 *     <li data-collapsible>…</li>              ← se oculta mientras está plegado
 *     <button data-expand-toggle aria-controls="…" hidden>
 *       <span data-when="collapsed">+3 más</span>
 *       <span data-when="expanded">Ver menos</span>
 *     </button>
 *   </div>
 *
 * Al arrancar, el script pliega cada bloque y muestra su botón. Las reglas que ocultan
 * y muestran están en styles/global.css. Sin JavaScript todo queda visible y sin botones.
 */
export function initExpandables(root: ParentNode = document): void {
  root.querySelectorAll<HTMLElement>('[data-expandable]').forEach((container) => {
    const toggle = container.querySelector<HTMLButtonElement>('[data-expand-toggle]');
    if (!toggle) {
      return;
    }

    const setExpanded = (expanded: boolean): void => {
      container.dataset.expanded = String(expanded);
      toggle.setAttribute('aria-expanded', String(expanded));
    };

    setExpanded(false);
    toggle.hidden = false;
    toggle.addEventListener('click', () => setExpanded(container.dataset.expanded !== 'true'));
  });
}
