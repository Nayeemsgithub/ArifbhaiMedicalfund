import React from 'react';
import { DollarSign, Receipt, Wallet } from 'lucide-react';

export function LiveSummaryCards({ summary }) {
  if (!summary) return null;

  return (
    <section className="py-6 max-w-7xl mx-auto px-4 sm:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Total Funds Raised */}
        <div className="bg-white p-7 rounded-3xl border border-black shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
            <span className="text-xs font-black uppercase tracking-wider text-black font-mono">
              Total Funds Raised
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-black text-white">
              <DollarSign className="h-5 w-5" />
            </div>
          </div>

          <div className="font-mono text-4xl font-black text-black tracking-tight">
            ৳{(summary.totalRaised || 0).toLocaleString()}
          </div>
        </div>

        {/* Card 2: Medical Expenses Paid */}
        <div className="bg-white p-7 rounded-3xl border border-black shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
            <span className="text-xs font-black uppercase tracking-wider text-black font-mono">
              Medical Expenses Paid
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-black text-white">
              <Receipt className="h-5 w-5" />
            </div>
          </div>

          <div className="font-mono text-4xl font-black text-black tracking-tight">
            ৳{(summary.totalSpent || 0).toLocaleString()}
          </div>
        </div>

        {/* Card 3: Hospital Escrow Balance */}
        <div className="bg-white p-7 rounded-3xl border border-black shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
            <span className="text-xs font-black uppercase tracking-wider text-black font-mono">
              Hospital Escrow Balance
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-black text-white">
              <Wallet className="h-5 w-5" />
            </div>
          </div>

          <div className="font-mono text-4xl font-black text-black tracking-tight">
            ৳{(summary.availableBalance || 0).toLocaleString()}
          </div>
        </div>
      </div>
    </section>
  );
}
