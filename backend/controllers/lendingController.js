const Lending = require("../models/Lending");
const Customer = require("../models/Customer");

// Add Lending or Payment
exports.addLending = async (req, res) => {
  try {
    const { customerId, type, amount, note } = req.body;

    const lending = await Lending.create({
      user: req.user.id,
      customer: customerId,
      type,
      amount,
      note
    });

    const customer = await Customer.findById(customerId);

    if (!customer) {
        return res.status(404).json({ message: "Customer not found" });
    }

    if (type === "lend") {
      customer.totalLent += amount;
    } else {
      customer.totalPaid += amount;
    }

    customer.balance = customer.totalLent - customer.totalPaid;

    await customer.save();

    res.status(201).json(lending);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCustomerLedger = async (req, res) => {
  try {
    const ledger = await Lending.find({
      customer: req.params.customerId
    }).sort({ date: -1 });

    res.json(ledger);

  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};