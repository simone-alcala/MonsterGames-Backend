import { Router } from 'express';

import { validateUser } from './../schemas/authSchema.js';
import { validateSignUp } from './../middlewares/validateSignUp.js';
import { signUp } from './../controllers/authController.js'

const authRouter = Router();

authRouter.post('/signup', validateUser,validateSignUp , signUp );

export default authRouter;