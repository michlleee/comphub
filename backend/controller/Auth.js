import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();
const saltRounds = 10;

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({
      name: name,
      email: email,
      password: hashPassword,
      role: role || "user",
    });
    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id.toString(), role: newUser.role },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30m" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 60 * 1000,
    });

    const { password: _, ...userData } = newUser._doc;

    return res
      .status(201)
      .json({ message: "User succesfully registered", token, user: userData });
  } catch (error) {
    console.log("error in registering user: ", error);
    return res.status(500).json({ message: error.message });
  }
};

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(400).json({ message: "User not found" });

    const match = await bcrypt.compare(password, existingUser.password);
    if (!match) return res.status(400).json({ message: "invalid credentials" });

    const token = jwt.sign(
      { id: existingUser._id, role: existingUser.role },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30m" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 60 * 1000,
    });

    const { password: _, ...userData } = existingUser._doc;
    return res
      .status(201)
      .json({ message: "User succesfully login", token, user: userData });
  } catch (error) {
    console.log("error in logging user: ", error);
    return res.status(500).json({ message: error.message });
  }
};

export const getProfile = async (req, res) => {
  res.json({ user: req.user });
};
