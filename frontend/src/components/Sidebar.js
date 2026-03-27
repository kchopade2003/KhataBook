"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login")
  };
  
  return (
    <div className="w-64 bg-gray-900 text-white h-screen p-6">
      <h1 className="text-2xl font-bold mb-10">Khatabook</h1>

      <nav className="space-y-4">
        <Link href="/dashboard" className="block hover:text-indigo-400">
          Dashboard
        </Link>
        <Link href="/transactions" className="block hover:text-indigo-400">
          Transactions
        </Link>
        <Link href="/customers" className="block hover:text-indigo-400">
          Customers
        </Link>
        <button
          onClick={handleLogout}
          className="mt-10 text-red-400 hover:text-red-600"
        >
          Logout
        </button>
      </nav>
    </div>
  );
}