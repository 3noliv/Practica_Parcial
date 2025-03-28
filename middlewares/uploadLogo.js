const multer = require("multer");
const path = require("path");

// Carpeta de destino
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "storage/logos/");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);
  },
});

const uploadLogo = multer({
  storage,
  fileFilter: function (req, file, cb) {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const ext = path.extname(file.originalname).toLowerCase();
    const mime = file.mimetype;

    if (allowedTypes.test(ext) && allowedTypes.test(mime)) {
      cb(null, true);
    } else {
      cb(new Error("Solo se permiten imágenes .jpeg, .jpg, .png o .webp"));
    }
  },
});

module.exports = uploadLogo;
