const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    stock: { type: Number, default: 0 },
    type: { type: String, enum: ['regular', '3d-customizable'], default: 'regular' },
    basePrice: { type: Number },
    customizationOptions: {
      colors: [{
        name: String,
        price: Number,
        hex: String
      }],
      materials: [{
        name: String,
        price: Number
      }],
      textEngraving: {
        enabled: { type: Boolean, default: false },
        pricePerChar: { type: Number, default: 0 }
      }
    },
    model3D: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
