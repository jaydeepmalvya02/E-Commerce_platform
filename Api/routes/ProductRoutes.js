const express = require("express");
const Product = require("../models/ProductModel");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();


// @Route POST /api/products
// desc Create a new Product
// access Private/admin

router.post('/',protect,async(req , res )=>{
    try {
        const {
            name,
            description,
            price,
            discountPrice,
            countInStock,
            category,
            brand,
            sizes,
            colors,
            collections,
            material,
            gender,
            images,
            isFeatured,
            isPublished,
            tags,
            dimensions,
            weight,
            sku,

        }=req.body
        const product =new Product({
            name,
            description,
            price,
            discountPrice,
            countInStock,
            category,
            brand,
            sizes,
            colors,
            collections,
            material,
            gender,
            images,
            isFeatured,
            isPublished,
            tags,
            dimensions,
            weight,
            sku,
            user:req.user._id,  //Reference to the admin user who created it 

        })

        const createdProduct=await product.save()
        res.status(201).json(createdProduct)
    } catch (error) {
        console.error(error)
        res.status(500).send("Server Error")
    }
})
module.exports=router