const express = require("express");
const {
  registerUser,
  validateEmail,
  loginUser,
} = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Registro de usuario
router.post("/register", registerUser);

// Validación del email
router.put("/validation", authMiddleware, validateEmail);

// Login de usuario
router.post("/login", loginUser);

module.exports = router;
