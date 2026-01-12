const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");

dotenv.config();       // loads .env variables
connectDB();           // connects MongoDB

const app = express();

// Enable CORS
app.use(cors());
// allows JSON request bodies
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);


app.get("/health", (req, res) => {
  res.status(200).send("OK");
});


// test route
app.get("/", (req, res) => {
  res.send("E-commerce Backend API is running...");
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

