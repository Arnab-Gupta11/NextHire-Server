import { Router } from 'express';
import { AuthControllers } from './auth.controller';

const router = Router();

router.route('/login').post(AuthControllers.Login);

export const AuthRoutes = router;
