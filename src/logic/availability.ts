import { Booking, Room } from '../types/booking';

/**
 * Checks if a room is available for the given date range using half-open intervals [checkIn, checkOut).
 * Overlap occurs if requested check-in is before existing check-out AND requested check-out is after existing check-in.
 */
export function isRoomAvailable(
  roomCode: string,
  checkIn: string,
  checkOut: string,
  existingBookings: Booking[]
): boolean {
  if (!checkIn || !checkOut || checkOut <= checkIn) return true;

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
 */
export function isRoomCapacitySufficient(room: Room, guestCount: number): boolean {
  if (guestCount <= 0) return true;
  return guestCount <= room.maxGuests;
}
