/* eslint-disable no-unused-vars */
import { Document, Model, ObjectId } from 'mongoose';

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

export interface UserModel extends Model<IUser> {
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}
