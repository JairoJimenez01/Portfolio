/** Intervalo con fechas "AAAA" o "AAAA-MM". `end: null` significa "hasta la actualidad". */
export interface Period {
  readonly start: string;
  readonly end: string | null;
}

export interface PeriodLabels {
  readonly present: string;
}

/** Extrae el año de una fecha "AAAA" o "AAAA-MM". */
export function yearOf(yearMonth: string): number {
  const year = Number(yearMonth.slice(0, 4));
  if (!Number.isInteger(year) || yearMonth.length < 4) {
    throw new RangeError(`Fecha no válida: "${yearMonth}"`);
  }
  return year;
}

export function isCurrent(period: Period): boolean {
  return period.end === null;
}

/**
 * "2023 — Actualidad", "2021 — 2023" o, si empieza y acaba el mismo año, "2024".
 */
export function formatPeriod(period: Period, labels: PeriodLabels): string {
  const start = yearOf(period.start);
  if (period.end === null) {
    return `${start} — ${labels.present}`;
  }
  const end = yearOf(period.end);
  return start === end ? String(start) : `${start} — ${end}`;
}
