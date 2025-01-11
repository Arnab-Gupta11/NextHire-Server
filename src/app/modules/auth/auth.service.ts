import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { createAccessToken, createRefreshToken } from './auth.utils';

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

  return {
    id: user._id,
    email: user.email,
    role: user.role,
    is_auth: true,
    accessToken,
    refreshToken,
  };
};

export const AuthServices = {
  LoginUser,
};
