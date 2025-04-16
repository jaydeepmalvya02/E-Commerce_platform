const jwt = require("jsonwebtoken");
const User = require("../models/UserModel.js");

const protect = async (req, resizeBy, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.user._id).select("-password");
      next();
    } catch (error) {
      console.log("Token verification failed", error);
      resizeBy.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    resizeBy.status(401).json({ message: "Not Authorized, no token provided" });
  }
};

// middleware to check if the user is an admin
const admin=(req,res,next)=>{
    if(req.user && req.user.role==="admin"){
        next()
    }
    else{
        res.status(403).json({message:"Not Authorized as an admin"})
    }
}
module.exports = { protect,admin };
