import express from "express";
import { authMiddleware } from "../middleware/Auth.js";
import { authorizedRolesMiddleware } from "../middleware/AuthorizedRoles.js";
import {
  getAllSavedComp,
  removeSavedComp,
  saveComp,
} from "../controller/User.js";

const router = express.Router();

router.post(
  "/save/:slug",
  authMiddleware,
  authorizedRolesMiddleware("user"),
  saveComp
);

router.delete(
  "/save/:slug",
  authMiddleware,
  authorizedRolesMiddleware("user"),
  removeSavedComp
);

router.get(
  "/saved",
  authMiddleware,
  authorizedRolesMiddleware("user"),
  getAllSavedComp
);

export default router;
