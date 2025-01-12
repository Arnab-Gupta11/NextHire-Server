import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { IUser, UserModel } from './user.interface';
import { config } from '../../config';
// Common User Schema for both Recruiters and Job Seekers
const userSchema = new mongoose.Schema<IUser, UserModel>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    role: { type: String, enum: ['jobSeeker', 'recruiter'], required: true },
  },
  { timestamps: true },
);

// Hash password before saving
// userSchema.pre('save', async function (next) {
//   if (this.isModified('password')) {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//   }
//   next();
// });

//static methods.
//check if password matched.
userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};
//Generate hash password.
userSchema.statics.generateHashPassword = async function (password) {
  const salt = await bcrypt.genSalt(Number(config.bcrypt_salt_rounds));
  const newHashPassword = await bcrypt.hash(password, salt);
  return newHashPassword;
};
export const User = mongoose.model<IUser, UserModel>('User', userSchema);
