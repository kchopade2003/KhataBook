const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware")
const { addCustomer, getCustomers } = require("../controllers/customerController");

router.post("/", authMiddleware, addCustomer);
router.get("/", authMiddleware, getCustomers);

module.exports = router;