import express from "express";
import {
  registerPlayer,
  loginPlayer,
  getPlayerDetails,
} from "../controllers/playersControllers.js"; // 👈 must include .js extension

const router = express.Router();

// Register a player + events + partners
router.post("/register", registerPlayer);

// User login with WhatsApp + DOB
router.post("/login", loginPlayer);

// Get a player with prefilled details
router.get("/:id", getPlayerDetails);

export default router;
