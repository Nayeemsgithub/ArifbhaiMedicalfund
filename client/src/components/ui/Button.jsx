import React from 'react';
import { cn } from '../../lib/utils';

export function Button({
  children,
  className,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon: Icon,
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center font-bold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] select-none";

  const sizeStyles = {
    sm: "h-8 px-3 text-xs rounded-lg gap-1.5",
    md: "h-10 px-4 text-xs rounded-xl gap-2",
    lg: "h-12 px-6 text-sm rounded-xl gap-2.5",
    icon: "h-9 w-9 rounded-xl"
  };

  const variantStyles = {
    primary:
      "bg-black text-white hover:bg-neutral-800 border border-black shadow-xs",
    glow:
      "bg-black text-white hover:bg-neutral-800 border border-black shadow-xs",
    secondary:
      "bg-neutral-100 text-black hover:bg-neutral-200 border border-neutral-300",
    outline:
      "border border-black bg-white text-black hover:bg-neutral-100 shadow-2xs",
    ghost:
      "text-black hover:bg-neutral-100",
    destructive:
      "bg-black text-white hover:bg-neutral-800 border border-black"
  };

  return (
    <button
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : Icon ? (
        <Icon className="h-4 w-4 shrink-0" />
      ) : null}
      {children}
    </button>
  );
}
