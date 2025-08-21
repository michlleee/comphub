import express from "express";
import { addCompetition } from "../controller/Competition";
import { authMiddleware } from "../middleware/Auth";
import { authorizedRolesMiddleware } from "../middleware/AuthorizedRoles";

const router = express.Router();

router.post(
  "/add",
  authMiddleware,
  authorizedRolesMiddleware("admin"),
  addCompetition
);

export default router;
