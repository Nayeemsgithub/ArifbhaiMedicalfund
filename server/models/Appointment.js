import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  patientName: { type: String, required: true, trim: true },
  patientEmail: { type: String, required: true, trim: true, lowercase: true },
  patientPhone: { type: String, required: true, trim: true },
  specialtyId: { type: String, default: 'general' },
  reason: { type: String, required: true },
  preferredDate: { type: String, required: true },
  urgency: { type: String, enum: ['routine', 'priority', 'urgent'], default: 'routine' },
  status: { type: String, enum: ['pending', 'confirmed', 'completed', 'cancelled'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

export const Appointment = mongoose.models.Appointment || mongoose.model('Appointment', appointmentSchema);
