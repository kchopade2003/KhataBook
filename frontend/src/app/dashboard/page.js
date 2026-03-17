"use client";

import { useEffect, useState } from "react";
import API from "@/lib/api";
import Sidebar from "@/components/Sidebar";

export default function Dashboard() {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const res = await API.get("/dashboard");
      setData(res.data);
    };
    fetchData();
  }, []);

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-8 bg-gray-100 min-h-screen">
        <h2 className="text-3xl font-bold mb-6">Dashboard</h2>

        <div className="grid grid-cols-4 gap-6">
          <Card title="Total Sales" value={data.totalSales} color="text-green-600" />
          <Card title="Total Expenses" value={data.totalExpenses} color="text-red-600" />
          <Card title="Net Profit" value={data.netProfit} color="text-indigo-600" />
          <Card title="Pending Lending" value={data.totalPending} color="text-yellow-600" />
        </div>
      </div>
    </div>
  );
}

function Card({ title, value, color }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h3 className="text-gray-500">{title}</h3>
      <p className={`text-2xl font-bold ${color}`}>
        ₹ {value || 0}
      </p>
    </div>
  );
}