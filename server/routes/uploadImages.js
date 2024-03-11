const express = require("express");
const router = express.Router();
const multer = require("multer");
const download = require("image-downloader");
const fs = require("fs");
const { StatusCodes } = require('http-status-codes');
const cloudinary = require('cloudinary').v2; 
const DatauriParser = require ('datauri/parser');
const path = require("path");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

router.post("/uploadByLink", async function (req, res) {
  const { link } = req.body;
  if(!link){
    return res.status(StatusCodes.BAD_REQUEST).send("fill all the fields");
  }
  const result= await cloudinary.uploader.upload(link);
  // console.log(result);
  res.status(StatusCodes.OK).send(result.url);
});

const storage=multer.memoryStorage();
const photoMiddleware = multer({
  storage
})

const parser = new DatauriParser();

router.post(
  "/upload",
  photoMiddleware.array("photos", 100),
  async function (req, res) {

    // console.log(req.files);

    const uplaodedFiles = [];
    // console.log(req.files);
    for (let i = 0; i < req.files.length; i++) {
      const extname=path.extname(req.files[i].originalname).toString();
      const file = parser.format(extname,req.files[i].buffer);
      const result= await cloudinary.uploader.upload(file.content);
      uplaodedFiles.push(result.url);
    }
    res.send(uplaodedFiles);
  }
);

module.exports = router;
