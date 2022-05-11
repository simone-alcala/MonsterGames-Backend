import { Router } from 'express';

import { validateSignIn } from '../middlewares/validateSignIn.js';
import { validateSignUp } from './../middlewares/validateSignUp.js';
import { signUp, signIn } from './../controllers/authController.js';
import { validateUser, schemaSignIn } from './../schemas/authSchema.js';

const authRouter = Router();

authRouter.post('/signup', validateUser, validateSignUp, signUp );
authRouter.post('/signin', schemaSignIn, validateSignIn, signIn );

export default authRouter;