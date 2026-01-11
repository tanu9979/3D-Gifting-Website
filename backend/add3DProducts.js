const mongoose = require('mongoose');
const Product = require('./src/models/Product');
require('dotenv').config();

const sample3DProducts = [
  {
    name: "Custom 3D Diary",
    description: "Personalized diary with custom colors, materials, and text engraving",
    price: 25, // This will be calculated based on customization
    basePrice: 15,
    category: "Stationery",
    stock: 50,
    type: "3d-customizable",
    customizationOptions: {
      colors: [
        { name: "Red", price: 2, hex: "#ff0000" },
        { name: "Blue", price: 2, hex: "#0000ff" },
        { name: "Green", price: 2, hex: "#00ff00" },
        { name: "Black", price: 3, hex: "#000000" },
        { name: "Gold", price: 5, hex: "#ffd700" }
      ],
      materials: [
        { name: "Standard", price: 0 },
        { name: "Leather", price: 15 },
        { name: "Premium", price: 10 }
      ],
      textEngraving: {
        enabled: true,
        pricePerChar: 0.5
      }
    },
    model3D: "diary.glb"
  },
  {
    name: "Custom 3D Bottle",
    description: "Personalized water bottle with custom colors, materials, and text",
    price: 20,
    basePrice: 12,
    category: "Drinkware",
    stock: 30,
    type: "3d-customizable",
    customizationOptions: {
      colors: [
        { name: "Silver", price: 1, hex: "#c0c0c0" },
        { name: "Blue", price: 1, hex: "#0066cc" },
        { name: "Red", price: 1, hex: "#cc0000" },
        { name: "Black", price: 2, hex: "#000000" },
        { name: "Rose Gold", price: 3, hex: "#e8b4a0" }
      ],
      materials: [
        { name: "Plastic", price: 0 },
        { name: "Steel", price: 8 },
        { name: "Ceramic", price: 5 }
      ],
      textEngraving: {
        enabled: true,
        pricePerChar: 0.3
      }
    },
    model3D: "bottle.glb"
  }
];

async function addSample3DProducts() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
    
    for (const productData of sample3DProducts) {
      const existingProduct = await Product.findOne({ name: productData.name });
      if (!existingProduct) {
        const product = new Product(productData);
        await product.save();
        console.log(`Added: ${productData.name}`);
      } else {
        console.log(`Already exists: ${productData.name}`);
      }
    }
    
    console.log('Sample 3D products added successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

addSample3DProducts();