/* eslint-disable no-unused-vars */
import { Document, Model, ObjectId } from 'mongoose';
import { USER_ROLE } from './user.constant';

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
  generateHashPassword(password: string): Promise<string>;
}

export type TUserRole = keyof typeof USER_ROLE;
