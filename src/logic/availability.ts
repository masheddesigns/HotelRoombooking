import { Booking, Room } from '../types/booking';

/**
 * Checks if a room is available for the given date range using half-open intervals [checkIn, checkOut).
 * Overlap occurs if requested check-in is before existing check-out AND requested check-out is after existing check-in.
 *
 * Invalid requested ranges (missing dates, or check-out on/before check-in)
 * are treated as unavailable so callers cannot accidentally confirm a booking
 * without a valid date range. Date validity itself is enforced by validateDates.
 */
export function isRoomAvailable(
  roomCode: string,
  checkIn: string,
  checkOut: string,
  existingBookings: Booking[]
): boolean {
  if (!checkIn || !checkOut || checkOut <= checkIn) return false;

  const roomBookings = existingBookings.filter((b) => b.roomCode === roomCode);

  for (const booking of roomBookings) {
    // Half-open interval overlap check: [checkIn, checkOut)
    const isOverlap = checkIn < booking.checkOut && checkOut > booking.checkIn;
    if (isOverlap) {
      return false;
    }
  }

  return true;
}

/**
 * Checks if a room accommodates the requested number of guests.
 * A room is sufficient when the guest count fits within its max capacity.
 */
export function isRoomCapacitySufficient(room: Room, guestCount: number): boolean {
  return guestCount <= room.maxGuests;
}
