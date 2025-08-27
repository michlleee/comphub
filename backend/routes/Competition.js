import express from "express";
import {
  addCompetition,
  deleteCompetition,
  editCompetition,
  getAllCompetitions,
  getSingleCompetition,
  getSpecificCompetitions,
  searchCompetition,
} from "../controller/Competition.js";
import { authMiddleware } from "../middleware/Auth.js";
import { authorizedRolesMiddleware } from "../middleware/AuthorizedRoles.js";

const router = express.Router();

router.post(
  "/add",
  authMiddleware,
  authorizedRolesMiddleware("admin", "organizer"),
  addCompetition
);

router.patch(
  "/edit/:slug",
  authMiddleware,
  authorizedRolesMiddleware("admin", "organizer"),
  editCompetition
);

router.get(
  "/mine",
  authMiddleware,
  authorizedRolesMiddleware("organizer"),
  getSpecificCompetitions
);

router.get("/search", authMiddleware, searchCompetition);

router.get("/all", authMiddleware, getAllCompetitions);

router.get("/:slug", authMiddleware, getSingleCompetition);

router.delete(
  "/:slug",
  authMiddleware,
  authorizedRolesMiddleware("admin", "organizer"),
  deleteCompetition
);

export default router;
