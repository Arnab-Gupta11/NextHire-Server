import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import AppError from '../../errors/AppError';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.createUserIntoDB(req.body);
  if (result) {
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: 'User registration successful. Welcome aboard!',
      data: result,
    });
  }
});
const verifyUserEmail = catchAsync(async (req: Request, res: Response) => {
  const { email, otp } = req.body;
  const result = await UserServices.verifyUserEmailInDB(email, otp);
  if (result) {
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Email verified successfully.',
      data: {},
    });
  } else {
    throw new AppError(
      500,
      'An error occurred while verifying the email. Please try again later.',
    );
  }
});
export const UserControler = {
  createUser,
  verifyUserEmail,
};
