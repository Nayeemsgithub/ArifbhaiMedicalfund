import React from 'react';
import { Activity, Calendar, User } from 'lucide-react';

export function MedicalJourney({ milestones }) {
  if (!milestones || milestones.length === 0) return null;

  return (
    <section id="journey" className="py-10 max-w-7xl mx-auto px-4 sm:px-8 border-t border-neutral-200">
      <div className="flex flex-col items-center text-center space-y-2 mb-8">
        <span className="text-xs font-bold uppercase tracking-wider text-black bg-neutral-100 px-2.5 py-0.5 rounded-full border border-neutral-300 font-mono">
          Clinical Milestones
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-black">
          Treatment Timeline & Clinical Log
        </h2>
        <p className="text-xs sm:text-sm text-neutral-600 max-w-md">
          Recovery milestones provided by the attending medical team.
        </p>
      </div>

      <div className="relative max-w-2xl mx-auto">
        <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-neutral-300 -translate-x-1/2" />

        <div className="space-y-6">
          {milestones.map((ms, idx) => (
            <div
              key={ms.id || idx}
              className={`relative flex flex-col sm:flex-row items-start ${
                idx % 2 === 0 ? 'sm:flex-row-reverse' : ''
              } gap-4`}
            >
              <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 flex h-7 w-7 items-center justify-center rounded-full bg-black text-white border-2 border-white shadow-xs z-10">
                <Activity className="h-3.5 w-3.5" />
              </div>

              <div className="ml-9 sm:ml-0 sm:w-[calc(50%-1.5rem)]">
                <div className="p-4 rounded-xl bg-white border border-neutral-300 shadow-xs space-y-1.5">
                  <div className="flex items-center justify-between gap-1 pb-1">
                    <span className="text-[10px] font-mono uppercase font-bold text-black bg-neutral-100 px-2 py-0.5 rounded border border-neutral-300">
                      {ms.badge}
                    </span>
                    <span className="text-[11px] font-mono text-neutral-500 flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> {ms.date}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-black">
                    {ms.title}
                  </h4>

                  <p className="text-xs text-neutral-700 leading-relaxed">
                    {ms.description}
                  </p>

                  <div className="pt-2 border-t border-neutral-100 flex items-center gap-1.5 text-[11px] text-neutral-500">
                    <User className="h-3 w-3 text-neutral-400" />
                    <span>{ms.author}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
