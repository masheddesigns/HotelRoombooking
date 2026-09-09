import { describe, it, expect } from 'vitest';
import { calculateNights, calculateTotal } from './booking';

describe('calculateNights', () => {
  it('counts 1 night for consecutive days (Sep 10 -> Sep 11)', () => {
    expect(calculateNights('2026-09-10', '2026-09-11')).toBe(1);
  });

  it('counts 2 nights (Sep 10 -> Sep 12)', () => {
    expect(calculateNights('2026-09-10', '2026-09-12')).toBe(2);
  });

  it('counts 7 nights across a week (Sep 10 -> Sep 17)', () => {
    expect(calculateNights('2026-09-10', '2026-09-17')).toBe(7);
  });

  it('counts nights across a month boundary (Sep 30 -> Oct 02)', () => {
    expect(calculateNights('2026-09-30', '2026-10-02')).toBe(2);
  });

  it('returns 0 for a same-day range (never a positive booking)', () => {
    expect(calculateNights('2026-09-10', '2026-09-10')).toBe(0);
  });

  it('returns 0 when check-out is before check-in', () => {
    expect(calculateNights('2026-09-12', '2026-09-10')).toBe(0);
  });

  it('returns 0 when either date is missing', () => {
    expect(calculateNights('', '2026-09-12')).toBe(0);
    expect(calculateNights('2026-09-10', '')).toBe(0);
  });
});

describe('calculateTotal', () => {
  it('calculates 2 x 3500 = 7000 (Deluxe Room)', () => {
    expect(calculateTotal(2, 3500)).toBe(7000);
  });

  it('calculates 3 x 5800 = 17400 (Executive Suite)', () => {
    expect(calculateTotal(3, 5800)).toBe(17400);
  });

  it('calculates 1 x 4200 = 4200 (Family Room)', () => {
    expect(calculateTotal(1, 4200)).toBe(4200);
  });

  it('returns 0 for zero nights', () => {
    expect(calculateTotal(0, 3500)).toBe(0);
  });

  it('returns 0 for non-positive inputs', () => {
    expect(calculateTotal(-1, 3500)).toBe(0);
    expect(calculateTotal(2, 0)).toBe(0);
    expect(calculateTotal(2, -100)).toBe(0);
  });
});
