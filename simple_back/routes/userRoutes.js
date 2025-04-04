import express from "express";
import { 
    getAllUsers, 
    getTopUsers, 
    getUserPosts 
} from "../controllers/userController.js";
import { verifyAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/users", verifyAuth, getAllUsers);
router.get("/users/top", verifyAuth, getTopUsers);
router.get("/users/:id/posts", verifyAuth, getUserPosts);

export default router;
