import { useEffect, useState } from "react";
import axios from "axios";

export default function TrendingPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/posts?type=popular")
      .then((res) => setPosts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">🔥 Trending Posts</h2>
      <ul className="bg-white p-4 shadow rounded-md">
        {posts.map((post, index) => (
          <li key={index} className="p-2 border-b">
            {post.title} - {post.comments} comments
          </li>
        ))}
      </ul>
    </div>
  );
}
