import express from 'express';
import axios from 'axios';
import { fetchAuthToken } from '../auth-service/index.js';

const app = express();
const USERS_API = "http://20.244.56.144/evaluation-service/users";

async function fetchUsers() {
    const token = await fetchAuthToken();
    const response = await axios.get(USERS_API, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data.users;
}

async function fetchUserPosts(userId) {
    const token = await fetchAuthToken();
    const response = await axios.get(`${USERS_API}/${userId}/posts`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data.posts.length;
}

app.get('/users', async (req, res) => {
    try {
        const users = await fetchUsers();
        const userPostCounts = await Promise.all(Object.keys(users).map(async (userId) => {
            const postCount = await fetchUserPosts(userId);
            return { userId, name: users[userId], postCount };
        }));

        const topUsers = userPostCounts.sort((a, b) => b.postCount - a.postCount).slice(0, 5);
        res.json(topUsers);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch users" });
    }
});

app.listen(4002, () => console.log("User Service running on port 4002"));
