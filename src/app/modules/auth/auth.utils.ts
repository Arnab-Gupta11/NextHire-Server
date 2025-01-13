import jwt from 'jsonwebtoken';
import { IUser } from '../user/user.interface';
import { config } from '../../config';

export const createAccessToken = (user: IUser) => {
  const payload = {
    _id: user._id,
    role: user.role,
  };
  const secret = config.jwt_access_token_secret_key as string;
  const expiresIn = '1h';
  return jwt.sign(payload, secret, { expiresIn });
};
export const createRefreshToken = (user: IUser) => {
  const payload = {
    _id: user._id,
    role: user.role,
  };
  const secret = config.jwt_refresh_token_secret_key as string;
  const expiresIn = '365d';
  return jwt.sign(payload, secret, { expiresIn });
};
export const createPasswordResetToken = (user: IUser) => {
  const payload = {
    _id: user._id,
  };
  const secret = config.jwt_password_reset_token_secret_key as string;
  const expiresIn = '15m';
  return jwt.sign(payload, secret, { expiresIn });
};
