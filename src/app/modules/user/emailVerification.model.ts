import mongoose from 'mongoose';
import { TEmailVerification } from './user.interface';

// Defining Schema
const emailVerificationSchema = new mongoose.Schema<TEmailVerification>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: '15m' },
});

// Model
export const EmailVerificationModel = mongoose.model<TEmailVerification>(
  'EmailVerification',
  emailVerificationSchema,
);
