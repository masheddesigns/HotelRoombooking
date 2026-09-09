/**
 * Calculates the number of nights between check-in and check-out dates.
 * Expects dates in ISO format 'YYYY-MM-DD'.
 * Uses Date.UTC to guarantee timezone-agnostic day difference math with zero DST off-by-one errors.
 * Returns 0 if either date is invalid or if checkOut <= checkIn.
 */
export function calculateNights(checkIn: string, checkOut: string): number {
  if (!checkIn || !checkOut) return 0;

  const [startYear, startMonth, startDay] = checkIn.split('-').map(Number);
  const [endYear, endMonth, endDay] = checkOut.split('-').map(Number);

  if (
    !startYear || !startMonth || !startDay ||
    !endYear || !endMonth || !endDay
  ) {
    return 0;
  }

  const startUtc = Date.UTC(startYear, startMonth - 1, startDay);
  const endUtc = Date.UTC(endYear, endMonth - 1, endDay);

  const diffDays = Math.round((endUtc - startUtc) / (1000 * 60 * 60 * 24));

  return diffDays > 0 ? diffDays : 0;
}

/**
 * Calculates the total cost for a stay given nights and nightly price.
 */
export function calculateTotal(nights: number, pricePerNight: number): number {
  if (nights <= 0 || pricePerNight <= 0) return 0;
  return nights * pricePerNight;
}
