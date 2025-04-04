import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const POSTS_URL = process.env.POSTS_URL;

export async function getPostAnalytics(req, res) {
    const { type } = req.query;
    if (!type || !["popular", "latest"].includes(type)) {
        return res.status(400).json({ error: "Invalid type parameter" });
    }

    try {
        const response = await axios.get(POSTS_URL, {
            headers: { Authorization: `Bearer ${req.accessToken}` }
        });

        let posts = response.data.posts;

        if (type === "popular") {
            let maxComments = 0;
            let popularPosts = [];

            for (const post of posts) {
                const commentsResponse = await axios.get(`${POSTS_URL}/${post.id}/comments`, {
                    headers: { Authorization: `Bearer ${req.accessToken}` }
                });

                const commentCount = commentsResponse.data.comments.length;

                if (commentCount > maxComments) {
                    maxComments = commentCount;
                    popularPosts = [post];
                } else if (commentCount === maxComments) {
                    popularPosts.push(post);
                }
            }
            return res.json(popularPosts);
        }

        if (type === "latest") {
            posts.sort((a, b) => b.id - a.id);
            return res.json(posts.slice(0, 5));
        }

    } catch (error) {
        res.status(500).json({ error: "Error fetching posts" });
    }
}
