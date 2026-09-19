import React, { useState } from 'react';
import { Settings, Edit3, Plus, Trash2, CheckCircle2, Upload, Save, DollarSign, Wallet, KeyRound, AlertCircle, FileText, Eye, Download, ExternalLink, ZoomIn, ZoomOut, RotateCcw, X, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input, Textarea } from '../ui/Input';

export function AdminDashboard({
  campaign,
  expenses,
  donations,
  documents,
  onCampaignUpdated,
  onExpenseAdded,
  onExpenseUpdated,
  onExpenseDeleted,
  onFundAdded,
  onFundDeleted,
  onDocumentDeleted,
  onOpenUploadDoc
}) {
  const { user, logout, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState('funds');
  const [adminPreviewDoc, setAdminPreviewDoc] = useState(null);
  const [adminZoomLevel, setAdminZoomLevel] = useState(1);

  const docList = documents || [];

  const isPdf = (doc) => {
    if (!doc) return false;
    const url = (doc.fileUrl || doc.previewImage || '').toLowerCase();
    const type = (doc.type || '').toLowerCase();
    const title = (doc.title || '').toLowerCase();
    return url.startsWith('data:application/pdf') ||
           url.endsWith('.pdf') ||
           url.includes('/pdf') ||
           type.includes('pdf') ||
           title.endsWith('.pdf');
  };

  const handleOpenDoc = (doc) => {
    setAdminPreviewDoc(doc);
    setAdminZoomLevel(1);
  };

  const handleDeleteDoc = async (id) => {
    if (!confirm('Permanently remove this medical document / clinical record?')) return;
    try {
      const res = await fetch(`/api/documents/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (res.ok) {
        if (onDocumentDeleted) onDocumentDeleted(id);
        if (adminPreviewDoc?.id === id) setAdminPreviewDoc(null);
      }
    } catch (err) {
      console.error('Failed to delete document:', err);
    }
  };

  const handleDownloadDoc = (doc) => {
    if (!doc) return;
    const link = document.createElement('a');
    link.href = doc.fileUrl || doc.previewImage;
    link.download = `${doc.title || 'medical_document'}.${isPdf(doc) ? 'pdf' : 'jpg'}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenNewTab = (doc) => {
    if (!doc) return;
    const url = doc.fileUrl || doc.previewImage;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Campaign Edit Form State
  const [campForm, setCampForm] = useState({
    patientName: campaign?.patientName || '',
    patientAge: campaign?.patientAge || 0,
    diagnosis: campaign?.diagnosis || '',
    hospital: campaign?.hospital || '',
    leadOncologist: campaign?.leadOncologist || '',
    targetGoal: campaign?.targetGoal || 50000,
    status: campaign?.status || '',
    story: campaign?.story || ''
  });

  const [savingCamp, setSavingCamp] = useState(false);
  const [campMsg, setCampMsg] = useState(null);

  // Expense Edit/Add State
  const [editingExpId, setEditingExpId] = useState(null);
  const [editExpForm, setEditExpForm] = useState({});
  const [savingExp, setSavingExp] = useState(false);

  // New Expense Form State
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [newExp, setNewExp] = useState({
    title: '',
    category: 'General Medical',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    vendor: '',
    invoiceNumber: '',
    description: ''
  });

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
        setCampMsg('Dashboard & metrics updated!');
        if (onCampaignUpdated) onCampaignUpdated(data.campaign, data.summary);
      }
    } catch (err) {
      console.error('Failed to update campaign:', err);
    } finally {
      setSavingCamp(false);
    }
  };

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
          message: newFund.message || 'Direct contribution to total fund.',
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

  const handleDeleteFund = async (id) => {
    if (!confirm('Remove this fund entry? Total raised will update.')) return;
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

  const handleStartEditExpense = (exp) => {
    setEditingExpId(exp.id);
    setEditExpForm({ ...exp });
  };

  const handleSaveEditExpense = async (id) => {
    setSavingExp(true);
    try {
      const res = await fetch(`/api/expenses/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editExpForm)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        if (onExpenseUpdated) onExpenseUpdated(data.expense, data.summary);
        setEditingExpId(null);
      }
    } catch (err) {
      console.error('Failed to update expense:', err);
    } finally {
      setSavingExp(false);
    }
  };

  const handleDeleteExpense = async (id) => {
    if (!confirm('Delete this expense entry?')) return;
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

  const handleCreateExpense = async (e) => {
    e.preventDefault();
    setSavingExp(true);
    try {
      const res = await fetch('/api/expenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newExp)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        if (onExpenseAdded) onExpenseAdded(data.expense, data.summary);
        setShowAddExpense(false);
        setNewExp({
          title: '',
          category: 'General Medical',
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
      setSavingExp(false);
    }
  };

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
              <p className="text-xs text-neutral-600">Add funds raised, record hospital expenses, update metrics & upload documentation</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              icon={Upload}
              onClick={onOpenUploadDoc}
              className="text-xs font-bold"
            >
              Upload Doc
            </Button>
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
            📋 Manage Expenses ({expenses?.length || 0})
          </button>
          <button
            onClick={() => setActiveTab('documents')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'documents'
                ? 'bg-black text-white shadow-xs border border-black'
                : 'bg-white text-black hover:bg-neutral-200 border border-neutral-300'
            }`}
          >
            📁 Manage Documents ({docList.length})
          </button>
          <button
            onClick={() => setActiveTab('campaign')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'campaign'
                ? 'bg-black text-white shadow-xs border border-black'
                : 'bg-white text-black hover:bg-neutral-200 border border-neutral-300'
            }`}
          >
            ✏️ Edit Patient Info & Target
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

        {/* Tab 0: Add & Manage Funds */}
        {activeTab === 'funds' && (
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-black">Total Funds Raised Management</h4>
                <p className="text-xs text-neutral-600">Add funds received (donations, grants, wire transfers) to increase Total Funds Raised</p>
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
                      placeholder="e.g. Community Fundraiser / Direct Inflow"
                      value={newFund.donorName}
                      onChange={(e) => setNewFund({ ...newFund, donorName: e.target.value })}
                    />
                  </div>

                  <Textarea
                    label="Notes / Description (Optional)"
                    rows={2}
                    placeholder="e.g. Direct bank transfer to hospital escrow account"
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
                No funds currently recorded. Click <strong>"Add Fund Entry"</strong> above to add money to Total Funds Raised.
              </div>
            ) : (
              <div className="space-y-2">
                {donations.map((don) => (
                  <div
                    key={don.id}
                    className="p-3.5 rounded-xl bg-white border border-neutral-300 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-black text-xs">{don.donorName || 'Direct Contributor'}</span>
                        <span className="text-[10px] font-mono bg-neutral-100 text-black px-1.5 py-0.5 rounded border border-neutral-300">
                          {new Date(don.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-600">{don.message || 'Direct contribution'}</p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className="font-mono text-sm font-bold text-black bg-neutral-100 px-3 py-1 rounded-xl border border-neutral-300">
                        +৳{Number(don.amount).toLocaleString()}
                      </span>
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
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 1: Edit Campaign Details */}
        {activeTab === 'campaign' && (
          <Card className="bg-white p-5 rounded-2xl border border-black shadow-xs">
            <form onSubmit={handleSaveCampaign} className="space-y-3.5">
              <div className="flex items-center justify-between pb-2.5 border-b border-neutral-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-black">Update Dashboard Parameters</h4>
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
                  label="Target Goal (৳ BDT) *"
                  type="number"
                  value={campForm.targetGoal}
                  onChange={(e) => setCampForm({ ...campForm, targetGoal: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input
                  label="Diagnosis *"
                  value={campForm.diagnosis}
                  onChange={(e) => setCampForm({ ...campForm, diagnosis: e.target.value })}
                />
                <Input
                  label="Treating Hospital"
                  value={campForm.hospital}
                  onChange={(e) => setCampForm({ ...campForm, hospital: e.target.value })}
                />
              </div>

              <div className="flex justify-end pt-1">
                <Button type="submit" variant="primary" size="md" isLoading={savingCamp} icon={Save}>
                  Save & Update Live Dashboard
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Tab 2: Manage Expenses */}
        {activeTab === 'expenses' && (
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h4 className="text-xs font-bold uppercase tracking-wider text-black">Ledger Entries Management</h4>
              <Button
                variant="primary"
                size="sm"
                icon={Plus}
                onClick={() => setShowAddExpense(!showAddExpense)}
              >
                {showAddExpense ? 'Close' : 'Add Expense'}
              </Button>
            </div>

            {/* Add New Expense Form */}
            {showAddExpense && (
              <Card className="p-5 bg-white rounded-2xl border border-black shadow-xs">
                <form onSubmit={handleCreateExpense} className="space-y-3">
                  <h5 className="text-xs font-bold text-black uppercase tracking-wide">Record Itemized Medical Expense</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <Input
                      label="Title *"
                      required
                      placeholder="e.g. Chemotherapy Vials"
                      value={newExp.title}
                      onChange={(e) => setNewExp({ ...newExp, title: e.target.value })}
                    />
                    <Input
                      label="Amount (৳ BDT) *"
                      type="number"
                      required
                      placeholder="e.g. 45000"
                      value={newExp.amount}
                      onChange={(e) => setNewExp({ ...newExp, amount: e.target.value })}
                    />
                    <Input
                      label="Date *"
                      type="date"
                      required
                      value={newExp.date}
                      onChange={(e) => setNewExp({ ...newExp, date: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Input
                      label="Vendor / Hospital *"
                      required
                      placeholder="e.g. Hospital Pharmacy / ICU"
                      value={newExp.vendor}
                      onChange={(e) => setNewExp({ ...newExp, vendor: e.target.value })}
                    />
                    <Input
                      label="Invoice Number *"
                      required
                      placeholder="e.g. INV-2025-0891"
                      value={newExp.invoiceNumber}
                      onChange={(e) => setNewExp({ ...newExp, invoiceNumber: e.target.value })}
                    />
                  </div>

                  <Textarea
                    label="Description *"
                    rows={2}
                    placeholder="Describe procedure details or medication..."
                    value={newExp.description}
                    onChange={(e) => setNewExp({ ...newExp, description: e.target.value })}
                  />

                  <div className="flex justify-end gap-2 pt-1">
                    <Button type="button" variant="outline" size="sm" onClick={() => setShowAddExpense(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" variant="primary" size="sm" isLoading={savingExp}>
                      Post Expense to Ledger
                    </Button>
                  </div>
                </form>
              </Card>
            )}

            {/* Expenses List */}
            {expenses.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-2xl border border-neutral-300 text-xs text-neutral-600">
                No expenses currently recorded in the ledger. Click <strong>"Add Expense"</strong> above to record the first entry.
              </div>
            ) : (
              <div className="space-y-2">
                {expenses.map((exp) => (
                  <div
                    key={exp.id}
                    className="p-3.5 rounded-xl bg-white border border-neutral-300 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"
                  >
                    {editingExpId === exp.id ? (
                      <div className="w-full space-y-2.5">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <Input
                            label="Title"
                            value={editExpForm.title}
                            onChange={(e) => setEditExpForm({ ...editExpForm, title: e.target.value })}
                          />
                          <Input
                            label="Amount (৳ BDT)"
                            type="number"
                            value={editExpForm.amount}
                            onChange={(e) => setEditExpForm({ ...editExpForm, amount: e.target.value })}
                          />
                          <Input
                            label="Date"
                            type="date"
                            value={editExpForm.date}
                            onChange={(e) => setEditExpForm({ ...editExpForm, date: e.target.value })}
                          />
                        </div>
                        <Textarea
                          label="Description"
                          rows={2}
                          value={editExpForm.description}
                          onChange={(e) => setEditExpForm({ ...editExpForm, description: e.target.value })}
                        />
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" onClick={() => setEditingExpId(null)}>
                            Cancel
                          </Button>
                          <Button variant="primary" size="sm" onClick={() => handleSaveEditExpense(exp.id)} isLoading={savingExp}>
                            Save
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-black text-xs">{exp.title}</span>
                            <span className="text-[10px] font-mono bg-neutral-100 text-black px-1.5 py-0.5 rounded border border-neutral-300">
                              {exp.date}
                            </span>
                          </div>
                          <p className="text-xs text-neutral-600">{exp.description}</p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <span className="font-mono text-sm font-bold text-black">
                            ৳{Number(exp.amount).toLocaleString()}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            icon={Edit3}
                            onClick={() => handleStartEditExpense(exp)}
                            className="text-xs font-bold"
                          >
                            Edit
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            icon={Trash2}
                            onClick={() => handleDeleteExpense(exp.id)}
                            className="text-xs"
                          />
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab: Manage Verified Medical Documents & Clinical Records */}
        {activeTab === 'documents' && (
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-black">Verified Medical Documents & Clinical Records</h4>
                <p className="text-xs text-neutral-600">Inspect, view, download, and delete public clinical documents and hospital certifications</p>
              </div>
              <Button
                variant="primary"
                size="sm"
                icon={Upload}
                onClick={onOpenUploadDoc}
              >
                Upload New Document
              </Button>
            </div>

            {docList.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-2xl border border-neutral-300 text-xs text-neutral-600 space-y-2">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100 text-black">
                  <FileText className="h-5 w-5" />
                </div>
                <p className="font-bold text-black">No Medical Documents Uploaded Yet</p>
                <p className="text-neutral-500">Upload hospital bills, pathology reports, or doctor certifications for public transparency.</p>
                <Button
                  variant="primary"
                  size="sm"
                  icon={Plus}
                  onClick={onOpenUploadDoc}
                  className="mt-2 text-xs"
                >
                  Upload First Document
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                {docList.map((doc) => {
                  const isDocPdf = isPdf(doc);
                  return (
                    <div
                      key={doc.id}
                      className="p-3.5 rounded-xl bg-white border border-neutral-300 hover:border-black transition-colors shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"
                    >
                      <div className="flex items-start sm:items-center gap-3">
                        <div
                          onClick={() => handleOpenDoc(doc)}
                          className="h-11 w-11 rounded-lg bg-neutral-100 border border-neutral-300 flex items-center justify-center shrink-0 overflow-hidden cursor-pointer hover:opacity-80"
                        >
                          {isDocPdf ? (
                            <FileText className="h-5 w-5 text-black" />
                          ) : (
                            <img
                              src={doc.previewImage || doc.fileUrl}
                              alt={doc.title}
                              className="h-full w-full object-cover"
                            />
                          )}
                        </div>

                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-black text-xs">{doc.title}</span>
                            <span className="text-[10px] font-mono bg-neutral-100 text-black px-1.5 py-0.5 rounded border border-neutral-300">
                              {isDocPdf ? 'PDF' : 'IMAGE'}
                            </span>
                            <span className="text-[10px] font-mono text-neutral-500">{doc.date}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-neutral-600">
                            <span className="font-medium text-black">{doc.issuer}</span>
                            {doc.description && <span>• {doc.description}</span>}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                        <Button
                          variant="outline"
                          size="sm"
                          icon={Eye}
                          onClick={() => handleOpenDoc(doc)}
                          className="text-xs font-bold"
                        >
                          View
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          icon={Trash2}
                          onClick={() => handleDeleteDoc(doc.id)}
                          className="text-xs"
                          title="Delete document"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Security & Change Password */}
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

      {/* Admin Document Inspection / View Modal */}
      {adminPreviewDoc && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-xs"
          onClick={() => setAdminPreviewDoc(null)}
        >
          <div
            className="relative w-full max-w-5xl rounded-3xl bg-white border border-black shadow-2xl flex flex-col max-h-[94vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between p-4 sm:p-5 border-b border-neutral-200 bg-white gap-3">
              <div className="space-y-0.5 max-w-xl">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-neutral-100 text-black border border-neutral-300">
                    {isPdf(adminPreviewDoc) ? 'PDF Clinical Record' : 'Medical Image / Scan'}
                  </span>
                  <span className="text-xs text-neutral-600 font-mono flex items-center gap-1">
                    <ShieldCheck className="h-3.5 w-3.5 text-black" /> Verified Clinical Document
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-black truncate">{adminPreviewDoc.title}</h3>
              </div>

              <div className="flex items-center gap-2">
                {!isPdf(adminPreviewDoc) && (
                  <div className="hidden sm:flex items-center gap-1 border border-neutral-300 rounded-xl p-1 bg-neutral-50 mr-2">
                    <button
                      onClick={() => setAdminZoomLevel((prev) => Math.max(0.5, prev - 0.25))}
                      className="p-1 rounded-lg hover:bg-neutral-200 text-black"
                      title="Zoom Out"
                    >
                      <ZoomOut className="h-4 w-4" />
                    </button>
                    <span className="text-[11px] font-mono px-1 min-w-[40px] text-center font-bold text-black">
                      {Math.round(adminZoomLevel * 100)}%
                    </span>
                    <button
                      onClick={() => setAdminZoomLevel((prev) => Math.min(3, prev + 0.25))}
                      className="p-1 rounded-lg hover:bg-neutral-200 text-black"
                      title="Zoom In"
                    >
                      <ZoomIn className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setAdminZoomLevel(1)}
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
                  onClick={() => handleOpenNewTab(adminPreviewDoc)}
                  className="text-xs"
                >
                  Open in New Tab
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  icon={Download}
                  onClick={() => handleDownloadDoc(adminPreviewDoc)}
                  className="text-xs"
                >
                  Download
                </Button>

                <Button
                  variant="destructive"
                  size="sm"
                  icon={Trash2}
                  onClick={() => handleDeleteDoc(adminPreviewDoc.id)}
                  className="text-xs"
                  title="Delete document"
                >
                  Delete
                </Button>

                <button
                  onClick={() => setAdminPreviewDoc(null)}
                  className="p-2 rounded-xl text-neutral-500 hover:text-black hover:bg-neutral-100 transition-colors"
                  title="Close Viewer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Viewer Content */}
            <div className="flex-1 overflow-auto bg-neutral-100 p-3 sm:p-6 flex items-center justify-center min-h-[360px] max-h-[64vh]">
              {isPdf(adminPreviewDoc) ? (
                <div className="w-full h-full min-h-[500px] flex flex-col rounded-2xl overflow-hidden border border-neutral-300 bg-white shadow-inner">
                  <iframe
                    src={adminPreviewDoc.fileUrl || adminPreviewDoc.previewImage}
                    title={adminPreviewDoc.title}
                    className="w-full h-full min-h-[500px] border-0"
                  />
                </div>
              ) : (
                <div className="relative w-full h-full flex items-center justify-center overflow-auto p-2">
                  <img
                    src={adminPreviewDoc.fileUrl || adminPreviewDoc.previewImage}
                    alt={adminPreviewDoc.title}
                    style={{ transform: `scale(${adminZoomLevel})` }}
                    className="max-h-[58vh] w-auto max-w-full object-contain mx-auto rounded-xl shadow-xs transition-transform duration-150 origin-center"
                  />
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 sm:p-5 border-t border-neutral-200 bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-1">
                {adminPreviewDoc.description && (
                  <p className="text-neutral-700 font-medium">{adminPreviewDoc.description}</p>
                )}
                <div className="flex flex-wrap gap-4 font-mono text-neutral-600">
                  <span>Issuer: <strong className="text-black font-sans">{adminPreviewDoc.issuer || 'Hospital / Lab'}</strong></span>
                  <span>Date: <strong className="text-black font-sans">{adminPreviewDoc.date || 'N/A'}</strong></span>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setAdminPreviewDoc(null)}
                  className="text-xs"
                >
                  Close Viewer
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
