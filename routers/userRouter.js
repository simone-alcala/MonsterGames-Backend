import { Router } from 'express';

import { getUser } from '../controllers/userController.js';
import { validateSession } from '../middlewares/validateSession.js';

const userRouter = Router();

userRouter.get('/user', validateSession, getUser);

export default userRouter;