import { Router } from 'express';
import { AuthControllers } from './auth.controller';
import auth from '../../middlewares/auth';

const router = Router();

router.route('/login').post(AuthControllers.login);
router
  .route('/reset-password-link')
  .post(AuthControllers.sendUserPasswordResetLinkByEmail);
router.route('/reset-password/:id/:token').post(AuthControllers.passwordReset);
router
  .route('/change-password')
  .post(auth('jobSeeker', 'recruiter'), AuthControllers.changePassword);
router.route('/logout').post(AuthControllers.logout);

export const AuthRoutes = router;
