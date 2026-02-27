const Transaction = require("../models/Transaction");
const Customer = require("../models/Customer");
const mongoose = require("mongoose");

// Dashboard Summary
exports.getDashboard = async(req, res) => {
    try{
        const userId = req.user.id;

        const transactionSummary = await Transaction.aggregate([
            { $match: {user: new mongoose.Types.ObjectId(userId)}},
            {
                $group: {
                    _id: "$type",
                    total: {$sum: "$amount"}
                }
            }
        ]);

        let totalSales = 0;
        let totalExpenses = 0;

        transactionSummary.forEach(item => {
            if(item._id === "sale")  totalSales = item.total;
            if(item._id === "expense")   totalExpenses = item.total;
        });

        const netProfit = totalSales - totalExpenses;

        const pendingSummary = await Customer.aggregate([
            { $match: {user: new mongoose.Types.ObjectId(userId) } },
            {
                $group: {
                    _id: null,
                    totalPending: { $sum: "$balance"}
                }
            }
        ]);

        const totalPending =
        pendingSummary.length > 0 ? pendingSummary[0].totalPending : 0;

        res.json({
            totalSales,
            totalExpenses,
            netProfit,
            totalPending
        });
    } catch (err) {
        res.status(500).json({ message: "Server Error" + err });
    }
}