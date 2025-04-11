import express from 'express';
import { registerUser, userLogin, verifyEmail } from '../Controllers/userController.js';



const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/verify-email', verifyEmail);
userRouter.post('/login', userLogin);


export default userRouter;