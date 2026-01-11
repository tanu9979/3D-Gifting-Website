const express = require("express");
const router = express.Router();
const { addToCart,updateCartItem ,getCart, removeFromCart} = require("../controllers/cartController");
const{ protect} = require("../middleware/authMiddleware");

// Add product to cart
router.post("/", protect, addToCart);

router.get("/", protect, getCart);

// Update or remove a product in cart
router.put("/", protect, updateCartItem);

// Remove item from cart
router.delete("/:itemId", protect, removeFromCart);


module.exports = router;
