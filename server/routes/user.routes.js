const express = require("express");
const bcrypt = require("bcryptjs");
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
 try{
   const user = await User.findOne({ email: req.body.email });
   if (!user) {
     return res.send({
       success: false,
       message: "User does not exist. Please Register",
     });
   }

   const validPassword = await bcrypt.compare(req.body.password, user.password);

   if (!validPassword) {
     return res.send({
       success: false,
       message: "Sorry, invalid password entered!",
     });
   }
    res.send({
      success: true,
      message: "You've successfully logged in!",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      }
    });

 }catch(error){
   res.status(500).json({
     success: false,
     message: "Error in Logging in!",
   });
 }
})
module.exports = userRouter;
