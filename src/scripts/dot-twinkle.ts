import {
  DOT_GRID,
  gridPoints,
  pulseIntensity,
  TWINKLE,
  twinkleCount,
  updatePulses,
  type Point,
  type Pulse,
} from '@/lib/dot-grid';

/**
 * Pulsos del fondo de puntos: unos pocos puntos al azar crecen y se iluminan en el color de
 * acento poco a poco, y luego se apagan igual. Cuando uno termina, empieza otro en otro punto.
 *
 * El canvas se superpone a la rejilla CSS y solo dibuja los puntos que laten; la rejilla en
 * reposo la pinta el CSS, así que sin JavaScript o con movimiento reducido el fondo se ve
 * igual, solo que quieto. El color lo decide el CSS (propiedad `color` del canvas).
 */
export function initDotTwinkle(): void {
  const canvas = document.querySelector<HTMLCanvasElement>('[data-dot-twinkle]');
  const context = canvas?.getContext('2d');
  if (!canvas || !context || matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  let points: Point[] = [];
  let count = 0;
  let pulses: Pulse[] = [];
  let color = '';
  let frame = 0;

  const resize = (): void => {
    const { width, height } = canvas.getBoundingClientRect();
    // Densidad de píxeles limitada a 2: por encima no se aprecia y multiplica el trabajo.
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    points = gridPoints(width, height, DOT_GRID.spacing);
    count = twinkleCount(points.length, TWINKLE.share);
    pulses = [];
    color = getComputedStyle(canvas).color;
  };

  const draw = (now: number): void => {
    // Sin pulsos (primer fotograma, tras redimensionar o al volver a la pantalla), arrancan
    // repartidos en el tiempo para que no se enciendan todos a la vez.
    pulses = updatePulses(pulses, now, points.length, count, { stagger: pulses.length === 0 });
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = color;
    for (const pulse of pulses) {
      const point = points[pulse.index];
      const intensity = pulseIntensity((now - pulse.start) / pulse.duration);
      if (!point || intensity < 0.01) {
        continue;
      }
      context.globalAlpha = intensity * TWINKLE.peakOpacity;
      context.beginPath();
      context.arc(
        point.x,
        point.y,
        DOT_GRID.radius * (1 + (TWINKLE.scale - 1) * intensity),
        0,
        Math.PI * 2,
      );
      context.fill();
    }
    context.globalAlpha = 1;
  };

  const tick = (now: number): void => {
    draw(now);
    frame = requestAnimationFrame(tick);
  };

  const start = (): void => {
    if (frame === 0) {
      pulses = [];
      frame = requestAnimationFrame(tick);
    }
  };

  const stop = (): void => {
    cancelAnimationFrame(frame);
    frame = 0;
  };

  new ResizeObserver(resize).observe(canvas);
  // Solo se anima mientras la presentación está en pantalla.
  new IntersectionObserver(([entry]) => (entry?.isIntersecting ? start() : stop())).observe(canvas);
}
