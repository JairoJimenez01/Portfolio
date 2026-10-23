const STATUS_TIMEOUT_MS = 2500;

/**
 * Botones [data-copy]: copian `data-copy-text` al portapapeles y escriben el resultado
 * en el elemento cuyo id está en `data-copy-status`. Los mensajes vienen del HTML
 * (`data-copied-message`, `data-fallback-message`) para que el script no contenga textos.
 * Si el portapapeles falla, se selecciona el texto del elemento `data-copy-source` (un id)
 * para que el visitante pueda copiarlo a mano.
 */
export function initCopyButtons(): void {
  document.querySelectorAll<HTMLButtonElement>('[data-copy]').forEach((button) => {
    button.addEventListener('click', () => void copy(button));
  });
}

async function copy(button: HTMLButtonElement): Promise<void> {
  const {
    copyText,
    copyStatus,
    copySource,
    copiedMessage = '',
    fallbackMessage = '',
  } = button.dataset;
  const status = copyStatus ? document.getElementById(copyStatus) : null;
  if (!copyText || !status) {
    return;
  }

  try {
    await navigator.clipboard.writeText(copyText);
    status.textContent = copiedMessage;
  } catch {
    // Algunos navegadores rechazan el portapapeles: dejamos el texto seleccionado para copiarlo a mano.
    const source = copySource ? document.getElementById(copySource) : null;
    selectText(source ?? button);
    status.textContent = fallbackMessage;
  }

  window.setTimeout(() => {
    status.textContent = '';
  }, STATUS_TIMEOUT_MS);
}

function selectText(element: Element): void {
  const range = document.createRange();
  range.selectNodeContents(element);
  const selection = window.getSelection();
  selection?.removeAllRanges();
  selection?.addRange(range);
}
