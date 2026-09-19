import React from 'react';
import { BentoGrid, BentoCard } from '../bento/BentoGrid';
import { ShieldCheck, Receipt, DollarSign, Wallet, PieChart, Activity, Sparkles, CheckCircle2 } from 'lucide-react';

export function FinancialBento({ summary }) {
  if (!summary) return null;

  return (
    <section id="transparency" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-8">
      <div className="flex flex-col items-center text-center space-y-3 mb-12">
        <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
          Financial Transparency Engine
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
          Where Every Dollar Goes
        </h2>
        <p className="text-sm sm:text-base text-slate-400 max-w-2xl">
          Real-time reconciliation of community donations against itemized medical bills, pharmacy receipts, and inpatient clinical fees.
        </p>
      </div>

      <BentoGrid>
        {/* Card 1: Total Funds Raised */}
        <BentoCard
          colSpan="md:col-span-2 lg:col-span-2"
          badge="Live Contributions"
          icon={DollarSign}
          metric={`$${summary.totalRaised.toLocaleString()}`}
          metricLabel="Total Community Inflows"
          title="Community Medical Fund"
          description="Cumulative contributions received from verified donors worldwide, directly allocated toward Leo's oncology care."
          accentColor="emerald"
          headerVisual={
            <div className="flex items-center gap-2 mt-2 py-1 px-3 rounded-xl bg-slate-950/60 border border-white/5">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs text-slate-300 font-mono">Reconciled in real time with Hospital Ledger</span>
            </div>
          }
        />

        {/* Card 2: Total Expenses Disbursed */}
        <BentoCard
          colSpan="md:col-span-2 lg:col-span-2"
          badge="Itemized Outflows"
          icon={Receipt}
          metric={`$${summary.totalSpent.toLocaleString()}`}
          metricLabel="Verified Medical Disbursals"
          title="Direct Hospital Payments"
          description="Total funds disbursed directly to Apex Pediatric Pavilion, Boston Children's Hospital, and Dana-Farber laboratories."
          accentColor="teal"
          headerVisual={
            <div className="flex flex-wrap gap-1.5 mt-1">
              <span className="px-2 py-0.5 text-[10px] font-mono bg-teal-500/10 text-teal-300 rounded border border-teal-500/20">Zero Platform Fee Cut</span>
              <span className="px-2 py-0.5 text-[10px] font-mono bg-sky-500/10 text-sky-300 rounded border border-sky-500/20">Direct Hospital Wire</span>
            </div>
          }
        />

        {/* Card 3: Current Available In-Hospital Balance */}
        <BentoCard
          colSpan="md:col-span-1 lg:col-span-1"
          badge="Current Reserves"
          icon={Wallet}
          metric={`$${summary.availableBalance.toLocaleString()}`}
          metricLabel="Available For Next Phase"
          title="Active Care Balance"
          description="Available funds currently held in hospital escrow for upcoming Phase 2 CAR-T cellular infusion therapy."
          accentColor="sky"
        />

        {/* Card 4: Expense Category Distribution Breakdown */}
        <BentoCard
          colSpan="md:col-span-2 lg:col-span-2"
          badge="Allocation Breakdown"
          icon={PieChart}
          title="Clinical Expense Distribution"
          description="Distribution of funds across specialized oncology categories."
          accentColor="indigo"
          headerVisual={
            <div className="space-y-2 mt-2">
              {summary.categoriesBreakdown?.slice(0, 3).map((cat) => (
                <div key={cat.category} className="space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-300 truncate max-w-[200px]">{cat.category}</span>
                    <span className="font-mono text-indigo-300 font-bold">${cat.amount.toLocaleString()} ({cat.percentage}%)</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${cat.percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>
          }
        />

        {/* Card 5: 100% Verification Badge */}
        <BentoCard
          colSpan="md:col-span-1 lg:col-span-1"
          badge="Audit Standard"
          icon={ShieldCheck}
          metric="100%"
          metricLabel="Invoice Audited"
          title="Verified Invoices"
          description="Each medical bill is counter-verified by hospital billing officers before disbursal."
          accentColor="emerald"
        />
      </BentoGrid>
    </section>
  );
}
