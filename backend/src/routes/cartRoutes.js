const express = require("express");
const router = express.Router();
const { addToCart,updateCartItem } = require("../controllers/cartController");
const protect = require("../middleware/authMiddleware");

// Add product to cart
router.post("/", protect, addToCart);

// Update or remove a product in cart
router.put("/", protect, updateCartItem);


module.exports = router;
