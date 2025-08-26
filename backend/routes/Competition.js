import express from "express";
import {
  addCompetition,
  deleteCompetition,
  getAllCompetitions,
  getSingleCompetition,
  searchCompetition,
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

router.get("/search", authMiddleware, searchCompetition);

router.get("/all", authMiddleware, getAllCompetitions);

router.get("/:slug", authMiddleware, getSingleCompetition);

router.delete(
  "/:id",
  authMiddleware,
  authorizedRolesMiddleware("admin"),
  deleteCompetition
);

export default router;
