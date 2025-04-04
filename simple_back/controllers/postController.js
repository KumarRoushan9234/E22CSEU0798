import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const POSTS_URL = process.env.POSTS_URL;

/** Get all posts */
export async function getAllPosts(req, res) {
    try {
        const response = await axios.get(POSTS_URL, {
            headers: { Authorization: `Bearer ${req.accessToken}` } // Use token from cookies
        });

        res.json(response.data.posts);
    } catch (error) {
        console.error("Error fetching posts:", error.response?.data || error.message);
        res.status(500).json({ error: "Error fetching posts" });
    }
}

/** Get top 5 posts with most comments */
export async function getTopPosts(req, res) {
    try {
        const response = await axios.get(POSTS_URL, {
            headers: { Authorization: `Bearer ${req.accessToken}` }
        });

        let posts = response.data.posts;

        // Fetch comments concurrently for all posts
        const commentRequests = posts.map(post =>
            axios.get(`${POSTS_URL}/${post.id}/comments`, {
                headers: { Authorization: `Bearer ${req.accessToken}` }
            }).then(res => ({ ...post, commentCount: res.data.comments.length }))
            .catch(() => ({ ...post, commentCount: 0 }))
        );

        const postCommentCounts = await Promise.allSettled(commentRequests);
        const sortedPosts = postCommentCounts
            .filter(res => res.status === "fulfilled")
            .map(res => res.value)
            .sort((a, b) => b.commentCount - a.commentCount);

        res.json(sortedPosts.slice(0, 5));
    } catch (error) {
        console.error("Error fetching top posts:", error.response?.data || error.message);
        res.status(500).json({ error: "Error fetching top posts" });
    }
}

/** Get latest 5 posts */
export async function getLatestPosts(req, res) {
    try {
        const response = await axios.get(POSTS_URL, {
            headers: { Authorization: `Bearer ${req.accessToken}` }
        });

        let posts = response.data.posts;
        posts.sort((a, b) => b.id - a.id);

        res.json(posts.slice(0, 5));
    } catch (error) {
        console.error("Error fetching latest posts:", error);
        res.status(500).json({ error: "Error fetching latest posts" });
    }
}

/** Get comments of a specific post */
export async function getPostComments(req, res) {
    try {
        const { id } = req.params;
        const response = await axios.get(`${POSTS_URL}/${id}/comments`, {
            headers: { Authorization: `Bearer ${req.accessToken}` }
        });

        res.json(response.data.comments);
    } catch (error) {
        console.error("Error fetching post comments:", error);
        res.status(500).json({ error: "Error fetching post comments" });
    }
}
