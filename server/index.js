// Import the Express framework, which is used to create a web server and handle HTTP requests
const express = require("express");
const cors = require("cors");
const cookieParser=require("cookie-parser")

// Import the database configuration file that contains connection logic for the database
const dbConfig = require("./dbConfig.js");
// Import the dotenv package to load environment variables from a .env file
const dotEnv = require("dotenv");
// Load the environment variables from the .env file into process.env
dotEnv.config();
// Call the connectDb() function from dbConfig.js to establish a connection to the database
dbConfig.connectDB();
// Create an instance of an Express application
const app = express();

const userRoutes = require("./routes/user.routes.js");
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials:true
  }),
);
app.use(cookieParser());
app.use("/api/auth", userRoutes);
app.listen(8001, () => {
  console.log("server started on port 8001");
});
