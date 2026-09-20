import React, { useState } from 'react';
import { Building2, Smartphone, Copy, Check, Heart, ShieldCheck, AlertCircle, QrCode } from 'lucide-react';
import { Card } from '../ui/Card';

export function DonationBox({ campaign }) {
  const [copiedKey, setCopiedKey] = useState(null);

  const bankInfo = campaign?.donationInfo?.bank || {
    accountName: "FARHANA AKTAR",
    accountNumber: "2667010010522",
    bankName: "RUPALI BANK PLC",
    branchName: "EKLASHPUR BAZAR BRANCH, NOAKHALI",
    branchCode: "2667",
    routingNumber: "185750941"
  };

  const mfsInfo = campaign?.donationInfo?.mfs || {
    recipientName: "Farhana Aktar (Arif Bhai's Wife)",
    number: "01882716449",
    services: ["bKash", "Nagad", "Rocket"]
  };

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey(null);
    }, 2500);
  };

  return (
    <section id="donate" className="py-12 max-w-7xl mx-auto px-4 sm:px-8">
      <div className="rounded-3xl border-2 border-black bg-white p-6 sm:p-10 shadow-lg space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1 text-xs font-mono font-bold uppercase bg-black text-white px-3 py-1 rounded-full">
                <Heart className="h-3.5 w-3.5 text-white fill-white" /> Emergency Appeal
              </span>
              <span className="text-xs font-mono font-bold text-black bg-neutral-100 px-2.5 py-1 rounded-full border border-neutral-300">
                Direct Family Accounts
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-black">
              Donate to Arif Ahmed's Medical Fund
            </h2>
            <p className="text-sm text-neutral-600 mt-1 max-w-2xl">
              100% of all contributions go directly to Arif Ahmed's wife, Farhana Aktar, for his critical oncology investigations, staging, and cancer treatment.
            </p>
          </div>

          <div className="flex items-center gap-2 p-3 rounded-2xl bg-neutral-100 border border-neutral-300 text-xs font-mono">
            <ShieldCheck className="h-5 w-5 text-black shrink-0" />
            <div>
              <span className="font-bold text-black block">Verified Recipient</span>
              <span className="text-neutral-600">Farhana Aktar (Wife)</span>
            </div>
          </div>
        </div>

        {/* Donation Channels Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 1. Bank Transfer Channel */}
          <div className="rounded-2xl border border-neutral-300 bg-neutral-50 p-6 flex flex-col justify-between space-y-6 hover:border-black transition-colors">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="h-10 w-10 rounded-xl bg-black text-white flex items-center justify-center shadow-xs">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-black">Bank Transfer (Rupali Bank PLC)</h3>
                    <p className="text-xs text-neutral-500">Direct online bank transfer & BEFTN / NPSB</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold uppercase bg-white border border-neutral-300 px-2 py-0.5 rounded text-black">
                  Bank Account
                </span>
              </div>

              <div className="space-y-3 pt-2">
                {/* Account Number Box */}
                <div className="p-3.5 rounded-xl bg-white border border-neutral-300 flex items-center justify-between gap-2">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-mono uppercase text-neutral-500 block">Account Number</span>
                    <span className="text-base sm:text-lg font-mono font-extrabold text-black tracking-wider">
                      {bankInfo.accountNumber}
                    </span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(bankInfo.accountNumber, 'acc')}
                    className="px-3 py-1.5 rounded-lg bg-neutral-100 hover:bg-black hover:text-white border border-neutral-300 text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                    title="Copy Account Number"
                  >
                    {copiedKey === 'acc' ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-black" /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" /> Copy
                      </>
                    )}
                  </button>
                </div>

                {/* Account Details Table */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                  <div className="p-3 rounded-xl bg-white border border-neutral-200">
                    <span className="text-[10px] text-neutral-500 block uppercase">Account Name</span>
                    <span className="font-bold text-black font-sans">{bankInfo.accountName}</span>
                    <span className="text-[10px] text-neutral-500 block font-sans">(Arif Bhai's Wife)</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-neutral-200 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-neutral-500 block uppercase">Routing Number</span>
                      <span className="font-bold text-black">{bankInfo.routingNumber}</span>
                    </div>
                    <button
                      onClick={() => copyToClipboard(bankInfo.routingNumber, 'routing')}
                      className="p-1.5 rounded hover:bg-neutral-100 text-neutral-600 hover:text-black"
                      title="Copy Routing Number"
                    >
                      {copiedKey === 'routing' ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    </button>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-neutral-200 sm:col-span-2">
                    <span className="text-[10px] text-neutral-500 block uppercase">Branch</span>
                    <span className="font-bold text-black font-sans">{bankInfo.branchName}</span>
                    <span className="text-[10px] text-neutral-500 font-mono ml-2">(Code: {bankInfo.branchCode})</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-neutral-200 flex items-center justify-between text-[11px] font-mono text-neutral-600">
              <span>National Bank of Bangladesh • Rupali Bank</span>
              <button
                onClick={() => copyToClipboard(`${bankInfo.accountName}\nAcc: ${bankInfo.accountNumber}\n${bankInfo.bankName}, ${bankInfo.branchName}\nRouting: ${bankInfo.routingNumber}`, 'all-bank')}
                className="text-black font-bold hover:underline cursor-pointer flex items-center gap-1"
              >
                {copiedKey === 'all-bank' ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />} Copy All Bank Info
              </button>
            </div>
          </div>

          {/* 2. Mobile Financial Services (MFS) Channel */}
          <div className="rounded-2xl border border-neutral-300 bg-neutral-50 p-6 flex flex-col justify-between space-y-6 hover:border-black transition-colors">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="h-10 w-10 rounded-xl bg-black text-white flex items-center justify-center shadow-xs">
                    <Smartphone className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-black">Mobile Financial Services</h3>
                    <p className="text-xs text-neutral-500">Send Money / Cash In via bKash, Nagad, Rocket</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  {mfsInfo.services.map((srv) => (
                    <span
                      key={srv}
                      className="text-[10px] font-mono font-bold uppercase bg-white border border-neutral-300 px-1.5 py-0.5 rounded text-black"
                    >
                      {srv}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-3 pt-2">
                {/* Mobile Number Box */}
                <div className="p-3.5 rounded-xl bg-white border border-neutral-300 flex items-center justify-between gap-2">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-mono uppercase text-neutral-500 block">
                      Personal bKash / Nagad / Rocket Number
                    </span>
                    <span className="text-xl sm:text-2xl font-mono font-extrabold text-black tracking-wider">
                      {mfsInfo.number}
                    </span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(mfsInfo.number, 'mfs')}
                    className="px-3.5 py-2 rounded-lg bg-black text-white hover:bg-neutral-800 text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                    title="Copy Number"
                  >
                    {copiedKey === 'mfs' ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-white" /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" /> Copy Number
                      </>
                    )}
                  </button>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-neutral-200 space-y-2">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-neutral-500">Account Holder:</span>
                    <span className="font-bold text-black font-sans">{mfsInfo.recipientName}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-mono pt-1 border-t border-neutral-100">
                    <span className="text-neutral-500">Account Type:</span>
                    <span className="font-bold text-black">Personal (Send Money)</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-neutral-100 border border-neutral-200 text-xs text-neutral-700 flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-black shrink-0 mt-0.5" />
                  <p className="text-[11px] leading-relaxed">
                    Please use <strong>"Send Money"</strong> when transferring via bKash, Nagad, or Rocket to Farhana Aktar's personal account.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-neutral-200 flex items-center justify-between text-[11px] font-mono text-neutral-600">
              <span>Instant MFS Transfer Available 24/7</span>
              <a
                href={`tel:${mfsInfo.number}`}
                className="text-black font-bold hover:underline cursor-pointer"
              >
                Call / Send Money: {mfsInfo.number}
              </a>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="p-4 rounded-2xl bg-neutral-100 border border-neutral-300 text-center text-xs text-neutral-700 space-y-1">
          <p className="font-bold text-black font-sans">
            Every contribution brings Arif Ahmed one step closer to life-saving oncology care and returning to his 2 young sons.
          </p>
          <p className="text-[11px] font-mono text-neutral-500">
            For direct inquiries or verification, contact Farhana Aktar (Wife) at 01882716449.
          </p>
        </div>
      </div>
    </section>
  );
}
