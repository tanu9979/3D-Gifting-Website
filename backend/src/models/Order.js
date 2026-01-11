const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, default: 1 },
        customization: {
          color: {
            name: String,
            price: Number,
            hex: String
          },
          material: {
            name: String,
            price: Number
          },
          text: String,
          finalPrice: Number
        }
      },
    ],
    totalPrice: { type: Number, required: true },
    status: { type: String, default: "order placed" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
