import React, { useState } from 'react';
import { Heart, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Button } from '../ui/Button';
import { Input, Textarea } from '../ui/Input';

export function DonationSection({ onDonationSubmitted }) {
  const [selectedAmount, setSelectedAmount] = useState(100);
  const [customAmount, setCustomAmount] = useState('');
  const [donorName, setDonorName] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const presetAmounts = [25, 50, 100, 250, 500];
  const currentAmount = customAmount ? Number(customAmount) : selectedAmount;

  const handleDonate = async (e) => {
    e.preventDefault();
    if (!currentAmount || currentAmount <= 0) {
      setErrorMsg('Please select or enter a donation amount.');
      return;
    }

    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const res = await fetch('/api/donations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: currentAmount,
          donorName: isAnonymous ? 'Anonymous Supporter' : donorName,
          isAnonymous,
          message: message || 'Sending strength, hope, and prayers for recovery!'
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to complete donation');
      }

      setSuccessMsg(`Thank you! Your donation of $${currentAmount.toLocaleString()} has been recorded in the live public ledger.`);
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });

      if (onDonationSubmitted) {
        onDonationSubmitted(data.donation, data.summary);
      }

      setMessage('');
      setCustomAmount('');
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="donate" className="py-12 max-w-4xl mx-auto px-4 sm:px-8">
      <div className="rounded-3xl border border-black bg-white p-6 sm:p-10 shadow-xs space-y-6">
        <div className="flex flex-col items-center text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-black bg-neutral-100 px-2.5 py-0.5 rounded-full border border-neutral-300 font-mono">
            Direct Medical Relief
          </span>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-black">
            Contribute to Patient Medical Fund
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 max-w-md">
            100% of contributions are deposited directly into hospital escrow for active verified medical treatment.
          </p>
        </div>

        {successMsg ? (
          <div className="p-6 text-center space-y-3 rounded-2xl bg-neutral-50 border border-black">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-black text-white">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-black">Contribution Confirmed!</h3>
            <p className="text-xs text-black font-semibold">{successMsg}</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSuccessMsg(null)}
              className="mt-2 text-xs"
            >
              Make Another Contribution
            </Button>
          </div>
        ) : (
          <form onSubmit={handleDonate} className="space-y-4">
            {errorMsg && (
              <div className="p-3 rounded-xl bg-neutral-100 border border-black text-xs text-black font-bold">
                {errorMsg}
              </div>
            )}

            {/* Preset Amount Chips */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-black block mb-2.5 text-center">
                Select Contribution Amount ($ USD)
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
                {presetAmounts.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => {
                      setSelectedAmount(amt);
                      setCustomAmount('');
                    }}
                    className={`h-12 rounded-2xl font-mono text-sm font-extrabold transition-all duration-150 ${
                      selectedAmount === amt && !customAmount
                        ? 'bg-black text-white shadow-xs border border-black'
                        : 'bg-neutral-100 text-black hover:bg-neutral-200 border border-neutral-300'
                    }`}
                  >
                    ${amt}
                  </button>
                ))}

                <input
                  type="number"
                  min="1"
                  placeholder="Custom $"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setSelectedAmount(null);
                  }}
                  className={`h-12 px-3 rounded-2xl font-mono text-xs font-bold text-center border transition-all ${
                    customAmount
                      ? 'border-black bg-white text-black ring-1 ring-black'
                      : 'border-neutral-300 bg-neutral-100 text-black'
                  }`}
                />
              </div>
            </div>

            {/* Donor Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                label="Your Name (Optional)"
                disabled={isAnonymous}
                placeholder={isAnonymous ? "Anonymous Supporter" : "e.g. Alex Morgan"}
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
              />

              <div className="flex flex-col justify-end pb-2">
                <label className="flex items-center gap-2 text-xs font-medium text-black cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="h-4 w-4 rounded border-neutral-300 text-black focus:ring-black accent-black"
                  />
                  <span>Donate Anonymously (Hide name on public feed)</span>
                </label>
              </div>
            </div>

            <Textarea
              label="Supportive Words of Encouragement"
              rows={2}
              placeholder="Leave a message of hope..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={loading}
              icon={Heart}
              className="w-full text-xs font-black uppercase tracking-wider py-3.5"
            >
              Confirm Donation of ${currentAmount || 0}
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
