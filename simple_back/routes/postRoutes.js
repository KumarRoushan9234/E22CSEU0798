import express from "express";
import { getPostAnalytics } from "../controllers/postController.js";
import { verifyAuth } from "../middleware/authMiddleware.js";
import { cacheMiddleware } from "../middleware/cacheMiddleware.js";

const router = express.Router();
router.get("/posts", verifyAuth, cacheMiddleware, getPostAnalytics);

export default router;
