"use client"

import API from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react"

export default function Register () {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleRegister = async(e) => {
        e.preventDefault();

        try {
            await API.post("/auth/register", {
                name,
                email, 
                password
            });
            alert("Registered Successfully.");
            router.push("/login");
        } catch (err) {
            alert(err.response?.data?.message || "Error");
        }
    }

    return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-green-500 to-teal-600">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-2xl shadow-xl w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Register Shopkeeper
        </h2>

        <input
          type="text"
          placeholder="Name"
          className="w-full mb-4 p-3 border rounded-lg"
          onChange={(e) => setName(e.target.value)}
        />

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

        <button className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition">
          Register
        </button>

        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/")}
            className="text-blue-600 cursor-pointer"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}