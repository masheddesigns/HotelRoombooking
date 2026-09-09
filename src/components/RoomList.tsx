import React from 'react';
import { Room } from '../types/booking';
import { RoomCard } from './RoomCard';
import { EmptyState } from './EmptyState';

interface RoomListProps {
  rooms: Room[];
  selectedRoom: Room | null;
  onSelectRoom: (room: Room) => void;
  isDateSelectionValid: boolean;
  checkAvailability: (roomCode: string) => boolean;
  checkCapacity: (room: Room) => boolean;
}

export const RoomList: React.FC<RoomListProps> = ({
  rooms,
  selectedRoom,
  onSelectRoom,
  isDateSelectionValid,
  checkAvailability,
  checkCapacity,
}) => {
  return (
    <section aria-labelledby="available-rooms-heading" className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 id="available-rooms-heading" className="text-base font-semibold text-slate-900">
            Available Rooms
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Select a room to proceed with your booking calculation.
          </p>
        </div>
      </div>

      {!isDateSelectionValid ? (
        <EmptyState
          type="dates"
          title="Select dates to view room availability"
          description="Enter valid check-in and check-out dates above to unlock room selection."
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          {rooms.map((room) => {
            const isSelected = selectedRoom?.code === room.code;
            const isAvailable = checkAvailability(room.code);
            const isCapacitySufficient = checkCapacity(room);

            return (
              <RoomCard
                key={room.code}
                room={room}
                isSelected={isSelected}
                isAvailable={isAvailable}
                isCapacitySufficient={isCapacitySufficient}
                onSelect={onSelectRoom}
              />
            );
          })}
        </div>
      )}
    </section>
  );
};
