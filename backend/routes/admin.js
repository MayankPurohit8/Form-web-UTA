import express from "express";
import {
  getPairsByEvent,
  updateRankings,
} from "../controllers/adminController.js";

const router = express.Router();

// Get all pairs for an event
router.get("/event", getPairsByEvent);

// Update rankings for all pairs
router.post("/rankings", updateRankings);

export default router;
