"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const forgotpassword = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onSent = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/forgotpassword", user);
      console.log("email sent successfully", response.data);
      toast.success("email sent successfully ");
      router.push("/login");
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || error.message;
      console.error("error:", errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
      setButtonDisabled(!(user.email.length > 0));
    }, [user.email]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Processing" : "Forgot Password"}</h1>
      <hr />
      <label htmlFor="email">Email</label>
      <input
        className="p-4 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        type="email"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Email"
      />
      <button
        onClick={onSent}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        disabled={loading || buttonDisabled}
      >
        {loading ? "Processing" : "Send Email"}
      </button>
      <Link href="/signup">Visit SignUp Page</Link>
      <Link href="/login">Visit login Page</Link>
    </div>
  );
};

export default forgotpassword;