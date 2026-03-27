"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import API from "@/lib/api";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post("/auth/login", {email, password});
            localStorage.setItem("token", res.data.token);
            router.push("/dashboard")
        }catch (err) {
            alert("Invalid Credentials");
        }
    }

    return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-xl w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Khatabook Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 border rounded-lg"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-3 border rounded-lg"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition">
          Login
        </button>
        <p className="text-center mt-4 text-sm">
          Don't have an account?{" "}
          <span
            onClick={() => router.push("/register")}
            className="text-blue-600 cursor-pointer"
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );

};