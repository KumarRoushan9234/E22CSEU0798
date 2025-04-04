import { useEffect, useState } from "react";
import axios from "axios";

export default function TopUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">👥 Top Users</h2>
      <ul className="bg-white p-4 shadow rounded-md">
        {users.map((user, index) => (
          <li key={index} className="p-2 border-b">
            {user.name} - {user.posts} posts
          </li>
        ))}
      </ul>
    </div>
  );
}
