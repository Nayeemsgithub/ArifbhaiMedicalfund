import React, { useState } from 'react';
import { FileCheck, Sparkles, Filter, CheckCircle, Clock, Calendar, UserCheck } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

export function CaseStudiesSection({ cases }) {
  const [activeTag, setActiveTag] = useState('All');

  if (!cases || cases.length === 0) return null;

  const allTags = ['All', ...Array.from(new Set(cases.flatMap((c) => c.tags || [])))];

  const filteredCases =
    activeTag === 'All'
      ? cases
      : cases.filter((c) => c.tags && c.tags.includes(activeTag));

  return (
    <section id="cases" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-sky-400 bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/20">
            Audited Surgical Records
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mt-3">
            Featured Clinical Case Studies
          </h2>
        </div>
        <p className="text-sm text-slate-400 max-w-md">
          Documented surgical outcomes, operative methodologies, and longitudinal patient recovery records.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTag === tag
                ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-500/20 font-bold'
                : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/5'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Cases Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {filteredCases.map((cs) => (
          <Card
            key={cs.id}
            glow
            className="flex flex-col justify-between bg-slate-900/60 p-6 rounded-3xl border-white/10"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="text-[11px] font-mono text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-3 w-3" /> {cs.date}
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-300 border border-sky-500/20">
                  Patient Age {cs.patientAge}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white tracking-tight leading-snug">
                {cs.title}
              </h3>

              <div className="mt-4 space-y-3">
                <div className="p-3 rounded-2xl bg-slate-950/60 border border-white/5">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-rose-400 block mb-1">
                    Pre-Operative Pathology
                  </span>
                  <p className="text-xs text-slate-300">{cs.condition}</p>
                </div>

                <div className="p-3 rounded-2xl bg-slate-950/60 border border-white/5">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-sky-400 block mb-1">
                    Operative Technique
                  </span>
                  <p className="text-xs text-slate-300">{cs.technique}</p>
                </div>

                <div className="p-3 rounded-2xl bg-emerald-950/20 border border-emerald-500/20">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-400 flex items-center gap-1 mb-1">
                    <CheckCircle className="h-3 w-3" /> Clinical Outcome
                  </span>
                  <p className="text-xs text-emerald-200/90 leading-relaxed">{cs.outcome}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap gap-1.5">
                {cs.tags?.map((t) => (
                  <span key={t} className="text-[10px] bg-white/5 text-slate-400 px-2 py-0.5 rounded-md">
                    #{t}
                  </span>
                ))}
              </div>
              <span className="text-[11px] text-muted-foreground font-mono">
                {cs.leadSurgeon}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
