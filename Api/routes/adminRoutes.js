const express = require("express");
const User = require("../models/UserModel");
const { protect, admin } = require("../middleware/authMiddleware");
const { Error } = require("mongoose");
const {addUser,updateUser,deleteUser,allUsers}=require('../controller/adminUser')
const router = express.Router();

// @route GET api/admin/users
// @desc get all users (Admin only)
// @access Private/Admin

// router.get("/", protect, admin, async (req, res) => {
//   try {
//     const users = await User.find({});
//     res.json(users);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server Error" });
//   }
// });
router.get("/", protect, admin,allUsers)

// @route POST /api/admin/users
// @desc Add a new user (admin only)
// @access Private

// router.post("/add", protect, admin, async (req, res) => {
//   const { name, email, password, role } = req.body;
//   try {
//     let user = await User.findOne({ email });
//     if (user) {
//       res.status(400).json({ messageL: "user is already added" });
//     }
//     user = new User({
//       name,
//       email,
//       password,
//       role: role || "customer",
//     });
//     await user.save();
//     res.status(201).json({ message: "User is successfully added" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server Error" });
//   }
// });
router.post("/add", protect, admin,addUser) 

// @route PUT /api/admin/users/:id
// @desc Update user info (Admin only) - name,email and role
// @access Private/admin

// router.put("/update/:id", protect, admin, async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (user) {
//       (user.name = req.body.name || user.name),
//         (user.email = req.body.email || user.email),
//         (user.role = req.body.role || user.role);
//     }
//     const updatedUser = await user.save();
//     res.json({ message: "User updated successfully", user: updatedUser });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server Error" });
//   }
// });
router.put("/update/:id", protect, admin,updateUser)

// @route DELETE /api/admin/users/:id
// @desc Delete a user
// @access Private/Admin

// router.delete("/delete/:id", protect, admin, async (req, res) => {
//   try {
//     const user = User.findById(req.params.id);
//     if (!user) {
//       res.status(404).json({ message: "User doesn't exist!" });
//     }
//     await user.deleteOne()
//     res.json({ message: "User successfully deleted!" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server Error" });
//   }
// });
router.delete("/delete/:id", protect, admin,deleteUser)

module.exports = router;
