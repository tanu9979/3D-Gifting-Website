const express = require("express");
const router = express.Router();
const { placeOrder, getUserOrders, getAllOrders, updateOrderStatus } = require("../controllers/orderController");
const { protect, admin } = require("../middleware/authMiddleware");

// Place order
router.post("/", protect, placeOrder);

// Get user's orders
router.get("/", protect, getUserOrders);

// Admin: Get all orders
router.get("/all", protect, admin, getAllOrders);

// Admin route to update order status
router.put("/:id/status", protect, admin, updateOrderStatus);

module.exports = router;


