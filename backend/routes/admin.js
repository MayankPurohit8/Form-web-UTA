import express from "express";
import {
  getPairsByEvent,
  updateRankings,
} from "../controllers/adminController.js";

const router = express.Router();

// Get all pairs for an event
router.get("/event/:eventId", getPairsByEvent);

// Update rankings for all pairs
router.put("/rankings", updateRankings);

export default router;
