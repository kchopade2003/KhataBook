"use client";

import Link from "next/link";

export default function Sidebar() {
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
      </nav>
    </div>
  );
}