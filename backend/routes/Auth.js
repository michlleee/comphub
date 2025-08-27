import express from "express";
import {
  getProfile,
  logout,
  refresh,
  registerUser,
  userLogin,
} from "../controller/Auth.js";
import { authMiddleware } from "../middleware/Auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", userLogin);
router.post("/refresh", refresh);
router.post("/logout", logout);
router.get("/profile", authMiddleware, getProfile);

export default router;
