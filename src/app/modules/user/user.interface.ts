import { Document, ObjectId } from 'mongoose';

// Interface for User Schema
export interface IUser extends Document {
  email: string;
  password: string;
  isVerified?: boolean;
  role: 'jobSeeker' | 'recruiter';
  createdAt?: Date;
  updatedAt?: Date;
}

export type TEmailVerification = {
  userId: ObjectId;
  otp: string;
  createdAt: Date;
};
