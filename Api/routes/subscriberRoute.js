const express = require("express");
const Subscriber = require("../models/Subscribe.model");

const router = express.Router();

router.post("/subscribe", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400).json({ message: "provide valid email" });
  }
  try {
    let subscribe = await Subscriber.findOne({ email });
    if (subscribe) {
      res.status(400).json({ message: "Already Subscribed to newsletter" });
    }
    subscribe=new Subscriber({email})
    await subscribe.save()
    res.status(200).json({message:"Successfully subscribed!"})
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports=router
