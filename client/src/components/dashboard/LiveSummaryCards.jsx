import React from 'react';
import { DollarSign, ShieldCheck, Heart, UserCheck, Activity } from 'lucide-react';

export function LiveSummaryCards({ summary }) {
  if (!summary) return null;

  return (
    <section className="py-4 max-w-7xl mx-auto px-4 sm:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: Total Funds Raised */}
        <div className="bg-white p-6 rounded-3xl border border-black shadow-xs space-y-2">
          <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
            <span className="text-xs font-black uppercase tracking-wider text-black font-mono">
              Total Funds Raised
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-black text-white">
              <DollarSign className="h-4 w-4" />
            </div>
          </div>

          <div className="font-mono text-3xl sm:text-4xl font-black text-black tracking-tight">
            ৳{(summary.totalRaised || 0).toLocaleString()}
          </div>
          <p className="text-[11px] font-mono text-neutral-500">Live community contributions</p>
        </div>

        {/* Card 2: Current Clinical Status */}
        <div className="bg-white p-6 rounded-3xl border border-neutral-300 shadow-xs space-y-2">
          <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
            <span className="text-xs font-bold uppercase tracking-wider text-black font-mono">
              Clinical Case Status
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-neutral-100 text-black border border-neutral-300">
              <Activity className="h-4 w-4" />
            </div>
          </div>

          <div className="text-base sm:text-lg font-bold text-black font-sans leading-snug">
            Urgent IHC Confirmation & Staging
          </div>
          <p className="text-[11px] font-mono text-neutral-500">Specialist Oncology Evaluation</p>
        </div>

        {/* Card 3: Direct Recipient Account */}
        <div className="bg-white p-6 rounded-3xl border border-neutral-300 shadow-xs space-y-2">
          <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
            <span className="text-xs font-bold uppercase tracking-wider text-black font-mono">
              Direct Beneficiary
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-neutral-100 text-black border border-neutral-300">
              <ShieldCheck className="h-4 w-4 text-black" />
            </div>
          </div>

          <div className="text-base sm:text-lg font-bold text-black font-sans leading-snug">
            Farhana Aktar (Wife)
          </div>
          <p className="text-[11px] font-mono text-neutral-500">Rupali Bank • bKash • Nagad • Rocket</p>
        </div>
      </div>
    </section>
  );
}
