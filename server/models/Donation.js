import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema({
  donorName: { type: String, default: 'Anonymous Supporter' },
  amount: { type: Number, required: true, min: 1 },
  message: { type: String, default: '' },
  isAnonymous: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export const Donation = mongoose.models.Donation || mongoose.model('Donation', donationSchema);
