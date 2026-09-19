import React from 'react';
import { Heart, Sparkles } from 'lucide-react';

export function DonorWall({ donations }) {
  if (!donations || donations.length === 0) return null;

  return (
    <section id="donors" className="py-10 max-w-7xl mx-auto px-4 sm:px-8 border-t border-neutral-200">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-black bg-neutral-100 px-2.5 py-0.5 rounded-full border border-neutral-300 font-mono">
            Supporter Messages
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-black mt-1">
            Live Donor Wall & Encouragement
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-neutral-600 max-w-md">
          Heartfelt contributions and encouragement from supporters.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {donations.map((don) => (
          <div
            key={don.id}
            className="bg-white p-5 rounded-2xl border border-neutral-300 shadow-xs hover:border-black transition-all flex flex-col justify-between space-y-3"
          >
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
                <div>
                  <h4 className="text-xs font-bold text-black">
                    {don.donorName}
                  </h4>
                  <span className="text-[10px] text-neutral-500 font-mono">
                    {new Date(don.createdAt).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                </div>

                <span className="font-mono text-sm font-bold text-black bg-neutral-100 px-2.5 py-0.5 rounded-md border border-neutral-300">
                  ৳{Number(don.amount).toLocaleString()}
                </span>
              </div>

              <p className="mt-3 text-xs text-neutral-700 italic leading-relaxed">
                "{don.message}"
              </p>
            </div>

            <div className="pt-2 border-t border-neutral-200 text-[10px] text-black font-semibold flex items-center justify-between">
              <span className="flex items-center gap-1 font-bold">
                <Sparkles className="h-3 w-3 text-black" /> Verified Inflow
              </span>
              <span className="text-neutral-500 font-mono">Direct Hospital Wire</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
