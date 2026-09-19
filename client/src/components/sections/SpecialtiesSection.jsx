import React, { useState } from 'react';
import { HeartPulse, ShieldAlert, Activity, Cpu, ArrowRight, Check, Zap } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

const iconMap = {
  HeartPulse: HeartPulse,
  ShieldAlert: ShieldAlert,
  Activity: Activity,
  Cpu: Cpu
};

export function SpecialtiesSection({ specialties, onSelectSpecialty }) {
  if (!specialties || specialties.length === 0) return null;

  return (
    <section id="specialties" className="py-16 md:py-24 bg-slate-950/40 border-y border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-teal-400 bg-teal-500/10 px-3 py-1 rounded-full border border-teal-500/20">
              Operative Disciplines
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mt-3">
              Clinical Specialties & Interventions
            </h2>
          </div>
          <p className="text-sm text-slate-400 max-w-md">
            Specialized micro-invasive interventions combining state-of-the-art robotic platforms with customized postoperative care.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {specialties.map((spec) => {
            const Icon = iconMap[spec.icon] || Activity;
            return (
              <Card
                key={spec.id}
                glow
                className="group flex flex-col justify-between bg-slate-900/50 hover:bg-slate-900/90 transition-all p-7 rounded-3xl"
              >
                <div>
                  <div className="flex items-center justify-between pb-5 border-b border-white/[0.06]">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-400 group-hover:scale-110 group-hover:bg-sky-500/20 transition-all">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-sky-400">
                          {spec.category}
                        </span>
                        <h3 className="text-xl font-bold text-white tracking-tight">
                          {spec.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <p className="mt-4 text-sm text-slate-300 leading-relaxed">
                    {spec.shortDesc}
                  </p>

                  {/* Clinical Metrics Grid */}
                  <div className="grid grid-cols-3 gap-2 mt-6 p-3 rounded-2xl bg-slate-950/60 border border-white/5">
                    {Object.entries(spec.metrics || {}).map(([key, val]) => (
                      <div key={key} className="text-center">
                        <span className="block font-mono text-sm font-bold text-teal-300">{val}</span>
                        <span className="text-[10px] uppercase font-semibold text-muted-foreground tracking-wider">{key}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Zap className="h-3.5 w-3.5 text-amber-400" />
                    <span className="font-medium text-slate-200">{spec.highlight}</span>
                  </div>

                  <button
                    onClick={() => onSelectSpecialty(spec)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-sky-400 hover:text-sky-300 transition-colors group-hover:translate-x-1"
                  >
                    Consult Procedure <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
