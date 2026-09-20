import React, { useState } from 'react';
import { Settings, Plus, Trash2, Edit3, CheckCircle2, Save, DollarSign, Receipt, KeyRound, AlertCircle, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input, Textarea } from '../ui/Input';

export function AdminDashboard({
  campaign,
  donations,
  expenses,
  onCampaignUpdated,
  onFundAdded,
  onFundUpdated,
  onFundDeleted,
  onExpenseAdded,
  onExpenseUpdated,
  onExpenseDeleted
}) {
  const { user, logout, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState('funds');

  // Campaign Edit Form State
  const [campForm, setCampForm] = useState({
    patientName: campaign?.patientName || '',
    patientAge: campaign?.patientAge || 37,
    rank: campaign?.rank || 'Second Officer',
    diagnosis: campaign?.diagnosis || '',
    hospital: campaign?.hospital || '',
    leadOncologist: campaign?.leadOncologist || '',
    status: campaign?.status || '',
    location: campaign?.location || ''
  });

  const [savingCamp, setSavingCamp] = useState(false);
  const [campMsg, setCampMsg] = useState(null);

  // Fund (Donation / Inflow) State
  const [showAddFund, setShowAddFund] = useState(false);
  const [savingFund, setSavingFund] = useState(false);
  const [fundMsg, setFundMsg] = useState(null);
  const [newFund, setNewFund] = useState({
    donorName: '',
    amount: '',
    message: '',
    isAnonymous: false
  });

  // Fund Edit State
  const [editingFundId, setEditingFundId] = useState(null);
  const [editFundForm, setEditFundForm] = useState({});

  // Expense State
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [savingExpense, setSavingExpense] = useState(false);
  const [expenseMsg, setExpenseMsg] = useState(null);
  const [newExpense, setNewExpense] = useState({
    title: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    vendor: 'Hospital / Pharmacy',
    description: ''
  });

  // Expense Edit State
  const [editingExpenseId, setEditingExpenseId] = useState(null);
  const [editExpenseForm, setEditExpenseForm] = useState({});

  // Password Change State
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [changingPassword, setChangingPassword] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  if (!isAdmin) return null;

  const handleSaveCampaign = async (e) => {
    e.preventDefault();
    setSavingCamp(true);
    setCampMsg(null);
    try {
      const res = await fetch('/api/campaign', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(campForm)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setCampMsg('Patient profile updated successfully!');
        if (onCampaignUpdated) onCampaignUpdated(data.campaign, data.summary);
      }
    } catch (err) {
      console.error('Failed to update campaign:', err);
    } finally {
      setSavingCamp(false);
    }
  };

  // Fund Operations
  const handleCreateFund = async (e) => {
    e.preventDefault();
    setSavingFund(true);
    setFundMsg(null);
    try {
      const res = await fetch('/api/donations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          donorName: newFund.donorName || 'Direct Contributor',
          amount: Number(newFund.amount),
          message: newFund.message || 'Direct contribution to patient medical fund.',
          isAnonymous: newFund.isAnonymous
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setFundMsg(`Added ৳${Number(newFund.amount).toLocaleString()} to Total Raised!`);
        if (onFundAdded) onFundAdded(data.donation, data.summary);
        setNewFund({
          donorName: '',
          amount: '',
          message: '',
          isAnonymous: false
        });
        setShowAddFund(false);
      }
    } catch (err) {
      console.error('Failed to add fund:', err);
    } finally {
      setSavingFund(false);
    }
  };

  const handleStartEditFund = (fund) => {
    setEditingFundId(fund.id);
    setEditFundForm({
      donorName: fund.donorName || '',
      amount: fund.amount || '',
      message: fund.message || ''
    });
  };

  const handleSaveEditFund = async (id) => {
    setSavingFund(true);
    try {
      const res = await fetch(`/api/donations/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          donorName: editFundForm.donorName,
          amount: Number(editFundForm.amount),
          message: editFundForm.message
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        if (onFundUpdated) onFundUpdated(data.donation, data.summary);
        setEditingFundId(null);
      }
    } catch (err) {
      console.error('Failed to update fund:', err);
    } finally {
      setSavingFund(false);
    }
  };

  const handleDeleteFund = async (id) => {
    if (!confirm('Remove this fund entry? Total raised will recalculate.')) return;
    try {
      const res = await fetch(`/api/donations/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (res.ok && data.success) {
        if (onFundDeleted) onFundDeleted(id, data.summary);
      }
    } catch (err) {
      console.error('Failed to delete fund entry:', err);
    }
  };

  // Expense Operations
  const handleCreateExpense = async (e) => {
    e.preventDefault();
    setSavingExpense(true);
    setExpenseMsg(null);
    try {
      const res = await fetch('/api/expenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newExpense.title.trim(),
          category: 'Medical Treatment',
          amount: Number(newExpense.amount),
          date: newExpense.date,
          vendor: newExpense.vendor.trim() || 'Hospital / Clinic',
          invoiceNumber: `EXP-${Date.now().toString().slice(-6)}`,
          description: newExpense.description.trim() || 'Medical care and clinical expense'
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setExpenseMsg(`Recorded ৳${Number(newExpense.amount).toLocaleString()} in Medical Expenses!`);
        if (onExpenseAdded) onExpenseAdded(data.expense, data.summary);
        setNewExpense({
          title: '',
          amount: '',
          date: new Date().toISOString().split('T')[0],
          vendor: 'Hospital / Pharmacy',
          description: ''
        });
        setShowAddExpense(false);
      }
    } catch (err) {
      console.error('Failed to record expense:', err);
    } finally {
      setSavingExpense(false);
    }
  };

  const handleStartEditExpense = (exp) => {
    setEditingExpenseId(exp.id);
    setEditExpenseForm({
      title: exp.title || '',
      amount: exp.amount || '',
      date: exp.date || '',
      vendor: exp.vendor || '',
      description: exp.description || ''
    });
  };

  const handleSaveEditExpense = async (id) => {
    setSavingExpense(true);
    try {
      const res = await fetch(`/api/expenses/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: editExpenseForm.title,
          amount: Number(editExpenseForm.amount),
          date: editExpenseForm.date,
          vendor: editExpenseForm.vendor,
          description: editExpenseForm.description
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        if (onExpenseUpdated) onExpenseUpdated(data.expense, data.summary);
        setEditingExpenseId(null);
      }
    } catch (err) {
      console.error('Failed to update expense:', err);
    } finally {
      setSavingExpense(false);
    }
  };

  const handleDeleteExpense = async (id) => {
    if (!confirm('Delete this medical expense? Total spent and remaining balance will recalculate.')) return;
    try {
      const res = await fetch(`/api/expenses/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (res.ok && data.success) {
        if (onExpenseDeleted) onExpenseDeleted(id, data.summary);
      }
    } catch (err) {
      console.error('Failed to delete expense:', err);
    }
  };

  // Password Operations
  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordMsg(null);

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError('New password and confirmation do not match.');
      return;
    }

    if (passwordForm.newPassword.length < 4) {
      setPasswordError('New password must be at least 4 characters long.');
      return;
    }

    setChangingPassword(true);
    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword
        })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to change password');
      }

      setPasswordMsg('Admin password updated successfully! Please use your new password next time you log in.');
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (err) {
      setPasswordError(err.message);
    } finally {
      setChangingPassword(false);
    }
  };

  return (
    <section id="admin-panel" className="py-6 bg-neutral-100 border-b border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-4">
        {/* Admin Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-white border border-black shadow-xs">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-black text-white">
              <Settings className="h-4 w-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-black">Admin Control Center</h3>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-black text-white">
                  Logged in as {user?.username || 'Asif'}
                </span>
              </div>
              <p className="text-xs text-neutral-600">Add, edit, or delete funds raised and medical expenses</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={logout}
              className="text-xs"
            >
              Sign Out
            </Button>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab('funds')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'funds'
                ? 'bg-black text-white shadow-xs border border-black'
                : 'bg-white text-black hover:bg-neutral-200 border border-neutral-300'
            }`}
          >
            💰 Add & Manage Funds ({donations?.length || 0})
          </button>
          <button
            onClick={() => setActiveTab('expenses')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'expenses'
                ? 'bg-black text-white shadow-xs border border-black'
                : 'bg-white text-black hover:bg-neutral-200 border border-neutral-300'
            }`}
          >
            💸 Add & Manage Expenses ({expenses?.length || 0})
          </button>
          <button
            onClick={() => setActiveTab('campaign')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'campaign'
                ? 'bg-black text-white shadow-xs border border-black'
                : 'bg-white text-black hover:bg-neutral-200 border border-neutral-300'
            }`}
          >
            👤 Edit Patient Info & Case Profile
          </button>
          <button
            onClick={() => setActiveTab('password')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'password'
                ? 'bg-black text-white shadow-xs border border-black'
                : 'bg-white text-black hover:bg-neutral-200 border border-neutral-300'
            }`}
          >
            🔐 Change Password
          </button>
        </div>

        {/* Tab 1: Add & Manage Funds */}
        {activeTab === 'funds' && (
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-black">Total Funds Raised Management</h4>
                <p className="text-xs text-neutral-600">Add, edit, or remove fund contributions to update Total Funds Raised</p>
              </div>
              <Button
                variant="primary"
                size="sm"
                icon={Plus}
                onClick={() => setShowAddFund(!showAddFund)}
              >
                {showAddFund ? 'Close' : 'Add Fund Entry'}
              </Button>
            </div>

            {fundMsg && (
              <div className="p-3 rounded-xl bg-neutral-100 border border-black flex items-center justify-between text-xs font-bold text-black">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-black" /> {fundMsg}
                </span>
                <button onClick={() => setFundMsg(null)} className="text-neutral-500 hover:text-black">Dismiss</button>
              </div>
            )}

            {/* Add New Fund Form */}
            {showAddFund && (
              <Card className="p-5 bg-white rounded-2xl border border-black shadow-xs">
                <form onSubmit={handleCreateFund} className="space-y-3">
                  <h5 className="text-xs font-bold text-black uppercase tracking-wide">Record New Fund Inflow</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Input
                      label="Amount (৳ BDT) *"
                      type="number"
                      min="1"
                      required
                      placeholder="e.g. 50000"
                      value={newFund.amount}
                      onChange={(e) => setNewFund({ ...newFund, amount: e.target.value })}
                    />
                    <Input
                      label="Contributor / Source Name (Optional)"
                      placeholder="e.g. Community Donor / Direct Inflow"
                      value={newFund.donorName}
                      onChange={(e) => setNewFund({ ...newFund, donorName: e.target.value })}
                    />
                  </div>

                  <Textarea
                    label="Message / Note (Optional)"
                    rows={2}
                    placeholder="e.g. Sent via Rupali Bank / bKash to Farhana Aktar"
                    value={newFund.message}
                    onChange={(e) => setNewFund({ ...newFund, message: e.target.value })}
                  />

                  <div className="flex justify-end gap-2 pt-1">
                    <Button type="button" variant="outline" size="sm" onClick={() => setShowAddFund(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" variant="primary" size="sm" isLoading={savingFund} icon={DollarSign}>
                      Add to Total Raised
                    </Button>
                  </div>
                </form>
              </Card>
            )}

            {/* Funds List */}
            {(!donations || donations.length === 0) ? (
              <div className="p-8 text-center bg-white rounded-2xl border border-neutral-300 text-xs text-neutral-600">
                No funds currently recorded. Click <strong>"Add Fund Entry"</strong> above to record contributions.
              </div>
            ) : (
              <div className="space-y-2">
                {donations.map((don) => (
                  <div
                    key={don.id}
                    className="p-3.5 rounded-xl bg-white border border-neutral-300 shadow-xs flex flex-col justify-between gap-3"
                  >
                    {editingFundId === don.id ? (
                      <div className="space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <Input
                            label="Amount (৳ BDT) *"
                            type="number"
                            value={editFundForm.amount}
                            onChange={(e) => setEditFundForm({ ...editFundForm, amount: e.target.value })}
                          />
                          <Input
                            label="Contributor Name"
                            value={editFundForm.donorName}
                            onChange={(e) => setEditFundForm({ ...editFundForm, donorName: e.target.value })}
                          />
                        </div>
                        <Textarea
                          label="Note / Message"
                          rows={2}
                          value={editFundForm.message}
                          onChange={(e) => setEditFundForm({ ...editFundForm, message: e.target.value })}
                        />
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" onClick={() => setEditingFundId(null)}>
                            Cancel
                          </Button>
                          <Button variant="primary" size="sm" icon={Save} isLoading={savingFund} onClick={() => handleSaveEditFund(don.id)}>
                            Save Changes
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-black text-xs">{don.donorName || 'Direct Contributor'}</span>
                            <span className="text-[10px] font-mono bg-neutral-100 text-black px-1.5 py-0.5 rounded border border-neutral-300">
                              {new Date(don.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                            </span>
                          </div>
                          <p className="text-xs text-neutral-600">{don.message || 'Direct contribution'}</p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <span className="font-mono text-sm font-bold text-black bg-neutral-100 px-3 py-1 rounded-xl border border-neutral-300">
                            +৳{Number(don.amount).toLocaleString()}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            icon={Edit3}
                            onClick={() => handleStartEditFund(don)}
                            className="text-xs"
                            title="Edit fund entry"
                          >
                            Edit
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            icon={Trash2}
                            onClick={() => handleDeleteFund(don.id)}
                            className="text-xs"
                            title="Delete fund entry"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Add & Manage Expenses */}
        {activeTab === 'expenses' && (
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-black">Total Medical Expenses Management</h4>
                <p className="text-xs text-neutral-600">Add, edit, or delete medical expenses to update Total Expenses and Remaining Balance</p>
              </div>
              <Button
                variant="primary"
                size="sm"
                icon={Plus}
                onClick={() => setShowAddExpense(!showAddExpense)}
              >
                {showAddExpense ? 'Close' : 'Record Expense'}
              </Button>
            </div>

            {expenseMsg && (
              <div className="p-3 rounded-xl bg-neutral-100 border border-black flex items-center justify-between text-xs font-bold text-black">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-black" /> {expenseMsg}
                </span>
                <button onClick={() => setExpenseMsg(null)} className="text-neutral-500 hover:text-black">Dismiss</button>
              </div>
            )}

            {/* Add New Expense Form */}
            {showAddExpense && (
              <Card className="p-5 bg-white rounded-2xl border border-black shadow-xs">
                <form onSubmit={handleCreateExpense} className="space-y-3">
                  <h5 className="text-xs font-bold text-black uppercase tracking-wide">Record New Medical Expense</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <Input
                      label="Expense Title / Description *"
                      required
                      placeholder="e.g. PET-CT Scan & Liver Biopsy"
                      value={newExpense.title}
                      onChange={(e) => setNewExpense({ ...newExpense, title: e.target.value })}
                    />
                    <Input
                      label="Amount (৳ BDT) *"
                      type="number"
                      min="1"
                      required
                      placeholder="e.g. 35000"
                      value={newExpense.amount}
                      onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                    />
                    <Input
                      label="Date *"
                      type="date"
                      required
                      value={newExpense.date}
                      onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Input
                      label="Hospital / Lab / Vendor (Optional)"
                      placeholder="e.g. Diagnostic Center / Apollo"
                      value={newExpense.vendor}
                      onChange={(e) => setNewExpense({ ...newExpense, vendor: e.target.value })}
                    />
                    <Input
                      label="Notes / Procedure (Optional)"
                      placeholder="e.g. Core biopsy histopathology & IHC testing"
                      value={newExpense.description}
                      onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-1">
                    <Button type="button" variant="outline" size="sm" onClick={() => setShowAddExpense(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" variant="primary" size="sm" isLoading={savingExpense} icon={Receipt}>
                      Record Expense
                    </Button>
                  </div>
                </form>
              </Card>
            )}

            {/* Expenses List */}
            {(!expenses || expenses.length === 0) ? (
              <div className="p-8 text-center bg-white rounded-2xl border border-neutral-300 text-xs text-neutral-600">
                No medical expenses currently recorded. Click <strong>"Record Expense"</strong> above to record hospital or clinical costs.
              </div>
            ) : (
              <div className="space-y-2">
                {expenses.map((exp) => (
                  <div
                    key={exp.id}
                    className="p-3.5 rounded-xl bg-white border border-neutral-300 shadow-xs flex flex-col justify-between gap-3"
                  >
                    {editingExpenseId === exp.id ? (
                      <div className="space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <Input
                            label="Title *"
                            value={editExpenseForm.title}
                            onChange={(e) => setEditExpenseForm({ ...editExpenseForm, title: e.target.value })}
                          />
                          <Input
                            label="Amount (৳ BDT) *"
                            type="number"
                            value={editExpenseForm.amount}
                            onChange={(e) => setEditExpenseForm({ ...editExpenseForm, amount: e.target.value })}
                          />
                          <Input
                            label="Date"
                            type="date"
                            value={editExpenseForm.date}
                            onChange={(e) => setEditExpenseForm({ ...editExpenseForm, date: e.target.value })}
                          />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <Input
                            label="Hospital / Vendor"
                            value={editExpenseForm.vendor}
                            onChange={(e) => setEditExpenseForm({ ...editExpenseForm, vendor: e.target.value })}
                          />
                          <Input
                            label="Description / Notes"
                            value={editExpenseForm.description}
                            onChange={(e) => setEditExpenseForm({ ...editExpenseForm, description: e.target.value })}
                          />
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" onClick={() => setEditingExpenseId(null)}>
                            Cancel
                          </Button>
                          <Button variant="primary" size="sm" icon={Save} isLoading={savingExpense} onClick={() => handleSaveEditExpense(exp.id)}>
                            Save Changes
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-black text-xs">{exp.title}</span>
                            <span className="text-[10px] font-mono bg-neutral-100 text-black px-1.5 py-0.5 rounded border border-neutral-300">
                              {exp.date}
                            </span>
                          </div>
                          <p className="text-xs text-neutral-600">{exp.vendor} {exp.description && `• ${exp.description}`}</p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <span className="font-mono text-sm font-bold text-black bg-neutral-100 px-3 py-1 rounded-xl border border-neutral-300">
                            -৳{Number(exp.amount).toLocaleString()}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            icon={Edit3}
                            onClick={() => handleStartEditExpense(exp)}
                            className="text-xs"
                            title="Edit expense entry"
                          >
                            Edit
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            icon={Trash2}
                            onClick={() => handleDeleteExpense(exp.id)}
                            className="text-xs"
                            title="Delete expense entry"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Edit Patient Details */}
        {activeTab === 'campaign' && (
          <Card className="bg-white p-5 rounded-2xl border border-black shadow-xs">
            <form onSubmit={handleSaveCampaign} className="space-y-3.5">
              <div className="flex items-center justify-between pb-2.5 border-b border-neutral-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-black">Update Patient & Clinical Parameters</h4>
                {campMsg && (
                  <span className="text-xs text-black font-bold flex items-center gap-1 bg-neutral-100 px-2.5 py-0.5 rounded border border-neutral-300">
                    <CheckCircle2 className="h-3.5 w-3.5" /> {campMsg}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Input
                  label="Patient Name *"
                  value={campForm.patientName}
                  onChange={(e) => setCampForm({ ...campForm, patientName: e.target.value })}
                />
                <Input
                  label="Patient Age"
                  type="number"
                  value={campForm.patientAge}
                  onChange={(e) => setCampForm({ ...campForm, patientAge: e.target.value })}
                />
                <Input
                  label="Rank / Designation"
                  value={campForm.rank}
                  onChange={(e) => setCampForm({ ...campForm, rank: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input
                  label="Diagnosis *"
                  value={campForm.diagnosis}
                  onChange={(e) => setCampForm({ ...campForm, diagnosis: e.target.value })}
                />
                <Input
                  label="Treating Facility / Specialist"
                  value={campForm.hospital}
                  onChange={(e) => setCampForm({ ...campForm, hospital: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input
                  label="Lead Doctor / Oncologist"
                  value={campForm.leadOncologist}
                  onChange={(e) => setCampForm({ ...campForm, leadOncologist: e.target.value })}
                />
                <Input
                  label="Location"
                  value={campForm.location}
                  onChange={(e) => setCampForm({ ...campForm, location: e.target.value })}
                />
              </div>

              <div className="flex justify-end pt-1">
                <Button type="submit" variant="primary" size="md" isLoading={savingCamp} icon={Save}>
                  Save & Update Patient Profile
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Tab 4: Security & Change Password */}
        {activeTab === 'password' && (
          <Card className="bg-white p-5 rounded-2xl border border-black shadow-xs max-w-xl">
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div className="pb-2 border-b border-neutral-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-black">Change Admin Password</h4>
                <p className="text-xs text-neutral-600 mt-0.5">
                  You must enter your current password to set a new password.
                </p>
              </div>

              {passwordMsg && (
                <div className="p-3 rounded-xl bg-neutral-100 border border-black flex items-start gap-2 text-black text-xs font-bold">
                  <CheckCircle2 className="h-4 w-4 text-black shrink-0 mt-0.5" />
                  <span>{passwordMsg}</span>
                </div>
              )}

              {passwordError && (
                <div className="p-3 rounded-xl bg-neutral-100 border border-black flex items-start gap-2 text-black text-xs font-bold">
                  <AlertCircle className="h-4 w-4 text-black shrink-0 mt-0.5" />
                  <span>{passwordError}</span>
                </div>
              )}

              <Input
                label="Current Password *"
                type="password"
                required
                placeholder="Enter current password"
                value={passwordForm.currentPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input
                  label="New Password *"
                  type="password"
                  required
                  placeholder="Enter new password"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                />
                <Input
                  label="Confirm New Password *"
                  type="password"
                  required
                  placeholder="Repeat new password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                />
              </div>

              <div className="flex justify-end pt-1">
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  isLoading={changingPassword}
                  icon={KeyRound}
                >
                  Update Admin Password
                </Button>
              </div>
            </form>
          </Card>
        )}
      </div>
    </section>
  );
}
