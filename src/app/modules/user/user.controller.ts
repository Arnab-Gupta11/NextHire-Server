import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.createUserIntoDB(req.body);
  if (result) {
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: 'User is created succesfully',
      data: result,
    });
  }
});
export const UserControler = {
  createUser,
};
