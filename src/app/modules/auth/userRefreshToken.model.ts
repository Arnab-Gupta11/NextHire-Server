import mongoose from 'mongoose';
import { TUserRefreshToken } from './auth.interface';

// Defining Schema
const userRefreshTokenSchema = new mongoose.Schema<TUserRefreshToken>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: '5d' },
});

// Model
const UserRefreshTokenModel = mongoose.model<TUserRefreshToken>(
  'UserRefreshToken',
  userRefreshTokenSchema,
);

export default UserRefreshTokenModel;
