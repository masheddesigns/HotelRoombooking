import React, { useState } from 'react';
import { Header } from './components/Header';
import { StayDetails } from './components/StayDetails';
import { RoomList } from './components/RoomList';
import { BookingSummary } from './components/BookingSummary';
import { ROOMS } from './data/rooms';
import { DEMO_EXISTING_BOOKINGS } from './data/bookings';
import { Room, BookingSummary as BookingSummaryType } from './types/booking';
import { validateDates } from './logic/validation';
import { getTodayString } from './logic/dates';
import { calculateNights, calculateTotal } from './logic/booking';
import { isRoomAvailable, isRoomCapacitySufficient } from './logic/availability';

export const App: React.FC = () => {
  // Current date baseline for validation (local calendar day)
  const todayStr = getTodayString();

  // UI States
  const [checkIn, setCheckIn] = useState<string>('');
  const [checkOut, setCheckOut] = useState<string>('');
  const [guestCount, setGuestCount] = useState<number>(2);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

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
  };

  const handleCheckOutChange = (val: string) => {
    setCheckOut(val);
  };

  const handleGuestCountChange = (val: number) => {
    setGuestCount(val);
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
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans antialiased text-slate-900">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
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
            <BookingSummary summary={summary} />
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
