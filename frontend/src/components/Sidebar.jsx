// src/components/Sidebar.jsx
import { useState } from "react";
import { Menu, LogOut, Home, TrendingUp } from "lucide-react";
import apiService from "../services/apiService";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await apiService.post("/auth/logout");
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div
      className={`h-screen bg-gray-900 text-white ${
        collapsed ? "w-16" : "w-60"
      } transition-all duration-300`}
    >
      <button onClick={() => setCollapsed(!collapsed)} className="p-4">
        <Menu size={24} />
      </button>

      <nav className="mt-4 space-y-4">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 p-3 hover:bg-gray-800 w-full"
        >
          <Home size={20} />
          {!collapsed && <span>Live Feed</span>}
        </button>

        <button
          onClick={() => navigate("/analytics")}
          className="flex items-center gap-2 p-3 hover:bg-gray-800 w-full"
        >
          <TrendingUp size={20} />
          {!collapsed && <span>Analytics</span>}
        </button>
      </nav>

      <div className="absolute bottom-4 left-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 p-3 hover:bg-red-600 w-full"
        >
          <LogOut size={20} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
