import express from "express";

import { authMiddleware } from "../middleware/Auth.js";
import { authorizedRolesMiddleware } from "../middleware/AuthorizedRoles.js";
import {
  approveOrganizerStatus,
  getPendingOrganizers,
  rejectOrganizerStatus,
} from "../controller/Admin.js";

const router = express.Router();

router.get(
  "/organizers/pending",
  authMiddleware,
  authorizedRolesMiddleware("admin"),
  getPendingOrganizers
);

router.patch(
  "/organizers/:id/approve",
  authMiddleware,
  authorizedRolesMiddleware("admin"),
  approveOrganizerStatus
);

router.patch(
  "/organizers/:id/reject",
  authMiddleware,
  authorizedRolesMiddleware("admin"),
  rejectOrganizerStatus
);

export default router;
