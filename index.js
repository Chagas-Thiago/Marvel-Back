const express = require("express");
const mongoose = require("mongoose");
const formidableMiddleware = require("express-formidable");
var cors = require("cors");

const app = express();
require("dotenv").config();

app.use(formidableMiddleware());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const marvelRoutes = require("./Routes/Marvel");

app.use(marvelRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Bem vindo" });
});

app.all("*", (req, res) => {
  res.json({ message: "Not found" });
});
app.listen(process.env.PORT, () => {
  console.log("Let's go");
});
