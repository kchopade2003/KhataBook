"use client"

import Sidebar from "@/components/Sidebar";
import API from "@/lib/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Customers() {
    const [customers, setCustomers] = useState([]);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [addr, setAddr] = useState("");
    const router = useRouter();

    const fetchCustomers = async () => {
        const res = await API.get('/customers');
        setCustomers(res.data);
    }

    useEffect(() => {
        fetchCustomers();
    }, []);

    const handleAdd = async (e) => {
        e.preventDefault();

        await API.post('/customers', {
            name,
            phone,
            address : addr
        });

        setName("");
        setPhone("");
        setAddr("");

        fetchCustomers();
    }

    return (
        <div className="flex">
        <Sidebar />

        <div className="flex-1 p-8 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6">Customers</h1>

            {/* Add Customer */}
            <form
            onSubmit={handleAdd}
            className="bg-white p-6 rounded-xl shadow mb-6 flex gap-4"
            >
            <input
                placeholder="Name"
                className="border p-2 rounded w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <input
                placeholder="Phone"
                className="border p-2 rounded w-full"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />

            <input
                placeholder="Address"
                className="border p-2 rounded w-full"
                value={addr}
                onChange={(e) => setAddr(e.target.value)}
            />

            <button className="bg-indigo-600 text-white px-6 rounded">
                Add
            </button>
            </form>

            {/* Customers List */}
            <div className="bg-white rounded-xl shadow">
            {customers.map((c) => (
                <div
                key={c._id}
                onClick={() => router.push(`/customers/${c._id}`)}
                className="p-4 border-b cursor-pointer hover:bg-gray-50 flex justify-between"
                >
                <div>
                    <h2 className="font-semibold">{c.name}</h2>
                    <p className="text-gray-500">{c.phone}</p>
                    <p className="text-gray-500">{c.addr}</p>
                </div>

                <div className="text-right">
                    <p className="text-sm text-gray-500">Balance</p>
                    <p className="font-bold text-red-500">
                    ₹ {c.balance}
                    </p>
                </div>
                </div>
            ))}
            </div>
        </div>
        </div>
    );
}
