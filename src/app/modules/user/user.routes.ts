import { Router } from 'express';
import { UserControler } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidations } from './user.validation';
import auth from '../../middlewares/auth';

const router = Router();

router
  .route('/create-user')
  .post(
    validateRequest(UserValidations.createUserValidationSchema),
    UserControler.createUser,
  );
router.route('/verify-email').post(UserControler.verifyUserEmail);
router
  .route('/me')
  .get(auth('jobSeeker', 'recruiter'), UserControler.getUserProfile);

export const UserRoutes = router;
