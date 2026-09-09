import React from 'react';
import { BookingSummary as BookingSummaryType } from '../types/booking';
import { EmptyState } from './EmptyState';
import { CheckCircle2, ArrowRight } from 'lucide-react';

interface BookingSummaryProps {
  summary: BookingSummaryType;
  onConfirm: () => void;
  isConfirmed: boolean;
}

export const BookingSummary: React.FC<BookingSummaryProps> = ({
  summary,
  onConfirm,
  isConfirmed,
}) => {
  const { selectedRoom, checkIn, checkOut, nights, pricePerNight, total, isValid } = summary;

  const formattedRate = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(pricePerNight);

  const formattedTotal = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(total);

  return (
    <aside aria-label="Booking summary" className="bg-white rounded-lg border border-slate-200 p-5 shadow-xs flex flex-col justify-between sticky top-6">
      <div>
        <h2 className="text-base font-semibold text-slate-900 mb-4 pb-3 border-b border-slate-100 flex items-center justify-between">
          <span>Booking Summary</span>
          {isValid && (
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
              Ready
            </span>
          )}
        </h2>

        {!isValid || !selectedRoom ? (
          <EmptyState type="selection" />
        ) : (
          <div className="space-y-4">
            {/* Room Details */}
            <div className="bg-slate-50 p-3 rounded-md border border-slate-200/80">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold bg-slate-900 text-white px-1.5 py-0.5 rounded">
                  {selectedRoom.code}
                </span>
                <span className="text-xs font-medium text-slate-600">
                  Max {selectedRoom.maxGuests} guests
                </span>
              </div>
              <div className="text-sm font-semibold text-slate-900 mt-1">
                {selectedRoom.name}
              </div>
            </div>

            {/* Stay Dates */}
            <div className="space-y-1.5 text-xs">
              <div className="text-slate-500 font-medium">Stay Duration</div>
              <div className="flex items-center justify-between font-medium text-slate-800 bg-slate-50 px-3 py-2 rounded border border-slate-200">
                <span>{checkIn}</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                <span>{checkOut}</span>
              </div>
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-2 text-xs pt-2 border-t border-slate-100">
              <div className="flex justify-between text-slate-600">
                <span>Nights</span>
                <span className="font-semibold text-slate-900">{nights} {nights === 1 ? 'night' : 'nights'}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Rate per night</span>
                <span className="font-medium text-slate-900">{formattedRate}</span>
              </div>
            </div>

            {/* Total */}
            <div className="pt-3 border-t border-slate-200 flex items-baseline justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-700 block">Total Amount</span>
                <span className="text-[11px] text-slate-500">Includes all applicable charges</span>
              </div>
              <div className="text-xl font-bold text-slate-900 tracking-tight">
                {formattedTotal}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Primary Action Button */}
      <div className="mt-6 pt-4 border-t border-slate-100">
        {isConfirmed ? (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-md text-xs font-medium flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Selection verified! Ready for booking integration.</span>
          </div>
        ) : (
          <button
            type="button"
            onClick={onConfirm}
            disabled={!isValid || !selectedRoom}
            className="w-full py-2.5 px-4 bg-slate-900 text-white font-semibold text-sm rounded-md hover:bg-slate-800 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
          >
            Confirm Selection
          </button>
        )}
      </div>
    </aside>
  );
};
