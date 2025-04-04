import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const USERS_URL = process.env.USERS_URL;

/** Get all users */
export async function getAllUsers(req, res) {
    try {
        const response = await axios.get(USERS_URL, {
            headers: { Authorization: `Bearer ${req.accessToken}` }
        });

        res.json(response.data.users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Error fetching users" });
    }
}

/** Get top 5 users with most posts */
export async function getTopUsers(req, res) {
    try {
        const response = await axios.get(USERS_URL, {
            headers: { Authorization: `Bearer ${req.accessToken}` }
        });

        const users = response.data.users;
        let postCounts = [];

        await Promise.all(Object.keys(users).map(async (userId) => {
            const postsResponse = await axios.get(`${USERS_URL}/${userId}/posts`, {
                headers: { Authorization: `Bearer ${req.accessToken}` }
            });

            postCounts.push({ userId, name: users[userId], postCount: postsResponse.data.posts.length });
        }));

        postCounts.sort((a, b) => b.postCount - a.postCount);
        res.json(postCounts.slice(0, 5));
    } catch (error) {
        console.error("Error fetching top users:", error);
        res.status(500).json({ error: "Error fetching top users" });
    }
}

/** Get all posts of a specific user */
export async function getUserPosts(req, res) {
    try {
        const { id } = req.params;
        const response = await axios.get(`${USERS_URL}/${id}/posts`, {
            headers: { Authorization: `Bearer ${req.accessToken}` }
        });

        res.json(response.data.posts);
    } catch (error) {
        console.error("Error fetching user posts:", error);
        res.status(500).json({ error: "Error fetching user posts" });
    }
}
