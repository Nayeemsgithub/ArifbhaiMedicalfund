import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/layout/Navbar';
import { FundraiserHero } from './components/fundraiser/FundraiserHero';
import { LiveSummaryCards } from './components/dashboard/LiveSummaryCards';
import { ExpenseLedgerTable } from './components/dashboard/ExpenseLedgerTable';
import { DocumentGallery } from './components/dashboard/DocumentGallery';
import { DonorWall } from './components/fundraiser/DonorWall';
import { MedicalJourney } from './components/fundraiser/MedicalJourney';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { DocumentUploadModal } from './components/admin/DocumentUploadModal';
import { Footer } from './components/layout/Footer';

function MainContent() {
  const [campaign, setCampaign] = useState(null);
  const [summary, setSummary] = useState(null);
  const [donations, setDonations] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [milestones, setMilestones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isUploadDocOpen, setIsUploadDocOpen] = useState(false);

  const fetchFundraiserData = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/fundraiser');
      const data = await res.json();
      setCampaign(data.campaign);
      setSummary(data.summary);
      setDonations(data.recentDonations || []);
      setExpenses(data.expenses || []);
      setDocuments(data.documents || []);
      setMilestones(data.milestones || []);
    } catch (err) {
      console.error('Failed to fetch fundraiser data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFundraiserData();
  }, []);

  // Real-time Handlers
  const handleFundAdded = (newDonation, updatedSummary) => {
    setDonations((prev) => [newDonation, ...prev]);
    if (updatedSummary) setSummary(updatedSummary);
  };

  const handleFundDeleted = (deletedId, updatedSummary) => {
    setDonations((prev) => prev.filter((d) => d.id !== deletedId));
    if (updatedSummary) setSummary(updatedSummary);
  };

  const handleCampaignUpdated = (updatedCampaign, updatedSummary) => {
    setCampaign(updatedCampaign);
    if (updatedSummary) setSummary(updatedSummary);
  };

  const handleExpenseAdded = (newExpense, updatedSummary) => {
    setExpenses((prev) => [newExpense, ...prev]);
    if (updatedSummary) setSummary(updatedSummary);
  };

  const handleExpenseUpdated = (updatedExpense, updatedSummary) => {
    setExpenses((prev) => prev.map((e) => (e.id === updatedExpense.id ? updatedExpense : e)));
    if (updatedSummary) setSummary(updatedSummary);
  };

  const handleExpenseDeleted = (deletedId, updatedSummary) => {
    setExpenses((prev) => prev.filter((e) => e.id !== deletedId));
    if (updatedSummary) setSummary(updatedSummary);
  };

  const handleDocumentUploaded = (newDoc) => {
    setDocuments((prev) => [newDoc, ...prev]);
  };

  const handleDocumentDeleted = (deletedId) => {
    setDocuments((prev) => prev.filter((d) => d.id !== deletedId));
  };

  if (loading && !campaign) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center space-y-4">
        <div className="h-10 w-10 rounded-full border-4 border-black border-t-transparent animate-spin" />
        <span className="text-xs font-mono font-bold text-black tracking-wider">
          CONNECTING TO LIVE TRANSPARENCY LEDGER...
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black flex flex-col selection:bg-black selection:text-white">
      {/* Top Sticky Navigation with Admin Authentication button */}
      <Navbar />

      {/* Admin Management Dashboard (Unlocks when logged in) */}
      <AdminDashboard
        campaign={campaign}
        expenses={expenses}
        donations={donations}
        documents={documents}
        onCampaignUpdated={handleCampaignUpdated}
        onExpenseAdded={handleExpenseAdded}
        onExpenseUpdated={handleExpenseUpdated}
        onExpenseDeleted={handleExpenseDeleted}
        onFundAdded={handleFundAdded}
        onFundDeleted={handleFundDeleted}
        onDocumentDeleted={handleDocumentDeleted}
        onOpenUploadDoc={() => setIsUploadDocOpen(true)}
      />

      <main className="flex-grow">
        {/* Patient Campaign Hero */}
        <FundraiserHero
          campaign={campaign}
          summary={summary}
        />

        {/* Live Summary Cards (Total Raised, Expenses Paid, Available Balance) */}
        <LiveSummaryCards
          summary={summary}
        />

        {/* Itemized Verified Medical Expenses with Date, Amount, Vendor, and Full Description */}
        <ExpenseLedgerTable
          expenses={expenses}
          onOpenAddExpense={() => {
            const el = document.getElementById('admin-panel');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Medical Document & Portfolio Gallery (Verified Hospital Invoices, Pathology Scans) */}
        <DocumentGallery
          documents={documents}
          onOpenUpload={() => setIsUploadDocOpen(true)}
          onDocumentDeleted={handleDocumentDeleted}
        />

        {/* Live Community Donor & Encouragement Feed */}
        <DonorWall donations={donations} />

        {/* Clinical Milestones & Recovery Timeline */}
        <MedicalJourney milestones={milestones} />
      </main>

      {/* Footer */}
      <Footer campaign={campaign} />

      {/* Modals */}
      <AdminLoginModal />
      <DocumentUploadModal
        isOpen={isUploadDocOpen}
        onClose={() => setIsUploadDocOpen(false)}
        onDocumentUploaded={handleDocumentUploaded}
      />
    </div>
  );
}

export function App() {
  return (
    <AuthProvider>
      <MainContent />
    </AuthProvider>
  );
}

export default App;
