const express = require("express");
const {
  registerUser,
  validateEmail,
  loginUser,
  updateOnboarding,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  validateRegister,
  validateLogin,
  validateCode,
  validateOnboarding,
  validateCompany,
  updateCompany,
} = require("../validators/userValidator");
const router = express.Router();

// Registro de usuario
router.post("/register", validateRegister, registerUser);

// Validación del email
router.put("/validation", authMiddleware, validateCode, validateEmail);

// Login de usuario
router.post("/login", validateLogin, loginUser);

// Onboarding de usuario
router.put("/register", authMiddleware, validateOnboarding, updateOnboarding);

router.patch("/company", authMiddleware, validateCompany, updateCompany);

module.exports = router;
