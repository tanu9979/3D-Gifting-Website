const Cart = require("../models/Cart");

// Add product to cart
const addToCart = async (req, res) => {
  try {
    const { productId, quantity, customization } = req.body;

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      // create new cart
      cart = new Cart({
        user: req.user._id,
        items: [{ product: productId, quantity, customization }],
      });
    } else {
      // For customized products, always add as new item
      if (customization) {
        cart.items.push({ product: productId, quantity, customization });
      } else {
        // check if product exists in cart (for regular products)
        const itemIndex = cart.items.findIndex(
          (item) => item.product.toString() === productId && !item.customization
        );
        if (itemIndex > -1) {
          cart.items[itemIndex].quantity += quantity;
        } else {
          cart.items.push({ product: productId, quantity });
        }
      }
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Update product quantity in cart
// @route PUT /api/cart
const updateCartItem = async (req, res) => {
    try {
      const { productId, quantity } = req.body;
  
      const cart = await Cart.findOne({ user: req.user._id });
      if (!cart) return res.status(404).json({ message: "Cart not found" });
  
      const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId
      );
      if (itemIndex === -1)
        return res.status(404).json({ message: "Product not in cart" });
  
      if (quantity <= 0) {
        // Remove item if quantity is 0 or negative
        cart.items.splice(itemIndex, 1);
      } else {
        cart.items[itemIndex].quantity = quantity;
      }
  
      await cart.save();
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
// @desc Get logged-in user's cart
// @route GET /api/cart
const getCart = async (req, res) => {
    try {
      const cart = await Cart.findOne({ user: req.user._id })
        .populate("items.product");
  
      if (!cart) {
        return res.status(200).json({ items: [] });
      }
  
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  
  
// @desc Remove item from cart
// @route DELETE /api/cart/:itemId
const removeFromCart = async (req, res) => {
  try {
    const { itemId } = req.params;

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const itemIndex = cart.items.findIndex(
      (item) => item._id.toString() === itemId
    );
    if (itemIndex === -1)
      return res.status(404).json({ message: "Item not in cart" });

    cart.items.splice(itemIndex, 1);
    await cart.save();
    
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

  module.exports = {
    addToCart,
    updateCartItem,
    getCart,
    removeFromCart
  };
  
  
  
  
