const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const {
  addLending,
  getCustomerLedger
} = require("../controllers/lendingController");

router.post("/", authMiddleware, addLending);
router.get("/:customerId", authMiddleware, getCustomerLedger);

module.exports = router;