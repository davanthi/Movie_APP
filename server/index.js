const express = require("express");
const app = express();
const dbConfig = require("./dbConfig.js");
const dotEnv = require("dotenv");
dotEnv.config();
dbConfig.connectDB();

const userRoutes = require("./routes/user.routes.js");
app.use(express.json());
app.use("/api/auth", userRoutes);
app.listen(8001, () => {
  console.log("server started on port 8001");
});
