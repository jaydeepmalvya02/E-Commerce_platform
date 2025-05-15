const express = require("express");
const Cart = require("../models/CartModel");
const Product = require("../models/ProductModel");
const { protect } = require("../middleware/authMiddleware");
const {AddCart,updateCart,deleteCart,cartDetail,mergeCart}=require('../controller/cart')
const router = express.Router();

// 🔧 Helper: Get cart for user or guest
// const getCart = async (userId, guestId) => {
//   if (userId) return await Cart.findOne({ user: userId });
//   else if (guestId) return await Cart.findOne({ guestId });
//   return null;
// };


// 🔧 Helper: Calculate total price
// const calculateTotalPrice = (products) =>
//   products.reduce((acc, item) => acc + item.price * item.quantity, 0);

// ➕ Add to Cart
// router.post("/", async (req, res) => {
//   const { productId, quantity, size, color, guestId, userId } = req.body;

//   if (quantity <= 0) {
//     return res.status(400).json({ message: "Quantity must be at least 1" });
//   }

//   try {
//     const product = await Product.findById(productId);
//     if (!product) return res.status(404).json({ message: "Product not found" });

//     let cart = await getCart(userId, guestId);

//     if (cart) {
//       const index = cart.products.findIndex(
//         (p) =>
//           p.productId.toString() === productId &&
//           p.size === size &&
//           p.color === color
//       );

//       if (index > -1) {
//         cart.products[index].quantity += parseInt(quantity);
//       } else {
//         cart.products.push({
//           productId,
//           name: product.name,
//           image: product.images[0]?.url || "",
//           price: product.price,
//           size,
//           color,
//           quantity,
//         });
//       }

//       cart.totalPrice = calculateTotalPrice(cart.products);
//       await cart.save();
//       return res.status(200).json(cart);
//     } else {
//       const newCart = await Cart.create({
//         user: userId || undefined,
//         guestId: guestId || "guest_" + new Date().getTime(),
//         products: [
//           {
//             productId,
//             name: product.name,
//             image: product.images[0]?.url || "",
//             price: product.price,
//             size,
//             color,
//             quantity,
//           },
//         ],
//         totalPrice: product.price * quantity,
//       });
//       console.log("Adding quantity:", quantity, typeof quantity);
//       return res.status(200).json(newCart);
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Server error");
//   }
// });
router.post("/",AddCart)

// 🔄 Update Cart Item Quantity
// router.put("/", async (req, res) => {
//   const { productId, quantity, size, color, guestId, userId } = req.body;
//   try {
//     const cart = await getCart(userId, guestId);
//     if (!cart) return res.status(404).json({ message: "Cart not found" });

//     const index = cart.products.findIndex(
//       (p) =>
//         p.productId.toString() === productId &&
//         p.size === size &&
//         p.color === color
//     );

//     if (index > -1) {
//       if (quantity > 0) {
//         cart.products[index].quantity = parseInt(quantity);
//       } else {
//         cart.products.splice(index, 1);
//       }

//       cart.totalPrice = calculateTotalPrice(cart.products);
//       await cart.save();
//       console.log("Adding quantity:", quantity, typeof quantity);
//       return res.status(200).json(cart);
//     } else {
//       return res.status(404).json({ message: "Product not found in cart" });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Server error");
//   }
// });
router.put("/",updateCart)
// ❌ Remove Product From Cart
// router.delete("/", async (req, res) => {
//   const { productId, size, color, guestId, userId } = req.body;
//   try {
//     const cart = await getCart(userId, guestId);
//     if (!cart) return res.status(404).json({ message: "Cart not found" });

//     const index = cart.products.findIndex(
//       (p) =>
//         p.productId.toString() === productId &&
//         p.size === size &&
//         p.color === color
//     );

//     if (index > -1) {
//       cart.products.splice(index, 1);
//       cart.totalPrice = calculateTotalPrice(cart.products);
//       await cart.save();
//       return res.status(201).json(cart);
//     } else {
//       return res.status(404).json({ message: "Product not found in cart" });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Server error");
//   }
// });
router.delete("/",deleteCart)

// 📦 Get Cart (User or Guest)
// router.get("/", async (req, res) => {
//   const { userId, guestId } = req.body;
//   try {
//     const cart = await getCart(userId, guestId);
//     if (cart) {
//       res.json(cart);
//     } else {
//       res.status(404).json({ message: "Cart not found" });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Server error");
//   }
// });
router.get("/",cartDetail)
// 🔁 Merge Guest Cart into User Cart on Login
// router.post("/merge", protect, async (req, res) => {
//   const { guestId } = req.body;
//   try {
//     const guestCart = await Cart.findOne({ guestId });
//     const userCart = await Cart.findOne({ user: req.user._id });

//     if (guestCart) {
//       if (guestCart.products.length === 0) {
//         return res.status(400).json({ message: "Guest cart is empty" });
//       }

//       if (userCart) {
//         guestCart.products.forEach((guestItem) => {
//           const index = userCart.products.findIndex(
//             (item) =>
//               item.productId.toString() === guestItem.productId.toString() &&
//               item.size === guestItem.size &&
//               item.color === guestItem.color
//           );

//           if (index > -1) {
//             userCart.products[index].quantity += parseInt(guestItem.quantity);
//           } else {
//             userCart.products.push(guestItem);
//           }
//         });

//         userCart.totalPrice = calculateTotalPrice(userCart.products);
//         await userCart.save();

//         await Cart.findOneAndDelete({ guestId });

//         return res.status(201).json(userCart);
//       } else {
//         guestCart.user = req.user._id;
//         guestCart.guestId = undefined;
//         await guestCart.save();
//         return res.status(201).json(guestCart);
//       }
//     } else {
//       if (userCart) {
//         return res.status(200).json(userCart);
//       }
//       res.status(404).json({ message: "Guest cart not found" });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Server error");
//   }
// });
router.post("/merge", protect, mergeCart)
module.exports = router;
