"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import API from "@/lib/api";
import Sidebar from "@/components/Sidebar";
import ProtectedLayout from "@/components/ProtectedLayout";

export default function CustomerDetails() {
  const { id } = useParams();

  const [ledger, setLedger] = useState([]);
  const [customer, setCustomer] = useState({});
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("lend");

  const fetchData = async () => {
    const ledgerRes = await API.get(`/lending/${id}`);
    const customersRes = await API.get("/customers");

    setLedger(ledgerRes.data);
    const found = customersRes.data.find((c) => c._id === id);
    setCustomer(found);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if(tokne){
      fetchData();
    }else{
      console.log("Token empty");
    }
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();

    await API.post("/lending", {
      customerId: id,
      type,
      amount: Number(amount)
    });

    setAmount("");
    fetchData();
  };

  return (
    <ProtectedLayout>
      <div className="flex">
        <Sidebar />

        <div className="flex-1 p-8 bg-gray-100 min-h-screen">

          <h1 className="text-3xl font-bold mb-4">
            {customer?.name}
          </h1>

          {/* Summary Cards */}
          <div className="grid grid-cols-3 gap-6 mb-6">
            <Card title="Total Lent" value={customer.totalLent} color="text-red-500" />
            <Card title="Total Paid" value={customer.totalPaid} color="text-green-500" />
            <Card title="Balance" value={customer.balance} color="text-yellow-500" />
          </div>

          {/* Add Lending / Payment */}
          <form
            onSubmit={handleAdd}
            className="bg-white p-6 rounded-xl shadow mb-6 flex gap-4"
          >
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="lend">Lend</option>
              <option value="payment">Payment</option>
            </select>

            <input
              type="number"
              placeholder="Amount"
              className="border p-2 rounded w-full"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <button className="bg-indigo-600 text-white px-6 rounded">
              Add
            </button>
          </form>

          {/* Ledger */}
          <div className="bg-white rounded-xl shadow">
            {ledger.map((l) => (
              <div
                key={l._id}
                className="p-4 border-b flex justify-between"
              >
                <div>
                  <p className="font-medium capitalize">{l.type}</p>
                  <p className="text-gray-500 text-sm">
                    {new Date(l.date).toLocaleDateString()}
                  </p>
                </div>

                <p
                  className={`font-bold ${
                    l.type === "lend" ? "text-red-500" : "text-green-500"
                  }`}
                >
                  ₹ {l.amount}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </ProtectedLayout>
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