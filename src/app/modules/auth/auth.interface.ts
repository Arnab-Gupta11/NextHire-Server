import { ObjectId } from 'mongoose';

export type TUserRefreshToken = {
  userId: ObjectId;
  token: string;
  createdAt: Date;
};

export type TChangePassword = {
  oldPassword: string;
  newPassword: string;
};
export type TResetPassword = {
  password: string;
  confirmedPassword: string;
};
