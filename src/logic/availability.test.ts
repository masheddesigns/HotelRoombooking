import { describe, it, expect } from 'vitest';
import { isRoomAvailable, isRoomCapacitySufficient } from './availability';
import { ROOMS } from '../data/rooms';
import type { Booking, Room } from '../types/booking';

// Mirrors the half-open interval fixture from the assessment:
// an existing booking occupying [Sep 15, Sep 18).
const EXISTING: Booking[] = [
  {
    id: 'BK-TEST-1',
    roomCode: 'R102',
    checkIn: '2026-09-15',
    checkOut: '2026-09-18',
  },
];

const roomByCode = (code: string): Room => {
  const room = ROOMS.find((r) => r.code === code);
  if (!room) throw new Error(`Unknown room code in test: ${code}`);
  return room;
};

describe('isRoomAvailable (half-open [checkIn, checkOut) intervals)', () => {
  it('rejects a request starting on the existing check-in day (Sep 15 -> Sep 16)', () => {
    expect(isRoomAvailable('R102', '2026-09-15', '2026-09-16', EXISTING)).toBe(false);
  });

  it('rejects a request fully inside the booking (Sep 16 -> Sep 17)', () => {
    expect(isRoomAvailable('R102', '2026-09-16', '2026-09-17', EXISTING)).toBe(false);
  });

  it('rejects a request ending on the existing check-out day (Sep 17 -> Sep 18)', () => {
    expect(isRoomAvailable('R102', '2026-09-17', '2026-09-18', EXISTING)).toBe(false);
  });

  it('rejects a containing range that starts before the booking (Sep 14 -> Sep 16)', () => {
    expect(isRoomAvailable('R102', '2026-09-14', '2026-09-16', EXISTING)).toBe(false);
  });

  it('rejects a containing range that ends after the booking (Sep 16 -> Sep 20)', () => {
    expect(isRoomAvailable('R102', '2026-09-16', '2026-09-20', EXISTING)).toBe(false);
  });

  it('accepts a request starting exactly on the existing check-out day (Sep 18 -> Sep 20)', () => {
    expect(isRoomAvailable('R102', '2026-09-18', '2026-09-20', EXISTING)).toBe(true);
  });

  it('accepts non-overlapping ranges before the booking', () => {
    expect(isRoomAvailable('R102', '2026-09-10', '2026-09-12', EXISTING)).toBe(true);
    expect(isRoomAvailable('R102', '2026-09-12', '2026-09-14', EXISTING)).toBe(true);
  });

  it('ignores bookings for other rooms', () => {
    expect(isRoomAvailable('R101', '2026-09-15', '2026-09-18', EXISTING)).toBe(true);
  });

  it('does not pass invalid requested ranges as available', () => {
    // Same-day range.
    expect(isRoomAvailable('R102', '2026-09-18', '2026-09-18', EXISTING)).toBe(false);
    // Reversed range.
    expect(isRoomAvailable('R102', '2026-09-20', '2026-09-18', EXISTING)).toBe(false);
    // Missing dates.
    expect(isRoomAvailable('R102', '', '2026-09-20', EXISTING)).toBe(false);
    expect(isRoomAvailable('R102', '2026-09-18', '', EXISTING)).toBe(false);
  });
});

describe('isRoomCapacitySufficient', () => {
  it('accepts 2 guests for R101 and R102 (exact capacity)', () => {
    expect(isRoomCapacitySufficient(roomByCode('R101'), 2)).toBe(true);
    expect(isRoomCapacitySufficient(roomByCode('R102'), 2)).toBe(true);
  });

  it('accepts guest counts below capacity', () => {
    expect(isRoomCapacitySufficient(roomByCode('R101'), 1)).toBe(true);
    expect(isRoomCapacitySufficient(roomByCode('R301'), 3)).toBe(true);
  });

  it('rejects 3 guests for R101/R102 but accepts R201', () => {
    expect(isRoomCapacitySufficient(roomByCode('R101'), 3)).toBe(false);
    expect(isRoomCapacitySufficient(roomByCode('R102'), 3)).toBe(false);
    expect(isRoomCapacitySufficient(roomByCode('R201'), 3)).toBe(true);
  });

  it('accepts 4 guests for R301 (exact capacity)', () => {
    expect(isRoomCapacitySufficient(roomByCode('R301'), 4)).toBe(true);
  });

  it('rejects guest counts above capacity', () => {
    expect(isRoomCapacitySufficient(roomByCode('R301'), 5)).toBe(false);
    expect(isRoomCapacitySufficient(roomByCode('R201'), 4)).toBe(false);
  });
});

describe('assessment room data', () => {
  it('contains the exact rooms, rates, and capacities', () => {
    expect(ROOMS).toEqual([
      { code: 'R101', name: 'Deluxe Room', type: 'Deluxe Room', pricePerNight: 3500, maxGuests: 2 },
      { code: 'R102', name: 'Deluxe Room', type: 'Deluxe Room', pricePerNight: 3500, maxGuests: 2 },
      { code: 'R201', name: 'Executive Suite', type: 'Executive Suite', pricePerNight: 5800, maxGuests: 3 },
      { code: 'R202', name: 'Executive Suite', type: 'Executive Suite', pricePerNight: 5800, maxGuests: 3 },
      { code: 'R301', name: 'Family Room', type: 'Family Room', pricePerNight: 4200, maxGuests: 4 },
    ]);
  });
});
