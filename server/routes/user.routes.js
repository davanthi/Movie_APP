const express = require("express");
const userRouter = express.Router();
const User=require("../models/user.model.js");
userRouter.post("/register", async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res.send({
        success: false,
        message: "User Already Exists with the Email",
      });
    }
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
module.exports = userRouter;
