import { Router } from 'express';
import { AuthControllers } from './auth.controller';
import auth from '../../middlewares/auth';

const router = Router();

router.route('/login').post(AuthControllers.login);
router
  .route('/change-password')
  .post(auth('jobSeeker', 'recruiter'), AuthControllers.changePassword);
router.route('/logout').post(AuthControllers.logout);

export const AuthRoutes = router;
