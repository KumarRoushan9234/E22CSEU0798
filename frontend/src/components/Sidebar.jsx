// src/components/Sidebar.jsx
import { useState } from "react";
import { LogOut, Users, MessageSquare, Home, Search } from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`h-screen bg-gray-900 text-white transition-all ${
        collapsed ? "w-16" : "w-60"
      } p-4`}
    >
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="mb-4 flex items-center"
      >
        {collapsed ? "➡️" : "⬅️"}
      </button>

      <nav className="flex flex-col space-y-4">
        <Link to="/" className="flex items-center space-x-2">
          <Home size={20} />
          {!collapsed && <span>Dashboard</span>}
        </Link>
        <Link to="/top-users" className="flex items-center space-x-2">
          <Users size={20} />
          {!collapsed && <span>Top Users</span>}
        </Link>
        <Link to="/trending-posts" className="flex items-center space-x-2">
          <MessageSquare size={20} />
          {!collapsed && <span>Trending Posts</span>}
        </Link>
        <Link to="/search-users" className="flex items-center space-x-2">
          <Search size={20} />
          {!collapsed && <span>Search Users</span>}
        </Link>
      </nav>

      <button className="absolute bottom-4 left-4 flex items-center space-x-2 text-red-400">
        <LogOut size={20} />
        {!collapsed && <span>Logout</span>}
      </button>
    </aside>
  );
};

export default Sidebar;
