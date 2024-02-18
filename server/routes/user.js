const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const express = require("express");
const router = express.Router();

router.post("/register", async function (req, res) {
  try {
    const { fullName, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ fullName, email, password: hashPassword });
    const token = jwt.sign({ user }, process.env.JWT_SECRET);

    res
      .cookie("token", token, { sameSite: "none", secure: true })
      .status(201)
      .json({ user });
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async function (req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  // console.log(user.password);
  if (!user) {
    return res.send("user not found");
  }
  const isMatched = bcrypt.compareSync(password, user.password);
  if (!isMatched) {
    return res.send("password mismatch");
  }
  const token = jwt.sign({user},process.env.JWT_SECRET);
  res.cookie('token',token,{sameSite:'none',secure:true}).status(200).send({user});
});

router.post("/logout", async function (req, res) {
  res.clearCookie('token').status(200).send('logout');
})

module.exports = router;
