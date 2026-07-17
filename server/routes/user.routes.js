const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userRouter = express.Router();
const User = require("../models/user.model.js");
const isAuth = require("../middlewares/authMiddleware.js");
userRouter.post("/register", async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res.send({
        success: false,
        message: "User Already Exists with the Email",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPwd = bcrypt.hashSync(req.body.password, salt);
    req.body.password = hashPwd;

    const newUser = await User(req.body);
    await newUser.save();
    res.send({
      success: true,
      message: "User Registered Successfully",
      user: newUser,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || "Registration failed",
    });
  }
});
userRouter.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.send({
        success: false,
        message: "User does not exist. Please Register",
      });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password,
    );

    if (!validPassword) {
      return res.send({
        success: false,
        message: "Sorry, invalid password entered!",
      });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "10d",
    });
    res.cookie("jwtToken", token, {
      httpOnly: true,
    });
    res.send({
      success: true,
      message: "You've successfully logged in!",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in Logging in!",
    });
  }
});
userRouter.get("/current-user", isAuth, async(req, res) => {
 try {
    const verifiedUser = await User.findById(req.userId).select("-password");
    if (!verifiedUser) {
      return res.status(404).json({ 
        success: false,
        message: "User not found" 
      });
    }
    // Return consistent user data structure
    res.json({
      _id: verifiedUser._id,
      name: verifiedUser.name,
      email: verifiedUser.email,
      role: verifiedUser.role,
    });
  } catch (error) {
    return res.status(500).json({ 
      success: false,
      message: "Server error" 
    });
  } 
});
  
module.exports = userRouter;
