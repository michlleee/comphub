import express from "express";

import { authMiddleware } from "../middleware/Auth.js";
import { authorizedRolesMiddleware } from "../middleware/AuthorizedRoles.js";
import {
  getPendingOrganizers,
  updateOrganizerStatus,
} from "../controller/Admin.js";

const router = express.Router();

router.get(
  "/organizers/pending",
  authMiddleware,
  authorizedRolesMiddleware("admin"),
  getPendingOrganizers
);

router.patch(
  "/organizers/:id/verify",
  authMiddleware,
  authorizedRolesMiddleware("admin"),
  updateOrganizerStatus
);

export default router;
