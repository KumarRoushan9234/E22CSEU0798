import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import TopUsers from "./pages/TopUsers";
import TrendingPosts from "./pages/TrendingPosts";
import LiveFeed from "./pages/LiveFeed";

export default function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/top-users" element={<TopUsers />} />
            <Route path="/trending-posts" element={<TrendingPosts />} />
            <Route path="/live-feed" element={<LiveFeed />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
