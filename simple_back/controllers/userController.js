import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const USERS_URL = process.env.USERS_URL;

export async function getTopUsers(req, res) {
    try {
        const response = await axios.get(USERS_URL, {
            headers: { Authorization: `Bearer ${req.accessToken}` }
        });

        const users = response.data.users;
        let postCounts = [];

        for (const userId in users) {
            const postsResponse = await axios.get(`${USERS_URL}/${userId}/posts`, {
                headers: { Authorization: `Bearer ${req.accessToken}` }
            });

            postCounts.push({ userId, name: users[userId], postCount: postsResponse.data.posts.length });
        }

        postCounts.sort((a, b) => b.postCount - a.postCount);
        res.json(postCounts.slice(0, 5));
    } catch (error) {
        res.status(500).json({ error: "Error fetching users" });
    }
}
