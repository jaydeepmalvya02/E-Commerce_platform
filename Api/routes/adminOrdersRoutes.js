const express = require("express");
const Order = require("../models/OrderModel");
const { protect, admin } = require("../middleware/authMiddleware");
const { allOrders, updateOrder, deleteOrder } = require("../controller/adminOrders");
const router = express.Router();

// @route GET api/admin/orders
// @desc get all orders (admin only)
// @access Private/Admin

// router.get("/", protect, admin, async (req, res) => {
//   try {
//     const orders = await Order.find({})
//       .populate("user", "name email")
//       .then((orders) => orders.filter((order) => order.user !== null));;
//     res.json(orders);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server Error" });
//   }
// });
router.get("/", protect, admin, allOrders);

// @route PUT api/admin/orders/:id
// @desc Update product status
// @access Private/admin
// router.put("/update/:id", protect, admin, async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id).populate(
//       "user",
//       "name email"
//     );
//     if (order) {
//       (order.status = req.body.status || order.status),
//         (order.isDelivered =
//           req.body.status === "Delivered" ? true : order.isDelivered),
//         (order.deliveredAt =
//           req.body.status === "Delivered" ? Date.now() : order.deliveredAt);
//       const updatedOrder = await order.save();
//       res.json(updatedOrder);
//     } else {
//       res.status(404).json({ message: "Order not found" });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server Error" });
//   }
// });
router.put("/update/:id", protect, admin, updateOrder)
// @route DELETE /api/admin/orders/:id
// @desc Delete an order
// @access Private/Admin
// router.delete("/delete/:id", protect, admin, async (req, res) => {
//   try {
//     const order = Order.findById(req.params.id);
//     if (order) {
//       await order.deleteOne();
//       res.status(201).json({ message: "Order Removed" });
//     } else {
//       res.status(404).json({ message: "Order not found" });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server Error" });
//   }
// });
router.delete("/delete/:id", protect, admin, deleteOrder)
module.exports = router;
