import User from "../Models/userModel.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import sendMail from "../config/sendEmail.js";
dotenv.config();

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
    await sendMail(
      email,
      "Welcome to Our Website",
      `<h1>Hi ${name},</h1><p>Thanks for registering at Our Website!</p>`
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
