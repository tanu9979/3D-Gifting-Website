const express = require("express");
const router = express.Router();
const { createProduct } = require("../controllers/productController");
const { protect, admin } = require("../middleware/authMiddleware");
// Example: only admin can create product
router.post("/", protect, admin, createProduct);
module.exports = router;

