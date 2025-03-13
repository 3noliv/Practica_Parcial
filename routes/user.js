const express = require("express");
const {
  registerUser,
  validateEmail,
  loginUser,
} = require("../controllers/userController");
const router = express.Router();

// Registro de usuario
router.post("/register", registerUser);

// Validación del email
router.put("/validation", validateEmail);

// Login de usuario
router.post("/login", loginUser);

module.exports = router;
