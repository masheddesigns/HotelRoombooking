import { describe, it, expect } from 'vitest';
import { validateDates } from './validation';

// Fixed baseline so tests never depend on the actual current date.
const TODAY = '2026-09-10';
const YESTERDAY = '2026-09-09';
const TOMORROW = '2026-09-11';

describe('validateDates', () => {
  it('reports MISSING_CHECK_IN when check-in is empty', () => {
    const result = validateDates('', '2026-09-12', TODAY);
    expect(result.isValid).toBe(false);
    expect(result.errorType).toBe('MISSING_CHECK_IN');
  });

  it('reports PAST_CHECK_IN for yesterday', () => {
    const result = validateDates(YESTERDAY, '2026-09-12', TODAY);
    expect(result.isValid).toBe(false);
    expect(result.errorType).toBe('PAST_CHECK_IN');
  });

  it('accepts today as a valid check-in', () => {
    const result = validateDates(TODAY, '2026-09-11', TODAY);
    expect(result.isValid).toBe(true);
    expect(result.errorType).toBeNull();
  });

  it('reports MISSING_CHECK_OUT when check-out is empty', () => {
    const result = validateDates(TODAY, '', TODAY);
    expect(result.isValid).toBe(false);
    expect(result.errorType).toBe('MISSING_CHECK_OUT');
  });

  it('reports INVALID_RANGE for a same-day stay', () => {
    const result = validateDates(TODAY, TODAY, TODAY);
    expect(result.isValid).toBe(false);
    expect(result.errorType).toBe('INVALID_RANGE');
  });

  it('reports INVALID_RANGE when check-out is before check-in', () => {
    const result = validateDates('2026-09-12', TODAY, TODAY);
    expect(result.isValid).toBe(false);
    expect(result.errorType).toBe('INVALID_RANGE');
  });

  it('accepts a valid range after today', () => {
    const result = validateDates(TOMORROW, '2026-09-13', TODAY);
    expect(result.isValid).toBe(true);
    expect(result.errorType).toBeNull();
    expect(result.message).toBeNull();
  });

  it('applies precedence: missing check-in wins over everything else', () => {
    const result = validateDates('', '', TODAY);
    expect(result.errorType).toBe('MISSING_CHECK_IN');
  });

  it('applies precedence: past check-in wins over missing check-out', () => {
    const result = validateDates(YESTERDAY, '', TODAY);
    expect(result.errorType).toBe('PAST_CHECK_IN');
  });

  it('applies precedence: missing check-out wins over invalid range', () => {
    // No check-out at all must not be reported as an invalid range.
    const result = validateDates(TODAY, '', TODAY);
    expect(result.errorType).toBe('MISSING_CHECK_OUT');
  });
});
