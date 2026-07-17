const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log("connected to database");
  } catch (error) {
    console.log("error while connecting to database", error);
  }
};
module.exports = { connectDB };
