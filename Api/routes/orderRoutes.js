const express = require("express");
const Order = require("../models/OrderModel");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// @route GET /api/orders/my-orders
// @desc Get logged-in user's order
// @access Private

router.get("/my-orders", protect, async (req, res) => {
  try {
    // Find orders for authenticated user
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    }); // sort by most recent orders
    res.json(orders);
  } catch (error) {
    console.error(error);

    res.status(400).json({ message: "Server error" });
  }
});
// @route GET /api/orders/:id
// @desc Get order by id
// @access Private

router.get("/:id",protect,async (req,res)=>{
  try {
    const order =await Order.findById(req.params.id).populate(
      "user",
      "name email"
    )
    if(!order) return res.status(404).json({ message: "Order not found"})
    // Return the full order details
  res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({message:"Server error"})
  }
})
module.exports=router