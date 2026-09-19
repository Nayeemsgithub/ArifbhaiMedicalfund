import React from 'react';
import { ShieldCheck, Heart, Sparkles, Building2 } from 'lucide-react';
import { Button } from '../ui/Button';

export function FundraiserHero({ campaign, summary }) {
  if (!campaign || !summary) return null;

  const percent = summary.percentRaised || 0;

  return (
    <section className="pt-8 pb-4 max-w-7xl mx-auto px-4 sm:px-8">
      {/* Main Header in Pure White Card */}
      <div className="p-7 rounded-3xl bg-white border border-black shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-neutral-200">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-black bg-neutral-100 px-3 py-1 rounded-full border border-neutral-300 font-mono">
                Patient Medical Fund
              </span>
              {campaign.hospital && (
                <span className="text-xs font-semibold text-neutral-700 flex items-center gap-1.5">
                  <Building2 className="h-4 w-4 text-black" /> {campaign.hospital}
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-black">
              {campaign.patientName} <span className="text-neutral-300 font-light">—</span> <span>Medical Treatment & Expense Ledger</span>
            </h1>

            <p className="text-sm text-neutral-800 font-medium flex items-center gap-2">
              Diagnosis: <strong className="text-black bg-neutral-100 px-3 py-1 rounded-lg border border-neutral-300">{campaign.diagnosis}</strong>
            </p>
          </div>
        </div>

        {/* Total Funds Raised Tracker */}
        <div className="pt-2 border-t border-neutral-100 flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-600 font-mono">
              Total Funds Raised
            </span>
            <div className="text-3xl sm:text-4xl font-black font-mono text-black tracking-tight">
              ৳{(summary.totalRaised || 0).toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
