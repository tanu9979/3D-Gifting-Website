const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

// @desc Place an order from cart
// @route POST /api/orders
const placeOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");
    if (!cart || cart.items.length === 0)
      return res.status(400).json({ message: "Cart is empty" });

    // Check stock availability
    for (const item of cart.items) {
      if (item.product.stock < item.quantity) {
        return res.status(400).json({ 
          message: `Insufficient stock for ${item.product.name}. Available: ${item.product.stock}` 
        });
      }
    }

    // Calculate total price
    const totalPrice = cart.items.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );

    // Create order
    const order = await Order.create({
      user: req.user._id,
      items: cart.items,
      totalPrice,
      status: "order placed"
    });

    // Update product stock
    for (const item of cart.items) {
      await Product.findByIdAndUpdate(
        item.product._id,
        { $inc: { stock: -item.quantity } }
      );
    }

    // Clear cart
    cart.items = [];
    await cart.save();

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get all orders for a user
// @route GET /api/orders
const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate("items.product");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get all orders (admin only)
// @route GET /api/orders/all
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate("items.product").populate("user", "name email");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// @desc Update order status
// @route PUT /api/orders/:id/status
const updateOrderStatus = async (req, res) => {
    try {
      const { status } = req.body;
      const order = await Order.findById(req.params.id);
      if (!order) return res.status(404).json({ message: "Order not found" });
  
      order.status = status;
      await order.save();
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
module.exports = { placeOrder, getUserOrders, getAllOrders, updateOrderStatus };
