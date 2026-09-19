import React, { useState } from 'react';
import { Receipt, ShieldCheck, Search, FileText, Calendar, Building2, Eye, Plus, X, Download, ExternalLink, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { Button } from '../ui/Button';
import { useAuth } from '../../context/AuthContext';

export function ExpenseLedgerTable({ expenses, onOpenAddExpense }) {
  const { isAdmin } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  const filteredExpenses = (expenses || []).filter((exp) => {
    return (
      exp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.vendor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (exp.description && exp.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  const totalFiltered = filteredExpenses.reduce((sum, e) => sum + Number(e.amount || 0), 0);

  const isPdf = (url = '') => {
    const lower = (url || '').toLowerCase();
    return lower.startsWith('data:application/pdf') || lower.endsWith('.pdf') || lower.includes('/pdf');
  };

  const handleOpenReceipt = (exp) => {
    setSelectedReceipt(exp);
    setZoomLevel(1);
  };

  const handleDownload = (receipt) => {
    if (!receipt || !receipt.receiptUrl) return;
    const link = document.createElement('a');
    link.href = receipt.receiptUrl;
    link.download = `${receipt.invoiceNumber || 'receipt'}.${isPdf(receipt.receiptUrl) ? 'pdf' : 'jpg'}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenNewTab = (receipt) => {
    if (!receipt || !receipt.receiptUrl) return;
    window.open(receipt.receiptUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="expenses" className="py-12 max-w-7xl mx-auto px-4 sm:px-8 border-t border-neutral-200">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-black bg-neutral-100 px-2.5 py-0.5 rounded-full border border-neutral-300 font-mono">
            Itemized Clinical Invoices & Verification
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-black mt-2">
            Itemized Medical Expenses
          </h2>
          <p className="text-sm text-neutral-600 mt-1 max-w-xl">
            Public ledger of hospital invoices, chemotherapy disbursements, and lab bills.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Search invoice or vendor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-neutral-300 text-xs text-black placeholder-neutral-400 focus:outline-none focus:border-black transition-colors"
          />
        </div>
      </div>

      {/* Expenses Table or Zero State */}
      {filteredExpenses.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white border border-neutral-300 shadow-xs space-y-3">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-100 text-black">
            <Receipt className="h-6 w-6" />
          </div>
          <h3 className="text-base font-bold text-black">No Expenses Recorded Yet</h3>
          <p className="text-xs text-neutral-500 max-w-md mx-auto">
            All hospital disbursements and pharmacy invoices will appear here in chronological order with attached verified receipts.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredExpenses.map((exp) => (
            <div
              key={exp.id}
              className="p-5 rounded-2xl bg-white border border-neutral-300 hover:border-black transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono font-bold uppercase bg-neutral-100 px-2 py-0.5 rounded border border-neutral-300 text-black">
                    {exp.invoiceNumber}
                  </span>
                  <span className="text-xs text-neutral-500 font-mono">{exp.date}</span>
                </div>
                <h4 className="text-sm sm:text-base font-bold text-black">{exp.title}</h4>
                <div className="flex items-center gap-4 text-xs text-neutral-600 font-mono">
                  <span className="flex items-center gap-1">
                    <Building2 className="h-3.5 w-3.5 text-neutral-400" /> {exp.vendor}
                  </span>
                  {exp.description && (
                    <span className="hidden sm:inline text-neutral-500 truncate max-w-md">
                      • {exp.description}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-5 pt-3 md:pt-0 border-t md:border-t-0 border-neutral-100">
                <div className="text-left md:text-right">
                  <span className="text-xs text-neutral-500 block">Amount Paid</span>
                  <span className="text-lg sm:text-xl font-extrabold font-mono text-black">
                    ৳{Number(exp.amount).toLocaleString()}
                  </span>
                </div>

                {exp.receiptUrl && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleOpenReceipt(exp)}
                    className="text-xs font-bold"
                  >
                    <Eye className="h-3.5 w-3.5" /> View Receipt
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Receipt Modal */}
      {selectedReceipt && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-xs"
          onClick={() => setSelectedReceipt(null)}
        >
          <div
            className="relative w-full max-w-4xl rounded-3xl bg-white border border-black shadow-2xl flex flex-col max-h-[92vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-neutral-200 bg-white">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-black font-bold uppercase bg-neutral-100 px-2 py-0.5 rounded border border-neutral-300">
                    Verified Hospital Receipt
                  </span>
                  <span className="text-xs text-neutral-600 font-mono">Invoice: {selectedReceipt.invoiceNumber}</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-black mt-1">{selectedReceipt.title}</h3>
              </div>

              <div className="flex items-center gap-2">
                {!isPdf(selectedReceipt.receiptUrl) && (
                  <div className="hidden sm:flex items-center gap-1 border border-neutral-300 rounded-xl p-1 bg-neutral-50 mr-2">
                    <button
                      onClick={() => setZoomLevel((prev) => Math.max(0.5, prev - 0.25))}
                      className="p-1 rounded-lg hover:bg-neutral-200 text-black"
                      title="Zoom Out"
                    >
                      <ZoomOut className="h-4 w-4" />
                    </button>
                    <span className="text-[11px] font-mono px-1 min-w-[40px] text-center font-bold text-black">
                      {Math.round(zoomLevel * 100)}%
                    </span>
                    <button
                      onClick={() => setZoomLevel((prev) => Math.min(3, prev + 0.25))}
                      className="p-1 rounded-lg hover:bg-neutral-200 text-black"
                      title="Zoom In"
                    >
                      <ZoomIn className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setZoomLevel(1)}
                      className="p-1 rounded-lg hover:bg-neutral-200 text-black"
                      title="Reset Zoom"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                    </button>
                  </div>
                )}

                <Button
                  variant="outline"
                  size="sm"
                  icon={ExternalLink}
                  onClick={() => handleOpenNewTab(selectedReceipt)}
                  className="text-xs"
                >
                  Open in New Tab
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  icon={Download}
                  onClick={() => handleDownload(selectedReceipt)}
                  className="text-xs"
                >
                  Download
                </Button>

                <button
                  onClick={() => setSelectedReceipt(null)}
                  className="p-2 rounded-xl text-neutral-500 hover:text-black hover:bg-neutral-100 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Content Preview */}
            <div className="flex-1 overflow-auto bg-neutral-100 p-3 sm:p-6 flex items-center justify-center min-h-[300px] max-h-[60vh]">
              {isPdf(selectedReceipt.receiptUrl) ? (
                <div className="w-full h-full min-h-[480px] flex flex-col rounded-2xl overflow-hidden border border-neutral-300 bg-white shadow-inner">
                  <iframe
                    src={selectedReceipt.receiptUrl}
                    title={selectedReceipt.title}
                    className="w-full h-full min-h-[480px] border-0"
                  />
                </div>
              ) : (
                <div className="relative w-full h-full flex items-center justify-center overflow-auto p-2">
                  <img
                    src={selectedReceipt.receiptUrl}
                    alt="Receipt"
                    style={{ transform: `scale(${zoomLevel})` }}
                    className="max-h-[54vh] w-auto max-w-full object-contain mx-auto rounded-xl shadow-xs transition-transform duration-150 origin-center"
                  />
                </div>
              )}
            </div>

            {/* Footer Summary */}
            <div className="p-4 sm:p-5 border-t border-neutral-200 bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-1">
                <div className="flex flex-wrap gap-4 font-mono text-neutral-700">
                  <span>Vendor: <strong className="text-black font-sans">{selectedReceipt.vendor}</strong></span>
                  <span>Date: <strong className="text-black font-sans">{selectedReceipt.date}</strong></span>
                  <span>Amount: <strong className="text-black font-sans">৳{Number(selectedReceipt.amount).toLocaleString()}</strong></span>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setSelectedReceipt(null)}
                  className="text-xs"
                >
                  Close Receipt
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
