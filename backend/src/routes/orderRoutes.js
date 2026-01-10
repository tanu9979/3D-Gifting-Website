const express = require("express");
const router = express.Router();
const { placeOrder, getUserOrders } = require("../controllers/orderController");
const protect = require("../middleware/authMiddleware");

// Place order
router.post("/", protect, placeOrder);

// Get user's orders
router.get("/", protect, getUserOrders);

module.exports = router;

