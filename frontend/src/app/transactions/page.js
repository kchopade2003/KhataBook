"use client"

import ProtectedLayout from "@/components/ProtectedLayout";
import Sidebar from "@/components/Sidebar";
import API from "@/lib/api";
import { useEffect, useState } from "react"

export default function Transactions() {
    const [transactions, setTransactions] = useState([]);
    const [type, setType] = useState("sale");
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [paymentmode, setPaymentmode] = useState("cash");
 
    const fetchTransactions = async () => {
        const res = await API.get('/transactions');
        setTransactions(res.data);
    }

    useEffect(() => {
        const token = localStorage.getItem("token");

        if(token){
            fetchTransactions();
        }else{
            console.log("Token empty.")
        }
    }, []);

    const handleAdd = async (e) => {
        e.preventDefault();
        try{
            const res = await API.post('/transactions', {
                type,
                amount: Number(amount),
                description,
                paymentMode : paymentmode
            });

            console.log(res);

            setAmount("");
            setDescription("");

            fetchTransactions();
        } catch (err) {
            console.log(err);
        }
    };

    const deleteTransaction = async (id) => {
        await API.delete(`/transactions/${id}`);
        fetchTransactions();
    };

    return (
    <ProtectedLayout>
    <div className="flex">
        <Sidebar />

        <div className="flex-1 p-8 bg-gray-100 min-h-screen">

            <h1 className="text-3xl font-bold mb-6">Transactions</h1>

            {/* Add Transaction Form */}

            <form
            onSubmit={(e) => handleAdd(e)}
            className="bg-white p-6 rounded-xl shadow mb-8 grid grid-cols-4 gap-4"
            >
            <select
                className="border p-2 rounded"
                value={type}
                onChange={(e) => setType(e.target.value)}
            >
                <option value="sale">Sale</option>
                <option value="expense">Expense</option>
            </select>

            <input
                type="number"
                placeholder="Amount"
                className="border p-2 rounded"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />

            <input
                type="text"
                placeholder="Description"
                className="border p-2 rounded"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <select
                className="border p-2 rounded"
                value={paymentmode}
                onChange={(e) => setPaymentmode(e.target.value)}
            >
                <option value="cash">Cash</option>
                <option value="upi">UPI</option>
                <option value="card">Card</option>
            </select>

            <button className="bg-indigo-600 text-white rounded hover:bg-indigo-700">
                Add
            </button>
            </form>

            {/* Transactions Table */}

            <div className="bg-white rounded-xl shadow">
            <table className="w-full">
                <thead className="bg-gray-200">
                <tr>
                    <th className="p-3 text-left">Type</th>
                    <th className="p-3 text-left">Amount</th>
                    <th className="p-3 text-left">Description</th>
                    <th className="p-3 text-left">Payment Mode</th>
                    <th className="p-3 text-left">Action</th>
                </tr>
                </thead>

                <tbody>
                {transactions.map((t) => (
                    <tr key={t._id} className="border-t">
                    <td className="p-3 capitalize">{t.type}</td>

                    <td className="p-3">
                        ₹ {t.amount}
                    </td>

                    <td className="p-3">
                        {t.description}
                    </td>

                    <td className="p-3">
                        {t.paymentMode}
                    </td>

                    <td className="p-3">
                        <button
                        onClick={() => deleteTransaction(t._id)}
                        className="text-red-500 hover:text-red-700"
                        >
                        Delete
                        </button>
                    </td>
                    </tr>
                ))}
                </tbody>

            </table>
            </div>

        </div>
    </div>
    </ProtectedLayout>
  );

}