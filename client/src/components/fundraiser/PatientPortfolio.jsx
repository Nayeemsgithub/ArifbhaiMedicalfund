import React, { useState } from 'react';
import { 
  Anchor, 
  Activity, 
  Calendar, 
  Clock, 
  FileText, 
  Heart, 
  ShieldCheck, 
  AlertTriangle, 
  Users, 
  Ship, 
  Stethoscope, 
  ArrowRight, 
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  Maximize2,
  X,
  Camera
} from 'lucide-react';
import { Card } from '../ui/Card';

export function PatientPortfolio({ campaign }) {
  const [activeTab, setActiveTab] = useState('chronology');
  const [selectedImage, setSelectedImage] = useState(null);

  const galleryImages = [
    {
      src: "/images/arif-family.jpg",
      title: "Arif Ahmed with Wife & 2 Infant Sons",
      subtitle: "Farhana Aktar holding 10-month-old baby, elder son (3.5 yrs), and Arif",
      tag: "Family Unit",
      aspect: "landscape"
    },
    {
      src: "/images/arif-baby.jpg",
      title: "Arif with His 10-Month-Old Baby Son",
      subtitle: "A young father fighting for his life to watch his children grow up",
      tag: "Father & Son",
      aspect: "portrait"
    },
    {
      src: "/images/arif-uniform.jpg",
      title: "Second Officer Arif Ahmed in Marine Uniform",
      subtitle: "15-year career at sea, photographed on board M.V. Meghna Fortune",
      tag: "Seafaring Career",
      aspect: "portrait"
    }
  ];

  const chronology = campaign?.medicalChronology || [
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
  ];

  return (
    <section id="patient-profile" className="py-12 max-w-7xl mx-auto px-4 sm:px-8 border-t border-neutral-200">
      <div className="space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-black bg-neutral-100 px-3 py-1 rounded-full border border-neutral-300 font-mono">
              Medical Case & Clinical Portfolio
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-black mt-2">
              Second Officer Arif Ahmed — Case Overview
            </h2>
            <p className="text-sm text-neutral-600 mt-1 max-w-2xl">
              15-year seafaring career, clinical timeline from vessel onboarding to metastatic diagnosis, and urgent family appeal.
            </p>
          </div>

          <a
            href="#donate"
            className="self-start md:self-auto px-4 py-2 rounded-xl bg-black text-white hover:bg-neutral-800 text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs"
          >
            <Heart className="h-3.5 w-3.5 fill-white" /> Support Arif Bhai
          </a>
        </div>

        {/* 1. Protagonist & Seafaring Background Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Seafarer Identity */}
          <div className="p-6 rounded-3xl bg-white border border-neutral-300 shadow-xs space-y-4 hover:border-black transition-colors flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="relative h-14 w-14 rounded-2xl overflow-hidden border border-black shrink-0">
                  <img
                    src="/images/arif-uniform.jpg"
                    alt="Arif Ahmed"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-neutral-500 block">Seafarer Profile</span>
                  <h3 className="text-lg font-bold text-black">Arif Ahmed</h3>
                  <span className="text-xs font-mono font-bold text-black bg-neutral-100 px-2 py-0.5 rounded border border-neutral-200">
                    Second Officer (Class 2)
                  </span>
                </div>
              </div>

              <div className="space-y-2 pt-2 text-xs font-mono border-t border-neutral-100">
                <div className="flex justify-between py-1 border-b border-neutral-100">
                  <span className="text-neutral-500">Age:</span>
                  <span className="font-bold text-black">37 Years</span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-100">
                  <span className="text-neutral-500">Career Commenced:</span>
                  <span className="font-bold text-black">2009 (15 Years at Sea)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-100">
                  <span className="text-neutral-500">Last Vessel:</span>
                  <span className="font-bold text-black font-sans">M.V. Meghna Fortune</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-neutral-500">Onboard Joining:</span>
                  <span className="font-bold text-black">18 May 2026</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Crisis Timeline Summary */}
          <div className="p-6 rounded-3xl bg-white border border-neutral-300 shadow-xs space-y-4 hover:border-black transition-colors flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-14 w-14 rounded-2xl bg-neutral-100 text-black border border-neutral-300 flex items-center justify-center shrink-0">
                  <Ship className="h-7 w-7" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-neutral-500 block">Vessel Service</span>
                  <h3 className="text-lg font-bold text-black">Timeline of Crisis</h3>
                  <span className="text-xs font-mono text-neutral-600">Onboard to Repatriation</span>
                </div>
              </div>

              <div className="space-y-2 pt-2 text-xs font-mono border-t border-neutral-100">
                <div className="flex justify-between py-1 border-b border-neutral-100">
                  <span className="text-neutral-500">Onset of Illness:</span>
                  <span className="font-bold text-black">2 August 2026</span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-100">
                  <span className="text-neutral-500">Unable to Work:</span>
                  <span className="font-bold text-black">11 August 2026</span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-100">
                  <span className="text-neutral-500">Declared Unfit:</span>
                  <span className="font-bold text-black">17 August 2026 (Port)</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-neutral-500">Repatriated Sick:</span>
                  <span className="font-bold text-black">22 August 2026</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Family Support Anchor */}
          <div className="p-6 rounded-3xl bg-white border border-neutral-300 shadow-xs space-y-4 hover:border-black transition-colors flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="relative h-14 w-14 rounded-2xl overflow-hidden border border-black shrink-0">
                  <img
                    src="/images/arif-family.jpg"
                    alt="Family"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-neutral-500 block">Family Anchor</span>
                  <h3 className="text-lg font-bold text-black">Farhana Aktar</h3>
                  <span className="text-xs font-mono text-neutral-600">Wife & 2 Young Sons</span>
                </div>
              </div>

              <div className="space-y-2 pt-2 text-xs font-mono border-t border-neutral-100">
                <div className="flex justify-between py-1 border-b border-neutral-100">
                  <span className="text-neutral-500">Elder Son:</span>
                  <span className="font-bold text-black">3.5 Years Old</span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-100">
                  <span className="text-neutral-500">Baby Son:</span>
                  <span className="font-bold text-black">10 Months Old</span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-100">
                  <span className="text-neutral-500">Direct Contact:</span>
                  <span className="font-bold text-black">01882716449</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-neutral-500">Location:</span>
                  <span className="font-bold text-black font-sans">Noakhali / Dhaka</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation for Detailed Sections */}
        <div className="flex flex-wrap gap-2 border-b border-neutral-200 pb-3">
          <button
            onClick={() => setActiveTab('chronology')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'chronology'
                ? 'bg-black text-white shadow-xs'
                : 'bg-neutral-100 text-black hover:bg-neutral-200 border border-neutral-300'
            }`}
          >
            📅 Medical Chronology (Date-by-Date)
          </button>

          <button
            onClick={() => setActiveTab('diagnostics')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'diagnostics'
                ? 'bg-black text-white shadow-xs'
                : 'bg-neutral-100 text-black hover:bg-neutral-200 border border-neutral-300'
            }`}
          >
            🔬 Diagnostic Findings (PET-CT & Biopsy)
          </button>

          <button
            onClick={() => setActiveTab('family')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'family'
                ? 'bg-black text-white shadow-xs'
                : 'bg-neutral-100 text-black hover:bg-neutral-200 border border-neutral-300'
            }`}
          >
            👨‍👩‍👦 Family Impact & Human Story
          </button>
        </div>

        {/* TAB 1: MEDICAL CHRONOLOGY */}
        {activeTab === 'chronology' && (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200">
              <h3 className="text-sm font-bold text-black">Verified Medical Chronology</h3>
              <p className="text-xs text-neutral-600 mt-0.5">
                Prior to joining M.V. Meghna Fortune on 18 May 2026, Mr. Arif Ahmed successfully completed the pre-employment medical fitness examination and was declared fit for duty.
              </p>
            </div>

            <div className="relative pl-6 sm:pl-8 border-l-2 border-black space-y-6">
              {chronology.map((item, idx) => (
                <div key={idx} className="relative group">
                  {/* Timeline Bullet */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1 h-5 w-5 rounded-full bg-white border-4 border-black group-hover:scale-125 transition-transform" />

                  <div className="p-5 rounded-2xl bg-white border border-neutral-300 hover:border-black transition-colors shadow-xs space-y-1.5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs font-mono font-extrabold text-black bg-neutral-100 px-2.5 py-0.5 rounded border border-neutral-300">
                        {item.date}
                      </span>
                      <span className="text-[10px] font-mono text-neutral-500 uppercase">
                        Clinical Step {idx + 1} of {chronology.length}
                      </span>
                    </div>

                    <h4 className="text-sm sm:text-base font-bold text-black">{item.title}</h4>
                    <p className="text-xs text-neutral-700 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: DIAGNOSTIC FINDINGS */}
        {activeTab === 'diagnostics' && (
          <div className="space-y-6">
            {/* 3.1 Liver Histopathology */}
            <div className="p-6 rounded-3xl bg-white border border-neutral-300 shadow-xs space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-xl bg-black text-white flex items-center justify-center">
                  <FileText className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-neutral-500">Section 3.1</span>
                  <h3 className="text-base font-bold text-black">Liver Histopathology (Core Biopsy)</h3>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-800 space-y-2 leading-relaxed">
                <p>
                  The liver core biopsy specimen (received in formalin consisting of seven linear pieces of tissue) demonstrated a malignant neoplasm involving and replacing hepatic tissue arranged in sheets, nests, and fascicles.
                </p>
                <p>
                  The tumour cells were described as pleomorphic spindle-shaped and round to polygonal cells with enlarged hyperchromatic nuclei, prominent nucleoli, and moderate cytoplasm with coarse brown melanin pigment and marked nuclear pleomorphism with frequent mitotic figures.
                </p>
                <div className="p-3 rounded-xl bg-white border border-black font-mono text-xs text-black">
                  <strong>Histopathology Conclusion: </strong>"Liver tissue (core biopsy): Metastatic malignant melanoma."
                  <div className="text-[11px] text-neutral-600 mt-1">
                    *Specifically recommended: Immunohistochemistry (IHC) for definitive confirmation (A4).
                  </div>
                </div>
              </div>
            </div>

            {/* 3.2 PET-CT Scan Findings */}
            <div className="p-6 rounded-3xl bg-white border border-neutral-300 shadow-xs space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-xl bg-black text-white flex items-center justify-center">
                  <Activity className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-neutral-500">Section 3.2</span>
                  <h3 className="text-base font-bold text-black">Whole-Body PET-CT Findings (8 September 2026)</h3>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-1">
                  <span className="font-bold text-black block">1. Hepatic Involvement</span>
                  <p className="text-neutral-700 leading-relaxed">
                    Hepatomegaly with multiple intensely FDG-avid hypodense space-occupying lesions of variable sizes in both lobes of the liver, suggestive of malignant lesions.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-1">
                  <span className="font-bold text-black block">2. Pulmonary Nodules</span>
                  <p className="text-neutral-700 leading-relaxed">
                    Multiple FDG-avid and non-FDG-avid pulmonary nodules involving the right lung and upper lobe of the left lung, suggestive of pulmonary metastases.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-1">
                  <span className="font-bold text-black block">3. Skeletal Lesions</span>
                  <p className="text-neutral-700 leading-relaxed">
                    FDG-avid lytic skeletal lesions involving the skull, sternum, multiple vertebrae of the spine, sacrum, and both hip bones.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-1">
                  <span className="font-bold text-black block">4. Spine Infiltration</span>
                  <p className="text-neutral-700 leading-relaxed">
                    An intensely FDG-avid skeletal lesion with soft tissue components involving the LS vertebra, suggestive of malignant infiltration.
                  </p>
                </div>
              </div>
            </div>

            {/* 3.3 Present Medical Position */}
            <div className="p-6 rounded-3xl bg-neutral-900 text-white shadow-xs space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-xl bg-white text-black flex items-center justify-center">
                  <Stethoscope className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-neutral-400">Section 3.3</span>
                  <h3 className="text-base font-bold text-white">Present Medical Position & Next Clinical Steps</h3>
                </div>
              </div>

              <div className="space-y-3 text-xs text-neutral-300 leading-relaxed">
                <p>
                  The investigations performed to date demonstrate a significant malignant process involving the liver. The PET-CT findings indicate radiological impressions requiring further clinical correlation.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-[11px] pt-2">
                  <div className="p-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-white flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-white shrink-0" />
                    <span>1. Immunohistochemistry (IHC) Confirmation</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-white flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-white shrink-0" />
                    <span>2. Determine primary site & full staging</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-white flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-white shrink-0" />
                    <span>3. Establish complete extent of disease</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-white flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-white shrink-0" />
                    <span>4. Guide urgent oncological treatment</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: FAMILY IMPACT & HUMAN ANGLE */}
        {activeTab === 'family' && (
          <div className="space-y-8">
            {/* Story Card */}
            <div className="p-6 sm:p-10 rounded-3xl bg-white border border-neutral-300 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-2xl bg-black text-white flex items-center justify-center">
                    <Heart className="h-5 w-5 fill-white" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-extrabold text-black">
                      Family Impact & The Human Angle
                    </h3>
                    <p className="text-xs text-neutral-500">Farhana Aktar, their 2 infant boys, and a family fighting for survival</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <span className="text-xs font-mono font-bold bg-neutral-100 text-black px-3 py-1 rounded-xl border border-neutral-300">
                    Arif Ahmed • 37 Years
                  </span>
                </div>
              </div>

              {/* Photo Gallery Grid */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Camera className="h-4 w-4 text-black" />
                  <h4 className="text-xs font-mono font-bold uppercase text-black tracking-wider">
                    Authentic Case Photos (Click to Enlarge)
                  </h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {galleryImages.map((img, i) => (
                    <div
                      key={i}
                      onClick={() => setSelectedImage(img)}
                      className="group cursor-pointer rounded-2xl border border-neutral-300 bg-neutral-50 overflow-hidden hover:border-black hover:shadow-md transition-all flex flex-col justify-between"
                    >
                      <div className="relative h-56 w-full overflow-hidden bg-neutral-200">
                        <img
                          src={img.src}
                          alt={img.title}
                          className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute top-2 left-2">
                          <span className="text-[10px] font-mono font-bold uppercase bg-black/80 text-white px-2 py-0.5 rounded backdrop-blur-xs">
                            {img.tag}
                          </span>
                        </div>
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg bg-white/90 text-black shadow-xs">
                          <Maximize2 className="h-3.5 w-3.5" />
                        </div>
                      </div>

                      <div className="p-3.5 space-y-1">
                        <h5 className="text-xs font-bold text-black group-hover:underline leading-snug">
                          {img.title}
                        </h5>
                        <p className="text-[11px] text-neutral-600 leading-snug">
                          {img.subtitle}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="prose prose-sm max-w-none text-neutral-800 text-xs sm:text-sm leading-relaxed space-y-4 pt-4 border-t border-neutral-200">
                <p>
                  <strong>Arif Ahmed is only 37 years old.</strong> He is a husband, a father of two very young children, and the person his family has always depended on.
                </p>

                <p>
                  His wife, <strong>Farhana Aktar</strong>, is caring for their two sons — an elder son of <strong>3.5 years</strong> and a baby of just <strong>10 months</strong>. For this young family, Arif is not simply the person who earns their living; he is the centre of their family and the person they look to for their future.
                </p>

                <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-2">
                  <h4 className="text-xs font-bold text-black uppercase tracking-wide">Previous Sacrifices & Financial Strain</h4>
                  <p className="text-xs text-neutral-700 leading-relaxed">
                    The past two years had already been a difficult journey for Arif. He spent almost two years ashore preparing for and completing his <strong>Class 2 Deck Officer examination</strong>. During that period, he faced serious financial pressure, accumulated approximately <strong>BDT 10 lakh in hand loans</strong>, and the family even had to sell his wife's gold jewellery to manage their circumstances.
                  </p>
                  <p className="text-xs text-neutral-700 leading-relaxed">
                    After all those sacrifices, Arif finally achieved his Class 2 certificate and returned to sea on <em>M.V. Meghna Fortune</em>. He had served for only a few months when his health suddenly began to deteriorate. What should have been the beginning of a new chapter has instead become an unexpected medical crisis.
                  </p>
                </div>

                <p>
                  Arif has also carried the responsibility of caring for his parents, both of whom required kidney dialysis. His younger brother, who lives abroad and is still a student, is doing whatever he can to help support the family. But the medical expenses arising from Arif's present condition are far beyond what the family can manage with their available resources.
                </p>

                <p>
                  His diagnosis is still undergoing confirmation, and the final treatment plan and cost are not yet known. What the family does know is that he needs continued medical investigation and specialist care, and that the expenses will be substantial. They have already exhausted most of what they had, and they are now even trying to sell their only remaining property — a modest house plot in their village — to help meet his medical needs.
                </p>

                <div className="p-5 rounded-2xl bg-neutral-900 text-white space-y-2 text-center">
                  <p className="text-xs sm:text-sm font-medium italic">
                    "They want to do everything within their ability to give Arif the chance to recover and return to a normal life. His two sons are still too young to understand what is happening. They need their father. His wife needs her husband. And at just 37 years of age, Arif still has so much life ahead of him."
                  </p>
                  <p className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                    They need him. And they are not ready to give up on him.
                  </p>
                </div>
              </div>

              <div className="flex justify-center pt-2">
                <a
                  href="#donate"
                  className="px-6 py-3.5 rounded-2xl bg-black text-white hover:bg-neutral-800 text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <Heart className="h-4 w-4 fill-white" /> Contribute to Arif Bhai's Treatment Fund
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Image Zoom Lightbox Modal */}
        {selectedImage && (
          <div 
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
            onClick={() => setSelectedImage(null)}
          >
            <div 
              className="relative max-w-2xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border-2 border-black space-y-0"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 border-b border-neutral-200">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold uppercase bg-black text-white px-2.5 py-0.5 rounded">
                    {selectedImage.tag}
                  </span>
                  <span className="text-xs font-bold text-black">{selectedImage.title}</span>
                </div>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="p-1.5 rounded-xl hover:bg-neutral-100 text-neutral-700 hover:text-black transition-colors cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Modal Image */}
              <div className="max-h-[70vh] bg-neutral-900 flex items-center justify-center overflow-hidden">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  className="max-h-[70vh] w-auto max-w-full object-contain"
                />
              </div>

              {/* Modal Caption */}
              <div className="p-4 bg-neutral-50 text-xs text-neutral-800 border-t border-neutral-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <p className="text-neutral-700">{selectedImage.subtitle}</p>
                <a
                  href="#donate"
                  onClick={() => setSelectedImage(null)}
                  className="px-4 py-2 rounded-xl bg-black text-white text-xs font-bold shrink-0 hover:bg-neutral-800 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Heart className="h-3.5 w-3.5 fill-white" /> Support Family
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

