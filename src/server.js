const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();       // loads .env variables
connectDB();           // connects MongoDB

const app = express();

// allows JSON request bodies
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("E-commerce Backend API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

