import { plural, type PluralForms } from '@/i18n';
import { isCurrent, yearOf, type Period } from './dates';

export interface ExperienceSummaryLabels {
  readonly position: PluralForms;
  readonly present: string;
}

/** Resumen de cabecera de la experiencia: "3 posiciones · 2019 → hoy". */
export function experienceSummary(
  periods: readonly Period[],
  labels: ExperienceSummaryLabels,
): string {
  if (periods.length === 0) {
    return '';
  }
  const from = Math.min(...periods.map((period) => yearOf(period.start)));
  const to = periods.some(isCurrent)
    ? labels.present
    : String(Math.max(...periods.map((period) => yearOf(period.end ?? period.start))));
  return `${plural(periods.length, labels.position)} · ${from} → ${to}`;
}
