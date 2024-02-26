const express = require("express");
const router = express.Router();
const multer = require("multer");
const download = require("image-downloader");
const fs = require("fs");

router.post("/uploadByLink", async function (req, res) {
  const { link } = req.body;
  const newName = Date.now() + ".jpg";
  options = {
    url: link,
    dest: "E:/web projects/air bnb/server/uploads/" + Date.now() + ".jpg",
  };
  const filename = await download.image(options);
  res.status(201).send("/uploads/" + newName);
});

const photoMiddleware = multer({
  dest: "uploads",
});

router.post(
  "/upload",
  photoMiddleware.array("photos", 100),
  async function (req, res) {
    const uplaodedFiles = [];
    // console.log(req.files);
    for (let i = 0; i < req.files.length; i++) {
      const { path, originalname } = req.files[i];
      const parts = originalname.split(".");
      const ext = parts[parts.length - 1];
      const newPath = path + "." + ext;
      fs.renameSync(path, newPath);
      uplaodedFiles.push(newPath.replace("uploads\\", "/uploads/"));
    }
    res.send(uplaodedFiles);
  }
);

module.exports = router;
