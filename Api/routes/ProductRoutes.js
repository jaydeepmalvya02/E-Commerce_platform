const express = require("express");
const Product = require("../models/ProductModel");
const { protect, admin } = require("../middleware/authMiddleware");
const {
  createProduct,
  updateProduct,
  deleteProduct,
  allProducts,
  bestSeller,
  newArrivals,
  SingleProduct,
  Similar,
} = require("../controller/product");
const router = express.Router();

// @Route POST /api/products
// desc Create a new Product
// access Private/admin

// router.post("/", protect, admin, async (req, res) => {
//   try {
//     const {
//       name,
//       description,
//       price,
//       discountPrice,
//       countInStock,
//       category,
//       brand,
//       sizes,
//       colors,
//       collections,
//       material,
//       gender,
//       images,
//       isFeatured,
//       isPublished,
//       tags,
//       dimensions,
//       weight,
//       sku,
//     } = req.body;
//     const product = new Product({
//       name,
//       description,
//       price,
//       discountPrice,
//       countInStock,
//       category,
//       brand,
//       sizes,
//       colors,
//       collections,
//       material,
//       gender,
//       images,
//       isFeatured,
//       isPublished,
//       tags,
//       dimensions,
//       weight,
//       sku,
//       user: req.user._id, //Reference to the admin user who created it
//     });

//     const createdProduct = await product.save();
//     res.status(201).json(createdProduct);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Server Error");
//   }
// });
router.post("/create", protect, admin, createProduct);

// @route PUT /api/products/:id
// @desc Update an existing product ID
// @access Private /Admin

// router.put("/:id", protect, admin, async (req, res) => {
//   try {
//     const {
//       name,
//       description,
//       price,
//       discountPrice,
//       countInStock,
//       category,
//       brand,
//       sizes,
//       colors,
//       collections,
//       material,
//       gender,
//       images,
//       isFeatured,
//       isPublished,
//       tags,
//       dimensions,
//       weight,
//       sku,
//     } = req.body;

//     //   Find Product by Id
//     const product = await Product.findById(req.params.id);
//     if (product) {
//       // Update product fields
//       product.name = name ?? product.name;
//       product.description = description ?? product.description;
//       product.price = price ?? product.price;
//       product.discountPrice = discountPrice ?? product.discountPrice;
//       product.countInStock = countInStock ?? product.countInStock;
//       product.category = category ?? product.category;
//       product.brand = brand ?? product.brand;
//       product.sizes = sizes ?? product.sizes;
//       product.colors = colors ?? product.colors;
//       product.collections = collections ?? product.collections;
//       product.material = material ?? product.material;
//       product.gender = gender ?? product.gender;
//       product.images = images ?? product.images;
//       product.isFeatured =
//         isFeatured !== undefined
//           ? isFeatured
//           : product.isFeatured ?? product.isFeatured;
//       product.isPublished =
//         isPublished != undefined
//           ? isPublished
//           : product.isPublished ?? product.isPublished;
//       product.tags = tags ?? product.tags;
//       product.dimensions = dimensions ?? product.dimensions;
//       product.weight = weight ?? product.weight;
//       product.sku = sku ?? product.sku;
//       //  Save the updated product
//       const updatedProduct = await product.save();
//       console.log(updatedProduct);
//       res.status(200).json(updatedProduct);
//     } else {
//       res.status(404).json({ message: "Product Not Found!" });
//     }
//   } catch (error) {
//     console.error(error);

//     res.status(500).send("server error");
//   }
// });
router.put("/:id", protect, admin, updateProduct);

// @Route DELETE /api /products/:id
// @c Delete a product by ID
// @access Private/admin
// router.delete("/:id", protect, admin, async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (product) {
//       // await Product.findByIdAndDelete(req.params.id)
//       await product.deleteOne();
//       res.status(201).json({ message: "Product Deleted Successfully" });
//     } else {
//       res.status(404).json({ message: "Product Not Found" });
//     }
//   } catch (error) {
//     console.error(error);

