import React from 'react';
import { cn } from '../../lib/utils';

export function Card({ children, className, ...props }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-neutral-300 bg-white p-6 shadow-xs transition-all duration-150",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className, ...props }) {
  return <div className={cn("flex flex-col space-y-1.5 pb-4", className)} {...props}>{children}</div>;
}

export function CardTitle({ children, className, ...props }) {
  return <h3 className={cn("text-lg font-bold tracking-tight text-black", className)} {...props}>{children}</h3>;
}

export function CardDescription({ children, className, ...props }) {
  return <p className={cn("text-xs text-neutral-600 leading-relaxed", className)} {...props}>{children}</p>;
}

export function CardContent({ children, className, ...props }) {
  return <div className={cn("pt-0", className)} {...props}>{children}</div>;
}
