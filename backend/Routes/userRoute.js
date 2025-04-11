import express from "express";
import {
  forgotPassword,
  registerUser,
  resetPassword,
  updateUserDetails,
  uploadUserAvatar,
  userLogin,
  userLogout,
  verifyEmail,
  verifyForgotPasswordOTP,
} from "../Controllers/userController.js";
import auth from "../Middleware/auth.js";
import upload from "../Middleware/multer.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/verify-email", verifyEmail);
userRouter.post("/login", userLogin);
userRouter.get("/logout", auth, userLogout);
userRouter.put(
  "/upload-avatar",
  auth,
  upload.single("Avatar"),
  uploadUserAvatar
);
userRouter.put("/update-user", auth, updateUserDetails);
userRouter.put("/forgot-password", forgotPassword);
userRouter.put("/verify-forgot-password-otp", verifyForgotPasswordOTP);
userRouter.put("/reset-password", resetPassword);

export default userRouter;
