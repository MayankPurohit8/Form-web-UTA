import express from "express";
import {
  getPlayersByEvent,
  updatePartner,
  getListEvent1,
  getListEvent2,
} from "../controllers/partnersControllers.js";

const router = express.Router();

// Get all players registered for a particular event
router.get("/event/:eventId", getPlayersByEvent);

// Update partnerId for an event row (when partner registers)
router.put("/update", updatePartner);

router.get("/getlist1", getListEvent1);
router.get("/getlist2", getListEvent2);

export default router;
