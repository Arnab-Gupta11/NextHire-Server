/* eslint-disable @typescript-eslint/no-unused-vars */
import jwt, { JwtPayload } from 'jsonwebtoken';
import AppError from '../../errors/AppError';
import { JobSeeker } from '../jobSeeker/jobSeeker.model';
import { Recruiter } from '../recruiter/recruiter.model';
import { User } from '../user/user.model';
import { TChangePassword, TResetPassword } from './auth.interface';
import {
  createAccessToken,
  createPasswordResetToken,
  createRefreshToken,
} from './auth.utils';
import { config } from '../../config';
import { sendEmail } from '../../utils/sendEmail';
import { passwordResetEmailTemplate } from '../../utils/emailTemplate';
import { IUser } from '../user/user.interface';

/*--------> Login User. <---------*/
const LoginUser = async (email: string, password: string) => {
  // Validate that email and password are provided
  if (!email || !password) {
    throw new AppError(400, 'Email and password are required.');
  }

  // Fetch the user from the database using the provided email
  const user = await User.findOne({ email });

  // Check if the user exists in the database.
  if (!user) {
    throw new AppError(404, 'Invalid email or password.');
  }

  // Verify if the user's email is confirmed.
  if (!user.isVerified) {
    throw new AppError(
      401,
      'Your account is not verified. Please verify your email to continue.',
    );
  }

  // Compare the provided password with the hashed password stored in the database
  const isPasswordMatched = await User.isPasswordMatched(
    password,
    user.password,
  );
  if (!isPasswordMatched) {
    throw new AppError(401, 'Invalid email or password.');
  }

  //Generate access token
  const accessToken = createAccessToken(user);
  //Generate refresh token
  const refreshToken = createRefreshToken(user);
  // Get User Profile.
  let userProfile;
  if (user.role === 'jobSeeker') {
    userProfile = await JobSeeker.findOne({ userId: user._id });
  } else {
    userProfile = await Recruiter.findOne({ userId: user._id });
  }
  return {
    id: user._id,
    name: userProfile?.fullName,
    profilePicture: userProfile?.profilePicture,
    email: user.email,
    role: user.role,
    accessToken,
    refreshToken,
  };
};

/*-------> Change Password. <-------*/
const changePasswordIntoDB = async (
  userData: JwtPayload,
  payload: TChangePassword,
) => {
  const { _id } = userData;
  const { oldPassword, newPassword } = payload;
  // Check if both password and password_confirmation are provided
  if (!oldPassword || !newPassword) {
    throw new AppError(400, 'All Fields are required.');
  }
  //check if user is found.
  const user = await User.findById(_id);
  if (!user) {
    throw new AppError(404, 'User not found.');
  }
  //checking if the old password is correct.
  const isOldPasswordMatched = await User.isPasswordMatched(
    oldPassword,
    user?.password,
  );
  if (!isOldPasswordMatched) {
    throw new AppError(400, 'Password do not matched.');
  }

  //generate hash password
  const hashPassword = await User.generateHashPassword(newPassword);

  //Update user password
  await User.findByIdAndUpdate(_id, { $set: { password: hashPassword } });
  return null;
};

/*-------> Send Password Resest link via email <--------*/
const SendUserPasswordResetEmail = async (email: string) => {
  // Check if email is provided
  if (!email) {
    throw new AppError(400, 'Email Field is Required.');
  }
  // Find user by email
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError(400, "Email doesn't exist.");
  }
  // Generate token for password reset.
  const token = createPasswordResetToken(user) as string;

  //Password Reset Link
  const resetLink = `${config.frontend_host}/account/reset-password-confirm/${user._id}/${token}`;

  await sendEmail({
    to: user.email,
    subject: 'Password Reset Link',
    html: passwordResetEmailTemplate(resetLink),
  });
  return resetLink;
};
/*-------> Password Reset <--------*/
const userPasswordReset = async (
  payload: TResetPassword,
  id: string,
  token: string,
) => {
  const { password, confirmedPassword } = payload;
  // Check if password and password_confirmation are provided
  if (!password || !confirmedPassword) {
    throw new AppError(
      400,
      'New Password and Confirm New Password are required',
    );
  }
  // Check if password and password_confirmation match
  if (password !== confirmedPassword) {
    throw new AppError(
      400,
      "New Password and Confirm New Password don't match",
    );
  }
  // Find user by ID
  const user = (await User.findById(id)) as IUser;
  if (!user) {
    throw new AppError(404, 'User not found');
  }
  // Validate token
  let decoded;
  try {
    decoded = jwt.verify(
      token,
      config.jwt_password_reset_token_secret_key as string,
    ) as JwtPayload;
  } catch (err) {
    throw new AppError(
      403,
      'The password reset link has expired or is invalid. Please request a new password reset link.',
    );
  }
  if (user._id.toString() !== decoded._id) {
    throw new AppError(
      403,
      'The password reset link has expired or is invalid. Please request a new password reset link.',
    );
  }
  // Generate salt and hash new password.
  const hashPassword = await User.generateHashPassword(password);
  // Update user's password
  await User.findByIdAndUpdate(user._id, { $set: { password: hashPassword } });
  return null;
};

export const AuthServices = {
  LoginUser,
  changePasswordIntoDB,
  SendUserPasswordResetEmail,
  userPasswordReset,
};
