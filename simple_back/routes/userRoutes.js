import express from "express";
import { getTopUsers } from "../controllers/userController.js";
import { verifyAuth } from "../middleware/authMiddleware.js";
import { cacheMiddleware } from "../middleware/cacheMiddleware.js";

const router = express.Router();
router.get("/users", verifyAuth, cacheMiddleware, getTopUsers);

export default router;
