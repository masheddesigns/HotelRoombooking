import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ValidationMessageProps {
  message: string | null;
  id?: string;
}

export const ValidationMessage: React.FC<ValidationMessageProps> = ({ message, id }) => {
  if (!message) return null;

  return (
    <div
      id={id}
      role="alert"
      aria-live="polite"
      className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-1.5 rounded-md"
    >
      <AlertCircle className="w-3.5 h-3.5 shrink-0 text-rose-600" />
      <span>{message}</span>
    </div>
  );
};
