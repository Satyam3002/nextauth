"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(false);

  const logout = async () => {
    try {
      setLoading(true);
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      // Type assertion to 'any' to handle error.message
      console.log(
        error.response?.data?.error || error.message || "An error occurred"
      );
      toast.error(
        error.response?.data?.error || error.message || "Failed to logout"
      );
    } finally {
      setLoading(false);
    }
  };

  const getUserDetails = async () => {
    try {
      setFetchingData(true);
      const res = await axios.get("/api/users/me");
      setUserId(res.data.data._id);
      toast.success("User details fetched successfully");
    } catch (error: any) {
      // Type assertion to 'any' to handle error.message
      console.log(
        error.response?.data?.error || error.message || "An error occurred"
      );
      toast.error("Failed to fetch user details");
    } finally {
      setFetchingData(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">Profile</h1>
          <p className="mt-2 text-gray-600">Manage your account</p>
        </div>

        <div className="border-t border-b border-gray-200 py-4 my-4">
          <div className="text-center">
            <p className="text-gray-600 mb-2">User ID:</p>
            {userId ? (
              <Link
                href={`/profile/${userId}`}
                className="inline-block bg-gray-100 px-4 py-2 rounded-md text-blue-600 hover:bg-gray-200 transition-colors"
              >
                {userId}
              </Link>
            ) : (
              <p className="text-gray-500 italic">Not fetched yet</p>
            )}
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          <button
            onClick={getUserDetails}
            disabled={fetchingData}
            className={`w-full px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors
              ${fetchingData ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {fetchingData ? "Fetching..." : "Get User Details"}
          </button>

          <button
            onClick={logout}
            disabled={loading}
            className={`w-full px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors
              ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {loading ? "Logging out..." : "Logout"}
          </button>
        </div>
      </div>
    </div>
  );
}
