const express = require("express");
const app = express();
const dbConfig=require("./dbConfig.js");
const dotEnv=require("dotenv");
dotEnv.config();
dbConfig.connectDB();
app.get("/", (req, res) => {
 res.send("Hello World!");
});
app.listen(8001, () => {
  console.log("server started on port 8001");
});