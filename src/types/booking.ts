export interface Room {
  code: string;
  name: string;
  type: string;
  pricePerNight: number;
  maxGuests: number;
}

export interface Booking {
  id: string;
  roomCode: string;
  checkIn: string; // ISO format 'YYYY-MM-DD'
  checkOut: string; // ISO format 'YYYY-MM-DD'
  guestName?: string;
}

export interface StayDetails {
  checkIn: string;
  checkOut: string;
  guestCount: number;
}

export type ValidationErrorType =
  | 'MISSING_CHECK_IN'
  | 'PAST_CHECK_IN'
  | 'MISSING_CHECK_OUT'
  | 'INVALID_RANGE'
  | null;

export interface ValidationResult {
  isValid: boolean;
  errorType: ValidationErrorType;
  message: string | null;
}

export interface BookingSummary {
  selectedRoom: Room | null;
  checkIn: string;
  checkOut: string;
  nights: number;
  pricePerNight: number;
  total: number;
  isValid: boolean;
}

export type RoomStatus = 'Available' | 'Selected' | 'Unavailable' | 'Over capacity';
