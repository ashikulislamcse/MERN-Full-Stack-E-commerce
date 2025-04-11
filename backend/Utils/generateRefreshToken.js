import jwt from "jsonwebtoken";
import User from "../Models/userModel.js";
import dotenv from "dotenv";
dotenv.config();

const generateRefreshToken = async (userId) => {
  const token = jwt.sign({ id: userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "30d",
  });
  const updatedToken = await User.updateOne(
    { _id: userId },
    { refresh_token: token }
  );
  return token;
};

export default generateRefreshToken;
