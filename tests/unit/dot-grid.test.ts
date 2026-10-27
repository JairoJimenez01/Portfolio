import { describe, expect, it } from 'vitest';
import {
  gridPoints,
  pulseDuration,
  pulseIntensity,
  TWINKLE,
  twinkleCount,
  updatePulses,
} from '@/lib/dot-grid';

describe('gridPoints', () => {
  it('centra un punto en cada celda, como el fondo CSS', () => {
    expect(gridPoints(52, 26, 26)).toEqual([
      { x: 13, y: 13 },
      { x: 39, y: 13 },
    ]);
  });

  it('solo incluye los puntos cuyo centro cae dentro del área, como el CSS', () => {
    // Centros en 13 y 39; el siguiente, en 65, queda fuera de 60 px.
    expect(gridPoints(60, 60, 26)).toHaveLength(2 * 2);
  });

  it('no genera puntos en un área vacía', () => {
    expect(gridPoints(0, 100, 26)).toEqual([]);
  });

  it('rechaza un espaciado no positivo', () => {
    expect(() => gridPoints(100, 100, 0)).toThrow(RangeError);
  });
});

describe('twinkleCount', () => {
  it('aplica la proporción y redondea', () => {
    expect(twinkleCount(1000, 0.04)).toBe(40);
  });

  it('anima al menos un punto si hay puntos, y ninguno si no hay', () => {
    expect(twinkleCount(10, 0.04)).toBe(1);
    expect(twinkleCount(0, 0.04)).toBe(0);
  });
});

describe('pulseIntensity', () => {
  it('empieza y acaba apagado y llega al máximo a mitad del pulso', () => {
    expect(pulseIntensity(0)).toBe(0);
    expect(pulseIntensity(0.5)).toBeCloseTo(1);
    expect(pulseIntensity(1)).toBe(0);
  });

  it('sube de forma suave y simétrica', () => {
    expect(pulseIntensity(0.1)).toBeLessThan(pulseIntensity(0.25));
    expect(pulseIntensity(0.25)).toBeCloseTo(pulseIntensity(0.75));
    expect(pulseIntensity(0.05)).toBeLessThan(0.05);
  });

  it('vale cero fuera del pulso', () => {
    expect(pulseIntensity(-0.2)).toBe(0);
    expect(pulseIntensity(1.3)).toBe(0);
  });
});

describe('pulseDuration', () => {
  it('queda dentro del rango configurado', () => {
    expect(pulseDuration(() => 0)).toBe(TWINKLE.minDurationMs);
    expect(pulseDuration(() => 0.999)).toBeLessThan(TWINKLE.maxDurationMs);
  });
});

describe('updatePulses', () => {
  it('crea tantos pulsos como se piden, en puntos distintos', () => {
    const pulses = updatePulses([], 0, 100, 10);
    expect(pulses).toHaveLength(10);
    expect(new Set(pulses.map((pulse) => pulse.index)).size).toBe(10);
  });

  it('conserva los pulsos en curso y sustituye los terminados', () => {
    const running = { index: 3, start: 0, duration: 2000 };
    const finished = { index: 7, start: 0, duration: 500 };
    const next = updatePulses([running, finished], 1000, 100, 2);
    expect(next).toContainEqual(running);
    expect(next).not.toContainEqual(finished);
    expect(next).toHaveLength(2);
  });

  it('arranca los pulsos nuevos en cero, salvo con stagger, que los reparte en el tiempo', () => {
    const now = 10_000;
    expect(updatePulses([], now, 100, 5).every((pulse) => pulse.start === now)).toBe(true);
    const staggered = updatePulses([], now, 100, 5, { stagger: true });
    expect(
      staggered.every((pulse) => pulse.start <= now && now - pulse.start < pulse.duration),
    ).toBe(true);
  });

  it('no repite punto aunque el azar devuelva siempre el mismo', () => {
    const pulses = updatePulses([], 0, 5, 5, { random: () => 0 });
    expect(pulses.map((pulse) => pulse.index).sort()).toEqual([0, 1, 2, 3, 4]);
  });

  it('descarta pulsos de puntos que ya no existen y no pide más puntos de los que hay', () => {
    const outside = { index: 50, start: 0, duration: 5000 };
    expect(
      updatePulses([outside], 100, 3, 10)
        .map((pulse) => pulse.index)
        .sort(),
    ).toEqual([0, 1, 2]);
    expect(updatePulses([], 0, 0, 10)).toEqual([]);
  });
});
