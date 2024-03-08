const express=require('express');
const router=express.Router();
const jwt= require('jsonwebtoken');
const Booking=require('../models/Booking');
const { StatusCodes } = require('http-status-codes');

router.post('/booking',async function(req,res){
    const {checkIn,checkOut,guests,name,mobile,placeId,price}=req.body;
    const {token}=req.cookies;
    if (!token)
      return res.status(StatusCodes.UNAUTHORIZED).send("Not Authorized");
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
    res.status(StatusCodes.CREATED).send(booking);
})

router.get('/booking',async function(req,res){
  const { token } = req.cookies;
  if (!token)
    return res.status(StatusCodes.UNAUTHORIZED).send("Not Authorized");
  const payload = jwt.verify(token, process.env.JWT_SECRET);
  const booking=await Booking.find({user:payload.user._id}).populate('placeId');
  res.status(StatusCodes.OK).send(booking);


})

module.exports = router;