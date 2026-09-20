import React from 'react';
import { ShieldCheck, Heart, Anchor, Building2, Calendar, User, ArrowDown, FileText, Camera } from 'lucide-react';
import { Button } from '../ui/Button';

export function FundraiserHero({ campaign, summary }) {
  if (!campaign || !summary) return null;

  return (
    <section className="pt-8 pb-4 max-w-7xl mx-auto px-4 sm:px-8">
      {/* Main Header Card */}
      <div className="p-6 sm:p-10 rounded-3xl bg-white border border-black shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-neutral-200">
          <div className="space-y-3 max-w-3xl">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-black bg-neutral-100 px-3 py-1 rounded-full border border-neutral-300 font-mono flex items-center gap-1.5">
                <Anchor className="h-3.5 w-3.5 text-black" /> Second Officer • Seafarer Fund
              </span>
              <span className="text-xs font-mono font-bold text-black bg-neutral-100 px-2.5 py-1 rounded-full border border-neutral-300">
                M.V. Meghna Fortune
              </span>
              <span className="text-xs font-mono font-bold text-black bg-neutral-100 px-2.5 py-1 rounded-full border border-neutral-300 flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5 text-black" /> Verified Emergency Case
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-black leading-tight">
              Second Officer Arif Ahmed <span className="text-neutral-300 font-light">—</span>{' '}
              <span className="text-neutral-800">Emergency Medical Fund</span>
            </h1>

            <p className="text-sm sm:text-base text-neutral-700 leading-relaxed font-medium">
              37-year-old seafarer and father of two infant sons diagnosed with metastatic malignant melanoma following repatriation from vessel <em>M.V. Meghna Fortune</em>. Urgent appeal for specialist oncology staging, IHC confirmation, and life-saving cancer care.
            </p>

            <div className="flex flex-wrap gap-2 pt-1 text-xs font-mono">
              <span className="bg-neutral-100 text-black px-3 py-1 rounded-lg border border-neutral-300">
                <strong>Diagnosis:</strong> Metastatic Malignant Melanoma (IHC Confirmation in progress)
              </span>
              <span className="bg-neutral-100 text-black px-3 py-1 rounded-lg border border-neutral-300">
                <strong>Family:</strong> Wife Farhana Aktar & 2 Sons (3.5 yrs & 10 mos)
              </span>
            </div>
          </div>

          {/* Action Callouts */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
            <a
              href="#donate"
              className="px-6 py-3.5 rounded-2xl bg-black text-white hover:bg-neutral-800 text-sm font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer text-center"
            >
              <Heart className="h-4 w-4 fill-white" /> Donate to Family
            </a>
            <a
              href="#patient-profile"
              className="px-6 py-3 rounded-2xl bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 text-black text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer text-center"
            >
              <FileText className="h-4 w-4" /> Medical Chronology
            </a>
          </div>
        </div>

        {/* Total Funds Raised Tracker Bar */}
        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-0.5">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-600 font-mono">
              Total Community Funds Raised
            </span>
            <div className="text-3xl sm:text-4xl font-black font-mono text-black tracking-tight">
              ৳{(summary.totalRaised || 0).toLocaleString()}
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-neutral-600">
            <span>Direct to Family: <strong>100% Direct Support</strong></span>
            <span>•</span>
            <a href="#donate" className="text-black font-bold hover:underline flex items-center gap-1">
              Donate Now <Heart className="h-3 w-3 fill-black text-black" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}


