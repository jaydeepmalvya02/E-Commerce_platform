const express = require("express");
const Cart = require("../models/CartModel");
const Product = require("../models/ProductModel");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();
// Helper function to get a cart by user Id or guest Id
const getCart = async (userId, guestId) => {
  if (userId) {
    return await Cart.findOne({ user: userId });
  } else {
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
          image: product.image,
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
        guestId: guestId ? guestId : undefined,
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
router.put('/',async(req,res)=>{
    const {productId,quantity,size,color,guestId,userId}=req.body;
    try {
        let cart=await getCart(userId,guestId);
        if (!cart) return res.status(404).json({message:"Cart not Found"})
            const productIndex = cart.products.findIndex(
                (p) =>
                  p.productId.toString() === productId &&
                  p.size === size &&
                  p.color === color
              );
              if (productIndex > -1) {
                //  update the quantity
                if (quantity>0){
                    cart.products[productIndex].quantity += parseInt(quantity);
                }
                else{
                    cart.products.splice(productIndex,1) // Remove product if quantity is 0
                }
                cart.totalPrice = cart.products.reduce(
                    (acc, item) => acc + item.price * item.quantity,
                    0
                  );
                  await cart.save()
                  return res.status(200).json(cart);
              }
              else{
                return res.status(404).json({message:"Product Not found"})
              }

    } catch (error) {
        console.error(error);
        return res.status(500).send("Server error");
    }
})
module.exports = router;
