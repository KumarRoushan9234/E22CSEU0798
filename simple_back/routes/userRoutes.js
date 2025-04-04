import express from "express";
import { 
    getAllUsers, 
    getTopUsers, 
    searchUsers, 
    getUserPosts 
} from "../controllers/userController.js";
import { verifyAuth } from "../middleware/authMiddleware.js";
import { cacheMiddleware } from "../middleware/cacheMiddleware.js";

const router = express.Router();

router.get("/users", verifyAuth, cacheMiddleware, getAllUsers);

router.get("/users/top", verifyAuth, cacheMiddleware, getTopUsers);

router.get("/users/search", verifyAuth, searchUsers);

router.get("/users/:id/posts", verifyAuth, cacheMiddleware, getUserPosts);

export default router;
