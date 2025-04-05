import { useEffect, useState } from "react";
import apiService from "../services/apiService";
import { useNavigate } from "react-router-dom";
import { Search, User } from "lucide-react";

const LiveFeed = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    apiService
      .get("/users")
      .then((res) => {
        console.log("Users Fetched:", res.data);

        let usersArray = [];

        if (Array.isArray(res.data)) {
          usersArray = res.data;
        } else if (typeof res.data === "object") {
          usersArray = Object.entries(res.data).map(([key, value]) => ({
            id: key,
            username: value,
          }));
        } else {
          throw new Error(
            "Unexpected response format: Expected an array or object."
          );
        }

        setUsers(usersArray);
      })
      .catch((err) => {
        console.error(" API Error:", err);
        if (err.response?.status === 401) {
          setError("Unauthorized! Redirecting to login...");
          setTimeout(() => navigate("/login"), 1000);
        } else {
          setError("Failed to load users. Try again later.");
        }
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  const filteredUsers = users.filter(
    (user) =>
      user.username &&
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
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

      {loading && <p className="text-center text-gray-500">Loading users...</p>}

      {error && <p className="text-center text-red-500">{error}</p>}

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

      {!loading && filteredUsers.length === 0 && (
        <p className="text-center text-gray-500">No users found.</p>
      )}
    </div>
  );
};

export default LiveFeed;
