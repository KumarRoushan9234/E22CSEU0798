import { useEffect, useState } from "react";
import apiService from "../services/apiService";
import { useNavigate } from "react-router-dom";
import { Search, User, Filter } from "lucide-react";

const LiveFeed = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("default"); // Sorting state
  const [filterType, setFilterType] = useState("all"); // Filter state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    apiService
      .get("/users")
      .then((res) => {
        console.log("✅ Users Fetched:", res.data);

        let usersArray = [];

        if (Array.isArray(res.data)) {
          usersArray = res.data;
        } else if (typeof res.data === "object") {
          usersArray = Object.entries(res.data).map(([key, value]) => ({
            id: key,
            username: value,
          }));
        } else {
          throw new Error("Unexpected response format.");
        }

        setUsers(usersArray);
      })
      .catch((err) => {
        console.error("❌ API Error:", err);
        if (err.response?.status === 401) {
          setError("Unauthorized! Redirecting to login...");
          setTimeout(() => navigate("/login"), 1000);
        } else {
          setError("Failed to load users. Try again later.");
        }
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  // Filter Users
  let filteredUsers = users.filter(
    (user) =>
      user.username &&
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Apply additional filtering
  if (filterType === "contains-a") {
    filteredUsers = filteredUsers.filter((user) =>
      user.username.toLowerCase().includes("a")
    );
  } else if (filterType === "long-names") {
    filteredUsers = filteredUsers.filter((user) => user.username.length > 5);
  }

  // Sort Users
  if (sortOrder === "asc") {
    filteredUsers.sort((a, b) => a.username.localeCompare(b.username));
  } else if (sortOrder === "desc") {
    filteredUsers.sort((a, b) => b.username.localeCompare(a.username));
  }

  return (
    <div className="p-4">
      {/* Search & Filter Row */}
      <div className="mb-4 flex items-center justify-between">
        {/* Search Bar */}
        <div className="flex items-center border rounded-lg p-2 bg-gray-100 w-2/3">
          <Search size={20} className="text-gray-600" />
          <input
            type="text"
            placeholder="Search by username..."
            className="ml-2 flex-1 outline-none bg-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filter & Sorting */}
        <div className="flex items-center gap-3">
          {/* Sorting Dropdown */}
          <select
            className="border p-2 rounded-lg bg-gray-100 text-gray-700"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="default">Sort by: Default</option>
            <option value="asc">Sort A-Z</option>
            <option value="desc">Sort Z-A</option>
          </select>

          {/* Filter Dropdown */}
          <select
            className="border p-2 rounded-lg bg-gray-100 text-gray-700"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Users</option>
            <option value="contains-a">Contains "A"</option>
            <option value="long-names">Long Names (>5 chars)</option>
          </select>
        </div>
      </div>

      {/* Loading */}
      {loading && <p className="text-center text-gray-500">Loading users...</p>}

      {/* Error */}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Users List */}
      <div className="space-y-4">
        {filteredUsers.map((user, index) => (
          <div
            key={user.id || index}
            className="p-4 bg-white shadow rounded-lg flex items-center gap-3"
          >
            <User size={40} className="text-gray-600" />
            <div>
              <h3 className="text-lg font-semibold">
                {user.username || "Unknown User"}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* No Users Found */}
      {!loading && filteredUsers.length === 0 && (
        <p className="text-center text-gray-500">No users found.</p>
      )}
    </div>
  );
};

export default LiveFeed;
