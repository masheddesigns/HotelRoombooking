/**
 * Calendar-date helpers for 'YYYY-MM-DD' strings.
 *
 * Booking dates are calendar days, not timestamps, so all arithmetic here
 * works on local calendar fields. This keeps day differences immune to
 * timezone offsets and DST transitions.
 */

/** Formats calendar fields as a zero-padded ISO date string. */
export function toISODateString(year: number, month: number, day: number): string {
  const m = String(month).padStart(2, '0');
  const d = String(day).padStart(2, '0');
  return `${year}-${m}-${d}`;
}

/**
 * Returns today's date as 'YYYY-MM-DD' in local time.
 * Accepts an explicit date so callers (and tests) stay deterministic.
 */
export function getTodayString(now: Date = new Date()): string {
  return toISODateString(now.getFullYear(), now.getMonth() + 1, now.getDate());
}

/**
 * Adds whole calendar days to an ISO date string.
 * Returns '' when the input is not a well-formed date or days is not an integer.
 */
export function addDaysISO(dateStr: string, days: number): string {
  const [y, m, d] = dateStr.split('-').map(Number);
  if (!Number.isInteger(y) || !Number.isInteger(m) || !Number.isInteger(d)) {
    return '';
  }
  if (!Number.isInteger(days)) {
    return '';
  }
  const date = new Date(y, m - 1, d);
  date.setDate(date.getDate() + days);
  return toISODateString(date.getFullYear(), date.getMonth() + 1, date.getDate());
}
