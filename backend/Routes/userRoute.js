import express from 'express';
import { registerUser, userLogin, userLogout, verifyEmail } from '../Controllers/userController.js';
import auth from '../Middleware/auth.js';



const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/verify-email', verifyEmail);
userRouter.post('/login', userLogin);
userRouter.get('/logout',auth, userLogout);


export default userRouter;