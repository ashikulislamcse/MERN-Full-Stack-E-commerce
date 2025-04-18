import User from "../Models/userModel.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import sendMail from "../config/sendEmail.js";
import verifyEmailTemplate from "../Utils/VerifyEmailTemplete.js";
import generateAccessToken from "../Utils/generateAccessToken.js";
import generateRefreshToken from "../Utils/generateRefreshToken.js";
import uploadImageToClowdinary from "../Utils/clowdinary.js";
import generateOTP from "../Utils/generateOTP.js";
import ForgotPasswordEmailTemplate from "../Utils/ForgotPasswordEmailTemplete.js";
import jwt from "jsonwebtoken";

dotenv.config();

// User Registration

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    const VerifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${newUser?._id}`;

    await sendMail(
      email,
      "Verify email from CholoKinbo",
      verifyEmailTemplate({
        name,
        url: VerifyEmailUrl,
      })
    );

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: newUser,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Email Verification
export const verifyEmail = async (req, res) => {
  try {
    const { code } = req.body;
    const user = await User.findOne({ _id: code });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    if (user.verify_email) {
      return res
        .status(400)
        .json({ success: false, message: "User already verified" });
    }
    user.verify_email = true;
    await user.save();
    return res
      .status(200)
      .json({ success: true, message: "User verified successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// User Login

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User Not Found!" });
    }
    if (user.status !== "Active") {
      return res
        .status(400)
        .json({ success: false, message: "Account not Active" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Password" });
    }
    const accessToken = await generateAccessToken(user._id);
    const refreshToken = await generateRefreshToken(user._id);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        userId: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        mobile: user.mobile,
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// User Logout

export const userLogout = async (req, res) => {
  try {
    const userId = req.userId;
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    const removeRefreshToken = await User.findByIdAndUpdate(userId, {
      refresh_token: "",
    });
    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Upload user Avatar

export const uploadUserAvatar = async (req, res) => {
  try {
    const userId = req.userId; //Auth Middleware the userId
    const image = req.file; //Multer Middleware the image
    const upload = await uploadImageToClowdinary(image);

    const updatedUser = await User.findByIdAndUpdate(userId, {
      avatar: upload.secure_url,
    });

    return res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      data: {
        _id: userId,
        avatar: upload.secure_url,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Update User Details

export const updateUserDetails = async (req, res) => {
  try {
    const userId = req.userId; //Auth Middleware the userId
    const { name, email, mobile, password } = req.body;

    const updatedUser = await User.updateOne(
      { _id: userId },
      {
        ...(name && { name: name }),
        ...(email && { email: email }),
        ...(mobile && { mobile: mobile }),
        ...(password && { password: await bcrypt.hash(password, 10) }),
      }
    );
    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Fotgot Password When User Not Login
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User Not Found!" });
    }
    const OTP = generateOTP();
    const expireTime = Date.now() + 30 * 60 * 1000; // 30 minutes

    const updatedUser = await User.findByIdAndUpdate(user._id, {
      forgot_password_otp: OTP,
      forgot_password_expiry: new Date(expireTime).toISOString(),
    });

    await sendMail(
      email,
      "Forgot Password OTP from CholoKinbo",
      ForgotPasswordEmailTemplate({
        name: user.name,
        otp: OTP,
      })
    );

    return res.status(200).json({
      success: true,
      message: "OTP sent to your email",
      data: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Verify OTP for Forgot Password
export const verifyForgotPasswordOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User Not Found!" });
    }
    const currentTime = new Date().toISOString();
    if (user.forgot_password_expiry < currentTime) {
      return res
        .status(400)
        .json({ success: false, message: "OTP is Expired" });
    }
    if (otp !== user.forgot_password_otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }
    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Reset Password
export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword, confirmPassword } = req.body;
    if (!email || !newPassword || !confirmPassword) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    if (newPassword !== confirmPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Passwords do not match" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User is not Available" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const updatedUser = await User.findByIdAndUpdate(user._id, {
      password: hashedPassword,
      forgot_password_otp: "",
      forgot_password_expiry: "",
    });
    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
      data: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Refresh Token
export const refreshToken = async (req, res) => {
  try {
    const refreshToken =
      req.cookies.refreshToken || req?.header?.authorization?.split(" ")[1];
    if (!refreshToken) {
      return res
        .status(400)
        .json({ success: false, message: "Refresh token not found" });
    }
    const verifyToken = await jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    console.log("verifyToken",verifyToken);
    const userId = verifyToken._id;
    if(!verifyToken){
      return res.status(400).json({ success: false, message: "Invalid token" });
    }
    const newAccessToken = await generateAccessToken(userId);
    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    return res.status(200).json({
      success: true,
      message: "New access token generated",
      data: {
        accessToken: newAccessToken,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
