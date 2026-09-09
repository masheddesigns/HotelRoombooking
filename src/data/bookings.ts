import { Booking } from '../types/booking';

/**
 * DEMO DATA ONLY (BONUS FEATURE)
 * Isolated existing bookings used to demonstrate availability checking logic.
 * Dates are kept clear and explicit for half-open interval testing: [checkIn, checkOut).
 */
export const DEMO_EXISTING_BOOKINGS: Booking[] = [
  {
    id: 'BK-1001',
    roomCode: 'R102',
    checkIn: '2026-09-15',
    checkOut: '2026-09-18',
    guestName: 'Jane Doe',
  },
  {
    id: 'BK-1002',
    roomCode: 'R202',
    checkIn: '2026-09-20',
    checkOut: '2026-09-25',
    guestName: 'John Smith',
  },
];
