const express=require('express');
const router=express.Router();
const jwt= require('jsonwebtoken');
const Booking=require('../models/Booking');

router.post('/booking',async function(req,res){
    const {checkIn,checkOut,guests,name,mobile,placeId,price}=req.body;
    const {token}=req.cookies;
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    const booking=await Booking.create({
      checkIn,
      checkOut,
      guests,
      name,
      mobile,
      user: payload.user._id,
      placeId,
      price,
    });
    res.send(booking);
})

router.get('/booking',async function(req,res){
  const { token } = req.cookies;
  const payload = jwt.verify(token, process.env.JWT_SECRET);
  const booking=await Booking.find({user:payload.user._id}).populate('placeId');
  res.send(booking);


})

module.exports = router;