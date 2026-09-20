import React from 'react';
import { ShieldCheck, Heart, Anchor, Building2, Calendar, User, ArrowDown, FileText, Users } from 'lucide-react';
import { Button } from '../ui/Button';

export function FundraiserHero({ campaign, summary }) {
  if (!campaign || !summary) return null;

  return (
    <section className="pt-8 pb-4 max-w-7xl mx-auto px-4 sm:px-8">
      {/* Main Header Card */}
      <div className="p-6 sm:p-10 rounded-3xl bg-white border border-black shadow-xs space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-8 border-b border-neutral-200">
          
          {/* Left Column: Story & Callout */}
          <div className="lg:col-span-8 space-y-4">
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
              <span className="bg-neutral-100 text-black px-3 py-1 rounded-lg border border-neutral-300 flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5 text-black" />
                <strong>Family:</strong> Wife Farhana Aktar & 2 Sons (3.5 yrs & 10 mos)
              </span>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="#donate"
                className="px-6 py-3.5 rounded-2xl bg-black text-white hover:bg-neutral-800 text-sm font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer text-center"
              >
                <Heart className="h-4 w-4 fill-white" /> Donate to Family
              </a>
              <a
                href="#patient-profile"
                className="px-6 py-3.5 rounded-2xl bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 text-black text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer text-center"
              >
                <FileText className="h-4 w-4" /> View Patient Story & Photos
              </a>
            </div>
          </div>

          {/* Right Column: Authentic Patient Portrait Card */}
          <div className="lg:col-span-4 flex flex-col items-center">
            <div className="relative w-full max-w-sm rounded-3xl overflow-hidden border-2 border-black bg-neutral-50 shadow-md group">
              <img
                src="/images/arif-uniform.jpg"
                alt="Second Officer Arif Ahmed in Uniform"
                className="w-full h-72 object-cover object-top filter contrast-[1.05] transition-transform duration-300 group-hover:scale-105"
              />
              
              {/* Overlay Badge */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white leading-tight">Second Officer Arif Ahmed</h4>
                    <p className="text-[11px] font-mono text-neutral-300">15 Years at Sea • M.V. Meghna Fortune</p>
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-white text-black px-2 py-0.5 rounded shadow-xs">
                    Verified
                  </span>
                </div>
              </div>
            </div>

            {/* Sub-thumbnail family preview */}
            <div className="mt-3 flex items-center gap-3 w-full max-w-sm p-2 rounded-2xl bg-neutral-50 border border-neutral-200">
              <img
                src="/images/arif-family.jpg"
                alt="Arif with family"
                className="w-12 h-12 rounded-xl object-cover border border-neutral-300 shrink-0"
              />
              <div className="text-[11px] leading-tight">
                <span className="font-bold text-black block">Wife & 2 Young Sons</span>
                <span className="text-neutral-500 font-mono text-[10px]">Elder: 3.5 yrs • Baby: 10 mos</span>
              </div>
            </div>
          </div>

        </div>

        {/* Total Funds Raised Tracker Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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

