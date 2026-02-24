const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    type: {
        type: String,
        enum: ["sale", "expense"],
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    paymentMode: {
        type: String,
        enum: ["cash", "upi", "card"],
        default: "cash"
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {timestamps: true});

module.exports = mongoose.model("Transaction", transactionSchema);