import { FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold">Social Analytics</h1>
      <FaUserCircle className="text-2xl cursor-pointer" />
    </nav>
  );
}
