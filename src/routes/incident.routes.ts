import { Router } from "express";
import {
  getIncidents, getIncidentById, createIncident, updateIncident,
  updateIncidentStatus, deleteIncident, getCriticalIncidents,
  getPendingIncidents, getStats
} from "../controllers/incident.controller";
import { loggerMiddleware } from "../middlewares/logger.middleware";
import { requestInfoMiddleware } from "../middlewares/request-info.middleware";
import { validateId } from "../middlewares/validate-id.middleware";
import { validateIncident } from "../middlewares/validate-incident.middleware";
import { authMiddleware } from "../middlewares/auth.middleware";
import { adminMiddleware } from "../middlewares/admin.middleware";

const router = Router();

router.use(loggerMiddleware, requestInfoMiddleware);

router.get("/critical", getCriticalIncidents);
router.get("/pending", getPendingIncidents);
router.get("/stats", getStats);

router.get("/", getIncidents);
router.get("/:id", validateId, getIncidentById);
router.post("/", validateIncident, createIncident);
router.put("/:id", validateId, validateIncident, updateIncident);
router.patch("/:id/status", validateId, updateIncidentStatus);
router.delete("/:id", validateId, authMiddleware, adminMiddleware, deleteIncident);

export default router;