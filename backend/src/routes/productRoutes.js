const express = require("express");
const router = express.Router();
const { createProduct, getProducts, updateProduct, deleteProduct } = require("../controllers/productController");
const { protect, admin } = require("../middleware/authMiddleware");

// Get all products (public)
router.get("/", getProducts);
// Create product (admin only)
router.post("/", protect, admin, createProduct);
// Update product (admin only)
router.put("/:id", protect, admin, updateProduct);
// Delete product (admin only)
router.delete("/:id", protect, admin, deleteProduct);

module.exports = router;

