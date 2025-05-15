const Checkout = require("../models/CheckoutModel");
const Cart = require("../models/CartModel");
const Product = require("../models/ProductModel");
const Order = require("../models/OrderModel");
const createCheckout = async (req, res) => {
  const { checkoutItems, shippingAddress, paymentMethod, totalPrice } =
    req.body;
  if (!checkoutItems || checkoutItems.length === 0) {
    return res.status(400).json({ message: "no items in checkout" });
  }
  try {
    const newCheckout = await Checkout.create({
      user: req.user._id,
      checkoutItems: checkoutItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      paymentStatus: "Pending",
      isPaid: false,
    });
    console.log(`Checkout created for user:${req.user._id}`);
    res.status(201).json(newCheckout);
  } catch (error) {
    console.error("error Creating checkout session", error);
    res.status(500).json({ message: "Server Error" });
  }
};
  
const Pay=async(req,res)=>{
    const { paymentStatus, paymentDetails } = req.body;
  
    try {
      const checkout = await Checkout.findById(req.params.id);
      if (!checkout) {
        return res.status(404).json({ message: "Checkout not found" });
      }
      if (paymentStatus === "paid") {
        checkout.isPaid = true;
        checkout.paymentStatus = paymentStatus;
        checkout.paymentDetails = paymentDetails;
        checkout.paidAt = Date.now();
        await checkout.save();
        res.status(200).json(checkout);
      } else {
        res.status(400).json({ message: "Invalid payment Status" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
}
const finalChekout=async(req,res)=>{
   try {
      const checkout = await Checkout.findById(req.params.id);
      if (!checkout) {
        return res.status(404).json({ message: "Checkout not found" });
      }
      if (checkout.isPaid && !checkout.isFinalized) {
        // create final order based on the checkout details
        const finalOrder = await Order.create({
          user: checkout.user,
          orderItems: checkout.checkoutItems,
          shippingAddress: checkout.shippingAddress,
          paymentMethod: checkout.paymentMethod,
          totalPrice: checkout.totalPrice,
          isPaid: true,
          paidAt: checkout.paidAt,
          isDelivered: false,
          paymentStatus: "paid",
          paymentDetails: checkout.paymentDetails,
        });
        // Mark the checkout as finalized
        checkout.isFinalized = true;
        checkout.finalizedAt=Date.now()
        await checkout.save();
        // Delete the cart associated with the user
        await Cart.findOneAndDelete({user:checkout.user})
        res.status(201).json(finalOrder);
      }
      else if(checkout.isFinalized){
        return res.status(400).json({ message: "Checkout already finalized" });
  
      }
      else{
        return res.status(400).json({ message: "Checkout not paid" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
}
module.exports={createCheckout,Pay,finalChekout}