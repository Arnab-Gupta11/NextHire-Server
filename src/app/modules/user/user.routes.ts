import { Router } from 'express';
import { UserControler } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidations } from './user.validation';

const router = Router();

router
  .route('/create-user')
  .post(
    validateRequest(UserValidations.createUserValidationSchema),
    UserControler.createUser,
  );

export const UserRoutes = router;