//     res.status(500).send("Server Error");
//   }
// });
router.delete("/:id", protect, admin, deleteProduct);

// @Route GET /api/products
// desc Get all products with optional query filter
// @access Public
// router.get("/", async (req, res) => {
//   try {
//     const {
//       collection,
//       size,
//       color,
//       gender,
//       minPrice,
//       maxPrice,
//       sortBy,
//       search,
//       category,
//       material,
//       brand,
//       limit,
//     } = req.query;

//     let query = {};
//     let sort = {};
//     // Filter Logic
//     if (collection && collection.toLocaleLowerCase() !== "all") {
//       query.collection = collection;
//     }
//     if (category && category.toLocaleLowerCase() !== "all") {
//       query.category = category;
//     }
//     if (material) {
//       query.material = { $in: material.split(",") };
//     }
//     if (brand) {
//       query.brand = { $in: brand.split(",") };
//     }
//     if (size) {
//       query.sizes = { $in: size.split(",") };
//     }
//     if (color) {
//       query.colors = { $in: [color] };
//     }
//     if (gender) {
//       query.gender = gender;
//     }
//     if (minPrice || maxPrice) {
//       query.price = {};
//       if (minPrice) query.price.$gte = Number(minPrice);
//       if (maxPrice) query.price.$lte = Number(maxPrice);
//     }
//     if (search) {
//       query.$or = [
//         { name: { $regex: search, $options: "i" } },
//         { description: { $regex: search, $options: "i" } },
//       ];
//     }
//     // Sort Logic
//     if (sortBy) {
//       switch (sortBy) {
//         case "priceAsc":
//           sort = { price: 1 };
//           break;
//         case "priceDesc":
//           sort = { price: -1 };
//           break;
//         case "popularity":
//           sort = { rating: -1 };
//           break;
//         default:
//           break;
//       }
//     }
//     // Fetch Product and apply sorting and limit
//     let products = await Product.find(query)
//       .sort(sort)
//       .limit(Number(limit) || 0);
//     const data = res.json(products);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Server Error");
//   }
//   // const data=await Product.find()
//   // const response=res.json(data)
//   // res.status(200).send(response)
// });
router.get("/",  allProducts);

// @Route GET /api/products/best-seller
// @desc Retrieve the product with highest rating
// @access Public
// router.get("/best-seller", async (req, res) => {
//   try {
//     const bestSeller = await Product.findOne().sort({ rating: -1 });
//     if (bestSeller) {
//       res.json(bestSeller);
//     } else {
//       res.status(401).json({ message: "There is no best seller" });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Server error");
//   }
// });
router.get("/best-seller", bestSeller);
// @route GET /api/products/new-arrival
// @desc Retrieve latest 8 products-Creation one
// @access Public
// router.get("/new-arrivals", async (req, res) => {
//   try {
//     // Fetch latest 8 products
//     const newArrivals = await Product.find().sort({ createdAt: -1 }).limit(8);
//     res.json(newArrivals);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Server error");
//   }
// });
router.get("/new-arrivals", newArrivals);

// @route GET /api/products/:id
// @desc Get a Single product by ID
// @access Public

// router.get("/:id", async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (product) {
//       res.json(product);
//     } else {
//       res.status(404).json({ message: "Product Not Found" });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Server error");
//   }
// });
router.get("/:id", SingleProduct);

// @Route GET /api/products/similar/:id
// @desc Retrieve similar product based on the current products gender and category
// @access Public
// router.get("/similar/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const product = await Product.findById(id);
//     if (!product) {
//       return res.status(404).json({ message: "product not found!" });
//     }
//     const similarProducts = await Product.find({
//       _id: { $ne: id }, //Exclusive the current product ID
//       gender: product.gender,
//       category: product.category,
//     }).limit(4);
//     res.json(similarProducts);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Server Error");
//   }
// });

router.get("/similar/:id", Similar);

module.exports = router;
