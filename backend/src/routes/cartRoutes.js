const express = require("express");
const router = express.Router();
const { addToCart } = require("../controllers/cartController");
const protect = require("../middleware/authMiddleware");

// Add product to cart
router.post("/", protect, addToCart);

module.exports = router;
