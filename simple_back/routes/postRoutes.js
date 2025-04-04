import express from "express";
import { 
    getAllPosts, 
    getTopPosts, 
    getLatestPosts, 
    getPostComments 
} from "../controllers/postController.js";
import { verifyAuth } from "../middleware/authMiddleware.js";
import { cacheMiddleware } from "../middleware/cacheMiddleware.js";

const router = express.Router();

router.get("/posts", verifyAuth, cacheMiddleware, getAllPosts);

router.get("/posts/analytics", verifyAuth, cacheMiddleware, getTopPosts);

router.get("/posts/latest", verifyAuth, cacheMiddleware, getLatestPosts);

router.get("/posts/:id/comments", verifyAuth, getPostComments);

export default router;
