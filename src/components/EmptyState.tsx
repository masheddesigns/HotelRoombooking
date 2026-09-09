import React from 'react';
import { CalendarDays, DoorClosed } from 'lucide-react';

interface EmptyStateProps {
  type: 'dates' | 'rooms' | 'selection';
  title?: string;
  description?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ type, title, description }) => {
  if (type === 'dates') {
    return (
      <div className="bg-slate-50 border border-dashed border-slate-300 rounded-lg p-8 text-center flex flex-col items-center justify-center">
        <div className="w-10 h-10 rounded-full bg-slate-200/60 flex items-center justify-center text-slate-500 mb-3">
          <CalendarDays className="w-5 h-5" />
        </div>
        <h3 className="text-sm font-semibold text-slate-800">
          {title || 'Select stay dates'}
        </h3>
        <p className="text-xs text-slate-500 max-w-sm mt-1">
          {description || 'Choose your check-in and check-out dates to see room availability.'}
        </p>
      </div>
    );
  }

  if (type === 'selection') {
    return (
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 text-center flex flex-col items-center justify-center">
        <div className="w-9 h-9 rounded-full bg-slate-200/50 flex items-center justify-center text-slate-500 mb-2.5">
          <DoorClosed className="w-4 h-4" />
        </div>
        <p className="text-xs text-slate-600 font-medium">
          Select your dates and a room to see your booking total.
        </p>
      </div>
    );
  }

  return null;
};
