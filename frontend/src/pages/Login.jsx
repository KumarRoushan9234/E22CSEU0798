import { useNavigate } from "react-router-dom";
import apiService from "../services/apiService";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await apiService.post("/auth/login"); // No request body needed
      console.log("✅ Login successful! Redirecting...");
      navigate("/");
    } catch (error) {
      console.error("❌ Login failed:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Login</h2>
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
