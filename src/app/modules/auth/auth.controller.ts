import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { AuthServices } from './auth.service';
import { config } from '../../config';
import sendResponse from '../../utils/sendResponse';

//Login controller.
const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const result = await AuthServices.LoginUser(email, password);
  const { id, role, name, profilePicture, accessToken, refreshToken } = result;
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
    data: { id, email, name, role, profilePicture },
  });
});
//change Password controller.
const changePassword = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.changePasswordIntoDB(req?.user, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Password is changed succesfully!',
    data: result,
  });
});

const sendUserPasswordResetLinkByEmail = catchAsync(
  async (req: Request, res: Response) => {
    const { email } = req.body;
    const result = await AuthServices.SendUserPasswordResetEmail(email);
    if (result) {
      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Password reset email sent. Please check your email.',
        data: result,
      });
    }
  },
);

const passwordReset = catchAsync(async (req: Request, res: Response) => {
  const { id, token } = req.params;
  const result = await AuthServices.userPasswordReset(req.body, id, token);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Password reset successfully.',
    data: result,
  });
});

//Logout controller.
const logout = catchAsync(async (req: Request, res: Response) => {
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Logout successfully',
    data: {},
  });
});
export const AuthControllers = {
  login,
  logout,
  changePassword,
  sendUserPasswordResetLinkByEmail,
  passwordReset,
};
