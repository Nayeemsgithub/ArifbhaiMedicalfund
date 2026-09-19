import React from 'react';
import { cn } from '../../lib/utils';

export function Input({ className, type = 'text', label, error, ...props }) {
  return (
    <div className="w-full space-y-1.5">
      {label && <label className="text-xs font-bold text-black">{label}</label>}
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-xs text-black placeholder:text-neutral-400 transition-all focus:border-black focus:outline-none focus:ring-1 focus:ring-black disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:opacity-75 shadow-2xs",
          error && "border-black",
          className
        )}
        {...props}
      />
      {error && <span className="text-xs font-bold text-black">{error}</span>}
    </div>
  );
}

export function Textarea({ className, label, error, rows = 3, ...props }) {
  return (
    <div className="w-full space-y-1.5">
      {label && <label className="text-xs font-bold text-black">{label}</label>}
      <textarea
        rows={rows}
        className={cn(
          "flex w-full rounded-xl border border-neutral-300 bg-white px-3 py-2.5 text-xs text-black placeholder:text-neutral-400 transition-all focus:border-black focus:outline-none focus:ring-1 focus:ring-black disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:opacity-75 resize-none shadow-2xs",
          error && "border-black",
          className
        )}
        {...props}
      />
      {error && <span className="text-xs font-bold text-black">{error}</span>}
    </div>
  );
}
