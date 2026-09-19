import React from 'react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

export function BentoGrid({ children, className }) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 auto-rows-[220px]",
        className
      )}
    >
      {children}
    </div>
  );
}

export function BentoCard({
  className,
  title,
  subtitle,
  description,
  badge,
  icon: Icon,
  metric,
  metricLabel,
  headerVisual,
  colSpan = "col-span-1",
  rowSpan = "row-span-1",
  ctaText,
  onClick,
  accentColor = "sky"
}) {
  const accentBorders = {
    sky: "hover:border-sky-500/50 group-hover:shadow-sky-500/10",
    teal: "hover:border-teal-500/50 group-hover:shadow-teal-500/10",
    emerald: "hover:border-emerald-500/50 group-hover:shadow-emerald-500/10",
    indigo: "hover:border-indigo-500/50 group-hover:shadow-indigo-500/10"
  };

  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      onClick={onClick}
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/[0.08] bg-slate-900/60 p-6 backdrop-blur-2xl transition-all duration-300 hover:shadow-2xl cursor-pointer",
        accentBorders[accentColor] || accentBorders.sky,
        colSpan,
        rowSpan,
        className
      )}
    >
      {/* Ambient background glow on hover */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-gradient-to-br from-sky-500/15 via-teal-500/10 to-transparent blur-3xl transition-opacity duration-500 group-hover:opacity-100 opacity-40" />

      {/* Top row: Badge / Icon */}
      <div className="flex items-start justify-between z-10">
        <div className="flex items-center gap-3">
          {Icon && (
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-400 group-hover:bg-sky-500/20 transition-colors">
              <Icon className="h-5 w-5" />
            </div>
          )}
          {badge && (
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
              {badge}
            </span>
          )}
        </div>
        {metric && (
          <div className="text-right">
            <span className="font-mono text-2xl sm:text-3xl font-bold tracking-tight text-white group-hover:text-sky-400 transition-colors">
              {metric}
            </span>
            {metricLabel && (
              <p className="text-[10px] uppercase font-semibold text-muted-foreground tracking-wider">
                {metricLabel}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Center visual or graphic if provided */}
      {headerVisual && <div className="my-2 z-10">{headerVisual}</div>}

      {/* Bottom Content */}
      <div className="z-10 mt-auto pt-4">
        {subtitle && (
          <p className="text-xs font-semibold uppercase tracking-wider text-sky-400 mb-1">
            {subtitle}
          </p>
        )}
        <h4 className="text-lg font-bold text-slate-100 group-hover:text-white transition-colors">
          {title}
        </h4>
        {description && (
          <p className="mt-1 text-xs text-slate-400 leading-relaxed line-clamp-2">
            {description}
          </p>
        )}
      </div>
    </motion.div>
  );
}
