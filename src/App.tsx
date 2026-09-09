import React, { useState } from 'react';
import { Header } from './components/Header';
import { StayDetails } from './components/StayDetails';
import { RoomList } from './components/RoomList';
import { BookingSummary } from './components/BookingSummary';
import { ROOMS } from './data/rooms';
import { DEMO_EXISTING_BOOKINGS } from './data/bookings';
import { Room, BookingSummary as BookingSummaryType } from './types/booking';
import { validateDates } from './logic/validation';
import { getTodayString, addDaysISO } from './logic/dates';
import { calculateNights, calculateTotal } from './logic/booking';
import { isRoomAvailable, isRoomCapacitySufficient } from './logic/availability';
import { Sparkles, RefreshCw } from 'lucide-react';

export const App: React.FC = () => {
  // Current date baseline for validation (local calendar day)
  const todayStr = getTodayString();

  // UI States
  const [checkIn, setCheckIn] = useState<string>('');
  const [checkOut, setCheckOut] = useState<string>('');
  const [guestCount, setGuestCount] = useState<number>(2);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);

  // Pure logic calculations
  const validation = validateDates(checkIn, checkOut, todayStr);
  const isDateSelectionValid = validation.isValid;

  const nights = isDateSelectionValid ? calculateNights(checkIn, checkOut) : 0;

  // Selected room validity checks
  const isSelectedRoomAvailable = selectedRoom
    ? isRoomAvailable(selectedRoom.code, checkIn, checkOut, DEMO_EXISTING_BOOKINGS)
    : false;

  const isSelectedRoomCapacityValid = selectedRoom
    ? isRoomCapacitySufficient(selectedRoom, guestCount)
    : false;

  // Derive the valid selection deterministically (no syncing effect):
  // a room only counts as selected while dates, availability, and capacity all hold.
  const effectiveSelectedRoom =
    selectedRoom &&
    isDateSelectionValid &&
    isSelectedRoomAvailable &&
    isSelectedRoomCapacityValid
      ? selectedRoom
      : null;

  const pricePerNight = effectiveSelectedRoom ? effectiveSelectedRoom.pricePerNight : 0;
  const total = effectiveSelectedRoom ? calculateTotal(nights, pricePerNight) : 0;

  // Booking summary contract
  const summary: BookingSummaryType = {
    selectedRoom: effectiveSelectedRoom,
    checkIn,
    checkOut,
    nights,
    pricePerNight,
    total,
    isValid:
      isDateSelectionValid &&
      Boolean(effectiveSelectedRoom) &&
      isSelectedRoomAvailable &&
      isSelectedRoomCapacityValid &&
      total > 0,
  };

  // Availability & Capacity checking callbacks
  const checkAvailability = (roomCode: string) => {
    return isRoomAvailable(roomCode, checkIn, checkOut, DEMO_EXISTING_BOOKINGS);
  };

  const checkCapacity = (room: Room) => {
    return isRoomCapacitySufficient(room, guestCount);
  };

  // Event Handlers
  const handleCheckInChange = (val: string) => {
    setCheckIn(val);
    setIsConfirmed(false);
  };

  const handleCheckOutChange = (val: string) => {
    setCheckOut(val);
    setIsConfirmed(false);
  };

  const handleGuestCountChange = (val: number) => {
    setGuestCount(val);
    setIsConfirmed(false);
  };

  const handleSelectRoom = (room: Room) => {
    // Guard against selecting without valid dates, or unavailable/over-capacity rooms
    if (!isDateSelectionValid) return;
    const available = checkAvailability(room.code);
    const capacity = checkCapacity(room);
    if (!available || !capacity) return;

    if (effectiveSelectedRoom?.code === room.code) {
      setSelectedRoom(null);
    } else {
      setSelectedRoom(room);
    }
    setIsConfirmed(false);
  };

  const handleConfirm = () => {
    if (summary.isValid) {
      setIsConfirmed(true);
    }
  };

  // Quick preset helper for rapid verification (today + 3 nights)
  const handleLoadSampleDates = () => {
    setCheckIn(todayStr);
    setCheckOut(addDaysISO(todayStr, 3));
    setIsConfirmed(false);
  };

  const handleReset = () => {
    setCheckIn('');
    setCheckOut('');
    setGuestCount(2);
    setSelectedRoom(null);
    setIsConfirmed(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans antialiased text-slate-900">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Helper bar for quick testing / initial state toggle */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white border border-slate-200 px-4 py-2.5 rounded-lg text-xs">
          <div className="flex items-center gap-2 text-slate-600">
            <span className="font-semibold text-slate-900">Demo Testing Controls:</span>
            <span>Current Date baseline set to {todayStr}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleLoadSampleDates}
              className="inline-flex items-center gap-1 font-medium text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-slate-500" />
              Set Sample Dates (3 nights)
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1 font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
              Reset
            </button>
          </div>
        </div>

        {/* Stay Details Section */}
        <StayDetails
          checkIn={checkIn}
          checkOut={checkOut}
          guestCount={guestCount}
          onCheckInChange={handleCheckInChange}
          onCheckOutChange={handleCheckOutChange}
          onGuestCountChange={handleGuestCountChange}
          validation={validation}
          todayStr={todayStr}
        />

        {/* Two column desktop layout: Left = Available Rooms, Right = Booking Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-2">
            <RoomList
              rooms={ROOMS}
              selectedRoom={effectiveSelectedRoom}
              onSelectRoom={handleSelectRoom}
              isDateSelectionValid={isDateSelectionValid}
              checkAvailability={checkAvailability}
              checkCapacity={checkCapacity}
            />
          </div>

          <div className="lg:col-span-1">
            <BookingSummary
              summary={summary}
              onConfirm={handleConfirm}
              isConfirmed={isConfirmed}
            />
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-200 bg-white py-4 mt-auto text-center text-xs text-slate-500">
        Raintech Software Limited — Hotel Room Booking Coding Assessment
      </footer>
    </div>
  );
};

export default App;
