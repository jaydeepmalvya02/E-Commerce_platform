const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/ProductModel");
const User = require("./models/UserModel");
const products = require("./data/products");

dotenv.config();

// connect to mongoose

mongoose.connect(process.env.MONGO_URI);
const seedData = async () => {
  try {
    // Function to seed Data

    //Clear existing data
    await Product.deleteMany();
    await User.deleteMany();

    // Create a default admin user
    const createdUser = await User.create({
      name: "Admin User",
      email: "admin@gmail.com",
      password: "123456",
      role: "admin",
    });

    // Assign the default user ID to each product
    const userID = createdUser._id;
    const sampleProducts = products.map((product) => {
      
      
      return { ...product, user:userID };
    });
    // Insert product in to database
    await Product.insertMany(sampleProducts);
    console.log("Product data seeded successfully");
    process.exit();
  } catch (error) {
    console.error("Error Seeding the data");
    process.exit(1);
  }
};
seedData()
