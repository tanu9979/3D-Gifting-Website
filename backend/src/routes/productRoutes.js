const express = require("express");
const router = express.Router();
const { createProduct } = require("../controllers/productController");
const protect = require("../middleware/authMiddleware");

// Only logged-in users can create products
router.post("/", protect, createProduct);

module.exports = router;

