import express from "express";
import { 
    getAllPosts, 
    getTopPosts, 
    getLatestPosts, 
    getPostComments 
} from "../controllers/postController.js";
import { verifyAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/posts", verifyAuth, getAllPosts);
router.get("/posts/analytics", verifyAuth, getTopPosts);
router.get("/posts/latest", verifyAuth, getLatestPosts);
router.get("/posts/:id/comments", verifyAuth, getPostComments);

export default router;
