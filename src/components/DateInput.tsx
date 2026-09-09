import React from 'react';
import { Calendar } from 'lucide-react';
import { ValidationMessage } from './ValidationMessage';

interface DateInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string | null;
  min?: string;
  disabled?: boolean;
  required?: boolean;
  helperText?: string;
}

export const DateInput: React.FC<DateInputProps> = ({
  id,
  label,
  value,
  onChange,
  error,
  min,
  disabled = false,
  required = false,
  helperText,
}) => {
  const errorId = `${id}-error`;
  const helperId = `${id}-helper`;
  const isInvalid = Boolean(error);

  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={id}
        className="text-xs font-semibold uppercase tracking-wider text-slate-700 flex items-center justify-between"
      >
        <span>
          {label}
          {required && <span className="text-rose-500 ml-0.5">*</span>}
        </span>
      </label>

      <div className="relative">
        <input
          type="date"
          id={id}
          value={value}
          min={min}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={isInvalid}
          aria-describedby={
            isInvalid ? errorId : helperText ? helperId : undefined
          }
          className={`w-full px-3 py-2 pr-9 text-sm font-medium text-slate-900 bg-white border rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 ${
            isInvalid
              ? 'border-rose-400 bg-rose-50/20 text-rose-900 focus:ring-rose-500 focus:border-rose-500'
              : value
              ? 'border-slate-300 bg-slate-50/30'
              : 'border-slate-300'
          } ${disabled ? 'opacity-50 cursor-not-allowed bg-slate-100' : ''}`}
        />
        <Calendar className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>

      {helperText && !error && (
        <span id={helperId} className="text-xs text-slate-500 mt-0.5">
          {helperText}
        </span>
      )}

      <ValidationMessage id={errorId} message={error || null} />
    </div>
  );
};
