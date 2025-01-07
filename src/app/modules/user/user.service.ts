/* eslint-disable @typescript-eslint/no-explicit-any */

import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import { User } from './user.model';
import { JobSeeker } from '../jobSeeker/jobSeeker.model';
import { sendEmailVerificationOTP } from './user.utils';
import { EmailVerificationModel } from './emailVerification.model';

/* ---------> Create a new user. <----------- */
const createUserIntoDB = async (payload: Record<string, string>) => {
  const { fullName, email, password, confirmedPassword, role } = payload;
  // Check if all required fields are provided
  if (!fullName || !email || !password || !confirmedPassword) {
    throw new AppError(
      400,
      'All fields (Full Name, Email, Password, Confirmed Password) are required.',
    );
  }

  // Check if password and password_confirmation match
  if (password !== confirmedPassword) {
    throw new AppError(
      400,
      'Passwords do not match. Please ensure both password fields are identical.',
    );
  }

  //Check if User is already exist
  const doesEmailExist = await User.exists({ email });
  if (doesEmailExist) {
    throw new AppError(
      409,
      'A user with this email already exists. Please try logging in or use a different email.',
    );
  }
  //<----------- start session ----------->
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    //Create a User
    const user = {
      email,
      password,
      role,
    };
    //Register user into DB
    const newRegisterUser = await User.create([user], { session });
    if (!newRegisterUser.length) {
      throw new AppError(
        500,
        'User registration failed due to an unexpected error.',
      );
    }
    //Create a new jobSeeker Profile.
    const jobSeeker = {
      user: newRegisterUser[0]._id,
      fullName,
      profilePicture: `https://avatar.iran.liara.run/username?username=${fullName}&bold=false&length=1`,
    };
    //Register jobSeeker Profile into DB.
    const newJobSeeker = await JobSeeker.create([jobSeeker], { session });
    if (!newJobSeeker.length) {
      throw new AppError(
        500,
        'Failed to create a Job Seeker profile. Please try again later.',
      );
    }
    await session.commitTransaction();
    await session.endSession();
    //Send Verification Email.
    sendEmailVerificationOTP(newRegisterUser[0]);

    //Send Response.
    const response = {
      userId: newRegisterUser[0]._id,
      email,
      fullName,
      profilePicture: newJobSeeker[0].profilePicture,
      role,
    };
    return response;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err.message);
  }
};

/* ---------> User Email Verification. <----------- */
const verifyUserEmailInDB = async (email: string, otp: string) => {
  // Check if all required fields are provided
  if (!email || !otp) {
    throw new AppError(400, 'Email and OTP are required.');
  }

  // Fetch user details using the provided email
  const existingUser = await User.findOne({ email });

  // Check if email does not exist in the database
  if (!existingUser) {
    throw new AppError(404, 'No user found with the provided email.');
  }

  // Verify if the email is already verified.
  if (existingUser.isVerified) {
    throw new AppError(400, 'Email is already verified.');
  }

  // Fetch the email verification record matching the user and OTP.
  const emailVerification = await EmailVerificationModel.findOne({
    userId: existingUser._id,
    otp,
  });

  // Handle invalid OTP
  if (!emailVerification) {
    if (!existingUser.isVerified) {
      // Resend a new OTP if the email is not verified.
      await sendEmailVerificationOTP(existingUser);
      throw new AppError(
        422,
        'Invalid OTP. A new OTP has been sent to your email.',
      );
    }
    throw new AppError(422, 'Invalid OTP.');
  }

  // Check if the OTP has expired.
  const currentTime = new Date();
  const expireationTime = new Date(
    emailVerification.createdAt.getTime() + 15 * 60 * 1000,
  );
  if (currentTime > expireationTime) {
    // Resend a new OTP if the previous one has expired
    await sendEmailVerificationOTP(existingUser);
    throw new AppError(
      422,
      'OTP has expired. A new OTP has been sent to your email.',
    );
  }
  // Mark the user's email as verified
  existingUser.isVerified = true;
  await existingUser.save();

  // Delete all email verification records for this user.
  await EmailVerificationModel.deleteMany({ userId: existingUser._id });

  return true;
};

export const UserServices = {
  createUserIntoDB,
  verifyUserEmailInDB,
};
