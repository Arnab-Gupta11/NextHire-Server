import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { TUserRole } from '../modules/user/user.interface';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import { config } from '../config';
import { User } from '../modules/user/user.model';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.accessToken;
    console.log(token);
    //checking if the token is missing.
    if (!token) {
      throw new AppError(401, 'You are not authorized');
    }
    //checking if the given token is valid.
    const decoded = jwt.verify(
      token,
      config.jwt_access_token_secret_key as string,
    ) as JwtPayload;
    const { role, _id } = decoded;
    console.log(role);
    // checking if the user is exist.
    const user = await User.findById(_id);
    if (!user) {
      throw new AppError(401, 'This user is not found !');
    }
    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(401, 'You are not authorized!');
    }
    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
