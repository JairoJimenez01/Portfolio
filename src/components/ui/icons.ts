/**
 * Registro de iconos sobre una rejilla de 24×24. Añadir un icono es añadir una entrada.
 * Los logotipos van rellenos; el resto son trazos.
 */
export type IconName = 'linkedin' | 'malt' | 'arrow' | 'copy' | 'download' | 'chevron';

interface IconDefinition {
  readonly path: string;
  readonly filled?: boolean;
  readonly strokeWidth?: number;
}

export const ICONS: Readonly<Record<IconName, IconDefinition>> = {
  linkedin: {
    filled: true,
    path: 'M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z',
  },
  /** Asterisco de tres trazos con extremos redondeados, la forma del logotipo de Malt. */
  malt: { path: 'M12 3.5v17M4.64 7.75l14.72 8.5M4.64 16.25l14.72-8.5', strokeWidth: 3.4 },
  arrow: { path: 'M7 17 17 7M8 7h9v9' },
  copy: {
    path: 'M11 9h9a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-9a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2zM5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1',
  },
  download: { path: 'M12 4v11M7 10l5 5 5-5M5 20h14' },
  chevron: { path: 'M6 9l6 6 6-6' },
};
