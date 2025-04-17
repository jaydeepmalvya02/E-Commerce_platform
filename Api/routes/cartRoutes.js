const express = require("express");
const Cart = require("../models/CartModel");
const Product = require("../models/ProductModel");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();
// Helper function to get a cart by user Id or guest Id
const getCart = async (userId, guestId) => {
  if (userId) {
    return await Cart.findOne({ user: userId });
  } else if(guestId) {
    return await Cart.findOne({ guestId });
  }
  return null;
};

// @route POST /api/cart
// @desc Add a product to the cart for a guest or logged in user
// @access Public

router.post("/", async (req, res) => {
  const { productId, quantity, size, color, guestId, userId } = req.body;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      res.status(404).json({ message: "Product not Found" });
    }
    //    Determine if the user is logged in or guest
    let cart = await getCart(userId, guestId);
    // if the cart exists, update it
    if (cart) {
      const productIndex = cart.products.findIndex(
        (p) =>
          p.productId.toString() === productId &&
          p.size === size &&
          p.color === color
      );
      if (productIndex > -1) {
        // If the product already exists, update the quantity
        cart.products[productIndex].quantity += parseInt(quantity);
      } else {
        // add new product
        cart.products.push({
          productId,
          name: product.name,
          image: product.images,
          price: product.price,
          size,
          color,
          quantity,
        });
      }
      //   recalculate the total price
      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      await cart.save();
      return res.status(200).json(cart);
    } else {
      // Create a new cart for the guest or user
      const newCart = await Cart.create({
        user: userId ? userId : undefined,
        guestId: guestId ? guestId : "guest_"+ new Date().getTime(),
        products: [
          {
            productId,
            name: product.name,
            image: product.images[0].url,
            price: product.price,
            size,
            color,
            quantity,
          },
        ],
        totalPrice: product.price * quantity,
      });
     
      
      return res.status(200).json(newCart);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// @route PUT /api/cart/update
// @desc update product quantity in the cart for a guest or logged-in User
// @access Public
router.put("/", async (req, res) => {
  const { productId, quantity, size, color, guestId, userId } = req.body;
  try {
    let cart = await getCart(userId, guestId);
    if (!cart) return res.status(404).json({ message: "Cart not Found" });
    const productIndex = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        p.size === size &&
        p.color === color
    );
    if (productIndex > -1) {
      //  update the quantity
      if (quantity > 0) {
        cart.products[productIndex].quantity += parseInt(quantity);
      } else {
        cart.products.splice(productIndex, 1); // Remove product if quantity is 0
      }
      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      await cart.save();
      return res.status(200).json(cart);
    } else {
      return res.status(404).json({ message: "Product Not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});
// @route DELETE /api/cart
// @desc Remove a product from the cart
//  @access Public
router.delete("/", async (req, res) => {
  const { productId, size, color, guestId, userId } = req.body;
  try {
    let cart = await getCart(userId, guestId);
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    const productIndex = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        p.size === size &&
        p.color === color
    );
    if (productIndex > -1) {
      cart.products.splice(productIndex, 1);
      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      await cart.save();
      return res.status(201).json(cart);
    } else {
      console.error(error);
      return res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

// @route GEt /api/cart
// @desc Get logged-in user's or guest user's cart
// access public

router.get("/", async (req, res) => {
  const { userId, guestId } = req.body;
  try {
    const cart = await getCart(userId, guestId);
    if (cart) {
      res.json(cart);
    } else {
      res.status(404), json({ message: "Cart not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});
// @route POST/api/cart/merge
// @desc Merge guest cart into user cart on login
//  @access Private

router.post("/merge", protect, async (req, res) => {
  const { guestId } = req.body;
  try {
    const guestCart = await Cart.findOne({ guestId });
    const userCart = await Cart.findOne({ user: req.user._id });

    if (guestCart) {
      if (guestCart.products.length === 0) {
        return res.status(400).json({ message: "Guest cart is empty" });
      }
      if (userCart) {
        guestCart.products.forEach((guestItem) => {
          const productIndex = userCart.products.findIndex(
            (item) =>
              item.productId.toString() === guestItem.productId.toString() &&
              item.size === guestItem.size &&
              item.color === guestItem.color
          );
          if (productIndex > -1) {
            // if the items is exists in the user cart , update the quantity
            userCart.products[productIndex].quantity += parseInt(
              guestItem.quantity
            );
          } else {
            // Otherwise add the guest item into the cart
            userCart.products.push(guestItem);
          }
        });
        userCart.totalPrice = userCart.products.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
        await userCart.save();

        // Remove the guest cart after merging
        try {
          await Cart.findOneAndDelete({ guestID });
        } catch (error) {
          console.error("Error deleting guest cart", error);
        }
         res.status(201).json(userCart);
      }
      else{
        //  if the user has no existing cart ,assign the guest cart to the user
        guestCart.user=req.user._id
        guestCart.guestID=undefined
        await guestCart.save()
        res.status(201).json(guestCart);
      }
    }
    else{
      if(userCart){
        // guest cart has already been merged, return user cart
        return res.status(200).json(userCart)
      }
      res.status(404).json({message:"Guest cart not found"})
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error"); 
  }
});
module.exports = router;
