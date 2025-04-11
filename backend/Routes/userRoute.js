import express from 'express';
import { registerUser, uploadUserAvatar, userLogin, userLogout, verifyEmail } from '../Controllers/userController.js';
import auth from '../Middleware/auth.js';
import upload from '../Middleware/multer.js';



const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/verify-email', verifyEmail);
userRouter.post('/login', userLogin);
userRouter.get('/logout',auth, userLogout);
userRouter.put('/upload-avatar',auth,upload.single('Avatar'), uploadUserAvatar);


export default userRouter;