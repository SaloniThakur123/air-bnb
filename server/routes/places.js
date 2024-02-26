const express = require("express");
const router = express.Router();
const Places = require("../models/Places");

const jwt = require("jsonwebtoken");


// add a place
router.post("/places", async function (req, res) {
  // console.log('njnjnj');
  const {
    title,
    address,
    photos,
    perks,
    description,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;
  const { token } = req.cookies;
  const payload = jwt.verify(token, process.env.JWT_SECRET);
  console.log(payload);
  // res.send("ni");
  const place = await Places.create({
    owner: payload.user._id,
    title,
    address,
    photos,
    perks,
    description,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price
    });

  res.send(place);
});

// get a place of a specific user
router.get("/places", async function (req, res) {
  const { token } = req.cookies;
  const payload = jwt.verify(token, process.env.JWT_SECRET);

  const place = await Places.find({ owner: payload.user._id });
  res.send(place);
});

router.get("/places/:placeId", async function (req, res) {
  const { placeId } = req.params;

  const place = await Places.findOne({
    _id: placeId,
  });
  res.send(place);
});

// update a place
router.put("/places/:placeId", async function (req, res) {
  const { token } = req.cookies;
  const payload = jwt.verify(token, process.env.JWT_SECRET);

  const { placeId } = req.params;
  const place = await Places.findOne({
    _id: placeId,
  });
  console.log(placeId);
  const {
    title,
    address,
    photos,
    perks,
    description,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price
  } = req.body;
  const userId = payload.user._id;
  if (place.owner.equals(userId)) {
    await Places.findOneAndUpdate(
      { _id: placeId },
      {
        title,
        address,
        photos,
        perks,
        description,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price
      }
    );
    return res.send("updated");
  }
  res.send("not authorized");
});

// get all places 
router.get('/allPlaces',async function(req, res){
  const place=await Places.find({});
  res.send(place);

   
})

module.exports = router;
