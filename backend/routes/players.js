import express from "express";
import {
  registerPlayer,
  loginPlayer,
  updateDetails,
} from "../controllers/playersControllers.js"; // 👈 must include .js extension

const router = express.Router();

// Register a player + events + partners
router.post("/register", registerPlayer);

// User login with WhatsApp + DOB
router.post("/login", loginPlayer);

router.post("/edit", updateDetails);

export default router;
