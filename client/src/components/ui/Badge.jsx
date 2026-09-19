import React from 'react';
import { cn } from '../../lib/utils';

export function Badge({
  children,
  className,
  variant = 'default',
  dot = false,
  dotPulse = false,
  ...props
}) {
  const baseStyles =
    "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wide transition-colors";

  const variantStyles = {
    default: "bg-neutral-100 text-black border border-neutral-300",
    black: "bg-black text-white border border-black",
    outline: "border border-black text-black bg-white",
    glass: "bg-neutral-100 text-black border border-neutral-200"
  };

  return (
    <span className={cn(baseStyles, variantStyles[variant] || variantStyles.default, className)} {...props}>
      {dot && (
        <span className="relative flex h-2 w-2">
          {dotPulse && (
            <span
              className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75"
            />
          )}
          <span className="relative inline-flex rounded-full h-2 w-2 bg-black" />
        </span>
      )}
      {children}
    </span>
  );
}
