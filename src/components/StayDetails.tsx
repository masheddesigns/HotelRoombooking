import React from 'react';
import { DateInput } from './DateInput';
import { GuestSelector } from './GuestSelector';
import { ValidationResult } from '../types/booking';

interface StayDetailsProps {
  checkIn: string;
  checkOut: string;
  guestCount: number;
  onCheckInChange: (val: string) => void;
  onCheckOutChange: (val: string) => void;
  onGuestCountChange: (val: number) => void;
  validation: ValidationResult;
  todayStr: string;
}

export const StayDetails: React.FC<StayDetailsProps> = ({
  checkIn,
  checkOut,
  guestCount,
  onCheckInChange,
  onCheckOutChange,
  onGuestCountChange,
  validation,
  todayStr,
}) => {
  // Determine specific field errors based on deterministic precedence
  const checkInError =
    validation.errorType === 'MISSING_CHECK_IN' ||
    validation.errorType === 'PAST_CHECK_IN'
      ? validation.message
      : null;

  const checkOutError =
    validation.errorType === 'MISSING_CHECK_OUT' ||
    validation.errorType === 'INVALID_RANGE'
      ? validation.message
      : null;

  return (
    <section aria-labelledby="stay-details-heading" className="bg-white rounded-lg border border-slate-200 p-5 shadow-xs">
      <div className="mb-4">
        <h2 id="stay-details-heading" className="text-base font-semibold text-slate-900">
          Stay Details
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Select check-in and check-out dates to view available rooms.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <DateInput
          id="check-in-date"
          label="Check-in"
          value={checkIn}
          onChange={onCheckInChange}
          error={checkInError}
          min={todayStr}
          required
        />

        <DateInput
          id="check-out-date"
          label="Check-out"
          value={checkOut}
          onChange={onCheckOutChange}
          error={checkOutError}
          min={checkIn || todayStr}
          required
        />

        <GuestSelector
          value={guestCount}
          onChange={onGuestCountChange}
        />
      </div>
    </section>
  );
};
