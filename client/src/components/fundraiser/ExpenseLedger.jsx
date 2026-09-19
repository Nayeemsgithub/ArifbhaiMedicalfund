import React, { useState } from 'react';
import { Receipt, ShieldCheck, Plus, CheckCircle, Search, FileText, Calendar, Building2, Tag } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Input, Textarea } from '../ui/Input';

export function ExpenseLedger({ expenses, onExpenseAdded }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [newExpense, setNewExpense] = useState({
    title: '',
    category: 'Chemotherapy & Medications',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    vendor: '',
    invoiceNumber: '',
    description: ''
  });

  const categories = [
    'All',
    'Chemotherapy & Medications',
    'Hospital Stay & ICU',
    'Diagnostics & Labs',
    'Surgery & Procedures',
    'Supportive Care & Pharmacy'
  ];

  const filteredExpenses = (expenses || []).filter((exp) => {
    const matchesCategory =
      selectedCategory === 'All' || exp.category === selectedCategory;
    const matchesSearch =
      exp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.vendor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalFiltered = filteredExpenses.reduce((sum, e) => sum + Number(e.amount || 0), 0);

  const handleAddExpense = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/expenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newExpense)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        if (onExpenseAdded) onExpenseAdded(data.expense, data.summary);
        setShowAddModal(false);
        setNewExpense({
          title: '',
          category: 'Chemotherapy & Medications',
          amount: '',
          date: new Date().toISOString().split('T')[0],
          vendor: '',
          invoiceNumber: '',
          description: ''
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="expenses" className="py-16 md:py-24 bg-slate-950/60 border-y border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-teal-400 bg-teal-500/10 px-3 py-1 rounded-full border border-teal-500/20">
              Public Accounting Ledger
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mt-3">
              Itemized & Verified Medical Expenses
            </h2>
            <p className="text-sm text-slate-400 mt-2 max-w-xl">
              Every invoice is matched with clinical records and audited prior to payment. Donors can inspect exact breakdown entries below.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="md"
              icon={Plus}
              onClick={() => setShowAddModal(true)}
              className="text-xs font-semibold"
            >
              Add Hospital Invoice
            </Button>
          </div>
        </div>

        {/* Filters & Search Toolbar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20 font-bold'
                    : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full lg:w-72">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search invoices, vendors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-slate-900/80 pl-10 pr-4 py-2 text-xs text-white placeholder:text-muted-foreground focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-400"
            />
          </div>
        </div>

        {/* Expense Summary Pill */}
        <div className="flex items-center justify-between p-4 mb-6 rounded-2xl bg-slate-900/40 border border-white/5 text-xs text-slate-300">
          <span className="flex items-center gap-2">
            <Receipt className="h-4 w-4 text-teal-400" />
            <span>Showing <strong>{filteredExpenses.length}</strong> audited expenses</span>
          </span>
          <span className="font-mono text-sm font-bold text-teal-300">
            Total Filtered: ${totalFiltered.toLocaleString()}
          </span>
        </div>

        {/* Itemized Expenses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredExpenses.map((exp) => (
            <Card
              key={exp.id}
              glow
              className="flex flex-col justify-between bg-slate-900/70 p-6 rounded-3xl border-white/10"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/20">
                    {exp.category}
                  </span>
                  <span className="text-xl font-mono font-extrabold text-white">
                    ${exp.amount.toLocaleString()}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-100 leading-snug">
                  {exp.title}
                </h3>

                <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                  {exp.description}
                </p>

                <div className="mt-4 pt-3 border-t border-white/5 space-y-1.5 text-xs text-slate-300">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Building2 className="h-3.5 w-3.5 text-sky-400 shrink-0" />
                    <span className="truncate">{exp.vendor}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span className="flex items-center gap-1">
                      <FileText className="h-3 w-3 text-teal-400" /> {exp.invoiceNumber}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-muted-foreground" /> {exp.date}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px]">
                <span className="flex items-center gap-1 text-emerald-400 font-medium">
                  <ShieldCheck className="h-3.5 w-3.5" /> {exp.verifiedBy || 'Hospital Verified'}
                </span>
                <span className="text-sky-400 font-mono text-[10px]">Direct Disbursed</span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Add Verified Expense Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-3xl bg-slate-900 border border-white/10 p-7 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Receipt className="h-5 w-5 text-teal-400" /> Record Verified Hospital Expense
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddExpense} className="space-y-4">
              <Input
                label="Procedure / Expense Title *"
                required
                placeholder="e.g. Chemotherapy Vials Phase 2"
                value={newExpense.title}
                onChange={(e) => setNewExpense({ ...newExpense, title: e.target.value })}
              />

              <div className="grid grid-cols-2 gap-4">
                <div className="w-full space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Category *
                  </label>
                  <select
                    className="flex h-11 w-full rounded-xl border border-border/80 bg-background/60 px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none"
                    value={newExpense.category}
                    onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                  >
                    {categories.filter((c) => c !== 'All').map((c) => (
                      <option key={c} value={c} className="bg-slate-900 text-white">
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <Input
                  label="Amount ($ USD) *"
                  type="number"
                  required
                  min="1"
                  placeholder="e.g. 4500"
                  value={newExpense.amount}
                  onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Vendor / Hospital *"
                  required
                  placeholder="e.g. Boston Children's"
                  value={newExpense.vendor}
                  onChange={(e) => setNewExpense({ ...newExpense, vendor: e.target.value })}
                />
                <Input
                  label="Invoice Number *"
                  required
                  placeholder="e.g. INV-2025-0899"
                  value={newExpense.invoiceNumber}
                  onChange={(e) => setNewExpense({ ...newExpense, invoiceNumber: e.target.value })}
                />
              </div>

              <Textarea
                label="Clinical Details / Medical Justification"
                rows={2}
                placeholder="Details of medication, diagnostic imaging, or procedure..."
                value={newExpense.description}
                onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
              />

              <div className="flex justify-end gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="glow"
                  size="md"
                  isLoading={isSubmitting}
                >
                  Add to Public Ledger
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
