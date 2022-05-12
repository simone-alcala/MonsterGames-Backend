import { Router } from 'express';

import { getUser } from '../controllers/userController.js';
import { validateUser } from '../middlewares/validateUser.js';

const userRouter = Router();

userRouter.get('/user/:token', validateUser, getUser);

export default userRouter;