import React from 'react';
import { Room, RoomStatus } from '../types/booking';
import { Check, Users, AlertCircle, CalendarX } from 'lucide-react';

interface RoomCardProps {
  room: Room;
  isSelected: boolean;
  isAvailable: boolean;
  isCapacitySufficient: boolean;
  onSelect: (room: Room) => void;
  disabled?: boolean;
}

export const RoomCard: React.FC<RoomCardProps> = ({
  room,
  isSelected,
  isAvailable,
  isCapacitySufficient,
  onSelect,
  disabled = false,
}) => {
  // Determine overall status
  let status: RoomStatus = 'Available';
  if (!isCapacitySufficient) {
    status = 'Over capacity';
  } else if (!isAvailable) {
    status = 'Unavailable';
  } else if (isSelected) {
    status = 'Selected';
  }

  const isClickable = isAvailable && isCapacitySufficient && !disabled;

  const handleClick = () => {
    if (isClickable) {
      onSelect(room);
    }
  };

  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(room.pricePerNight);

  return (
    <div
      role="button"
      tabIndex={isClickable ? 0 : -1}
      aria-selected={isSelected}
      aria-disabled={!isClickable}
      onClick={handleClick}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && isClickable) {
          e.preventDefault();
          handleClick();
        }
      }}
      className={`relative flex flex-col justify-between p-4 rounded-lg border transition-all duration-150 ${
        status === 'Selected'
          ? 'bg-slate-900/5 border-slate-900 ring-2 ring-slate-900 shadow-xs'
          : status === 'Unavailable'
          ? 'bg-slate-50 border-slate-200 opacity-75 cursor-not-allowed'
          : status === 'Over capacity'
          ? 'bg-amber-50/40 border-amber-200 cursor-not-allowed'
          : 'bg-white border-slate-200 hover:border-slate-400 hover:shadow-xs cursor-pointer'
      }`}
    >
      <div>
        {/* Header: Room Code & Status Badge */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <span className="inline-block text-xs font-mono font-bold tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200">
              {room.code}
            </span>
            <h3 className="text-base font-semibold text-slate-900 mt-1">
              {room.name}
            </h3>
          </div>

          {/* Status Indicator */}
          {status === 'Selected' && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-900 bg-slate-100 border border-slate-300 px-2 py-1 rounded-md">
              <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
              Selected
            </span>
          )}

          {status === 'Unavailable' && (
            <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 bg-slate-200/70 border border-slate-300 px-2 py-1 rounded-md">
              <CalendarX className="w-3.5 h-3.5 text-slate-500" />
              Unavailable
            </span>
          )}

          {status === 'Over capacity' && (
            <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-800 bg-amber-100/80 border border-amber-300 px-2 py-1 rounded-md">
              <AlertCircle className="w-3.5 h-3.5 text-amber-700" />
              Over capacity
            </span>
          )}
        </div>

        {/* Capacity */}
        <div className="flex items-center gap-1.5 text-xs text-slate-600 my-2">
          <Users className="w-3.5 h-3.5 text-slate-400" />
          <span>Up to {room.maxGuests} guests</span>
        </div>
      </div>

      {/* Footer: Price & Selection CTA */}
      <div className="mt-3 pt-3 border-t border-slate-100 flex items-end justify-between">
        <div>
          <div className="text-base font-bold text-slate-900">
            {formattedPrice}
          </div>
          <div className="text-[11px] text-slate-500 font-normal">per night</div>
        </div>

        <div>
          {status === 'Available' && (
            <button
              type="button"
              tabIndex={-1}
              className="text-xs font-semibold px-3 py-1.5 bg-slate-900 text-white rounded hover:bg-slate-800 transition-colors"
            >
              Select
            </button>
          )}

          {status === 'Selected' && (
            <button
              type="button"
              tabIndex={-1}
              className="text-xs font-semibold px-3 py-1.5 bg-slate-200 text-slate-800 rounded border border-slate-300"
            >
              Change
            </button>
          )}
        </div>
      </div>

      {/* Contextual warning state footers */}
      {status === 'Unavailable' && (
        <div className="mt-2 text-[11px] text-slate-500 italic">
          Unavailable for selected dates
        </div>
      )}

      {status === 'Over capacity' && (
        <div className="mt-2 text-[11px] text-amber-700 font-medium">
          Not suitable for {room.maxGuests + 1}+ guests
        </div>
      )}
    </div>
  );
};
