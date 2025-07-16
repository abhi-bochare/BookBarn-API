const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashed, role });
    res.status(201).json({
      message: "User Registered",
      user: { email: user.email, role: user.role },
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error in Registering User", Error: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid Email or Password" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.json({
      message: "Login Successfull",
      token,
      user: { email: user.email, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ message: "Login Failed", error: err.message });
  }
};

const forgotPassword = async (req, res) => {
  const email = req.body.email;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(404).json({ message: "User not found" });
  }

  const token = jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );

  const resetLink = `http://localhost:3000/reset-password/${token}`;
};

module.exports = {
  signup,
  login,
};
