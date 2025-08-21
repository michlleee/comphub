import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader)
      return res
        .status(401)
        .json({ message: "No token provided, unauthorized" });

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: "Malformed authorization header" });
    }

    let decode;
    try {
      decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Access token expired" });
      }
      return res.status(401).json({ message: "Invalid access token" });
    }

    const user = await User.findById(decode.id).select("-password").lean();
    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user;
    next();
  } catch (error) {
    console.log("error in auth middleware: ", error);
    res.status(500).json({ message: "Server error in auth middleware" });
  }
};
