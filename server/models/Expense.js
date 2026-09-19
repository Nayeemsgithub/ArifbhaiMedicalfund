import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: {
    type: String,
    enum: [
      'Chemotherapy & Medications',
      'Hospital Stay & ICU',
      'Diagnostics & Labs',
      'Surgery & Procedures',
      'Supportive Care & Pharmacy',
      'Emergency & Transport',
      'Other'
    ],
    default: 'Chemotherapy & Medications'
  },
  amount: { type: Number, required: true, min: 1 },
  date: { type: String, required: true },
  vendor: { type: String, required: true },
  invoiceNumber: { type: String, required: true },
  receiptUrl: { type: String, default: '#' },
  verified: { type: Boolean, default: true },
  verifiedBy: { type: String, default: 'Hospital Billing Department' },
  description: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

export const Expense = mongoose.models.Expense || mongoose.model('Expense', expenseSchema);
