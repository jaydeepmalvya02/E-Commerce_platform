const express = require("express");
const jwt = require("jsonwebtoken");
const { protect } = require("../middleware/authMiddleware");
const bcrypt = require("bcrypt");
const User = require("../models/UserModel");

// genetrate jwt payload
const CreatePayload = (user, res) => {
  const payload = {
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };

  jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: "40h" },
    (err, token) => {
      if (err) throw err;

      res.status(201).json({
        user: payload.user,
        token,
      });
    }
  );
};


// @route POST /api/users/register
// @desc Register a new user
// access public

const register = async (req, res) => {
  const { name, email, password } = req.body;
  // console.log(req.body);
  try {
    let user = await User.findOne({
      email,
    });
    if (user) return res.status(400).json({ message: "User already exists!" });
    user = new User({ name, email, password });
    await user.save();
    return CreatePayload(user,res);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

// Login api
// @Route POST/api/users/login
// @desc Authenticate user
// @Access public
const login = async (req, res) => {
  const { email, password } = req.body;
  // console.log(req.body);
  try {
    // find the user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not Exists" });
    const isMatch = await user.matchPassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid Credentials" });
    // Create jwt
    return CreatePayload(user,res);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

// @route GET /api/user/profile
// @desc Get logged-in user's profile (protected route)
// @access private
const profile = async (req, res) => {
  res.status(201).json(req.user);
};

// Google Auth Controller

const google = async (req,res) => {
  try {
    const { email, name } = req.body;
    // console.log(req.body);
    let user = await User.findOne({
      email,
    });
    if (!user) {
      const generatedPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(generatedPassword, 10);
      const username =
        name.split(" ").join("").toLowerCase() +
        Math.random().toString(36).slice(-4);

      user = new User({
        name,
        username,
        email,
        password: hashedPassword,
        role: "customer", // or whatever default role you want
      });
     

      await user.save();
   
    }
    return CreatePayload(user,res);
  } catch (error) {
    console.error("Google login error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
module.exports = { register, CreatePayload, login, google, profile };
