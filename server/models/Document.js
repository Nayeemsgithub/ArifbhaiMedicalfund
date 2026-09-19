import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: {
    type: String,
    enum: [
      'Clinical Certification',
      'Itemized Hospital Bill',
      'Diagnostic Lab Report',
      'Financial & Escrow',
      'Prescription & Pharmacy',
      'Other'
    ],
    default: 'Itemized Hospital Bill'
  },
  issuer: { type: String, required: true },
  date: { type: String, required: true },
  fileUrl: { type: String, default: '#' },
  previewImage: { type: String, default: '' },
  verified: { type: Boolean, default: true },
  description: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

export const MedicalDocument = mongoose.models.MedicalDocument || mongoose.model('MedicalDocument', documentSchema);
