import express from "express";
import {
  getPlayersByEvent,
  updatePartner,
} from "../controllers/partnersControllers.js";

const router = express.Router();

// Get all players registered for a particular event
router.get("/event/:eventId", getPlayersByEvent);

// Update partnerId for an event row (when partner registers)
router.put("/:id", updatePartner);

export default router;
