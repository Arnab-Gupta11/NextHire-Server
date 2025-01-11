import jwt from 'jsonwebtoken';
import { IUser } from '../user/user.interface';
import { config } from '../../config';
import { Response } from 'express';

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

export const setTokenCookies = async (
  res: Response,
  accessToken: string,
  refreshToken: string,
  newAccessTokenExp: number,
  newRefreshTokenExp: number,
) => {
  const accessTokenMaxAge =
    (newAccessTokenExp - Math.floor(Date.now() / 1000)) * 1000;
  const refreshTokenmaxAge =
    (newRefreshTokenExp - Math.floor(Date.now() / 1000)) * 1000;
  // Set Cookie for Access Token
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: config.node_env === 'production',
    maxAge: accessTokenMaxAge,
  });
  // Set Cookie for Refresh Token
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: config.node_env === 'production', // Set to true if using HTTPS
    maxAge: refreshTokenmaxAge,
    // sameSite: 'strict', // Adjust according to your requirements
  });
};
