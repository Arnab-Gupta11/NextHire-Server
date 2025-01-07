/* eslint-disable @typescript-eslint/no-explicit-any */

import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import { User } from './user.model';
import { JobSeeker } from '../jobSeeker/jobSeeker.model';
import { sendEmailVerificationOTP } from './user.utils';

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
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    //Create a User
    const user = {
      email,
      password,
      role,
    };
    const newRegisterUser = await User.create([user], { session });
    if (!newRegisterUser.length) {
      throw new AppError(
        500,
        'User registration failed due to an unexpected error.',
      );
    }
    const jobSeeker = {
      user: newRegisterUser[0]._id,
      fullName,
      profilePicture: `https://avatar.iran.liara.run/username?username=${fullName}&bold=false&length=1`,
    };
    const newJobSeeker = await JobSeeker.create([jobSeeker], { session });
    if (!newJobSeeker.length) {
      throw new AppError(
        500,
        'Failed to create a Job Seeker profile. Please try again later.',
      );
    }
    await session.commitTransaction();
    await session.endSession();
    sendEmailVerificationOTP(newRegisterUser[0]);
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

export const UserServices = {
  createUserIntoDB,
};
