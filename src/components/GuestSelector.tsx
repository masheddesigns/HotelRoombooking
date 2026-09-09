import React from 'react';
import { Users, Minus, Plus } from 'lucide-react';

interface GuestSelectorProps {
  id?: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
}

export const GuestSelector: React.FC<GuestSelectorProps> = ({
  id = 'guest-count',
  value,
  onChange,
  min = 1,
  max = 6,
  disabled = false,
}) => {
  const handleDecrement = () => {
    if (value > min) onChange(value - 1);
  };

  const handleIncrement = () => {
    if (value < max) onChange(value + 1);
  };

  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={id}
        className="text-xs font-semibold uppercase tracking-wider text-slate-700 flex items-center gap-1.5"
      >
        <Users className="w-3.5 h-3.5 text-slate-500" />
        <span>Guests</span>
      </label>

      <div className="flex items-center h-[38px] border border-slate-300 rounded-md bg-white p-1">
        <button
          type="button"
          onClick={handleDecrement}
          disabled={disabled || value <= min}
          aria-label="Decrease guests"
          className="w-8 h-full flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>

        <div className="flex-1 text-center font-medium text-sm text-slate-900">
          {value} {value === 1 ? 'Guest' : 'Guests'}
        </div>

        <button
          type="button"
          onClick={handleIncrement}
          disabled={disabled || value >= max}
          aria-label="Increase guests"
          className="w-8 h-full flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>
      <span className="text-xs text-slate-500 mt-0.5">
        Capacity filtering (optional bonus)
      </span>
    </div>
  );
};
