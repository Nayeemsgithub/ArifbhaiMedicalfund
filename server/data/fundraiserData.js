export const initialAdminUser = {
  id: "admin-01",
  name: "Asif Ahmed",
  username: "Asif",
  email: "Asif",
  password: "ASif_Ahmed",
  role: "admin"
};

export const initialCampaign = {
  id: "camp-01",
  patientName: "Patient",
  patientAge: 0,
  diagnosis: "Medical Treatment",
  hospital: "",
  leadOncologist: "Attending Medical Team",
  guardian: "",
  location: "",
  story: "",
  targetGoal: 50000,
  verifiedHospitalId: "",
  status: "Active Treatment & Recovery",
  heroImage: "",
  verificationBadge: "Direct Billing Verified",
  createdAt: new Date().toISOString()
};

// Initialized to 0 / empty as requested. Admin will add entries later.
export const initialExpenses = [];
export const initialDonations = [];
export const initialDocuments = [];
export const initialMilestones = [];
