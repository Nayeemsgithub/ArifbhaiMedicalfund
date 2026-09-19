import React, { useState } from 'react';
import { Calendar, CheckCircle2, Send, AlertCircle, Clock, ShieldCheck, HeartPulse } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Button } from '../ui/Button';
import { Input, Textarea } from '../ui/Input';
import { Badge } from '../ui/Badge';

export function BookingSection({ specialties, onAppointmentCreated, selectedSpecialty }) {
  const [formData, setFormData] = useState({
    patientName: '',
    patientEmail: '',
    patientPhone: '',
    specialtyId: selectedSpecialty ? selectedSpecialty.id : 'spec-1',
    reason: '',
    preferredDate: '',
    urgency: 'routine'
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit appointment');
      }

      setSuccessMsg('Consultation request confirmed! Our clinical coordinator will contact you within 2 business hours.');
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });

      if (onAppointmentCreated) {
        onAppointmentCreated(data.appointment);
      }

      // Reset form
      setFormData({
        patientName: '',
        patientEmail: '',
        patientPhone: '',
        specialtyId: 'spec-1',
        reason: '',
        preferredDate: '',
        urgency: 'routine'
      });
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="book" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-8">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/80 p-8 sm:p-12 backdrop-blur-2xl shadow-2xl">
        {/* Glow ambient background */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 -bottom-20 h-72 w-72 rounded-full bg-teal-500/10 blur-3xl" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Info Column */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-teal-400 bg-teal-500/10 px-3 py-1 rounded-full border border-teal-500/20">
                Direct Scheduling
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mt-3 leading-tight">
                Request a Surgical Consultation
              </h2>
              <p className="mt-4 text-sm text-slate-300 leading-relaxed">
                Connect directly with Dr. Elena Vance's surgical triage team for second opinions, complex case reviews, or robotic intervention scheduling.
              </p>
            </div>

            <div className="space-y-3 p-4 rounded-2xl bg-slate-950/60 border border-white/5 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>HIPAA-Compliant & Encrypted Clinical Intake</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-sky-400 shrink-0" />
                <span>Priority Response within 2 to 4 Business Hours</span>
              </div>
              <div className="flex items-center gap-2">
                <HeartPulse className="h-4 w-4 text-rose-400 shrink-0" />
                <span>Telehealth & In-Person Boston Pavilion Available</span>
              </div>
            </div>

            <div className="text-xs text-muted-foreground pt-4 border-t border-white/5">
              <span>Emergency Acute Aortic Referrals: </span>
              <a href="tel:+18004529899" className="text-rose-400 font-mono font-bold hover:underline">
                +1 (800) 452-9899
              </a>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-4">
              {successMsg && (
                <div className="p-4 rounded-2xl bg-emerald-950/50 border border-emerald-500/30 flex items-start gap-3 text-emerald-200 text-sm">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{successMsg}</span>
                </div>
              )}

              {errorMsg && (
                <div className="p-4 rounded-2xl bg-rose-950/50 border border-rose-500/30 flex items-start gap-3 text-rose-200 text-sm">
                  <AlertCircle className="h-5 w-5 text-rose-400 shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Full Name *"
                  required
                  placeholder="e.g. Eleanor Rigby"
                  value={formData.patientName}
                  onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                />
                <Input
                  label="Email Address *"
                  type="email"
                  required
                  placeholder="e.g. eleanor@example.com"
                  value={formData.patientEmail}
                  onChange={(e) => setFormData({ ...formData, patientEmail: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Phone Number *"
                  type="tel"
                  required
                  placeholder="+1 (555) 000-0000"
                  value={formData.patientPhone}
                  onChange={(e) => setFormData({ ...formData, patientPhone: e.target.value })}
                />
                <Input
                  label="Preferred Date *"
                  type="date"
                  required
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="w-full space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Clinical Discipline
                  </label>
                  <select
                    className="flex h-11 w-full rounded-xl border border-border/80 bg-background/60 px-4 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    value={formData.specialtyId}
                    onChange={(e) => setFormData({ ...formData, specialtyId: e.target.value })}
                  >
                    {specialties?.map((s) => (
                      <option key={s.id} value={s.id} className="bg-slate-900 text-white">
                        {s.title}
                      </option>
                    ))}
                    <option value="general" className="bg-slate-900 text-white">Other / General Second Opinion</option>
                  </select>
                </div>

                <div className="w-full space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Consultation Urgency
                  </label>
                  <select
                    className="flex h-11 w-full rounded-xl border border-border/80 bg-background/60 px-4 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    value={formData.urgency}
                    onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                  >
                    <option value="routine" className="bg-slate-900 text-white">Routine (Within 1-2 Weeks)</option>
                    <option value="priority" className="bg-slate-900 text-white">Priority (Within 3-5 Days)</option>
                    <option value="urgent" className="bg-slate-900 text-white">Urgent Clinical Review (24-48 Hours)</option>
                  </select>
                </div>
              </div>

              <Textarea
                label="Clinical Summary / Symptoms / Reason for Referral *"
                required
                rows={3}
                placeholder="Describe cardiovascular diagnosis, current imaging, or specific surgical procedure questions..."
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              />

              <Button
                type="submit"
                variant="glow"
                size="lg"
                isLoading={loading}
                icon={Send}
                className="w-full uppercase font-bold tracking-wider text-sm mt-2"
              >
                Submit Consultation Request
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
