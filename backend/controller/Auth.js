import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import RefreshToken from "../models/RefreshToken.js";
import dotenv from "dotenv";

dotenv.config();
const saltRounds = 10;

const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { id: user._id.toString(), role: user.role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "30m" }
  );

  const refreshToken = jwt.sign(
    { id: user._id.toString(), role: user.role },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "3d" }
  );

  return { accessToken, refreshToken };
};

export const registerUser = async (req, res) => {
  try {
    const { username, email, password, role, organizationName, contactInfo } =
      req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashPassword = await bcrypt.hash(password, saltRounds);

    const userData = {
      username,
      email,
      password: hashPassword,
      role: role || "user",
    };

    if (role === "organizer") {
      userData.organizationName = organizationName;
      userData.contactInfo = contactInfo;
    }

    const newUser = new User(userData);
    await newUser.save();

    const { accessToken, refreshToken } = generateTokens(newUser);

    await RefreshToken.create({
      userId: newUser._id,
      token: refreshToken,
      expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });

    const { password: _, ...userDataResponse } = newUser._doc;

    return res.status(201).json({
      message: "User successfully registered",
      accessToken,
      user: userDataResponse,
    });
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

    if (existingUser.role === "organizer") {
      if (existingUser.status === "pending") {
        return res
          .status(403)
          .json({ message: "Organizer account not yet verified" });
      }
      if (existingUser.status === "rejected") {
        return res
          .status(403)
          .json({ message: "Organizer account was rejected" });
      }
    }

    const match = await bcrypt.compare(password, existingUser.password);
    if (!match) return res.status(400).json({ message: "invalid credentials" });

    const { accessToken, refreshToken } = generateTokens(existingUser);

    let storedToken = await RefreshToken.findOne({ userId: existingUser._id });
    if (storedToken) {
      storedToken.token = refreshToken;
      storedToken.expiresAt = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
      await storedToken.save();
    } else {
      await RefreshToken.create({
        userId: existingUser._id,
        token: refreshToken,
        expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      });
    }

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });

    const { password: _, ...userData } = existingUser._doc;
    return res.status(200).json({
      message: "User succesfully login",
      accessToken,
      user: userData,
    });
  } catch (error) {
    console.log("error in logging user: ", error);
    return res.status(500).json({ message: error.message });
  }
};

export const refresh = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(401);

    const storedToken = await RefreshToken.findOne({ token: refreshToken });
    if (!storedToken) return res.sendStatus(403);

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);

      const accessToken = jwt.sign(
        { id: user.id, role: user.role },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "30m" }
      );

      res.json({ accessToken });
    });
  } catch (error) {
    console.log("Error in refreshing token:", error);
    res.status(500).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(204);

    await RefreshToken.deleteOne({ token: refreshToken });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("error in logging out" + error);
    res.status(500).json({ message: error.message });
  }
};

export const getProfile = async (req, res) => {
  res.json({ user: req.user });
};
