import express from 'express';
import axios from 'axios';
import { fetchAuthToken } from '../auth-service/index.js';

const app = express();
const POSTS_API = "http://20.244.56.144/evaluation-service/posts";

async function fetchPosts() {
    const token = await fetchAuthToken();
    const response = await axios.get(POSTS_API, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data.posts;
}

app.get('/posts', async (req, res) => {
    try {
        const { type } = req.query;
        const posts = await fetchPosts();

        if (type === "latest") {
            const latestPosts = posts.sort((a, b) => b.id - a.id).slice(0, 5);
            return res.json(latestPosts);
        } 
        
        if (type === "popular") {
            const commentCounts = await Promise.all(posts.map(async (post) => {
                const token = await fetchAuthToken();
                const response = await axios.get(`${POSTS_API}/${post.id}/comments`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                return { ...post, commentCount: response.data.comments.length };
            }));

            const maxComments = Math.max(...commentCounts.map(p => p.commentCount));
            const popularPosts = commentCounts.filter(p => p.commentCount === maxComments);
            return res.json(popularPosts);
        }

        res.status(400).json({ error: "Invalid type" });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch posts" });
    }
});

app.listen(4003, () => console.log("Post Service running on port 4003"));
