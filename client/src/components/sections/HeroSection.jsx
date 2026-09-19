import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Calendar, ArrowRight, Award, Sparkles, HeartPulse, Stethoscope, FileText } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export function HeroSection({ profile, onBookClick }) {
  if (!profile) return null;

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:py-28 radial-glow">
      {/* Background Ambient Decorative Lights */}
      <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-sky-600/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-teal-500/10 blur-[120px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline & Clinical Bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start space-y-6"
          >
            <div className="flex flex-wrap items-center gap-2.5">
              <Badge variant="teal" dot dotPulse>
                Da Vinci Xi Robotic Surgery Certified
              </Badge>
              <Badge variant="glass" className="hidden sm:inline-flex">
                Harvard Medical '08 • Hopkins Fellowship
              </Badge>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.1] text-balance">
              Pioneering <span className="bg-gradient-to-r from-sky-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">Minimally Invasive</span> Robotic Surgery.
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-light">
              {profile.bio}
            </p>

            {/* Quick Action CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button
                variant="glow"
                size="lg"
                icon={Calendar}
                onClick={onBookClick}
                className="text-sm font-semibold tracking-wide uppercase shadow-2xl"
              >
                Schedule Consultation
              </Button>

              <a href="#cases">
                <Button variant="outline" size="lg" icon={ArrowRight} className="text-sm">
                  View Surgical Cases
                </Button>
              </a>
            </div>

            {/* Institution Trust Banner */}
            <div className="pt-6 border-t border-white/[0.08] w-full flex flex-col sm:flex-row items-start sm:items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-sky-400 shrink-0" />
                <span className="text-slate-200 font-medium">{profile.institution}</span>
              </div>
              <span className="hidden sm:inline text-white/20">•</span>
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-teal-400 shrink-0" />
                <span>ABTS Board Certified Thoracic Specialist</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: High-Taste Doctor Visual & Live Vitals Widget */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            {/* Outer Decorative Glow Frame */}
            <div className="relative mx-auto max-w-md rounded-3xl p-1 bg-gradient-to-b from-sky-500/30 via-teal-500/20 to-transparent shadow-2xl shadow-sky-500/10">
              <div className="relative rounded-[22px] overflow-hidden bg-slate-900 border border-white/10">
                {/* Doctor Portrait Image */}
                <div className="relative h-96 w-full overflow-hidden bg-slate-950">
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="h-full w-full object-cover object-top filter contrast-[1.05] brightness-95 transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                  {/* Top Live Status Pill */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <div className="px-3 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-xl border border-white/10 text-xs text-slate-200 flex items-center gap-2 shadow-lg">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                      </span>
                      <span>Apex OR Pavilion Active</span>
                    </div>

                    <div className="h-8 w-8 rounded-full bg-slate-950/80 backdrop-blur-xl border border-white/10 flex items-center justify-center text-sky-400">
                      <Sparkles className="h-4 w-4" />
                    </div>
                  </div>

                  {/* Overlay Surgeon Credentials Card */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-slate-950/80 backdrop-blur-2xl border border-white/10 space-y-1">
                    <h3 className="text-base font-bold text-white tracking-tight">{profile.name}</h3>
                    <p className="text-xs text-sky-300 font-medium">{profile.title}</p>
                    <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-white/10">
                      <span>Experience: <strong className="text-white font-mono">{profile.experienceYears} Years</strong></span>
                      <span>Success: <strong className="text-emerald-400 font-mono">{profile.successRate}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Micro Vitals Bar underneath portrait */}
                <div className="grid grid-cols-2 divide-x divide-white/[0.08] bg-slate-950/90 p-4 text-center border-t border-white/[0.08]">
                  <div>
                    <span className="block font-mono text-xl font-bold text-white">{profile.surgeriesCount}</span>
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Total Interventions</span>
                  </div>
                  <div>
                    <span className="block font-mono text-xl font-bold text-teal-400">{profile.publicationsCount}</span>
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Peer Publications</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
