import { Schema, model } from 'mongoose';
import { TRecruiter } from './recruiter.interface';

// Recruiter Schema Definition
const recruiterSchema = new Schema<TRecruiter>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    fullName: { type: String },
    phone: { type: String },
    profilePicture: { type: String },
    company: {
      name: { type: String },
      website: { type: String },
      logo: { type: String },
      location: { type: String },
      industry: { type: [String] },
      size: { type: String },
      about: { type: String },
    },
  },
  {
    timestamps: true,
  },
);

// Create and export the Recruiter model
export const Recruiter = model<TRecruiter>('Recruiter', recruiterSchema);
