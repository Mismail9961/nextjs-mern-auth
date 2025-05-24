"use client";
import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const [data, setData] = useState("nothing");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error:any) {
      console.error("Logout failed:", error.response?.data || error.message);
      toast.error("Logout failed: " + (error.response?.data?.error || "Unknown error"));
    } finally {
      setIsLoading(false);
    }
  };

  const getUserDetails = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("/api/users/me");
      console.log("API Response:", res.data);
      const userData = res.data.data;
      if (!userData) {
        throw new Error("User data not found in API response");
      }
      const userIdentifier = userData._id || userData.username || userData.email || "unknown";
      setData(userIdentifier);
      console.log("Set data to:", userIdentifier);
    } catch (error:any) {
      console.error("Failed to fetch user details:", error.message || error);
      toast.error("Failed to fetch user details: " + (error.response?.data?.error || error.message));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="bg-gray-900 flex flex-col gap-3 text-white rounded-2xl shadow-lg p-10 text-center">
        <h1 className="text-3xl font-bold mb-4">Profile Page</h1>
        <p className="text-gray-400 mb-8">Welcome to your profile. Customize this page as you like.</p>
        <h2 className="p-2 rounded bg-green-500">
          {data === "nothing" ? "nothing" : <Link href={`/profile/${data}`}>{data}</Link>}
        </h2>
        <button
          onClick={handleLogout}
          disabled={isLoading}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200 disabled:opacity-50"
        >
          {isLoading ? "Logging out..." : "Logout"}
        </button>
        <button
          onClick={getUserDetails}
          disabled={isLoading}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200 disabled:opacity-50"
        >
          {isLoading ? "Fetching..." : "Get User Details"}
        </button>
      </div>
    </div>
  );
};

export default Page;