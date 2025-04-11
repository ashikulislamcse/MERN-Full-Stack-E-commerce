import express from 'express';
import { registerUser, verifyEmail } from '../Controllers/userController.js';



const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/verify-email', verifyEmail);


export default userRouter;