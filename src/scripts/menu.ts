interface MenuCallbacks {
  onOpen?: () => void;
  onClose?: () => void;
}

/**
 * Menú a pantalla completa (móvil).
 * Estructura esperada: [data-menu-open] fuera del menú; [data-menu] con [data-menu-close] y enlaces dentro.
 */
export function initMenu({ onOpen, onClose }: MenuCallbacks = {}): void {
  const menu = document.querySelector<HTMLElement>('[data-menu]');
  const openButton = document.querySelector<HTMLButtonElement>('[data-menu-open]');
  const closeButton = menu?.querySelector<HTMLButtonElement>('[data-menu-close]');
  if (!menu || !openButton || !closeButton) {
    return;
  }

  const isOpen = (): boolean => menu.dataset.open === 'true';

  const setOpen = (open: boolean): void => {
    menu.dataset.open = String(open);
    openButton.setAttribute('aria-expanded', String(open));
    // preventScroll: al cerrar desde un enlace, el foco no debe competir con el desplazamiento al ancla.
    (open ? closeButton : openButton).focus({ preventScroll: true });
    (open ? onOpen : onClose)?.();
  };

  openButton.addEventListener('click', () => setOpen(true));
  closeButton.addEventListener('click', () => setOpen(false));
  menu
    .querySelectorAll('a')
    .forEach((link) => link.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isOpen()) {
      setOpen(false);
    }
  });
}
