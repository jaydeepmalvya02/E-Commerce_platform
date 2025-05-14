const express = require("express");
const User = require("../models/UserModel.js");
const jwt = require("jsonwebtoken");
const {protect}=require('../middleware/authMiddleware.js')
const bcrypt=require('bcrypt')
const router = express.Router();

// @route POST /api/users/register
// @desc Register a new user
// access public

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Registration logic
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });
    user = new User({ name, email, password });

    await user.save();

    //    Create JWT Payload
    const payload = {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role,
      },
    };
    // Sign and return the token along with user data
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "40h" },
      (err, token) => {
        if (err) throw err;
        // Send the user and token in response
        res.status(201).json({
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            password: user.password,
            role: user.role,
          },
          token,
        });
      }
    );
    // res.status(201).json({
    //     user:{
    //         _id:user._id,
    //         name:user.name,
    //         email:user.email,
    //         password:user.password,
    //         role:user.role
    //     }
    // })
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

// @Route POST/api/users/login
// @desc Authenticate user
// @Access public
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // find the user by email
    const user = await User.findOne({ email });
    if (!user) res.status(400).json({ message: "Invalid Credentials" });
    const isMatch = await user.matchPassword(password);
    if (!isMatch) return (400).json({ message: "Invalid Credentials" });

    //    Create JWT Payload
    const payload = {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role,
      },
    };
    // Sign and return the token along with user data
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "40h" },
      (err, token) => {
        if (err) throw err;
        // Send the user and token in response
        res.json({
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            password: user.password,
            role: user.role,
          },
          token,
        });
      }
    );
  } catch (error) {
    console.log(error);

    res.status(500).send("Internal Server Error");
  }
});


// @route GET /api/user/profile
// @desc Get logged-in user's profile (protected route)
// @access private
router.get('/profile',protect ,async(req,res)=>{
    console.log(req.user);
    
    res.json(req.user)
})
// google auth routes

router.post("/google", async (req, res) => {
  try {
    const { email, name } = req.body;

    let user = await User.findOne({ email });

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
        role: "user", // or whatever default role you want
      });

      await user.save();
    }

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

        res.json({
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token,
        });
      }
    );
  } catch (error) {
    console.error("Google login error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;

