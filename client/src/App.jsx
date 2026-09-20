import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/layout/Navbar';
import { FundraiserHero } from './components/fundraiser/FundraiserHero';
import { LiveSummaryCards } from './components/dashboard/LiveSummaryCards';
import { DonationBox } from './components/fundraiser/DonationBox';
import { PatientPortfolio } from './components/fundraiser/PatientPortfolio';
import { DonorWall } from './components/fundraiser/DonorWall';
import { MedicalJourney } from './components/fundraiser/MedicalJourney';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { Footer } from './components/layout/Footer';

function MainContent() {
  const [campaign, setCampaign] = useState(null);
  const [summary, setSummary] = useState(null);
  const [donations, setDonations] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [milestones, setMilestones] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFundraiserData = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/fundraiser');
      const data = await res.json();
      setCampaign(data.campaign);
      setSummary(data.summary);
      setDonations(data.recentDonations || []);
      setExpenses(data.expenses || []);
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

  if (loading && !campaign) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center space-y-4">
        <div className="h-10 w-10 rounded-full border-4 border-black border-t-transparent animate-spin" />
        <span className="text-xs font-mono font-bold text-black tracking-wider">
          CONNECTING TO LIVE FUNDRAISER PORTAL...
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black flex flex-col selection:bg-black selection:text-white">
      {/* Top Sticky Navigation */}
      <Navbar />

      {/* Admin Management Dashboard (Unlocks when logged in) */}
      <AdminDashboard
        campaign={campaign}
        donations={donations}
        onCampaignUpdated={handleCampaignUpdated}
        onFundAdded={handleFundAdded}
        onFundDeleted={handleFundDeleted}
      />

      <main className="flex-grow space-y-4">
        {/* Patient Campaign Hero */}
        <FundraiserHero
          campaign={campaign}
          summary={summary}
        />

        {/* Live Summary Cards (Total Raised, Case Status, Direct Beneficiary) */}
        <LiveSummaryCards
          summary={summary}
        />

        {/* Dedicated Donate Box with Rupali Bank & bKash/Nagad/Rocket */}
        <DonationBox
          campaign={campaign}
        />

        {/* Comprehensive Patient Portfolio (Career, Medical Chronology, Diagnostics, Family Story) */}
        <PatientPortfolio
          campaign={campaign}
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
