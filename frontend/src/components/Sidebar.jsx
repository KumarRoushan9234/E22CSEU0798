import { NavLink } from "react-router-dom";
import { FaChartPie, FaUsers, FaFire, FaStream } from "react-icons/fa";

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-gray-800 text-white p-5 flex flex-col">
      <h2 className="text-lg font-bold mb-6">Dashboard</h2>
      <nav className="flex flex-col space-y-4">
        <NavLink
          to="/"
          className="flex items-center space-x-2 hover:text-yellow-400"
        >
          <FaChartPie /> <span>Overview</span>
        </NavLink>
        <NavLink
          to="/top-users"
          className="flex items-center space-x-2 hover:text-yellow-400"
        >
          <FaUsers /> <span>Top Users</span>
        </NavLink>
        <NavLink
          to="/trending-posts"
          className="flex items-center space-x-2 hover:text-yellow-400"
        >
          <FaFire /> <span>Trending Posts</span>
        </NavLink>
        <NavLink
          to="/live-feed"
          className="flex items-center space-x-2 hover:text-yellow-400"
        >
          <FaStream /> <span>Live Feed</span>
        </NavLink>
      </nav>
    </aside>
  );
}
