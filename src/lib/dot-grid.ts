/**
 * Geometría del fondo de puntos de la presentación y de los pulsos que lo animan.
 * La usan el CSS (rejilla en reposo, vía variables en Hero.astro) y el canvas
 * (scripts/dot-twinkle.ts), así que los dos dibujan los puntos en las mismas posiciones.
 */

export const DOT_GRID = {
  /** Distancia entre centros de puntos, en px. */
  spacing: 26,
  /** Radio del punto en reposo, en px. */
  radius: 1.2,
} as const;

/**
 * Parámetros de los pulsos. Parte del efecto de rakkesh.vercel.app (un 3 % de puntos que se
 * encienden de golpe cada 130 ms), suavizado: cada punto se enciende y se apaga poco a poco.
 */
export const TWINKLE = {
  /** Proporción de puntos que están latiendo a la vez. */
  share: 0.04,
  /** Duración de un pulso completo (encenderse y apagarse), en ms. */
  minDurationMs: 1800,
  maxDurationMs: 3200,
  /** Tamaño del punto en el pico del pulso respecto al de reposo. */
  scale: 1.8,
  /** Opacidad del color de acento en el pico del pulso. */
  peakOpacity: 0.9,
} as const;

export interface Point {
  readonly x: number;
  readonly y: number;
}

/** Un punto latiendo: cuál es, cuándo empezó y cuánto dura, en ms. */
export interface Pulse {
  readonly index: number;
  readonly start: number;
  readonly duration: number;
}

/**
 * Centros de la rejilla que cubre un área. Coinciden con un fondo CSS de
 * `background-size: spacing` cuyo punto está centrado en cada celda.
 */
export function gridPoints(width: number, height: number, spacing: number): Point[] {
  if (spacing <= 0) {
    throw new RangeError(`El espaciado debe ser positivo: ${spacing}`);
  }
  const points: Point[] = [];
  for (let y = spacing / 2; y < height; y += spacing) {
    for (let x = spacing / 2; x < width; x += spacing) {
      points.push({ x, y });
    }
  }
  return points;
}

/** Cuántos puntos laten a la vez: nunca cero si hay puntos. */
export function twinkleCount(total: number, share: number): number {
  return total === 0 ? 0 : Math.max(1, Math.round(total * share));
}

/**
 * Intensidad de un pulso según su avance, de 0 (inicio) a 1 (final): sube y baja siguiendo
 * una curva coseno, que arranca y termina con velocidad cero, sin saltos. Vale 1 a mitad.
 */
export function pulseIntensity(progress: number): number {
  if (progress <= 0 || progress >= 1) {
    return 0;
  }
  return (1 - Math.cos(2 * Math.PI * progress)) / 2;
}

/** Duración al azar de un pulso, dentro del rango de TWINKLE. */
export function pulseDuration(random: () => number = Math.random): number {
  return TWINKLE.minDurationMs + random() * (TWINKLE.maxDurationMs - TWINKLE.minDurationMs);
}

export interface UpdateOptions {
  readonly random?: () => number;
  /**
   * Arranca los pulsos nuevos en una fase al azar en lugar de en cero. Se usa en el primer
   * fotograma (y al volver a la pantalla) para que no se enciendan todos a la vez.
   */
  readonly stagger?: boolean;
}

/**
 * Pulsos del instante `now`: conserva los que siguen en curso y sustituye los terminados por
 * pulsos nuevos en puntos libres hasta tener `count`. Nunca repite punto.
 */
export function updatePulses(
  pulses: readonly Pulse[],
  now: number,
  total: number,
  count: number,
  { random = Math.random, stagger = false }: UpdateOptions = {},
): Pulse[] {
  const next = pulses.filter((pulse) => pulse.index < total && now - pulse.start < pulse.duration);
  const busy = new Set(next.map((pulse) => pulse.index));
  const target = Math.min(count, total);
  while (next.length < target) {
    const index = freeIndex(total, busy, random);
    const duration = pulseDuration(random);
    busy.add(index);
    next.push({ index, duration, start: stagger ? now - random() * duration : now });
  }
  return next;
}

/** Un índice al azar que no esté ocupado; si el azar no da con uno, el primero libre. */
function freeIndex(total: number, busy: ReadonlySet<number>, random: () => number): number {
  for (let attempt = 0; attempt < 16; attempt++) {
    const index = Math.floor(random() * total);
    if (!busy.has(index)) {
      return index;
    }
  }
  for (let index = 0; index < total; index++) {
    if (!busy.has(index)) {
      return index;
    }
  }
  throw new RangeError('No quedan puntos libres');
}
