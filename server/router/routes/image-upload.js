const express = require("express");
const multer = require("multer");

const { uploadImage } = require("../controllers/image-controllers");

const router = express.Router();
const storage = multer.memoryStorage({
  destination: (req, file, callback) => {
    callback(null, "");
  },
});

//image is the key!
const upload = multer({ storage }).single("image");

router.post("/image-upload", upload, uploadImage);

module.exports = router;
