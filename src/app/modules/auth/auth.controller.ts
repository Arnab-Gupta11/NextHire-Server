import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { AuthServices } from './auth.service';
import { config } from '../../config';
import sendResponse from '../../utils/sendResponse';

const Login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const result = await AuthServices.LoginUser(email, password);
  const { accessToken, refreshToken } = result;
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: config.node_env === 'production',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: config.node_env === 'production',
    maxAge: 60 * 60 * 1000,
  });
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Login Successfully',
    data: {
      id: result.id,
      email: result.email,
      roles: result.role,
      is_auth: true,
    },
  });
});
export const AuthControllers = {
  Login,
};
