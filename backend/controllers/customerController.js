const Customer = require("../models/Customer")

//Add Customer
exports.addCustomer = async(req, res) => {
    try{
        const { name, phone, address } = req.body;

        const customer = await Customer.create({
            user: req.user.id,
            name,
            phone,
            address
        });

        res.status(201).json(customer);
    } catch (err) {
        res.status(500).json({message: "Server Error"});
    }
}

//Get All Customers
exports.getCustomers = async(req, res) => {
    try{
        const customers = await Customer.find({ user: req.user.id }).sort({ createdAt: -1 });

        res.json(customers);
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
};