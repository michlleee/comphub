import express from "express";
import {
  addCompetition,
  getAllCompetitions,
} from "../controller/Competition.js";
import { authMiddleware } from "../middleware/Auth.js";
import { authorizedRolesMiddleware } from "../middleware/AuthorizedRoles.js";

const router = express.Router();

router.post(
  "/add",
  authMiddleware,
  authorizedRolesMiddleware("admin"),
  addCompetition
);

router.get(
  "/all",
  authMiddleware,
  authorizedRolesMiddleware("admin"),
  getAllCompetitions
);

export default router;
