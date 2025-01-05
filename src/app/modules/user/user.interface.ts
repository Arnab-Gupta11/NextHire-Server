import { Document } from 'mongoose';

// Interface for User Schema
export interface IUser extends Document {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  isVerified: boolean;
  role: 'jobSeeker' | 'recruiter';
  createdAt: Date;
  updatedAt: Date;
}
