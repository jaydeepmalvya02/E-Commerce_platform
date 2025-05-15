const User = require("../models/UserModel");

const allUsers=async(req,res)=>{
  try {
      const users = await User.find({});
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
}

const addUser=async(req,res)=>{
  const { name, email, password, role } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        res.status(400).json({ messageL: "user is already added" });
      }
      user = new User({
        name,
        email,
        password,
        role: role || "customer",
      });
      await user.save();
      res.status(201).json({ message: "User is successfully added" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
}
const updateUser=async(req,res)=>{
  try {
      const user = await User.findById(req.params.id);
      if (user) {
        (user.name = req.body.name || user.name),
          (user.email = req.body.email || user.email),
          (user.role = req.body.role || user.role);
      }
      const updatedUser = await user.save();
      res.json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
}
const deleteUser=async(req,res)=>{
  try {
      const user = User.findById(req.params.id);
      if (!user) {
        res.status(404).json({ message: "User doesn't exist!" });
      }
      await user.deleteOne()
      res.json({ message: "User successfully deleted!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
}

module.exports={addUser,updateUser,deleteUser,allUsers}