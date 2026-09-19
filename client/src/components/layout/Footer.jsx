import React from 'react';

export function Footer({ campaign }) {
  return (
    <footer className="border-t border-black bg-white py-8 text-neutral-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="space-y-1 text-center sm:text-left">
            <span className="font-bold text-black text-sm">
              {campaign?.patientName ? `${campaign.patientName} Medical Treatment Fund` : 'Medical Treatment Fund'}
            </span>
            <p className="text-neutral-500 text-[11px]">
              Live public accounting & medical transparency portal.
            </p>
          </div>

          <div className="text-center sm:text-right text-[11px] text-neutral-600 font-medium">
            <p>© 2026 All rights reserved to SookTec.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
