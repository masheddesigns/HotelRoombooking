import { describe, it, expect } from 'vitest';
import { getTodayString, addDaysISO, toISODateString } from './dates';

describe('calendar-date helpers', () => {
  it('formats calendar fields as zero-padded ISO dates', () => {
    expect(toISODateString(2026, 9, 5)).toBe('2026-09-05');
    expect(toISODateString(2026, 12, 25)).toBe('2026-12-25');
  });

  it('returns an explicit date as a local ISO string', () => {
    // Months are zero-indexed in the Date constructor: 8 === September.
    expect(getTodayString(new Date(2026, 8, 10))).toBe('2026-09-10');
  });

  it('defaults to a well-formed current date string', () => {
    expect(getTodayString()).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it('adds calendar days across month boundaries', () => {
    expect(addDaysISO('2026-09-10', 3)).toBe('2026-09-13');
    expect(addDaysISO('2026-09-30', 2)).toBe('2026-10-02');
    expect(addDaysISO('2026-09-10', 0)).toBe('2026-09-10');
  });

  it('returns an empty string for malformed input', () => {
    expect(addDaysISO('', 3)).toBe('');
    expect(addDaysISO('not-a-date', 3)).toBe('');
  });
});
