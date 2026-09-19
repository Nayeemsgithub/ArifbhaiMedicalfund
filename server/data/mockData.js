export const doctorProfile = {
  name: "Dr. Elena Vance, MD, FACS",
  title: "Chief of Robotic Cardiovascular & Thoracic Surgery",
  institution: "Apex Health Institute & Johns Hopkins Affiliate",
  experienceYears: 16,
  surgeriesCount: "3,850+",
  successRate: "99.4%",
  publicationsCount: 42,
  avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600",
  heroTagline: "Pioneering Minimally Invasive Robotic Surgery & Precision Cardiovascular Medicine",
  bio: "Dr. Elena Vance is an internationally recognized cardiovascular and robotic surgeon dedicated to pioneering patient-first, micro-incision cardiovascular reconstructions. With over 16 years of operative excellence, she combines AI-assisted robotic navigation with compassionate, individualized clinical care.",
  status: "Accepting Clinical Consultations & Surgical Referrals",
  stats: [
    { label: "Surgeries Completed", value: "3,850+", subtext: "Robotic & Open Vascular" },
    { label: "Procedure Success Rate", value: "99.4%", subtext: "Clinical Audit 2020-2025" },
    { label: "Peer-Reviewed Papers", value: "42", subtext: "Nature Med & Lancet Cardio" },
    { label: "Patient Satisfaction", value: "4.98 / 5.0", subtext: "Over 1,200+ Reviews" }
  ],
  credentials: [
    { degree: "MD with Honors", school: "Harvard Medical School", year: "2008" },
    { degree: "Cardiothoracic Surgery Residency", school: "Johns Hopkins Hospital", year: "2013" },
    { degree: "Advanced Robotic Fellowship", school: "Cleveland Clinic", year: "2015" },
    { degree: "Board Certification", school: "American Board of Thoracic Surgery (ABTS)", year: "Active" }
  ],
  contacts: {
    office: "+1 (800) 452-9830",
    emergency: "+1 (800) 452-9899",
    email: "dr.vance@apexhealth.org",
    location: "Apex Surgical Pavilion, 450 Innovation Way, Suite 800, Boston, MA"
  }
};

export const specialties = [
  {
    id: "spec-1",
    title: "Robotic Coronary Bypass (TECAB)",
    category: "Cardiothoracic",
    shortDesc: "Closed-chest, totally endoscopic robotic revascularization minimizing recovery time to under 10 days.",
    icon: "HeartPulse",
    metrics: { recovery: "7-10 Days", incision: "8-12 mm", precision: "0.1 mm" },
    highlight: "Da Vinci Xi Multi-Arm System"
  },
  {
    id: "spec-2",
    title: "Complex Valve Repair & TAVR",
    category: "Structural Heart",
    shortDesc: "Transcatheter & mini-thoracotomy mitral and aortic valve restorations avoiding sternotomy.",
    icon: "ShieldAlert",
    metrics: { recovery: "3-5 Days", success: "99.6%", bloodless: "94%" },
    highlight: "Sutureless Prosthetic Technology"
  },
  {
    id: "spec-3",
    title: "Thoracic Aortic Aneurysm Repair",
    category: "Vascular",
    shortDesc: "Endovascular and hybrid graft reconstructions for ascending, arch, and descending aortic aneurysms.",
    icon: "Activity",
    metrics: { duration: "2.5 Hours", mortality: "< 0.5%", ICU: "24-48 Hours" },
    highlight: "Custom Fenestrated Stent Grafts"
  },
  {
    id: "spec-4",
    title: "AI-Assisted Surgical Navigation",
    category: "Clinical Innovation",
    shortDesc: "Real-time intraoperative 3D hologram overlay and predictive tissue perfusion mapping.",
    icon: "Cpu",
    metrics: { accuracy: "Sub-millimeter", imaging: "4K 3D HDR", latency: "< 5ms" },
    highlight: "Intraoperative Holographic AI"
  }
];

