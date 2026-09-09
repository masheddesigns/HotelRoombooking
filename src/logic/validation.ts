import { ValidationResult } from '../types/booking';
import { getTodayString } from './dates';

/**
 * Validates check-in and check-out dates according to strict precedence rules:
 * 1. MISSING_CHECK_IN
 * 2. PAST_CHECK_IN
 * 3. MISSING_CHECK_OUT
 * 4. INVALID_RANGE (checkOut <= checkIn)
 */
export function validateDates(
  checkIn: string,
  checkOut: string,
  today: string = getTodayString()
): ValidationResult {
  // 1. Missing Check-in
  if (!checkIn) {
    return {
      isValid: false,
      errorType: 'MISSING_CHECK_IN',
      message: 'Check-in date is required.',
    };
  }

  // 2. Check-in in the past
  if (checkIn < today) {
    return {
      isValid: false,
      errorType: 'PAST_CHECK_IN',
      message: 'Check-in cannot be in the past.',
    };
  }

  // 3. Missing Check-out
  if (!checkOut) {
    return {
      isValid: false,
      errorType: 'MISSING_CHECK_OUT',
      message: 'Check-out date is required.',
    };
  }

  // 4. Check-out on or before check-in
  if (checkOut <= checkIn) {
    return {
      isValid: false,
      errorType: 'INVALID_RANGE',
      message: 'Check-out must be after check-in.',
    };
  }

  return {
    isValid: true,
    errorType: null,
    message: null,
  };
}
