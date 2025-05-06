const express = require("express");
const Product = require("../models/ProductModel");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// @route GET api/admin/products
// #desc get all products (admin only)
// access Private/admin

router.get("/", protect, admin, async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});
module.exports=router