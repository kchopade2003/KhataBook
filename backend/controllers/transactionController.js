const Transaction = require("../models/Transaction");

//Add transaction
exports.addTransaction = async(req, res) => {
    try{
        const {type, amount, description, paymentMode} = req.body;

        const transaction = await Transaction.create({
            user: req.user.id,
            type,
            amount,
            description,
            paymentMode
        });

        res.status(201).json(transaction);
    } catch (err){
        res.status(500).json({message: "Server Error"});
    }
};

//Get All transaction
exports.getTransactions = async(req, res) => {
    try{
        const transactions = await Transaction.find({user : req.user.id}).sort({date: -1});

        res.json(transactions);
    }catch (err){
        res.status(500).json({message: "Server Error"});
    }
}

// Delete Transaction
exports.deleteTransaction = async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ message: "Transaction deleted" });

  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

