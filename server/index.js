require("dotenv").config();
require('express-async-errors');
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const userRoute = require("./routes/user");
const imageRoute = require("./routes/uploadImages");
const placeRoute = require("./routes/places");
const bookingRoute = require('./routes/booking');
const cookieParser = require("cookie-parser");
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use("/uploads", express.static("./uploads"));
app.use(cookieParser());
// routes
app.use("/", userRoute);
app.use("/", imageRoute);
app.use("/", placeRoute);
app.use("/", bookingRoute);
mongoose
  .connect("mongodb://127.0.0.1:27017/airbnb")
  .then(() => console.log("connected"));
app.listen(port, () => console.log("working"));
