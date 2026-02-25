const mongoose = require("mongoose");

const lendingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true
  },
  type: {
    type: String,
    enum: ["lend", "payment"],
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  note: String,
  date: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model("Lending", lendingSchema);