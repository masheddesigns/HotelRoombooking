import React from 'react';
import { Building2 } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-slate-900 text-white rounded-md flex items-center justify-center">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              Hotel Room Booking
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-normal">
              Reserve a room for your stay
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};
