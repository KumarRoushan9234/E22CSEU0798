import express from 'express';
import axios from 'axios';

const app = express();
const SERVICES = {
    users: "http://localhost:4002/users",
    posts: "http://localhost:4003/posts"
};

app.use(express.json());

app.get('/api/users', async (req, res) => {
    try {
        const response = await axios.get(SERVICES.users);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch top users" });
    }
});

app.get('/api/posts', async (req, res) => {
    try {
        const { type } = req.query;
        const response = await axios.get(`${SERVICES.posts}?type=${type}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch posts" });
    }
});

app.listen(4000, () => console.log("API Gateway running on port 4000"));
