import React from 'react';
import { BookOpen, ExternalLink, Award, GraduationCap, CheckCircle2, Quote } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

export function ResearchSection({ publications, credentials, testimonials }) {
  return (
    <section id="research" className="py-16 md:py-24 bg-slate-950/50 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Publications */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
                Academic Impact
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight text-white mt-3">
                Peer-Reviewed Publications & Clinical Trials
              </h2>
            </div>

            <div className="space-y-4">
              {publications?.map((pub) => (
                <Card
                  key={pub.id}
                  glow
                  className="bg-slate-900/60 p-5 rounded-2xl border-white/5 hover:border-indigo-500/40 transition-all"
                >
                  <div className="flex items-center justify-between gap-2 pb-2">
                    <span className="text-[11px] font-mono text-indigo-300 font-semibold bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20">
                      {pub.badge}
                    </span>
                    <span className="text-xs font-mono text-muted-foreground">{pub.year}</span>
                  </div>

                  <h3 className="text-base font-bold text-white tracking-tight leading-snug">
                    {pub.title}
                  </h3>

                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 pt-3 border-t border-white/5">
                    <span className="font-medium text-slate-300">{pub.journal}</span>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-teal-400">{pub.citations} Citations</span>
                      <span className="text-sky-400 font-mono text-[11px]">DOI: {pub.doi}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Right: Board Certifications & Academic Pedigree */}
          <div id="credentials" className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                Surgical Pedigree
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight text-white mt-3">
                Credentials & Honors
              </h2>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 space-y-4">
              {credentials?.map((cred, idx) => (
                <div key={idx} className="flex items-start gap-3.5 pb-4 border-b border-white/5 last:border-0 last:pb-0">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{cred.degree}</h4>
                    <p className="text-xs text-slate-400">{cred.school}</p>
                    <span className="inline-block mt-1 font-mono text-[10px] text-sky-400">{cred.year}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Testimonial Quote Spotlight */}
            {testimonials && testimonials[0] && (
              <div id="reviews" className="p-6 rounded-3xl bg-gradient-to-br from-sky-950/40 via-slate-900/60 to-teal-950/40 border border-white/10 relative">
                <Quote className="h-8 w-8 text-sky-400/20 absolute top-4 right-4" />
                <p className="text-sm text-slate-200 italic leading-relaxed">
                  "{testimonials[0].quote}"
                </p>
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <h5 className="text-xs font-bold text-white">{testimonials[0].author}</h5>
                    <span className="text-[11px] text-sky-400">{testimonials[0].role}</span>
                  </div>
                  <div className="flex text-amber-400 text-xs">
                    {'★'.repeat(testimonials[0].rating)}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
