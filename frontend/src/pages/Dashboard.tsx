import { useState } from "react";
import toast from "react-hot-toast";
import { logoutUser } from "../api/auth";
import { useAuth } from "../hooks/useauth";
import { AxiosError } from "axios";

export default function Dashboard() {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const logout = async () => {
    try {
      setLoading(true);
      await logoutUser();
      setUser(null);

      toast.success("Logged out successfully!");
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      const message = axiosError.response?.data.message || "Logout failed";
      toast.error(message);
      toast.error("Logout failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
      <div className="bg-white w-full max-w-md shadow-xl p-6 rounded-xl text-center space-y-6">
        
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome, <span className="text-gray-950">{user?.username}</span> 👋
        </h1>

        <div className="p-4 bg-gray-50 border rounded-lg space-y-2">
          <p className="text-gray-600">
            <span className="font-semibold">Email:</span> {user?.email}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Username:</span> {user?.username}
          </p>
        </div>

        <button
          onClick={logout}
          disabled={loading}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg transition disabled:bg-red-300 cursor-pointer"
        >
          {loading ? "Logging out..." : "Logout"}
        </button>
      </div>
    </div>
  );
}
