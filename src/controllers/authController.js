const User = require("../models/User");
const bcrypt = require("bcryptjs");

// @desc   Register new user
// @route  POST /api/auth/register
// @access Public
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 2. Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // 4. Send response
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
}
};

module.exports = { registerUser };

