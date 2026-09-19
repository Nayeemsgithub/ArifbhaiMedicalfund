import React from 'react';
import { BentoGrid, BentoCard } from '../bento/BentoGrid';
import { HeartPulse, Cpu, ShieldCheck, Star, Activity, Sparkles, Clock, CheckCircle2 } from 'lucide-react';

export function BentoOverview({ profile, onBookClick }) {
  if (!profile) return null;

  return (
    <section id="overview" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-8">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center space-y-3 mb-12">
        <span className="text-xs font-semibold uppercase tracking-widest text-sky-400 bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/20">
          Clinical Excellence At A Glance
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
          Precision Metrics & Robotic Innovation
        </h2>
        <p className="text-sm sm:text-base text-slate-400 max-w-2xl">
          Pioneering surgical workflows engineered to minimize tissue trauma, accelerate recovery, and deliver peak cardiovascular longevity.
        </p>
      </div>

      {/* 21st.dev Style Bento Grid */}
      <BentoGrid>
        {/* Card 1: Main Operative Volume & Success Rate (Wide) */}
        <BentoCard
          colSpan="md:col-span-2 lg:col-span-2"
          rowSpan="row-span-1"
          badge="High-Volume Specialist"
          icon={Activity}
          metric="99.4%"
          metricLabel="Procedure Success"
          title="3,850+ Complex Cardiothoracic Cases"
          description="Consistently audited clinical outcomes surpassing STS national benchmarks across robotic CABG, aortic roots, and valve reconstructions."
          accentColor="sky"
          headerVisual={
            <div className="flex items-center gap-2 mt-2 py-1 px-3 rounded-xl bg-slate-950/60 border border-white/5">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-slate-300 font-mono">0.12% 30-Day Readmission (Top 1% Nationwide)</span>
            </div>
          }
        />

        {/* Card 2: Da Vinci Xi Robotic Precision */}
        <BentoCard
          colSpan="md:col-span-1 lg:col-span-2"
          badge="Surgical Robotics"
          icon={Cpu}
          metric="0.1 mm"
          metricLabel="Tremor Filtration"
          title="Da Vinci Xi Multi-Arm Robotic Console"
          description="Endoscopic 3D 4K HD magnification with 7 degrees of freedom, enabling sub-millimeter arterial suturing through pencil-sized ports."
          accentColor="teal"
          headerVisual={
            <div className="flex gap-2">
              <span className="px-2 py-0.5 text-[10px] font-mono bg-teal-500/10 text-teal-300 rounded border border-teal-500/20">Zero Sternotomy</span>
              <span className="px-2 py-0.5 text-[10px] font-mono bg-sky-500/10 text-sky-300 rounded border border-sky-500/20">3D Optical Zoom</span>
            </div>
          }
        />

        {/* Card 3: Patient Recovery Benchmark */}
        <BentoCard
          colSpan="md:col-span-1 lg:col-span-1"
          badge="Ergonomics"
          icon={Clock}
          metric="4 Days"
          metricLabel="Avg Hospital Stay"
          title="Rapid Recovery Protocol"
          description="Enhanced recovery pathway enabling patient discharge in under 96 hours versus 10-14 days for traditional open sternotomy."
          accentColor="emerald"
        />

        {/* Card 4: Research & Innovation */}
        <BentoCard
          colSpan="md:col-span-2 lg:col-span-2"
          badge="Academic Leadership"
          icon={Sparkles}
          metric="42+"
          metricLabel="Peer Reviewed Papers"
          title="High-Impact Cardiovascular Research"
          description="Lead author in JACC, Lancet Cardiology, and Annals of Thoracic Surgery investigating AI real-time perfusion mapping."
          accentColor="indigo"
          headerVisual={
            <div className="text-[11px] text-slate-400 flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="h-3.5 w-3.5 text-indigo-400" />
              <span>NIH Funded Trial: Intraoperative AI Hemodynamics</span>
            </div>
          }
        />

        {/* Card 5: Patient Satisfaction & Trust */}
        <BentoCard
          colSpan="md:col-span-1 lg:col-span-1"
          badge="Patient Trust"
          icon={Star}
          metric="4.98"
          metricLabel="Out of 5.0 (1,200+ Reviews)"
          title="Top Rated Surgeon"
          description="Recognized by Castle Connolly and Boston Magazine as a Top Doctor in Cardiothoracic Surgery for 7 consecutive years."
          accentColor="sky"
          onClick={onBookClick}
        />
      </BentoGrid>
    </section>
  );
}
