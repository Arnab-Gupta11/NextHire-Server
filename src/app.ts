import express, { Application, Request, Response } from 'express';
import notFound from './app/middlewares/notFound';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import router from './app/routes';
import cookieParser from 'cookie-parser';
import cors from 'cors';
const app: Application = express();
//Middleware to parse incoming JSON request
const corsOption = {
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOption));
//Application Routes
app.use('/api/v1', router);
//Base test route
app.get('/', (req: Request, res: Response) => {
  res.json({
    status: true,
    message: 'Server Live',
  });
});

//Handle undefined route.
app.use(notFound);

//Handle Error.
app.use(globalErrorHandler);

export default app;
