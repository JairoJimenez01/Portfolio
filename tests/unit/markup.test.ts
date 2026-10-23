import { describe, expect, it } from 'vitest';
import { parseEmphasis } from '@/lib/markup';

describe('parseEmphasis', () => {
  it('devuelve un único segmento cuando no hay marcas', () => {
    expect(parseEmphasis('texto plano')).toEqual([{ text: 'texto plano', strong: false }]);
  });

  it('separa los segmentos destacados de los normales', () => {
    expect(parseEmphasis('centrado en **PHP** y **Laravel**.')).toEqual([
      { text: 'centrado en ', strong: false },
      { text: 'PHP', strong: true },
      { text: ' y ', strong: false },
      { text: 'Laravel', strong: true },
      { text: '.', strong: false },
    ]);
  });

  it('admite que el texto empiece o termine con una marca', () => {
    expect(parseEmphasis('**Todo** destacado')).toEqual([
      { text: 'Todo', strong: true },
      { text: ' destacado', strong: false },
    ]);
  });

  it('devuelve el texto literal si una marca queda sin cerrar', () => {
    expect(parseEmphasis('a ** b')).toEqual([{ text: 'a ** b', strong: false }]);
  });

  it('ignora los segmentos vacíos', () => {
    expect(parseEmphasis('a****b')).toEqual([
      { text: 'a', strong: false },
      { text: 'b', strong: false },
    ]);
  });
});
