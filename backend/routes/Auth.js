import express from "express";
import { getProfile, registerUser, userLogin } from "../controller/Auth.js";
import { authMiddleware } from "../middleware/Auth.js";
import { authorizedRolesMiddleware } from "../middleware/AuthorizedRoles.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", userLogin);
router.get(
  "/profile",
  authMiddleware,
  authorizedRolesMiddleware("user"),
  getProfile
);

export default router;
