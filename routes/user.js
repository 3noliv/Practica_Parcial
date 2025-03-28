const express = require("express");
const {
  registerUser,
  validateEmail,
  loginUser,
  updateOnboarding,
  updateCompany,
  updateLogo,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const uploadLogo = require("../middlewares/uploadLogo");
const {
  validateRegister,
  validateLogin,
  validateCode,
  validateOnboarding,
  validateCompany,
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

router.patch("/logo", authMiddleware, uploadLogo.single("logo"), updateLogo);

module.exports = router;
