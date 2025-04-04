// src/pages/Analytics.jsx
import { useEffect, useState } from "react";
import apiService from "../services/apiService";
import { TrendingUp } from "lucide-react";

const Analytics = () => {
  const [topPosts, setTopPosts] = useState([]);

  useEffect(() => {
    apiService
      .get("/posts/analytics")
      .then((res) => setTopPosts(res.data))
      .catch((err) => console.error("Error fetching analytics:", err));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold flex items-center gap-2">
        <TrendingUp size={24} /> Top Trending Posts
      </h2>

      <div className="mt-4 space-y-4">
        {topPosts.map((post) => (
          <div key={post.id} className="p-4 bg-white shadow rounded-lg">
            <h3 className="text-lg font-semibold">{post.author}</h3>
            <p className="text-gray-700 font-medium">{post.title}</p>
            <p className="text-gray-500">{post.content}</p>
            <span className="text-sm text-gray-600">
              💬 {post.commentCount} comments
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Analytics;
