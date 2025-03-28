const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../storage/logos"));
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split(".").pop();
    cb(null, `logo-${Date.now()}.${ext}`);
  },
});

const upload = multer({ storage });

module.exports = upload;