export const caseStudies = [
  {
    id: "case-01",
    title: "Single-Stage Robotic TECAB in High-Risk Diabetic Patient",
    patientAge: "64",
    condition: "Triple Vessel CAD with severe calcification",
    technique: "Robotic LIMA-to-LAD with beating-heart stabilization",
    outcome: "Full ambulation at 36 hours; discharged day 4; complete symptom resolution at 3-year follow-up.",
    tags: ["Robotic Surgery", "Zero Sternotomy", "High Risk"],
    date: "November 2024",
    leadSurgeon: "Dr. Elena Vance, MD"
  },
  {
    id: "case-02",
    title: "Minimally Invasive Double-Valve Repair with Annuloplasty",
    patientAge: "52",
    condition: "Severe Degenerative Mitral & Tricuspid Regurgitation",
    technique: "Right mini-thoracotomy with 3D endoscopic optics and Neochord implantation",
    outcome: "Residual regurgitation trace/none; zero transfusion required; return to athletic cycling at 6 weeks.",
    tags: ["Valve Repair", "Endoscopic", "Rapid Recovery"],
    date: "January 2025",
    leadSurgeon: "Dr. Elena Vance, MD"
  },
  {
    id: "case-03",
    title: "Emergency Hybrid Debranching for Acute Type A Aortic Dissection",
    patientAge: "48",
    condition: "Ascending aortic dissection extending into carotid bifurcation",
    technique: "Supra-aortic debranching followed by simultaneous retrograde TEVAR deployment",
    outcome: "Zero neurological deficit; patent cerebral perfusion; stable aortic remodeling at 6-month CTA.",
    tags: ["Emergency Trauma", "Hybrid TEVAR", "Aortic Care"],
    date: "May 2025",
    leadSurgeon: "Dr. Elena Vance, MD"
  }
];

export const publications = [
  {
    id: "pub-1",
    title: "Ten-Year Multi-Center Outcomes of Robotic Endoscopic Coronary Artery Bypass: A Cohort of 2,400 Patients",
    journal: "Journal of the American College of Cardiology (JACC)",
    year: "2024",
    doi: "10.1016/j.jacc.2024.08.012",
    citations: 184,
    badge: "Featured Clinical Research"
  },
  {
    id: "pub-2",
    title: "AI Real-Time Hemodynamic Forecasting During Minimally Invasive Structural Heart Interventions",
    journal: "Nature Medicine - Digital Health",
    year: "2024",
    doi: "10.1038/s41591-024-03112-x",
    citations: 92,
    badge: "AI in Surgery Award"
  },
  {
    id: "pub-3",
    title: "Micro-Incision Mitral Reconstruction: Quality of Life Indices Across 5-Year Longitudinal Follow-Up",
    journal: "The Annals of Thoracic Surgery",
    year: "2023",
    doi: "10.1016/j.athoracsur.2023.04.019",
    citations: 215,
    badge: "High Impact"
  }
];

export const testimonials = [
  {
    id: "test-1",
    quote: "Dr. Vance performed my robotic bypass when two other centers told me only open-chest surgery was possible. I was back home with my family in 4 days and walking my dog in two weeks.",
    author: "Robert Sterling",
    role: "Patient, TECAB Procedure",
    rating: 5,
    date: "October 2024"
  },
  {
    id: "test-2",
    quote: "Her surgical dexterity with the robotic console and her empathy during pre-op consultations are unmatched in our field. She is the specialist I send my own family to.",
    author: "Dr. Arthur Chang, MD",
    role: "Chief of Interventional Cardiology, Metro Heart",
    rating: 5,
    date: "December 2024"
  },
  {
    id: "test-3",
    quote: "The personalized care protocol developed by Dr. Vance and her team eliminated all the anxiety our family had. The surgical outcome was flawless.",
    author: "Sophia Martinez",
    role: "Patient, Mitral Valve Repair",
    rating: 5,
    date: "February 2025"
  }
];

export const initialAppointments = [
  {
    id: "apt-101",
    patientName: "David Miller",
    patientEmail: "david.miller@example.com",
    patientPhone: "+1 (555) 349-2910",
    reason: "Second opinion on aortic valve replacement",
    preferredDate: "2026-10-15",
    urgency: "urgent",
    status: "confirmed",
    createdAt: new Date().toISOString()
  }
];
