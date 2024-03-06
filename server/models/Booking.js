const mongoose = require("mongoose");
const bookingSchema = mongoose.Schema({
  checkIn: {
    type: String,
  },
  checkOut: {
    type: String,
  },
  guests: {
    type: Number,
  },
  name: {
    type: String,
  },
  mobile: {
    type: Number,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  placeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Place",
  },
  price:{
    type:Number,
  },
});

module.exports = mongoose.model("Booking", bookingSchema);
