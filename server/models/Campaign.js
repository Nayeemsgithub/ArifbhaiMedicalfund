import mongoose from 'mongoose';

const campaignSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  patientAge: { type: Number, required: true },
  diagnosis: { type: String, required: true },
  hospital: { type: String, required: true },
  leadOncologist: { type: String },
  guardian: { type: String },
  location: { type: String },
  story: { type: String, required: true },
  targetGoal: { type: Number, required: true },
  verifiedHospitalId: { type: String },
  status: { type: String, default: 'Active Treatment' },
  heroImage: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export const Campaign = mongoose.models.Campaign || mongoose.model('Campaign', campaignSchema);
