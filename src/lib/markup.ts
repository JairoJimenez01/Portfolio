/** Trozo de texto, destacado o no. */
export interface Segment {
  readonly text: string;
  readonly strong: boolean;
}

const MARKER = '**';

/**
 * Divide un texto con marcas **así** en segmentos normales y destacados.
 * No genera HTML: el componente decide cómo pintar cada segmento.
 * Si las marcas no están emparejadas, el texto se devuelve literal.
 */
export function parseEmphasis(text: string): Segment[] {
  const parts = text.split(MARKER);
  const hasUnclosedMarker = parts.length % 2 === 0;
  if (hasUnclosedMarker) {
    return [{ text, strong: false }];
  }
  return parts
    .map((part, index) => ({ text: part, strong: index % 2 === 1 }))
    .filter((segment) => segment.text !== '');
}
