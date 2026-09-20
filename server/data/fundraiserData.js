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
  patientName: "Arif Ahmed",
  patientAge: 37,
  rank: "Second Officer",
  careerCommenced: "2009",
  lastVessel: "M.V. Meghna Fortune",
  joinedDate: "18 May 2026",
  onsetIllness: "2 August 2026",
  unableToWork: "11 August 2026",
  declaredUnfit: "17 August 2026",
  repatriatedDate: "22 August 2026",
  diagnosis: "Metastatic Malignant Melanoma (IHC Confirmation & Staging In Progress)",
  status: "Urgent Specialist Evaluation & Staging",
  leadOncologist: "Dr. AFM Kamal Uddin & Attending Oncology Team",
  hospital: "Specialist Oncology Consultation & Evaluation (Dhaka / Chattogram)",
  guardian: "Farhana Aktar (Wife)",
  location: "Noakhali / Dhaka, Bangladesh",
  targetGoal: 0,
  verificationBadge: "Direct Family & Clinical Verified",
  createdAt: new Date().toISOString(),

  // Payment & Donation Information
  donationInfo: {
    bank: {
      accountName: "FARHANA AKTAR",
      accountNumber: "2667010010522",
      bankName: "RUPALI BANK PLC",
      branchName: "EKLASHPUR BAZAR BRANCH, NOAKHALI",
      branchCode: "2667",
      routingNumber: "185750941"
    },
    mfs: {
      recipientName: "Farhana Aktar (Arif Bhai's Wife)",
      number: "01882716449",
      services: ["bKash", "Nagad", "Rocket"]
    }
  },

  // Medical Chronology Timeline
  medicalChronology: [
    {
      date: "18 May 2026",
      title: "Pre-employment Fitness & Joining Vessel",
      description: "Successfully completed required pre-employment medical fitness examination, declared fit for duty, and joined M.V. Meghna Fortune as Second Officer."
    },
    {
      date: "2 August 2026",
      title: "Onset of Back Pain Onboard",
      description: "While on board the vessel, developed severe back pain with progressive worsening of symptoms."
    },
    {
      date: "11 August 2026",
      title: "Unable to Perform Duties",
      description: "Due to intensifying symptoms and pain, became unable to perform normal navigation and deck duties on board."
    },
    {
      date: "17 August 2026",
      title: "Examined & Declared Unfit",
      description: "Examined by an Egyptian doctor during port call and was officially declared unfit for sea duty."
    },
    {
      date: "22 August 2026",
      title: "Repatriated Sick to Bangladesh",
      description: "Repatriated to Bangladesh for urgent medical evaluation and clinical investigations."
    },
    {
      date: "25 August 2026",
      title: "Commenced Physiotherapy in Chattogram",
      description: "Initial post-repatriation management with physiotherapy while seeking specialized diagnostic consultations."
    },
    {
      date: "5 September 2026",
      title: "Ultrasound Detects Hepatic Lesions",
      description: "Abdominal ultrasound examination identified multiple hepatic space-occupying lesions described as metastatic in nature."
    },
    {
      date: "6 September 2026",
      title: "Specialist Consultation with Dr. AFM Kamal Uddin",
      description: "Consulted Dr. AFM Kamal Uddin in Dhaka. Advised immediate whole-body PET-CT scan and CT-guided core needle biopsy of the liver lesions."
    },
    {
      date: "8 September 2026",
      title: "Comprehensive Whole-Body PET-CT Scan",
      description: "PET-CT demonstrated hepatomegaly with intensely FDG-avid liver SOLs, pulmonary nodules in right lung and left upper lobe, and multiple FDG-avid lytic skeletal lesions involving skull, sternum, spine (LS vertebra infiltration), sacrum, and hip bones."
    },
    {
      date: "15 September 2026",
      title: "Liver Core Biopsy Specimen Received",
      description: "Formalin-fixed liver core biopsy specimen (seven linear tissue pieces) received by the histopathology department."
    },
    {
      date: "17 September 2026",
      title: "Biopsy Histopathology Report: Metastatic Melanoma",
      description: "Histopathology revealed malignant neoplasm replacing liver parenchyma with melanin pigment. Concluded 'Metastatic malignant melanoma' with immunohistochemistry (IHC) specifically recommended for definitive confirmation."
    }
  ],

  // Diagnostic Findings
  diagnosticFindings: {
    histopathology: "Liver core biopsy showed malignant neoplasm in sheets, nests, and fascicles with pleomorphic spindle-shaped and round-to-polygonal cells, coarse brown melanin pigment, and frequent mitoses replacing hepatic tissue. Concluded 'Metastatic malignant melanoma' with Immunohistochemistry (IHC) recommended for confirmation.",
    petCtScan: [
      "Hepatomegaly with multiple intensely FDG-avid hypodense space-occupying lesions across both lobes of the liver.",
      "Multiple FDG-avid and non-FDG-avid pulmonary nodules in the right lung and left upper lobe (radiologically suspicious for pulmonary metastases).",
      "FDG-avid lytic skeletal lesions involving skull, sternum, multiple spine vertebrae, sacrum, and both hip bones.",
      "Intensely FDG-avid skeletal lesion with soft tissue components involving the LS vertebra (malignant infiltration)."
    ],
    presentStatus: "Significant malignant process involving the liver with suspicious pulmonary and skeletal areas. Additional confirmatory testing (Immunohistochemistry / IHC), primary site determination, full staging, and oncology treatment roadmap are currently underway."
  },

  // Family Impact Narrative
  familyImpact: {
    wifeName: "Farhana Aktar",
    children: [
      { name: "Elder Son", age: "3.5 years" },
      { name: "Younger Son", age: "10 months" }
    ],
    backgroundSummary: "Arif Ahmed (37 years old) is a dedicated seafarer, husband, and father of two infant sons. After spending almost two years ashore completing his Class 2 examinations (incurring ~BDT 10 lakh in debt and selling his wife's gold jewellery), he had returned to sea on M.V. Meghna Fortune for only a few months before this unexpected crisis struck. The family previously supported both elderly parents through kidney dialysis and is now exhausting their last remaining village plot. The family is determined to do everything humanly possible to save Arif's life and bring him back home to his young children."
  }
};

// Initialized empty ledger entries — Admin will record funds and disbursements
export const initialExpenses = [];
export const initialDonations = [];
export const initialDocuments = [];
export const initialMilestones = [];
