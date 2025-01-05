/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';

const notFound = (req: Request, res: Response, next: NextFunction): void => {
  res.status(404).json({
    success: false,
    message: 'The requested resource was not found on this server.',
    error: { details: [{ path: req.originalUrl, message: 'Not Found' }] },
  });
};
export default notFound;
