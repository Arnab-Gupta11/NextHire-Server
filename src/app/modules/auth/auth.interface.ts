import { ObjectId } from 'mongoose';

export type TUserRefreshToken = {
  userId: ObjectId;
  token: string;
  createdAt: Date;
};
