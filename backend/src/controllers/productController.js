const Product = require("../models/Product");

// @desc   Create a new product
// @route  POST /api/products
const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock, type, basePrice, model3D, customizationOptions } = req.body;

    const productData = {
      name,
      description,
      price,
      category,
      stock,
      type: type || 'regular'
    };

    if (type === '3d-customizable') {
      productData.basePrice = basePrice;
      productData.model3D = model3D;
      productData.customizationOptions = customizationOptions;
    }

    const product = await Product.create(productData);

    res.status(201).json({ message: "Product created", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Get all products
// @route  GET /api/products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Update a product
// @route  PUT /api/products/:id
const updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock, type, basePrice, model3D, customizationOptions } = req.body;
    
    const updateData = {
      name,
      description,
      price,
      category,
      stock,
      type: type || 'regular'
    };

    if (type === '3d-customizable') {
      updateData.basePrice = basePrice;
      updateData.model3D = model3D;
      updateData.customizationOptions = customizationOptions;
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: "Product updated", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Delete a product
// @route  DELETE /api/products/:id
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createProduct, getProducts, updateProduct, deleteProduct };

