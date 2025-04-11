import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


const auth = async (req, res, next) => {
    try {
        const token = req.cookies.accessToken || req?.header?.authorization?.split(" ")[1];
        if (!token) {
        return res.status(401).json({ success: false, message: "Provide Token" });
        }
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        if (!decoded) {
            return res.status(401).json({ success: false, message: "Unauthorized User" });
        }
        req.userId = decoded.id;
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }
};
export default auth;