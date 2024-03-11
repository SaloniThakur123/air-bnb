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
    origin: process.env.FRONTEND,
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
  .connect(process.env.MONGO_URL)
  .then(() => console.log("connected"));
app.listen(port, () => console.log("working"));
