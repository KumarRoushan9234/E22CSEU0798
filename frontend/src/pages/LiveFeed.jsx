// src/pages/LiveFeed.jsx
import { useEffect, useState } from "react";
import apiService from "../services/apiService";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

const LiveFeed = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    apiService
      .get("/posts")
      .then((res) => {
        console.log("✅ Posts Fetched:", res.data);
        const sortedPosts = res.data.sort((a, b) => b.id - a.id);
        setPosts(sortedPosts);
      })
      .catch((err) => {
        console.error("❌ API Error:", err);
        setError("Unauthorized! Redirecting to login...");
        navigate("/login"); // Redirect if unauthorized
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  const filteredPosts = posts.filter((post) =>
    post.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      {/* Search Bar */}
      <div className="mb-4 flex items-center border rounded-lg p-2 bg-gray-100">
        <Search size={20} className="text-gray-600" />
        <input
          type="text"
          placeholder="Search by username..."
          className="ml-2 flex-1 outline-none bg-transparent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Loading */}
      {loading && <p className="text-center text-gray-500">Loading posts...</p>}

      {/* Error */}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Posts */}
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <div key={post.id} className="p-4 bg-white shadow rounded-lg">
            <h3 className="text-lg font-semibold">{post.author}</h3>
            <p className="text-gray-700 font-medium">{post.title}</p>
            <p className="text-gray-500">{post.content}</p>
          </div>
        ))}
      </div>

      {/* No Posts Found */}
      {!loading && filteredPosts.length === 0 && (
        <p className="text-center text-gray-500">No posts found.</p>
      )}
    </div>
  );
};

export default LiveFeed;
